import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Driver } from "src/app/modules/drivers/models/driver.model";
import { ApiService } from "src/app/core/services/api/api.service";

@Component({
  selector: "app-driver-list",
  templateUrl: "./driver-list.component.html",
  styleUrls: ["./driver-list.component.css"],
})
export class DriverListComponent implements OnInit {
  driversData: any;
  private url: string = "drivers";
  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.apiService
      .getRequest(this.url)
      .toPromise()
      .then(
        (data) => {
          this.driversData = data;
          console.log(data);
          if (this.driversData.length === 0) {
            this.toastService.success("no data");
          } else {
            this.toastService.success("Driver list is here");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteDriver(driver: Driver) {
    this.apiService
      .deleteDriverByIdRequest(this.url, driver)
      .toPromise()
      .then(
        (data) => {
          console.log(data.message);
          this.getDrivers();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
