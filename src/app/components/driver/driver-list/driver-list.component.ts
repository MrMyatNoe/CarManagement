import { Component, OnInit } from "@angular/core";
import { Driver } from "src/app/models/driver.model";
import { ApiService } from "src/app/services/api/api.service";

@Component({
  selector: "app-driver-list",
  templateUrl: "./driver-list.component.html",
  styleUrls: ["./driver-list.component.css"],
})
export class DriverListComponent implements OnInit {
  driversData: any;
  private url: string = "drivers";
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.apiService
      .getRequest(this.url)
      .toPromise()
      .then(
        (data) => {
          console.log(data);
          this.driversData = data;
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
