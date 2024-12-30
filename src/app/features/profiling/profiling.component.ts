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
        relationshipToHousehold: ['', Validators.required]
      }),
      socioEconomicAndEnvData: this.formBuilder.group({
        ethnicity: ['', Validators.required],
        socioEconomicStatus: ['', Validators.required],
        typeOfWaterSource: ['', Validators.required],
        typeOfToiletFacility: ['', Validators.required]
      })
    });    
  }

}
