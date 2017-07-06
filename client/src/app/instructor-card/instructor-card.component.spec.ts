import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCardComponent } from './instructor-card.component';

describe('InstructorCardComponent', () => {
  let component: InstructorCardComponent;
  let fixture: ComponentFixture<InstructorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
