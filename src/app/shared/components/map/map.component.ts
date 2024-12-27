import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapEvent, NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { Observable } from 'rxjs';
import { HHPMarker } from '../../models/marker.model';
import { MarkerService } from '../../../core/services/marker.service';
import { ProfilingDialogComponent } from '../profiling-dialog/profiling-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MapMouseEvent } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  imports: [
    CommonModule,
    NgxMapLibreGLModule
  ],
  providers: [DialogService],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  markers$!: Observable<HHPMarker[]>;

  constructor(
    public dialogService: DialogService,
    private markerService: MarkerService
  ) { }

  ngOnInit() {
    this.markers$ = this.markerService.getMarkers();
  }

  mapClick(event: MapMouseEvent) {
    if (this.isMarker(event)) {
      console.log('Marker clicked');
      return;
    }

    this.dialogService.open(ProfilingDialogComponent, {
      header: 'Profiling',
      width: '60%',
      closable: true,
      data: {
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng
      }
    });
  }

  private isMarker(event: MapMouseEvent): boolean {
    const element = event.originalEvent.target as HTMLElement;
    return element.dataset['testid'] === 'marker';
  }
}
