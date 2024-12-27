import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilingDialogComponent } from './profiling-dialog.component';

describe('ProfilingDialogComponent', () => {
  let component: ProfilingDialogComponent;
  let fixture: ComponentFixture<ProfilingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
