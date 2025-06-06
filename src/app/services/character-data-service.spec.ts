import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { CharacterDataService } from './character-data-service';

describe('CharacterDataService', () => {
  let service: CharacterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
