import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/storage/token-storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
