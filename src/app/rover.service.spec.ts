import { TestBed, inject } from '@angular/core/testing';

import { RoverService } from './rover.service';

describe('RoverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoverService]
    });
  });

  it('should be created', inject([RoverService], (service: RoverService) => {
    expect(service).toBeTruthy();
  }));
});
