import { TestBed, inject } from '@angular/core/testing';

import { TimeslotService } from './timeslot.service';

describe('TimeslotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeslotService]
    });
  });

  it('should be created', inject([TimeslotService], (service: TimeslotService) => {
    expect(service).toBeTruthy();
  }));
});
