import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLessonsDetailsComponent } from './private-lessons-details.component';

describe('PrivateLessonsDetailsComponent', () => {
  let component: PrivateLessonsDetailsComponent;
  let fixture: ComponentFixture<PrivateLessonsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateLessonsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLessonsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
