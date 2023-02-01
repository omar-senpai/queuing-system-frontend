import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Chart from "chart.js";
import { AuthenticationService } from "src/app/shared/providers/auth/auth.service";
import { EndpointsService } from "src/app/shared/providers/endpoints.service";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  firstName;
  userId;
  isAdmin;
  userDetails;
  specialty = 0;

  category: any = [
    "general",
    "dental",
    "eye",
    "ent",
    "gynecology",
    "ortho",
    "pediatric",
    "physiotherapy",
    "radiology",
    "surgery",
    "urology",
    "other",
  ];
  constructor(
    private router: Router,
    private _endpointsService: EndpointsService,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    let user = this._authenticationService.getUserInfo();
    console.log(user);

    if (user.roles == "patient") {
      this.isAdmin = false;
    }else{
      this.isAdmin = true;
    }
    this.firstName = user.firstName;
    this.userId = user.userId;

    this.specialty = user.specialty;

    this._endpointsService.getNumberDetails(this.specialty).subscribe((res) => {
      // this.router.navigate(['/number-details',sectionId]);
      console.log(res);
      this.userDetails = res;
    });


  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  generateNumber(sectionId: number) {
    let body = {
      patientId: this.userId,
      name: this.firstName,
      section: sectionId,
    };

    this._endpointsService.addUserToQueue(body).subscribe((res) => {
      this.router.navigate(["/number-details", sectionId]);
    });
  }

  deactivate(id) {
    this._endpointsService.deactivateNumber(id).subscribe((res) => {
      this.ngOnInit();
    });
  }
}
