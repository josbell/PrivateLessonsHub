import { TestBed, inject } from '@angular/core/testing';

import { GapiUserService } from './gapi-user.service';

describe('GapiUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GapiUserService]
    });
  });

  it('should be created', inject([GapiUserService], (service: GapiUserService) => {
    expect(service).toBeTruthy();
  }));
});
