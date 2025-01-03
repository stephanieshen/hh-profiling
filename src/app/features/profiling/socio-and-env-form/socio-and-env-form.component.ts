import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SOCIOECONOMIC_STATUS, TYPE_OF_TOILET_FACILITY, TYPE_OF_WATER_SOURCE } from '../../../core/constants/dropdown-options.constants';

@Component({
  selector: 'app-socio-and-env-form',
  standalone: false,
  
  templateUrl: './socio-and-env-form.component.html',
  styleUrl: './socio-and-env-form.component.scss'
})
export class SocioAndEnvFormComponent {

  @Input() socioEnvForm!: FormGroup;

  socioEconomicStatusOptions = SOCIOECONOMIC_STATUS;
  typeOfToiletFacilityOptions = TYPE_OF_TOILET_FACILITY;
  typeOfWaterSourceOptions = TYPE_OF_WATER_SOURCE;

  get hasNHTSNumberField(): boolean {
    return !!this.socioEnvForm?.get('nhtsNumber');
  } 

  get hasOtherTypeOfWaterSourceField(): boolean {
    return !!this.socioEnvForm?.get('otherTypeOfWaterSource');
  } 
}
