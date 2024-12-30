import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioAndEnvFormComponent } from './socio-and-env-form.component';

describe('SocioAndEnvFormComponent', () => {
  let component: SocioAndEnvFormComponent;
  let fixture: ComponentFixture<SocioAndEnvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocioAndEnvFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioAndEnvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
