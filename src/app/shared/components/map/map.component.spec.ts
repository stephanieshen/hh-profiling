// @ts-ignore
import markers from '../../../../assets/data/markers.json';
 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import maplibregl from 'maplibre-gl';
import { of } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { MarkerService } from '../../../core/services/marker.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let markerServiceSpy: jasmine.SpyObj<MarkerService>;
  let mapSpy: jasmine.SpyObj<maplibregl.Map>;
  let dialogServiceSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    markerServiceSpy = jasmine.createSpyObj('MarkerService', ['getMarkersData']);
    mapSpy = jasmine.createSpyObj('Map', ['on', 'resize']);
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MapComponent
      ],
      providers: [
        { provide: MarkerService, useValue: markerServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;

    markerServiceSpy.getMarkersData.and.returnValue(of(markers));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get all the markers and assign value to hhpMarkers', () => {
      expect(markerServiceSpy.getMarkersData).toHaveBeenCalled();
      expect(component.hhpMarkers).toEqual(markers);
    });

    it('should call initMap', () => {
      spyOn(component as any, 'initMap');

      component.ngOnInit();

      expect((component as any).initMap).toHaveBeenCalled();
    });
  });

  describe('initMap', () => {
    it('should initialize the map with the correct parameters', () => {
      spyOn(maplibregl, 'Map').and.returnValue(mapSpy);

      component.ngOnInit();

      expect(maplibregl.Map).toHaveBeenCalledWith({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
        center: [120.3352, 16.4383],
        zoom: 18
      });
    });

    it('should call resize and drawMarkers on map load', () => {
      spyOn(maplibregl, 'Map').and.returnValue(mapSpy);
      spyOn(component as any, 'drawMarkers');

      mapSpy.on.and.callFake((event: string, callback: any) => {
        if (event === 'load') {
          callback();
        } 
        return mapSpy;
      });

      component.ngOnInit();

      expect(mapSpy.on).toHaveBeenCalledWith('load', jasmine.any(Function));
      expect(mapSpy.resize).toHaveBeenCalled();
      expect((component as any).drawMarkers).toHaveBeenCalled();
    });

    it('should call mapClick on map click', () => {
      spyOn(maplibregl, 'Map').and.returnValue(mapSpy);
      spyOn(component as any, 'mapClick');

      mapSpy.on.and.callFake((event: string, callback: any) => {
        if (event === 'click') {
          callback();
        }
        return mapSpy;
      });

      component.ngOnInit();

      expect(mapSpy.on).toHaveBeenCalledWith('click', jasmine.any(Function));
      expect((component as any).mapClick).toHaveBeenCalled();
    });
  });

  describe('isMarker', () => {
    it('should return true if the element has the class hhp-marker', () => {
      const mockMapMouseEvent = {
        originalEvent: {
          target: {
            classList: {
              contains: (className: string) => className === 'hhp-marker'
            }
          }
        }
      } as any;

      const result = (component as any).isMarker(mockMapMouseEvent);

      expect(result).toBeTrue();
    });

    it('sould return false if the element does not have the class hhp-marker', () => {
      const mockMapMouseEvent = {
        originalEvent: {
          target: {
            classList: {
              contains: (className: string) => className === ''
            }
          }
        }
      } as any;

      const result = (component as any).isMarker(mockMapMouseEvent);

      expect(result).toBeFalse();
    });
  });
  
});
