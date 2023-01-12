import {Component,  Input, OnInit } from '@angular/core';
import {DishService} from "../../services/dish/dish.service";
import {FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {DishCuisineService} from "../../services/dish-cuisine/dish-cuisine.service";
import {DishCuisine} from "../../models/DishCuisine";
import {DishCategoryService} from "../../services/dish-category/dish-category.service";
import {DishCategory} from "../../models/DishCategory";

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnInit {

  dishCuisines: DishCuisine[] = [];

  minPrice: number;

  maxPrice: number;

  minRating: number;

  maxRating: number;

  dishCategories: DishCategory[]

  filterForm: FormGroup;

  @Input() checkedCuisineTypes: string[];

  @Input() checkedDishTypes: string[];

  @Input() searchedMinRating: number[];

  @Input() searchedMaxRating: number[];

  @Input() searchedMinPrice: number[];

  @Input() searchedMaxPrice: number[];

  constructor(private formBuilder: FormBuilder, private dishService: DishService, private dishCuisineService: DishCuisineService,
              private dishCategoryService: DishCategoryService) {
  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      cuisineTypes: this.formBuilder.array([]),
      dishTypes: this.formBuilder.array([]),
      minRating: '',
      maxRating: '',
      minPrice: '',
      maxPrice: ''
    });


    this.dishCuisineService.findAll().subscribe(dishCuisines => {
      this.dishCuisines = dishCuisines;
      this.addCuisineTypes();
    });
    this.dishService.getMinPrice().subscribe(minPrice => {
      this.minPrice = minPrice.sort((n1, n2) => n1 - n2)[0];
      this.searchedMinPrice.push(this.minPrice);
    });
    this.dishService.getMaxPrice().subscribe(maxPrice => {
      this.maxPrice = maxPrice.sort((n1, n2) => n2 - n1)[0]
      this.searchedMaxPrice.push(this.maxPrice);
      this.minRating = 0;
      this.maxRating = 5;
      this.searchedMinRating.push(this.minRating);
      this.searchedMaxRating.push(this.maxRating);

    });
    this.dishCategoryService.findAll().subscribe(dishCategories => {
      this.dishCategories = dishCategories;
      this.addDishTypes()
    });
  }

  get cuisineTypesFormArray() {
    return this.filterForm.get('cuisineTypes') as FormArray;
  }

  private addCuisineTypes() {
    this.dishCuisines.forEach(() => this.cuisineTypesFormArray.push(new FormControl(false)))
  }

  get dishTypesFormArray() {
    return this.filterForm.get('dishTypes') as FormArray;
  }

  private addDishTypes() {
    this.dishCategories.forEach(() => this.dishTypesFormArray.push(new FormControl(false)))
  }

  cuisineTypeCheckboxChanged(cuisineTypeIndex: number, e: Event) {
    if (e) {
      this.checkedCuisineTypes.push(this.dishCuisines[cuisineTypeIndex].name);
    } else {
      const index = this.checkedCuisineTypes.indexOf(this.dishCuisines[cuisineTypeIndex].name, 0);
      if (index > -1) {
        this.checkedCuisineTypes.splice(index, 1)
      }
    }
  }

  dishTypeCheckboxChanged(dishTypeIndex: number, e: Event) {
    if (e) {
      this.checkedDishTypes.push(this.dishCategories[dishTypeIndex].name);
    } else {
      const index = this.checkedDishTypes.indexOf(this.dishCategories[dishTypeIndex].name, 0);
      if (index > -1) {
        this.checkedDishTypes.splice(index, 1)
      }
    }
  }

  minRatingChanged() {
    this.searchedMinRating[0] = this.filterForm.get('minRating')?.value;
  }

  maxRatingChanged() {
    this.searchedMaxRating[0] = this.filterForm.get('maxRating')?.value;
  }

  minValueChanged() {
    this.searchedMinPrice[0] = this.filterForm.get('minPrice')?.value;
  }

  maxValueChanged() {
    this.searchedMaxPrice[0] = this.filterForm.get('maxPrice')?.value;
  }
}
