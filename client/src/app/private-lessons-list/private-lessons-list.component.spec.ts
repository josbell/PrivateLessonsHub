import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLessonsListComponent } from './private-lessons-list.component';

describe('PrivateLessonsListComponent', () => {
  let component: PrivateLessonsListComponent;
  let fixture: ComponentFixture<PrivateLessonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateLessonsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLessonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
