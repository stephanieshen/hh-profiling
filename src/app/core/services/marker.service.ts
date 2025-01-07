import { Injectable } from '@angular/core';
import { MarkerDataService } from '../data-services/marker.data.service';
import { Observable } from 'rxjs';
import { HHPMarker } from '../../shared/models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(
    private markerDataService: MarkerDataService
  ) { }

  getMarkersData(): Observable<HHPMarker[]> {
    return this.markerDataService.fetchMarkers$();
  }
}
