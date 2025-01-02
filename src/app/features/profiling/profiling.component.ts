import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profiling',
  standalone: false,
  templateUrl: './profiling.component.html',
  styleUrl: './profiling.component.scss'
})
export class ProfilingComponent implements OnInit {

  activeIndex: number = 0;
  profilingForm!: FormGroup;
  stepItems!: MenuItem[];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.stepItems = [
      { label: 'Household Information' },
      { label: 'Socioeconomic Status & Environmental Health Data' },
      { label: 'Household Members' },
      { label: 'Survey Details' }
    ];

    this.initForm();
  }

  onActiveIndexChange(index: number): void {
    this.activeIndex = index;
  }

  private initForm(): void {
    this.profilingForm = this.formBuilder.group({
      householdInfo: this.formBuilder.group({
        sitio: ['', Validators.required],
        barangay: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        householdNumber: ['', Validators.required],
        lastname: ['', Validators.required],
        firstname: ['', Validators.required],
        middlename: ['', Validators.required],
        relationshipToHouseholdHead: [null, Validators.required],
        ethnicity: [null, Validators.required]
      }),
      socioEconomicAndEnvData: this.formBuilder.group({
        socioEconomicStatus: [null, Validators.required],
        typeOfWaterSource: [null, Validators.required],
        typeOfToiletFacility: [null, Validators.required]
      }),
      householdMembers: this.formBuilder.array([
        this.formBuilder.group({
          lastname: ['', Validators.required],
          firstname: ['', Validators.required],
          middlename: ['', Validators.required],
          gender: [null, Validators.required],
          dateOfBirth: ['', Validators.required],
          civilStatus: [null, Validators.required],
          philHealthIDNumber: ['', Validators.required],
          philHealthMembershipType: [null, Validators.required],
          philHealthCategory: [null, Validators.required],
          relationshipToHouseholdHead: [null, Validators.required],
        })
      ])
    }); 
  }

}
