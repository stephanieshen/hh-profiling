// @ts-ignore
import markers from '../../../../assets/data/markers.json';
 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import maplibregl, { LngLat, MapMouseEvent, Marker } from 'maplibre-gl';
import { of } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { MarkerService } from '../../../core/services/marker.service';
import { By } from '@angular/platform-browser';
import { ProfilingComponent } from '../../../features/profiling/profiling.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let markerServiceSpy: jasmine.SpyObj<MarkerService>;
  let mapSpy: jasmine.SpyObj<maplibregl.Map>;
  let dialogServiceSpy: jasmine.SpyObj<any>;
  let markerSpy: jasmine.SpyObj<Marker>;

  beforeEach(async () => {
    markerServiceSpy = jasmine.createSpyObj('MarkerService', ['getMarkersData']);
    markerSpy = jasmine.createSpyObj('Marker', ['setLngLat', 'addTo']);
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
  
  describe('saveMarker', () => {
    it('should call drawMarker', () => {
      const mockMarker = {
        id: 1,
        latitude: 16.43815207695144,
        longitude: 120.3354413988132
      }
  
      spyOn(component as any, 'drawMarker');
  
      component.saveMarker(mockMarker);
  
      expect((component as any).drawMarker).toHaveBeenCalledWith(mockMarker.longitude, mockMarker.latitude);
    });
  });

  describe('drawMarkers', () => {
    it('should loop through all the markers and call drawMarker', () => {
      component.hhpMarkers = [
        {
          id: 1,
          latitude: 16.43815207695144,
          longitude: 120.3354413988132
        },
        {
          id: 2,
          latitude: 16.438492175592543,
          longitude: 120.33505106041771
        }
      ];

      spyOn(component as any, 'drawMarker');

      (component as any).drawMarkers();

      expect((component as any).drawMarker).toHaveBeenCalledTimes(2);
    });
  });

  describe('drawMarker', () => {
    it('should draw a marker to the map', () => {
      const mockMarker = {
        id: 1,
        latitude: 16.43815207695144,
        longitude: 120.3354413988132
      };
      
      const customMarker = document.createElement('div');
      customMarker.className = 'hhp-marker';

      spyOn(document, 'createElement').and.returnValue(customMarker);
      spyOn(Marker.prototype, 'setLngLat').and.returnValue(markerSpy);
      spyOn(Marker.prototype, 'addTo').and.returnValue(markerSpy);

      (component as any).drawMarker(mockMarker.longitude, mockMarker.latitude);

      expect(document.createElement).toHaveBeenCalledTimes(1);
      expect(Marker.prototype.setLngLat).toHaveBeenCalledWith([mockMarker.longitude, mockMarker.latitude]);
    });
  });

  // describe('mapClick', () => {
  //   it('should open profiling component', () => {
  //     const mockMapMouseEvent = {
  //       originalEvent: {
  //         target: {
  //           classList: {
  //             contains: jasmine.createSpy().and.returnValue(false)
  //           }
  //         }
  //       },
  //       lngLat: {
  //         lat: 16.43815207695144,
  //         lng: 120.3354413988132
  //       }
  //     } as any;

  //     component.mapClick(mockMapMouseEvent);

  //     expect(dialogServiceSpy.open).toHaveBeenCalled();
  //   });
  // });
});
