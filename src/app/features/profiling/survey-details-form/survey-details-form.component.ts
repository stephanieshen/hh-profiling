import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-survey-details-form',
  standalone: false,
  
  templateUrl: './survey-details-form.component.html',
  styleUrl: './survey-details-form.component.scss'
})
export class SurveyDetailsFormComponent {

  @Input() surveyDetailsForm!: FormGroup;
}
