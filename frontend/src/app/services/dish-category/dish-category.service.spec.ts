import { TestBed } from '@angular/core/testing';

import { DishCategoryService } from './dish-category.service';

describe('DishCategoryService', () => {
  let service: DishCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
