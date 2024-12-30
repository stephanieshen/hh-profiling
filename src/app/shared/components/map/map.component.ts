import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HHPMarker } from '../../models/marker.model';
import { MarkerService } from '../../../core/services/marker.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Map, MapMouseEvent, Marker } from 'maplibre-gl';
import { ProfilingModule } from '../../../features/profiling/profiling.module';
import { ProfilingComponent } from '../../../features/profiling/profiling.component';
import maplibregl from 'maplibre-gl';

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

  map!: Map;
  hhpMarkers!: HHPMarker[];

  private destroyed$ = new Subject();

  constructor(
    public dialogService: DialogService,
    private markerService: MarkerService
  ) { }

  ngOnInit() {
    this.markerService.getMarkers()
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

    this.dialogService.open(ProfilingComponent, {
      header: 'Profiling',
      width: '90%',
      height: '100%',
      closable: true,
      data: {
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng
      }
    });
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
      const customMarker = document.createElement('div');
      customMarker.className = 'hhp-marker';
     
      new Marker({ element: customMarker })
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(this.map);
    });
  }
}
