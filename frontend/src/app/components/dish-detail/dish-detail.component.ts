import {Component, OnInit} from '@angular/core';
import {DishService} from "../../services/dish/dish.service";
import {ActivatedRoute} from "@angular/router";
import {Dish} from "../../models/Dish";
import {faDollar} from "@fortawesome/free-solid-svg-icons";
import {Review} from "../../models/Review";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Rating} from "../../models/Rating";
import {CartService} from "../../services/cart/cart.service";


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;

  reviews: Review[] = [];

  reviewForm: FormGroup;

  avgRating: number;

  stars: number;

  createdRating = 0;
  faDollar = faDollar;

  formHidden = true;

  submitted = false;

  quantity = 1;


  constructor(private formBuilder: FormBuilder, private dishService: DishService, private route: ActivatedRoute, private modalService: NgbModal,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    let review = new Review();
    review.nick = "Miki";
    review.userName = "Jan Kowalski";
    review.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere enim id enim tincidunt, et venenatis lorem tristique. In quis dapibus velit, pulvinar molestie augue. Donec non nulla lacinia, egestas felis a, placerat sapien. Cras eu imperdiet libero, ut accumsan leo. Nam ac neque id urna mollis interdum nec sed orci. Sed non arcu sapien. Cras aliquam auctor lacus, rutrum commodo risus ultricies eu. Sed suscipit lectus risus, ut ultrices nunc tristique at. Quisque ac ex nec purus mattis cursus. Duis odio justo, tincidunt id dictum sit amet, venenatis ut enim. Ut vel sem ullamcorper, ultricies arcu non, cursus magna. Nulla egestas ex ac laoreet pellentesque.";
    review.purchaseDate = new Date();
    this.reviews.push(review);
    review = new Review();
    review.nick = "Julek";
    review.userName = "Julian Lewandowski";
    review.text = "Et venenatis lorem tristique. In quis dapibus velit, pulvinar molestie augue. Cras eu imperdiet libero, ut accumsan leo. Nam ac neque id urna mollis interdum nec sed orci. Sed non arcu sapien. Cras aliquam auctor lacus, rutrum commodo risus ultricies eu. Sed suscipit lectus risus, ut ultrices nunc tristique at. Quisque ac ex nec purus mattis cursus. Duis odio justo, tincidunt id dictum sit amet, venenatis ut enim. Ut vel sem ullamcorper, ultricies arcu non, cursus magna. Nulla egestas ex ac laoreet pellentesque.";
    review.purchaseDate = new Date();
    this.reviews.push(review);

    this.route.paramMap.subscribe(params => {
      this.dishService.findById(Number.parseInt(<string>params.get('id'))).subscribe(dish => {
        this.dish = dish;
        this.avgRating = (this.dish.ratings.map(val => val.value).reduce((a, b) => a + b, 0)/this.dish.ratings.length) || 0
        this.stars = Math.round(this.avgRating);
      });
    });

    this.reviewForm = this.formBuilder.group({
      nick: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
      purchaseDate: new FormControl(''),
    });


  }

  get nick() {
    return this.reviewForm.get('nick') as FormControl;
  }

  get username() {
    return this.reviewForm.get('username') as FormControl;
  }

  get text() {
    return this.reviewForm.get('text') as FormControl;
  }

  get date() {
    return this.reviewForm.get('date') as FormControl;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.reviewForm.valid) {
      let review = new Review();
      review.nick = this.reviewForm.get('nick')?.value;
      review.userName = this.reviewForm.get('username')?.value;
      review.text = this.reviewForm.get('text')?.value;
      if (this.reviewForm.get('purchaseDate')?.value != null && this.reviewForm.get('purchaseDate')?.value != '') {
        review.purchaseDate = this.reviewForm.get('purchaseDate')?.value;
      }
      this.submitted = false;
      this.reviewForm.reset();
      this.reviews.push(review);
    }
  }

  addReviewBtnClicked(): void {
    this.formHidden = !this.formHidden;
  }

  updateRating(newRating: number) {
    this.createdRating = newRating;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (result === 'Save') {
          this.dishService.addRating(this.dish.dishId, this.createdRating).subscribe();
          let rating = new Rating()
          rating.value = this.createdRating;
          this.dish.ratings.push(rating);
          this.avgRating = (this.dish.ratings.map(val => val.value).reduce((a, b) => a + b, 0)/this.dish.ratings.length) || 0
          this.stars = Math.round(this.avgRating);
        }
      }
    );
  }

  addToCart() {
    this.cartService.addToCart(1, this.dish.dishId, this.quantity).subscribe();
    this.dish.quantity = this.dish.quantity - this.quantity;
    this.quantity = 1;
    confirm("Danie zostało dodane do koszyka");
  }
}
