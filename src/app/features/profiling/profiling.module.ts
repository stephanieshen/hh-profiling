import { NgModule } from '@angular/core';
import { ProfilingComponent } from './profiling.component';
import { SocioAndEnvFormComponent } from './socio-and-env-form/socio-and-env-form.component';
import { HouseholdMembersFormComponent } from './household-members-form/household-members-form.component';
import { SurveyDetailsFormComponent } from './survey-details-form/survey-details-form.component';
import { HouseholdInfoFormComponent } from './household-info-form/household-info-form.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Fluid } from 'primeng/fluid';
import { InputNumber } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    ProfilingComponent,
    HouseholdInfoFormComponent,
    SocioAndEnvFormComponent,
    HouseholdMembersFormComponent,
    SurveyDetailsFormComponent
  ],
  imports: [
    CommonModule,
    StepsModule,
    InputTextModule,
    Select,
    InputNumber,
    DatePicker,
    FloatLabel,
    Fluid,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class ProfilingModule { }
