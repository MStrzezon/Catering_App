import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { Validators } from '@angular/forms';
import {Dish} from "../../models/Dish";
import {DishService} from "../../services/dish/dish.service";
import {DishCuisineService} from "../../services/dish-cuisine/dish-cuisine.service";
import {DishCuisine} from "../../models/DishCuisine";
import {DishCategoryService} from "../../services/dish-category/dish-category.service";
import {DishCategory} from "../../models/DishCategory";

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css']
})
export class CreateDishComponent implements OnInit {

  dishCuisines: DishCuisine[];

  dishCategories: DishCategory[];

  dishForm: FormGroup;

  dish: Dish;

  submitted = false;

  constructor(private formBuilder: FormBuilder, private dishService: DishService, private dishCuisineService: DishCuisineService,
              private dishCategoryService: DishCategoryService) { }

  ngOnInit() {
    this.loadDishCuisines();
    this.loadDishCategories()

    this.dishForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      dishCuisine: new FormControl('', [Validators.required]),
      dishCategory: new FormControl('', [Validators.required]),
      ingredients: this.formBuilder.array([]),
      quantity: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+([.][0-9]{1,2})?$")]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      image: ['', Validators.required]
    });
  }

  loadDishCuisines() {
    this.dishCuisineService.findAll().subscribe(dishCuisines => this.dishCuisines = dishCuisines);
  }

  loadDishCategories() {
    this.dishCategoryService.findAll().subscribe(dishCategories => this.dishCategories = dishCategories);
  }

  get name() {
    return this.dishForm.get('name') as FormControl;
  }

  get dishCuisine() {
    return this.dishForm.get('dishCuisine') as FormControl;
  }

  get dishCategory() {
    return this.dishForm.get('dishCategory') as FormControl;
  }

  get ingredients() {
    return this.dishForm.get('ingredients') as FormArray;
  }

  get quantity() {
    return this.dishForm.get('quantity') as FormControl;
  }

  get price() {
    return this.dishForm.get('price') as FormControl;
  }

  get description() {
    return this.dishForm.get('description') as FormControl;
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.control('', [Validators.required]));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.dishForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.dishForm.value);
    }
    // let dish = new Dish();
    // dish.name = this.dishForm.get('name')?.value;
    // dish.dishCuisine = this.dishForm.get('cuisine_type')?.value;
    // dish.dishCategory = this.dishForm.get('dish_type')?.value;
    // dish.ingredients = this.dishForm.get('ingredients')?.value;
    // dish.quantity = this.dishForm.get('amount')?.value;
    // dish.price = this.dishForm.get('price')?.value;
    // dish.description = this.dishForm.get('description')?.value;
    // dish.images.push(this.dishForm.get('image')?.value);
    // this.dishService.createDish(dish).subscribe();
    //
    // this.dishService.findAll().subscribe(dishes => console.log(dishes));
  }
}
