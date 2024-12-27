import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { Observable } from 'rxjs';
import { HHPMarker } from '../../models/marker.model';
import { MarkerService } from '../../../core/services/marker.service';

@Component({
  selector: 'app-map',
  imports: [
    CommonModule,
    NgxMapLibreGLModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  markers$!: Observable<HHPMarker[]>;

  constructor(
    private markerService: MarkerService
  ) { }

  ngOnInit() {
    this.markers$ = this.markerService.getMarkers();
  }

  mapClick(event: any) {
    console.log('Map clicked', event);
  }
}
