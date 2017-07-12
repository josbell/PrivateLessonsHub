import { TestBed, inject } from '@angular/core/testing';

import { GapiCalendarService } from './gapi-calendar.service';

describe('GapiCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GapiCalendarService]
    });
  });

  it('should be created', inject([GapiCalendarService], (service: GapiCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
