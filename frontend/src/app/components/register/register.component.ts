import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {TokenStorageService} from "../../services/storage/token-storage.service";
import {first} from "rxjs";
import {RegisterInfo} from "../../models/RegisterInfo";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  registerInfo: RegisterInfo;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private storageService: TokenStorageService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.registerInfo = new RegisterInfo();
    this.registerInfo.email = this.f['email'].value;
    this.registerInfo.firstName = this.f['name'].value;
    this.registerInfo.lastName = this.f['surname'].value;
    this.registerInfo.username = this.f['username'].value;
    this.registerInfo.password = this.f['password'].value;

    this.loading = true;
    this.authenticationService.register(this.registerInfo)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.router.navigate(['/login']);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }
}
