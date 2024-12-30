import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { HouseholdInfoFormComponent } from './household-info-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('HouseholdInfoFormComponent', () => {
  let component: HouseholdInfoFormComponent;
  let fixture: ComponentFixture<HouseholdInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HouseholdInfoFormComponent
      ],
      imports: [
        FloatLabel,
        InputTextModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
