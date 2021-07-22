import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api/api.service";

@Component({
  selector: "app-daily-transaction",
  templateUrl: "./daily-transaction.component.html",
  styleUrls: ["./daily-transaction.component.css"],
})
export class DailyTransactionComponent implements OnInit {
  carsData: any;
  carId: any;
  driversData: any;
  driverId: any;
  dailyTransactionsData: any;

  constructor(
    private apiService: ApiService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getDailyTransactions();
    this.getCars();
    this.getDrivers();
  }

  getCars() {
    this.apiService
      .getRequest("cars")
      .toPromise()
      .then(
        (data) => {
          console.log("cars ", data);
          this.carsData = data;
          this.carId = this.carId || data[0].id;
        },
        (error) => {
          this.toastService.error(error.error.message);
          console.log(error);
        }
      );
  }

  getDrivers() {
    this.apiService
      .getRequest("drivers")
      .toPromise()
      .then(
        (data) => {
          console.log("drivers", data);
          this.driversData = data;
          this.driverId = this.driverId || data[0].id;
        },
        (error) => {
          this.toastService.error(error.error.message);
          console.log(error);
        }
      );
  }

  getDailyTransactions() {
    this.apiService
      .getRequest("dailyTransactions")
      .toPromise()
      .then(
        (data) => {
          console.log("daily", data);
          this.dailyTransactionsData = data;
        },
        (error) => {
          this.toastService.error(error.error.message);
          console.log(error);
        }
      );
  }
}
