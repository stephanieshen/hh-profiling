import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdMembersFormComponent } from './household-members-form.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';

describe('HouseholdMembersFormComponent', () => {
  let component: HouseholdMembersFormComponent;
  let fixture: ComponentFixture<HouseholdMembersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseholdMembersFormComponent],
      imports: [
        TabsModule,
        ButtonModule,
        ReactiveFormsModule,
        FloatLabel,
        SelectModule,
        DatePicker
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdMembersFormComponent);
    component = fixture.componentInstance;

    component.profilingForm = new FormGroup({
      householdMembers: new FormArray([
        new FormGroup({
          lastname: new FormControl(''),
          firstname: new FormControl(''),
          middlename: new FormControl(''),
          gender: new FormControl(null),
          dateOfBirth: new FormControl(''),
          civilStatus: new FormControl(null),
          philHealthIDNumber: new FormControl(''),
          philHealthMembershipType: new FormControl(null),
          philHealthCategory: new FormControl(null),
          relationshipToHouseholdHead: new FormControl(null)
        })
      ])
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return householdMembersForm as form array', () => {
    const form = component.householdMembersForm;
    expect(form).toBeInstanceOf(FormArray);
  });
  
  describe('addHouseholdMember', () => {
    it('should emit addedMemberEvent and update selected tab index', () => {
      spyOn(component.addedMemberEvent, 'emit');

      const members = component.profilingForm.get('householdMembers') as FormArray;
      members.push(new FormGroup({}));

      component.addHouseholdMember();

      expect(component.addedMemberEvent.emit).toHaveBeenCalled();
      expect(component.selectedTabIndex).toBe(1);
    });
  });

  describe('removeHouseholdMember', () => {
    it('should emit removedMemberEvent and update selected tab index', () => {
      const indexToRemove = 1;
      spyOn(component.removedMemberEvent, 'emit');

      const members = component.profilingForm.get('householdMembers') as FormArray;

      // add one more item for testing only
      members.push(new FormGroup({}));

      // remove added item to simulate behavior 
      members.removeAt(indexToRemove);

      component.removeHouseholdMember(indexToRemove);

      expect(component.removedMemberEvent.emit).toHaveBeenCalledWith(indexToRemove);
      expect(component.selectedTabIndex).toBe(0);
    });
  });
});
