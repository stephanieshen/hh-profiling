import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ETHNICITY, RELATIONSHIP_TO_HEAD_OF_HOUSEHOLD } from '../../../core/constants/dropdown-options.constants';

@Component({
  selector: 'app-household-info-form',
  standalone: false,
  
  templateUrl: './household-info-form.component.html',
  styleUrl: './household-info-form.component.scss'
})
export class HouseholdInfoFormComponent {

  @Input() profilingForm!: FormGroup;

  ethnicityOptions = ETHNICITY;
  releationshipToHouseholdHeadOptions = RELATIONSHIP_TO_HEAD_OF_HOUSEHOLD;
}
