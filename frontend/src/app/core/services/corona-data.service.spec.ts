import { TestBed, inject } from '@angular/core/testing';

import { CoronaDataService } from './corona-data.service';

describe('CoronaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoronaDataService]
    });
  });

  it('should be created', inject([CoronaDataService], (service: CoronaDataService) => {
    expect(service).toBeTruthy();
  }));
});
