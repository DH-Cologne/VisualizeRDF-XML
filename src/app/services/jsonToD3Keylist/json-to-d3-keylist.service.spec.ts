import { TestBed, inject } from '@angular/core/testing';

import { JsonToD3KeylistService } from './json-to-d3-keylist.service';

describe('JsonToD3KeylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonToD3KeylistService]
    });
  });

  it('should be created', inject([JsonToD3KeylistService], (service: JsonToD3KeylistService) => {
    expect(service).toBeTruthy();
  }));
});
