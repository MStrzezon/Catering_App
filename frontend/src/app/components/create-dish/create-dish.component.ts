import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { Validators } from '@angular/forms';
import {Dish} from "../../models/Dish";
import {DishService} from "../../services/dish/dish.service";

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css']
})
export class CreateDishComponent implements OnInit {

  dishForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dishService: DishService) { }

  ngOnInit() {
    this.dishForm = this.formBuilder.group({
      name: ['', Validators.required],
      cuisine_type: ['', Validators.required],
      dish_type: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+([.][0-9]{1,2})?$")]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      image: ['', Validators.required]
    });
  }

  get ingredients() {
    return this.dishForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.control(''));
  }

  deleteIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  onSubmit(): void {
    let dish = new Dish();
    dish.name = this.dishForm.get('name')?.value;
    dish.cuisine_type = this.dishForm.get('cuisine_type')?.value;
    dish.dish_type = this.dishForm.get('dish_type')?.value;
    dish.ingredients = this.dishForm.get('ingredients')?.value;
    dish.amount = this.dishForm.get('amount')?.value;
    dish.price = this.dishForm.get('price')?.value;
    dish.description = this.dishForm.get('description')?.value;
    dish.image = this.dishForm.get('image')?.value;
    this.dishService.addDish(dish).subscribe();

    this.dishService.getDishes().subscribe(dishes => console.log(dishes));
  }
}
