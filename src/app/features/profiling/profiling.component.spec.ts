import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepsModule } from 'primeng/steps';

import { ProfilingComponent } from './profiling.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { HouseholdInfoFormComponent } from './household-info-form/household-info-form.component';
import { FloatLabel } from 'primeng/floatlabel';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { By } from '@angular/platform-browser';
import { TabsModule } from 'primeng/tabs';
import { SurveyDetailsFormComponent } from './survey-details-form/survey-details-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { Ethnicity, RelationshipToHeadOfHousehold, SocioeconomicStatus, TypeOfWaterSource } from '../../core/enums/dropdown-options.enum';

describe('ProfilingComponent', () => {
  let component: ProfilingComponent;
  let fixture: ComponentFixture<ProfilingComponent>;
  let formBuilder: FormBuilder;
  let dialogConfigSpy: jasmine.SpyObj<DynamicDialogConfig>;

  beforeEach(async () => {
    dialogConfigSpy = jasmine.createSpyObj('DynamicDialogConfig', [], {
      data: {
        submitProfilingForm: jasmine.createSpy('submitProfilingForm')
      }
    });

    await TestBed.configureTestingModule({
      declarations: [
        ProfilingComponent,
        HouseholdInfoFormComponent,
        SurveyDetailsFormComponent
      ],
      imports: [
        StepsModule,
        ReactiveFormsModule,
        FloatLabel,
        ButtonModule,
        SelectModule,
        TabsModule,
        InputTextModule,
        DatePicker
      ],
      providers: [
        provideRouter([]),
        FormBuilder,
        { provide: DynamicDialogConfig, useValue: dialogConfigSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the householdMembers form array', () => {
    const householdMembersFormArray = component.householdMembersFormArray;
    expect(householdMembersFormArray).toBeInstanceOf(FormArray);
  });

  it('should return the surveyDetailsFormGroup', () => {
    const surveyDetailsFormGroup = component.surveyDetailsFormGroup;
    expect(surveyDetailsFormGroup).toBeInstanceOf(FormGroup);
  });

  describe('ngOnInit', () => {
    it('should initialize value to the stepItems', () => {
      const mockStepItems = [
        { label: 'Household Information' },
        { label: 'Socioeconomic Status & Environmental Health Data' },
        { label: 'Household Members' },
        { label: 'Survey Details' }
      ];

      component.ngOnInit();

      expect(component.stepItems).toEqual(mockStepItems);
    });

    it('should call initForm', () => {
      spyOn(component as any, 'initForm');

      component.ngOnInit();

      expect((component as any).initForm).toHaveBeenCalled();
    });
  });

  describe('initForm', () => {
    it('should initialize the profilingForm', () => {
      component.ngOnInit();

      expect(component.profilingForm).toBeDefined();

      const householdInfo = component.profilingForm.get('householdInfo');
      expect(householdInfo).toBeTruthy();

      const socioEconomicAndEnvData = component.profilingForm.get('socioEconomicAndEnvData');
      expect(socioEconomicAndEnvData).toBeTruthy();

      const householdMembers = component.profilingForm.get('householdMembers');
      expect(householdMembers).toBeTruthy();

      const surveyDetails = component.profilingForm.get('surveyDetails');
      expect(surveyDetails).toBeTruthy();
    });

    it('should call initFormListeners', () => {
      spyOn(component as any, 'initFormListeners');

      component.ngOnInit();

      expect((component as any).initFormListeners).toHaveBeenCalled();
    });
  });

  describe('onActiveIndexChange', () => {
    it('should assign the correct activeIndex value', () => {
      const mockIndex = 1;

      component.onActiveIndexChange(mockIndex);

      expect(component.activeIndex).toBe(mockIndex);
    });
  });

  describe('submitProfilingForm', () => {
    it('should call dialogData submitProfilingForm', () => {
      component.submitProfilingForm();
      expect(dialogConfigSpy.data.submitProfilingForm).toHaveBeenCalled();
    });
  });

  describe('addHouseholdMemberHandler', () => {
    it('should add household member form group', () => {
      const membersForm = component.profilingForm.get('householdMembers') as FormArray;
      
      component.addHouseholdMemberHandler();

      expect(membersForm).toBeInstanceOf(FormArray);
      expect(membersForm.length).toBe(2);
    });

    it('should contain firstname, middlename, and lastname controls', () => {
      const membersForm = component.profilingForm.get('householdMembers') as FormArray;

      component.addHouseholdMemberHandler();
      
      const control = membersForm.at(0);

      expect(control.get('firstname')).toBeTruthy();
      expect(control.get('middlename')).toBeTruthy();
      expect(control.get('lastname')).toBeTruthy();
    });
  });

  describe('removeHouseholdMemberHandler', () => {
    it('should not remove household member form', () => {
      const membersForm = component.profilingForm.get('householdMembers') as FormArray;

      spyOn(membersForm, 'removeAt');

      component.removeHouseholdMemberHandler(0);

      expect(membersForm.length).toBe(1);
      expect(membersForm.removeAt).not.toHaveBeenCalled();
    });

    it('should remove household member form', () => {
      const membersForm = component.profilingForm.get('householdMembers') as FormArray;

      // add one more member on top of default value
      membersForm.push(component['householdMembersFormControls']);

      expect(membersForm.length).toBe(2);

      spyOn(membersForm, 'removeAt');

      component.removeHouseholdMemberHandler(1);

      expect(membersForm.removeAt).toHaveBeenCalledWith(1);
    });
  });

  describe('back', () => {
    it('shoud go back to the previous tab', () => {
      component.activeIndex = 1;

      component.back();

      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[data-test-id="tab-title"]'));

      expect(component.activeIndex).toBe(0);
      expect(title.nativeElement.textContent).toBe('Household Information');
    });
  });

  describe('next', () => {
    it('should go to the next tab', () => {
      component.activeIndex = 2;

      component.next();

      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[data-test-id="tab-title"]'));

      expect(component.activeIndex).toBe(3);
      expect(title.nativeElement.textContent).toBe('Survey Details');
    });
  });

  describe('initFormListeners', () => {
    it('should call manageHouseholdHeadRelationshipField when relationshipToHouseholdHead valueChanges emit', () => {
      const relationshipToHouseholdHead = component.houseHoldInfoFormGroup?.get('relationshipToHouseholdHead');

      spyOn(component as any, 'manageHouseholdHeadRelationshipField');

      relationshipToHouseholdHead?.setValue(RelationshipToHeadOfHousehold.OTHERS);

      expect((component as any).manageHouseholdHeadRelationshipField).toHaveBeenCalledWith(RelationshipToHeadOfHousehold.OTHERS);
    });

    it('should call manageEthnicityTribeField when ethnicity valueChanges emits', () => {
      const ethnicity = component.houseHoldInfoFormGroup?.get('ethnicity');

      spyOn(component as any, 'manageEthnicityTribeField');

      ethnicity?.setValue(Ethnicity.IP_HOUSEHOLD);

      expect((component as any).manageEthnicityTribeField).toHaveBeenCalledWith(Ethnicity.IP_HOUSEHOLD);
    });

    it('should call manageNHTSNumberField when socioEconomicStatus valueChanges emits', () => {
      const socioEconomicStatus =  component.socioEconomicAndEnvDataFormGroup.get('socioEconomicStatus');

      spyOn(component as any, 'manageNHTSNumberField');

      socioEconomicStatus?.setValue(SocioeconomicStatus.NHTS_4PS);

      expect((component as any).manageNHTSNumberField).toHaveBeenCalledWith(SocioeconomicStatus.NHTS_4PS);
    });

    it('should call manageOtherTypeOfWaterSourceField when typeOfWaterSource valueChanges emits', () => {
      const typeOfWaterSource = component.socioEconomicAndEnvDataFormGroup.get('typeOfWaterSource');

      spyOn(component as any, 'manageOtherTypeOfWaterSourceField');

      typeOfWaterSource?.setValue(TypeOfWaterSource.LEVEL_I);

      expect((component as any).manageOtherTypeOfWaterSourceField).toHaveBeenCalledOnceWith(TypeOfWaterSource.LEVEL_I);
    });
  });

  describe('manageHouseholdHeadRelationshipField', () => {
    it('should add relationshipToHouseholdHeadOthers control if id is "OTHERS"', () => {
      const householdInfo = component.profilingForm.get('householdInfo') as FormGroup;
      const id = RelationshipToHeadOfHousehold.OTHERS;

      spyOn(householdInfo, 'addControl').and.callThrough();

      (component as any).manageHouseholdHeadRelationshipField(id);
      
      expect(householdInfo.addControl).toHaveBeenCalledWith('relationshipToHouseholdHeadOthers', jasmine.any(Object));
      expect(householdInfo.get('relationshipToHouseholdHeadOthers')).toBeTruthy();
    });

    it('should remove the relationshipToHouseholdHeadOthers control if id is not "Others"', () => {
      const householdInfo = component.profilingForm.get('householdInfo') as FormGroup;
      const id = RelationshipToHeadOfHousehold.SPOUSE;

      spyOn(householdInfo, 'removeControl').and.callThrough();

      (component as any).manageHouseholdHeadRelationshipField(id);

      expect(householdInfo.removeControl).toHaveBeenCalledWith('relationshipToHouseholdHeadOthers');
      expect(householdInfo.get('relationshipToHouseholdHeadOthers')).toBeFalsy();
    });
  });

  describe('manageEthnicityTribeField', () => {
    it('should add tribe control if id is "IP HOUSEHOLD"', () => {
      const householdInfo = component.profilingForm.get('householdInfo') as FormGroup;
      const id = Ethnicity.IP_HOUSEHOLD;

      spyOn(householdInfo, 'addControl').and.callThrough();

      (component as any).manageEthnicityTribeField(id);

      expect(householdInfo.addControl).toHaveBeenCalledOnceWith('tribe', jasmine.any(Object));
      expect(householdInfo.get('tribe')).toBeTruthy();
    });

    it('should remove tribe control if id is not "IP HOUSEHOLD"', () => {
      const householdInfo = component.profilingForm.get('householdInfo') as FormGroup;
      const id = Ethnicity.NON_IP_HOUSEHOLD;

      spyOn(householdInfo, 'removeControl').and.callThrough();

      (component as any).manageEthnicityTribeField(id);

      expect(householdInfo.removeControl).toHaveBeenCalled();
      expect(householdInfo.get('tribe')).toBeFalsy();
    });
  });

  describe('manageNHTSNumberField', () => {
    it('should add nhtsNumber control if id is "NHTS"', () => {
      const socioEconomicAndEnvData = component.profilingForm.get('socioEconomicAndEnvData') as FormGroup;
      const id = SocioeconomicStatus.NHTS_4PS;
 
      spyOn(socioEconomicAndEnvData, 'addControl').and.callThrough();

      (component as any).manageNHTSNumberField(id);

      expect(socioEconomicAndEnvData.addControl).toHaveBeenCalledWith('nhtsNumber', jasmine.any(Object));
      expect(socioEconomicAndEnvData.get('nhtsNumber')).toBeTruthy();
    });

    it('shoud remove nhtsNumber if id is not "NHTS"', () => {
      const socioEconomicAndEnvData = component.profilingForm.get('socioEconomicAndEnvData') as FormGroup;
      const id = SocioeconomicStatus.NON_NHTS;

      spyOn(socioEconomicAndEnvData, 'removeControl').and.callThrough();

      (component as any).manageNHTSNumberField(id);

      expect(socioEconomicAndEnvData.removeControl).toHaveBeenCalled();
      expect(socioEconomicAndEnvData.get('nhtsNumber')).toBeFalsy();
    });
  });

  describe('manageOtherTypeOfWaterSourceField', () => {
    it('should add otherTypeOfWaterSource control if id is "OTHERS"', () => {
      const socioEconomicAndEnvData = component.profilingForm.get('socioEconomicAndEnvData') as FormGroup;
      const id = TypeOfWaterSource.OTHERS;
 
      spyOn(socioEconomicAndEnvData, 'addControl').and.callThrough();

      (component as any).manageOtherTypeOfWaterSourceField(id);

      expect(socioEconomicAndEnvData.addControl).toHaveBeenCalledWith('otherTypeOfWaterSource', jasmine.any(Object));
      expect(socioEconomicAndEnvData.get('otherTypeOfWaterSource')).toBeTruthy();
    });

    it('shoud remove otherTypeOfWaterSource if id is not "OTHERS"', () => {
      const socioEconomicAndEnvData = component.profilingForm.get('socioEconomicAndEnvData') as FormGroup;
      const id = TypeOfWaterSource.LEVEL_I;

      spyOn(socioEconomicAndEnvData, 'removeControl').and.callThrough();

      (component as any).manageOtherTypeOfWaterSourceField(id);

      expect(socioEconomicAndEnvData.removeControl).toHaveBeenCalled();
      expect(socioEconomicAndEnvData.get('otherTypeOfWaterSource')).toBeFalsy();
    });
  });
});
