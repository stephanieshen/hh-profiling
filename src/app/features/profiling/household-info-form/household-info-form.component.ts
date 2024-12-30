import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-household-info-form',
  standalone: false,
  
  templateUrl: './household-info-form.component.html',
  styleUrl: './household-info-form.component.scss'
})
export class HouseholdInfoFormComponent {

  @Input() profilingForm!: FormGroup;
}
