import { Component } from '@angular/core';
import { MapComponent } from '../../shared/components/map/map.component';

@Component({
  selector: 'app-home',
  imports: [
    MapComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
