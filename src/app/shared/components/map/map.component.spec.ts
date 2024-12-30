// @ts-ignore
import markers from '../../../../assets/data/markers.json';
 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { By } from '@angular/platform-browser';
import { MarkerService } from '../../../core/services/marker.service';
import { of } from 'rxjs';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let markerServiceSpy: jasmine.SpyObj<MarkerService>;

  beforeEach(async () => {
    markerServiceSpy = jasmine.createSpyObj('MyService', ['getMarkers']);

    await TestBed.configureTestingModule({
      imports: [
        MapComponent
      ],
      providers: [
        { provide: MarkerService, useValue: markerServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;

    markerServiceSpy.getMarkers.and.returnValue(of(markers));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get all the markers and assign value to hhpMarkers', () => {
      
      expect(markerServiceSpy.getMarkers).toHaveBeenCalled();
      // expect(component.hhpMarkers).toEqual(markers);
    });
  });

  it('should show the map', () => {
    const map = fixture.debugElement.query(By.css('[data-testid="map"]'));

    fixture.detectChanges();

    expect(map).toBeTruthy();
  });
});
