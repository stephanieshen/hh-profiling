// @ts-ignore

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { By } from '@angular/platform-browser';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the map', () => {
    const map = fixture.debugElement.query(By.css('[data-testid="map"]'));

    fixture.detectChanges();

    expect(map).toBeTruthy();
  });
});
