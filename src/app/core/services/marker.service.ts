// @ts-ignore
import markers from '../../../assets/data/markers.json';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HHPMarker } from '../../shared/models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  getMarkers(): Observable<HHPMarker[]> {
    return of(markers);
  }
}
