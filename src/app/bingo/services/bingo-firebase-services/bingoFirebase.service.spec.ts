import { TestBed } from '@angular/core/testing';

import { BingoFirebaseService } from './bingoFirebase.service';

describe('BingoService', () => {
  let service: BingoFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingoFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
