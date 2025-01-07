import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HHPMarker } from '../../models/marker.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Map, MapMouseEvent, Marker } from 'maplibre-gl';
import { ProfilingModule } from '../../../features/profiling/profiling.module';
import { ProfilingComponent } from '../../../features/profiling/profiling.component';
import maplibregl from 'maplibre-gl';
import { MarkerDataService } from '../../../core/data-services/marker.data.service';
import { MarkerService } from '../../../core/services/marker.service';

@Component({
  selector: 'app-map',
  imports: [
    CommonModule,
    ProfilingModule
  ],
  providers: [DialogService],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  dialogRef!: DynamicDialogRef;
  map!: Map;
  hhpMarkers!: HHPMarker[];

  private destroyed$ = new Subject();

  constructor(
    public dialogService: DialogService,
    private markerService: MarkerService
  ) {}

  ngOnInit() {
    this.markerService.getMarkersData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((markers: HHPMarker[]) => {
        this.hhpMarkers = markers;
        this.initMap();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  mapClick(event: MapMouseEvent) {
    if (this.isMarker(event)) {
      // TODO: add code
      return;
    }

    this.dialogRef = this.dialogService.open(ProfilingComponent, {
      header: 'Profiling',
      width: '80%',
      closable: true,
      maximizable: true,
      data: {
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng,
        submitProfilingForm: () => {
          this.dialogRef.close();
          this.saveMarker({
            id: Math.random(),
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat
          });
        }
      }
    });
  }

  saveMarker(marker: HHPMarker): void {
    this.drawMarker(marker.longitude, marker.latitude);
  }

  private isMarker(event: MapMouseEvent): boolean {
    const element = event.originalEvent.target as HTMLElement;
    return element.classList.contains('hhp-marker');
  }

  private initMap(): void {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: [120.3352, 16.4383],
      zoom: 18
    });

    this.map.on('load', () => {
      this.map.resize();
      this.drawMarkers();
    });

    this.map.on('click', (event: MapMouseEvent) => {
      this.mapClick(event);
    });
  }

  private drawMarkers(): void {
    this.hhpMarkers.forEach((marker: HHPMarker) => {
      this.drawMarker(marker.longitude, marker.latitude);
    });
  }

  private drawMarker(lng: number, lat: number): void {
    const customMarker = document.createElement('div');
    customMarker.className = 'hhp-marker';
     
    new Marker({ element: customMarker })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }
}
