import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdMembersFormComponent } from './household-members-form.component';

describe('HouseholdMembersFormComponent', () => {
  let component: HouseholdMembersFormComponent;
  let fixture: ComponentFixture<HouseholdMembersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseholdMembersFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdMembersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
