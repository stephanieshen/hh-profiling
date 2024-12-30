import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepsModule } from 'primeng/steps';

import { ProfilingComponent } from './profiling.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { HouseholdInfoFormComponent } from './household-info-form/household-info-form.component';
import { FloatLabel } from 'primeng/floatlabel';

describe('ProfilingComponent', () => {
  let component: ProfilingComponent;
  let fixture: ComponentFixture<ProfilingComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProfilingComponent,
        HouseholdInfoFormComponent
      ],
      imports: [
        StepsModule,
        ReactiveFormsModule,
        FloatLabel
      ],
      providers: [
        provideRouter([]),
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilingComponent);
    component = fixture.componentInstance;

    formBuilder = TestBed.inject(FormBuilder);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize value to the stepItems', () => {
      const mockStepItems = [
        { label: 'Household Information' },
        { label: 'Socioeconomic Status & Environmental Health Data' },
        { label: 'Household Members' },
        { label: 'Survey Details' }
      ];

      spyOn(component, 'ngOnInit').and.callThrough();

      component.ngOnInit();

      expect(component.ngOnInit).toHaveBeenCalled();
      expect(component.stepItems).toEqual(mockStepItems);
    });

    it('should call initForm', () => {
      spyOn(component, 'ngOnInit').and.callThrough();
      spyOn(component as any, 'initForm').and.callThrough();

      component.ngOnInit();

      expect((component as any).initForm).toHaveBeenCalled();
    });
  });

  describe('initForm', () => {
    it('should initialize the profilingForm', () => {
      const mockProfilingForm = formBuilder.group({
        householdInfo: formBuilder.group({
          sitio: [''],
          barangay: [''],
          city: [''],
          province: [''],
          householdNumber: [''],
          lastname: [''],
          firstname: [''],
          middlename: [''],
          relationshipToHousehold: ['']
        }),
        socioEconomicAndEnvData: formBuilder.group({
          ethnicity: [''],
          socioEconomicStatus: [''],
          typeOfWaterSource: [''],
          typeOfToiletFacility: ['']
        })
      });

      spyOn((component as any), 'initForm').and.callThrough();

      component.ngOnInit();

      expect((component as any).initForm).toHaveBeenCalled();
      expect(component.profilingForm).toBeDefined();
      expect(component.profilingForm.value).toEqual(mockProfilingForm.value);
    });
  });

  describe('onActiveIndexChange', () => {
    it('should assign the correct activeIndex value', () => {
      const mockIndex = 1;

      spyOn(component, 'onActiveIndexChange').and.callThrough();

      component.onActiveIndexChange(mockIndex);

      expect(component.onActiveIndexChange).toHaveBeenCalledWith(mockIndex);
      expect(component.activeIndex).toBe(mockIndex);
    });
  });
});
