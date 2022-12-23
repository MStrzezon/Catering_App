import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  starClassName = "star-rating-blank";
  @Input() starId: number;
  @Input() rating: number;

  @Output() leave: EventEmitter<number> = new EventEmitter<number>();
  @Output() enter: EventEmitter<number> = new EventEmitter<number>();
  @Output() bigClick: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
  }

  ngOnInit() {
    if (this.rating >= this.starId) {
      this.starClassName = "star-rating-filled";
    }
  }

  onEnter() {
    this.enter.emit(this.starId);
  }

  onLeave() {
    this.leave.emit(this.starId);
  }

  starClicked() {
    this.bigClick.emit(this.starId);
  }
}
