import {inject, TestBed} from '@angular/core/testing';

import {UniworkoutService} from './uniworkout.service';

describe('UniworkoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniworkoutService]
    });
  });

  it('should be created', inject([UniworkoutService], (service: UniworkoutService) => {
    expect(service).toBeTruthy();
  }));
});
