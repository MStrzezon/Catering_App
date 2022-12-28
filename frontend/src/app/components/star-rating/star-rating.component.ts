import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

  stars = [1, 2, 3, 4, 5];
  @Input() rating = 0;
  @Output() newItemEvent = new EventEmitter<number>();

  hoverState = 0;

  enter(i: number) {
    this.hoverState = i;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(i: number) {
    this.rating = i;
    this.newItemEvent.emit(this.rating);
  }
}
