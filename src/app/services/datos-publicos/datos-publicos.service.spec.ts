import { TestBed } from '@angular/core/testing';

import { DatosPublicosService } from './datos-publicos.service';

describe('DatosPublicosService', () => {
  let service: DatosPublicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPublicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
