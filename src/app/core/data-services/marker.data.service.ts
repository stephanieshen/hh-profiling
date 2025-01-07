// @ts-ignore
import markers from '../../../assets/data/markers.json';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HHPMarker } from '../../shared/models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerDataService {

  constructor() { }

  fetchMarkers$(): Observable<HHPMarker[]> {
    return of([]);
  }
}
