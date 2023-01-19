import { Component } from '@angular/core';
import {TokenStorageService} from "./services/storage/token-storage.service";
import { EventBusService } from './shared/event-bus/event-bus.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Restaurant';
}
