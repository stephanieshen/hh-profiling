import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDetailsFormComponent } from './survey-details-form.component';

describe('SurveyDetailsFormComponent', () => {
  let component: SurveyDetailsFormComponent;
  let fixture: ComponentFixture<SurveyDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyDetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
