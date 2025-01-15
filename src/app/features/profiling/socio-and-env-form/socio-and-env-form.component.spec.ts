import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioAndEnvFormComponent } from './socio-and-env-form.component';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

describe('SocioAndEnvFormComponent', () => {
  let component: SocioAndEnvFormComponent;
  let fixture: ComponentFixture<SocioAndEnvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocioAndEnvFormComponent],
      imports: [
        SelectModule,
        FloatLabel,
        ReactiveFormsModule,
        InputTextModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioAndEnvFormComponent);
    component = fixture.componentInstance;

    component.socioEnvForm = new FormGroup({
      socioEconomicStatus: new FormControl(null),
      typeOfWaterSource: new FormControl(null),
      typeOfToiletFacility: new FormControl(null)
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasNHTSNumberField - should return true if nhtsNumber field exists', () => {
    // simulate nhtsNumber field exists
    const controls = component.socioEnvForm as FormGroup;
    controls.addControl('nhtsNumber', new FormControl(''));

    expect(component.hasNHTSNumberField).toBeTrue();
  });

  it('hasNHTSNumberField - should return false if nhtsNumber field does not exist', () => {
    expect(component.hasNHTSNumberField).toBeFalse();
  });

  it('hasOtherTypeOfWaterSourceField - should return true if otherTypeOfWaterSource field exists', () => {
    // simulate otherTypeOfWaterSource field exists
    const controls = component.socioEnvForm as FormGroup;
    controls.addControl('otherTypeOfWaterSource', new FormControl(''));

    expect(component.hasOtherTypeOfWaterSourceField).toBeTrue();
  });

  it('hasOtherTypeOfWaterSourceField - should return false if otherTypeOfWaterSource field does not exist', () => {
    expect(component.hasOtherTypeOfWaterSourceField).toBeFalse();
  });
});
