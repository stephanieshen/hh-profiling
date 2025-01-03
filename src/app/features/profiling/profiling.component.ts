import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Ethnicity, RelationshipToHeadOfHousehold, SocioeconomicStatus, TypeOfWaterSource } from '../../core/enums/dropdown-options.enum';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-profiling',
  standalone: false,
  templateUrl: './profiling.component.html',
  styleUrl: './profiling.component.scss'
})
export class ProfilingComponent implements OnInit, OnDestroy {

  activeIndex: number = 0;
  profilingForm!: FormGroup;
  stepItems!: MenuItem[];

  private destroy$ = new Subject<void>();

  constructor(
    private dialogConfig: DynamicDialogConfig,
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get houseHoldInfoFormGroup(): FormGroup {
    return this.profilingForm.get('householdInfo') as FormGroup;
  }

  get socioEconomicAndEnvDataFormGroup(): FormGroup {
    return this.profilingForm.get('socioEconomicAndEnvData') as FormGroup;
  }

  get householdMembersFormArray(): FormArray {
    return this.profilingForm.get('householdMembers') as FormArray;
  }

  get surveyDetailsFormGroup(): FormGroup {
    return this.profilingForm.get('surveyDetails') as FormGroup;
  }

  onActiveIndexChange(index: number): void {
    this.activeIndex = index;
  }

  addHouseholdMemberHandler(): void {
    const membersForm = this.profilingForm.get('householdMembers') as FormArray;
    membersForm.push(this.householdMembersFormControls);
  }

  removeHouseholdMemberHandler(index: number): void {
    if (this.householdMembersFormArray.length === 1) {
      return;
    }

    const membersForm = this.profilingForm.get('householdMembers') as FormArray;
    membersForm.removeAt(index);
  }

  back(): void {
    this.activeIndex = this.activeIndex - 1;
  }

  next(): void {
    this.activeIndex = this.activeIndex + 1;
  }

  submitProfilingForm(): void {
    console.log(this.profilingForm.value);
    this.dialogConfig.data.submitProfilingForm();
  }

  private initForm(): void {
    this.profilingForm = this.formBuilder.group({
      householdInfo: this.householdInfoForm,
      socioEconomicAndEnvData: this.socioEconomicAndEnvDataForm,
      householdMembers: this.householdMembersForm,
      surveyDetails: this.surveyDetailsForm
    }); 

    this.initFormListeners();
  }

  private initFormListeners(): void {
    this.houseHoldInfoFormGroup?.get('relationshipToHouseholdHead')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number) => (
        this.manageHouseholdHeadRelationshipField(id)
      ));
    
    this.houseHoldInfoFormGroup?.get('ethnicity')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number) => (
        this.manageEthnicityTribeField(id)
      ));

    this.socioEconomicAndEnvDataFormGroup.get('socioEconomicStatus')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number) => (
        this.manageNHTSNumberField(id)
      ));

    this.socioEconomicAndEnvDataFormGroup.get('typeOfWaterSource')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number) => (
        this.manageOtherTypeOfWaterSourceField(id)
      ));
  }

  private manageHouseholdHeadRelationshipField(id: any): void {
    const householdInfo = this.profilingForm.get('householdInfo') as FormGroup;

    if (id === RelationshipToHeadOfHousehold.OTHERS) {
      householdInfo.addControl('relationshipToHouseholdHeadOthers', this.formBuilder.control('', Validators.required));
    } else {
      householdInfo.removeControl('relationshipToHouseholdHeadOthers');
    }
    
    this.profilingForm.setControl('householdInfo', householdInfo);
  }

  private manageEthnicityTribeField(id: any): void {
    const householdInfo = this.profilingForm.get('householdInfo') as FormGroup;

    if (id === Ethnicity.IP_HOUSEHOLD) {
      householdInfo.addControl('tribe', this.formBuilder.control('', Validators.required));
    } else {
      householdInfo.removeControl('tribe');
    }

    this.profilingForm.setControl('householdInfo', householdInfo);
  }

  private manageNHTSNumberField(id: number): void {
    const socioEconomicAndEnvData = this.profilingForm.get('socioEconomicAndEnvData') as FormGroup;

    if (id === SocioeconomicStatus.NHTS_4PS || id === SocioeconomicStatus.NHTS_NON_4PS) {
      socioEconomicAndEnvData.addControl('nhtsNumber', this.formBuilder.control('', Validators.required));
    } else {
      socioEconomicAndEnvData.removeControl('nhtsNumber');
    }

    this.profilingForm.setControl('socioEconomicAndEnvData', socioEconomicAndEnvData);
  }

  private manageOtherTypeOfWaterSourceField(id: number): void {
    const socioEconomicAndEnvData = this.profilingForm.get('socioEconomicAndEnvData') as FormGroup;

    if (id === TypeOfWaterSource.OTHERS) {
      socioEconomicAndEnvData.addControl('otherTypeOfWaterSource', this.formBuilder.control('', Validators.required));
    } else {
      socioEconomicAndEnvData.removeControl('otherTypeOfWaterSource');
    }

    this.profilingForm.setControl('socioEconomicAndEnvData', socioEconomicAndEnvData);
  }

  private get householdInfoForm(): FormGroup {
    return this.formBuilder.group({
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
    });
  }

  private get socioEconomicAndEnvDataForm(): FormGroup {
    return this.formBuilder.group({
      socioEconomicStatus: [null, Validators.required],
      typeOfWaterSource: [null, Validators.required],
      typeOfToiletFacility: [null, Validators.required]
    });
  }

  private get householdMembersForm(): FormArray {
    return this.formBuilder.array([
      this.householdMembersFormControls
    ]);
  }

  private get householdMembersFormControls(): FormGroup {
    return this.formBuilder.group({
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
    });
  }

  private get surveyDetailsForm(): FormGroup {
    return this.formBuilder.group({
      firstQuarterDateOfVisit: ['', Validators.required],
      secondQuarterDateOfVisit: ['', Validators.required],
      thirdQuarterDateOfVisit: ['', Validators.required],
      fourthQuarterDateOfVisit: ['', Validators.required],
      interviewerFirstName: ['', Validators.required],
      interviewerLastName: ['', Validators.required],
      interviewerMiddleName: ['', Validators.required],
      reviewerFirstName: ['', Validators.required],
      reviewerLastName: ['', Validators.required],
      reviewerMiddleName: ['', Validators.required]
    });
  }
}
