import { TestBed } from '@angular/core/testing';
import { BingoLocalService } from './bingoLocal.service';

describe('BingoLocalService', () => {
  let service: BingoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

