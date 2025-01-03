import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CIVIL_STATUS, GENDER, MEMBER_TYPE, PHILHEALTH_CATEGORY, RELATIONSHIP_TO_HEAD_OF_HOUSEHOLD } from '../../../core/constants/dropdown-options.constants';

@Component({
  selector: 'app-household-members-form',
  standalone: false,
  
  templateUrl: './household-members-form.component.html',
  styleUrl: './household-members-form.component.scss'
})
export class HouseholdMembersFormComponent {

  @Input() profilingForm!: FormGroup;
  @Output() addedMemberEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() removedMemberEvent: EventEmitter<number> = new EventEmitter<number>();

  civilStatusOptions = CIVIL_STATUS;
  genderOptions = GENDER;
  philHealthMembershipOptions = MEMBER_TYPE;
  philHealthCategoryOptions = PHILHEALTH_CATEGORY;
  releationshipToHouseholdHeadOptions = RELATIONSHIP_TO_HEAD_OF_HOUSEHOLD;
  selectedTabIndex: number = 0;

  get householdMembersForm(): FormArray {
    return this.profilingForm.get('householdMembers') as FormArray;
  }

  addHouseholdMember(): void {
    this.addedMemberEvent.emit();
    this.selectedTabIndex = this.householdMembersForm.length - 1;
  }

  removeHouseholdMember(index: number): void {
    this.removedMemberEvent.emit(index);
    this.selectedTabIndex = this.householdMembersForm.length - 1;
  }
}
