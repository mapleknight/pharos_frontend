import { TestBed, inject } from '@angular/core/testing';

import { RadarService } from './radar.service';
import { HttpClientModule} from '@angular/common/http';

describe('RadarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        RadarService
      ]
    });
  });

  it('should be created', inject([RadarService], (service: RadarService) => {
    expect(service).toBeTruthy();
  }));
});
