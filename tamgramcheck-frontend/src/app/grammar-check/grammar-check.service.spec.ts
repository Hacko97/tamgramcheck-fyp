import { TestBed } from '@angular/core/testing';

import { GrammarCheckService } from './grammar-check.service';


describe('GrammarCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrammarCheckService = TestBed.get(GrammarCheckService);
    expect(service).toBeTruthy();
  });
});
