import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { Validators } from '@angular/forms';
import {Dish} from "../../models/Dish";
import {DishService} from "../../services/dish/dish.service";
import {DishCuisineService} from "../../services/dish-cuisine/dish-cuisine.service";
import {DishCuisine} from "../../models/DishCuisine";
import {DishCategoryService} from "../../services/dish-category/dish-category.service";
import {DishCategory} from "../../models/DishCategory";
import {Image} from "../../models/Image";
import {Ingredient} from "../../models/Ingredient";

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
      images: this.formBuilder.array([])
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

  get images() {
    return this.dishForm.get('images') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.control('', [Validators.required]));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  addImage() {
    this.images.push(this.formBuilder.control('', [Validators.required]));
  }

  removeImage(i: number) {
    this.images.removeAt(i);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.dishForm.valid) {
      let dish = new Dish();
      dish.name = this.dishForm.get('name')?.value;
      dish.dishCuisine = new DishCuisine(this.dishForm.get('dishCuisine')?.value);
      dish.dishCategory = new DishCategory(this.dishForm.get('dishCategory')?.value);
      dish.ingredients = this.ingredients.controls.map(ingredient => new Ingredient(ingredient.value));
      dish.quantity = this.dishForm.get('quantity')?.value;
      dish.price = this.dishForm.get('price')?.value;
      dish.description = this.dishForm.get('description')?.value;
      dish.images = this.images.controls.map(image => new Image(image.value));
      this.submitted = false;
      this.dishForm.reset();
      this.dishService.createDish(dish).subscribe();
    }
  }
}
