import { TestBed } from '@angular/core/testing';

import { LocationnameService } from './locationname.service';

describe('LocationnameService', () => {
  let service: LocationnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
