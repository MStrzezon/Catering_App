import {Component,  Input, OnInit } from '@angular/core';
import {DishService} from "../../services/dish/dish.service";
import {FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnInit {

  cuisineTypes: string[] = [];

  minPrice: number;

  maxPrice: number;

  ratings = [1, 2, 3, 4, 5];

  dishTypes: string[]

  filterForm: FormGroup;

  @Input() checkedCuisineTypes: string[];

  @Input() checkedDishTypes: string[];

  @Input() checkedRatings: number[];

  @Input() searchedMinPrice: number[];

  @Input() searchedMaxPrice: number[];

  constructor(private formBuilder: FormBuilder, private dishService: DishService) {
  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      cuisineTypes: this.formBuilder.array([]),
      dishTypes: this.formBuilder.array([]),
      ratings: this.formBuilder.array([]),
      minPrice: '',
      maxPrice: ''
    });


    this.dishService.getCuisineTypes().subscribe(cuisineTypes => {
      this.cuisineTypes = cuisineTypes.filter(this.onlyUnique);
      this.addCuisineTypes();
    });
    this.dishService.getMinPrice().subscribe(minPrice => {
      this.minPrice = minPrice.sort((n1, n2) => n1 - n2)[0];
      this.searchedMinPrice.push(this.minPrice);
    });
    this.dishService.getMaxPrice().subscribe(maxPrice => {
      this.maxPrice = maxPrice.sort((n1, n2) => n2 - n1)[0]
      this.searchedMaxPrice.push(this.maxPrice);

    });
    this.dishService.getDishTypes().subscribe(dishTypes => {
      this.dishTypes = dishTypes.filter(this.onlyUnique);
      this.addDishTypes()
    });
    this.addRatings();

  }

  onlyUnique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
  }

  get cuisineTypesFormArray() {
    return this.filterForm.get('cuisineTypes') as FormArray;
  }

  private addCuisineTypes() {
    this.cuisineTypes.forEach(() => this.cuisineTypesFormArray.push(new FormControl(false)))
  }

  get dishTypesFormArray() {
    return this.filterForm.get('dishTypes') as FormArray;
  }

  private addDishTypes() {
    this.dishTypes.forEach(() => this.dishTypesFormArray.push(new FormControl(false)))
  }

  get ratingsFormArray() {
    return this.filterForm.get('ratings') as FormArray;
  }

  private addRatings() {
    this.ratings.forEach(() => this.ratingsFormArray.push(new FormControl(false)))
  }

  cuisineTypeCheckboxChanged(cuisineTypeIndex: number, e: Event) {
    if (e) {
      this.checkedCuisineTypes.push(this.cuisineTypes[cuisineTypeIndex]);
    } else {
      const index = this.checkedCuisineTypes.indexOf(this.cuisineTypes[cuisineTypeIndex], 0);
      if (index > -1) {
        this.checkedCuisineTypes.splice(index, 1)
      }
    }
  }

  dishTypeCheckboxChanged(dishTypeIndex: number, e: Event) {
    if (e) {
      this.checkedDishTypes.push(this.dishTypes[dishTypeIndex]);
    } else {
      const index = this.checkedDishTypes.indexOf(this.dishTypes[dishTypeIndex], 0);
      if (index > -1) {
        this.checkedDishTypes.splice(index, 1)
      }
    }
  }

  ratingCheckBoxChanged(ratingIndex: number, e: Event) {
    if (e) {
      this.checkedRatings.push(this.ratings[ratingIndex]);
    } else {
      const index = this.checkedRatings.indexOf(this.ratings[ratingIndex], 0);
      if (index > -1) {
        this.checkedRatings.splice(index, 1)
      }
    }
  }

  minValueChanged() {
    this.searchedMinPrice[0] = this.filterForm.get('minPrice')?.value;
  }

  maxValueChanged() {
    this.searchedMaxPrice[0] = this.filterForm.get('maxPrice')?.value;
  }
}