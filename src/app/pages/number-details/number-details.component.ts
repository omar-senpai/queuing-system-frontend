import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/providers/auth/auth.service';
import { EndpointsService } from 'src/app/shared/providers/endpoints.service';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './number-details.component.html',
  styleUrls: ['./number-details.component.scss']
})
export class NumberDetailsComponent implements OnInit {

  constructor(
    private _endpointsService:EndpointsService,
    private _authenticationService:AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }
numberDetails;
id;
userId;
myNumber;
section;
waitingTime;
currentNumber
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');    
    this.userId = this._authenticationService.getUserInfo().userId;

    this._endpointsService.getNumberDetails(this.id).subscribe(
      res => {
        // this.router.navigate(['/number-details',sectionId]);  
        console.log(res);
        this.numberDetails = res
        this.currentNumber = res[0].waitingNumber
        this.getUserNumberDetails();
              
      }
    );
    console.log(this.numberDetails);
  }

  getUserNumberDetails(){
    console.log('now',this.numberDetails);
    console.log(this.userId);
    
    
    let userDetails = this.numberDetails.filter(res => res.patientId == this.userId);
    this.myNumber = userDetails[0].waitingNumber;
    this.section = userDetails[0].section;
    // console.log('dd');
    // console.log(this.myNumber);
    // console.log(this.currentNumber);
    
    
    this.waitingTime = (this.myNumber - this.currentNumber)*5;
    
  }

}
