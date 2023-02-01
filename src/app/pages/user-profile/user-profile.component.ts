import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/providers/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  firstName;
  lastName;
  email;

  constructor(private _authenticationService:AuthenticationService) { }

  ngOnInit() {
    let user = this._authenticationService.getUserInfo();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;


    console.log(this._authenticationService.getUserInfo());
    
  }

}
