import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/shared/models/user-login.model';
import { AuthenticationService } from 'src/app/shared/providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const userCredentials = this.loginForm.value as UserLoginModel;
    var user = this.auth.login(userCredentials).add(
      () => {
        console.log("user logged in");
        this.router.navigate(['/']);
      }
    );
    console.log(user);
  }

  ngOnDestroy() {
  }

}
