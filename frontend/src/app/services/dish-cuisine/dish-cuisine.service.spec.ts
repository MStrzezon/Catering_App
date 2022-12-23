import { TestBed } from '@angular/core/testing';

import { DishCuisineService } from './dish-cuisine.service';

describe('DishCuisineService', () => {
  let service: DishCuisineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishCuisineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
