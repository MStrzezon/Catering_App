import {Component, OnInit} from '@angular/core';
import {DishService} from "../../services/dish/dish.service";
import {ActivatedRoute} from "@angular/router";
import {Dish} from "../../models/Dish";
import {faDollar} from "@fortawesome/free-solid-svg-icons";
import {Review} from "../../models/Review";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Rating} from "../../models/Rating";
import {CartService} from "../../services/cart/cart.service";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../models/User";
import {RatingService} from "../../services/rating/rating.service";
import {ReviewService} from "../../services/review/review.service";


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

  user: User | null;

  userRating: number;

  isOrdered: boolean;

  constructor(private formBuilder: FormBuilder, private dishService: DishService, private route: ActivatedRoute, private modalService: NgbModal,
              private cartService: CartService, private authService: AuthService, private ratingService: RatingService,
              private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user
    })

    this.route.paramMap.subscribe(params => {
      this.dishService.findById(Number.parseInt(<string>params.get('id'))).subscribe(dish => {
        this.dish = dish;
        this.avgRating = (this.dish.ratings.map(val => val.value).reduce((a, b) => a + b, 0) / this.dish.ratings.length) || 0
        this.stars = Math.round(this.avgRating);

        this.reviewService.reviews(this.dish.dishId).subscribe(reviews => {
          this.reviews = reviews;
        })

        this.ratingService.getRating(this.user.id, this.dish.dishId).subscribe(ratingValue => {
          console.log(ratingValue);
          this.userRating = ratingValue;
        })

        this.isOrderedByUser();
      });
    });

    this.reviewForm = this.formBuilder.group({
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
      review.user = this.user;
      review.text = this.reviewForm.get('text')?.value;
      if (this.reviewForm.get('purchaseDate')?.value != null && this.reviewForm.get('purchaseDate')?.value != '') {
        review.purchaseDate = this.reviewForm.get('purchaseDate')?.value;
      }
      this.submitted = false;
      this.reviewForm.reset();
      this.reviewService.createReview(review).subscribe();
      this.reviews.push(review);
    }
  }

  addReviewBtnClicked(): void {
    this.formHidden = !this.formHidden;
  }

  updateRating(newRating: number) {
    this.createdRating = newRating;
  }

  isOrderedByUser() {
    this.dishService.isOrderedByUser(this.user.id, this.dish.dishId).subscribe(result => {
      console.log(result);
      this.isOrdered = result;
    });
  }

  saveRating(modal: any) {
    modal.close('Save');
    this.ratingService.updateRating(this.user.id, this.dish.dishId, this.createdRating);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        if (result === 'Save') {
          this.dishService.addRating(this.dish.dishId, this.createdRating).subscribe();
          let rating = new Rating()
          rating.value = this.createdRating;
          this.dish.ratings.push(rating);
          this.avgRating = (this.dish.ratings.map(val => val.value).reduce((a, b) => a + b, 0) / this.dish.ratings.length) || 0
          this.stars = Math.round(this.avgRating);
        }
      }
    );
  }

  addToCart() {
    this.cartService.addToCart(this.user.cartId, this.dish.dishId, this.quantity).subscribe();
    this.dish.quantity = this.dish.quantity - this.quantity;
    this.quantity = 1;
    confirm("Danie zostało dodane do koszyka");
  }
}
