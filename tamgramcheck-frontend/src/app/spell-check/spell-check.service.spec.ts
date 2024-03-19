import { TestBed } from '@angular/core/testing';

import { SpellCheckService } from './spell-check.service';


describe('SpellCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpellCheckService = TestBed.get(SpellCheckService);
    expect(service).toBeTruthy();
  });
});
