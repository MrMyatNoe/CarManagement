import { HttpParams } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { LocalDataSource } from "ng2-smart-table";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/core/services/api/api.service";

@Component({
  selector: "app-daily-transaction",
  templateUrl: "./daily-transaction.component.html",
  styleUrls: ["./daily-transaction.component.css"],
})
export class DailyTransactionComponent implements OnInit {
  carsData: any;
  carId: "";
  driversData: any;
  driverId: "";
  dailyTransactionsData: any;
  dailyForm: FormGroup;
  totalAmount: number = 0;

  modalDialogLabel: string = "";
  modalButtonLabel: string = "";
  closeResult: string;

  @ViewChild("mymodal", { static: false }) editModalDlg: any;

  dailyAmount: any;
  carsDataById: any;
  days: number = 0;

  // pagination
  page: any = 1;
  size: any = 5;
  pageSizes = [5, 10, 15];

  // ng2table
  // public settings = {
  //   actions: {
  //     add: false,
  //     edit: false,
  //     delete: false,
  //     position: 'right',
  //     custom: [
  //       {
  //         name: 'view',
  //         title: 'View ',
  //       },
  //     ]
  //   },
  //   columns: {
  //     carNo: {
  //       title: 'Car No',
  //       filter: false,
  //     },
  //     driverName: {
  //       title: 'Driver Name',
  //       filter: false,
  //     },
  //     paid: {
  //       title: 'Paid',
  //       filter: false,
  //     },
  //     total: {
  //       title: 'Total',
  //       filter: false,
  //     }
  //   },
  // };

  dailySource: LocalDataSource;
  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.dailyForm = this.formBuilder.group({
      id: null,
      driverId: ["", [Validators.required]],
      carId: ["", [Validators.required]],
      startedDate: [""],
      endDate: [""],
      paid: [""],
      remark: [""],
    });
  }

  get f() {
    return this.dailyForm.controls;
  }

  ngOnInit() {
    this.getDailyTransactionsByPageAndSize();
    this.getCars();
    this.getDrivers();
  }

  getCars() {
    this.apiService
      .getRequest("cars")
      .toPromise()
      .then(
        (data) => {
          this.carsData = data;
          this.carId = this.carId || data[0].id;
          this.apiService
            .getRequest("cars/" + this.carId)
            .toPromise()
            .then(
              (data) => {
                this.carsDataById = data;
                this.dailyAmount = this.carsDataById.dailyAmount;
              },
              (error) => {
                this.toastService.error(error.error.message);
              }
            );
        },
        (error) => {
          this.toastService.error(error.error.message);
        }
      );
  }

  getDrivers() {
    this.apiService
      .getRequest("drivers")
      .toPromise()
      .then(
        (data) => {
          this.driversData = data;
          this.driverId = this.driverId || data[0].id;
        },
        (error) => {
          this.toastService.error(error.error.message);
        }
      );
  }

  // getDailyTransactions() {
  //   this.apiService.getRequest('dailyTransactions').subscribe((response:any) => {
  //     console.log(response)
  //     this.dailySource = new LocalDataSource(response);
  //   });
  // }

  getDailyTransactionsByPageAndSize() {
    let params = new HttpParams();
    if (this.page !== 0) {
      this.page -= 1;
    }
    params = params.append("page", this.page);
    params = params.append("size", this.size);
    this.apiService
      .getRequestWithParams("dailyTransactions", params)
      .toPromise()
      .then(
        (data) => {
          this.dailyTransactionsData = data;
        },
        (error) => {
          this.toastService.error(error.error.message);
        }
      );
  }

  total() {
    this.totalAmount = this.days * this.dailyAmount;
  }

  newDaily() {
    this.modalDialogLabel = "New";
    this.modalButtonLabel = "Save";
    //this.dailyForm.reset();
    this.open(this.editModalDlg);
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any) {
    if (reason == ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason == ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a back drop";
    } else {
      return `with: ${reason}`;
    }
  }

  driver_change(id) {
    this.driverId = id;
  }

  car_change(id) {
    this.carId = id;
    this.apiService
      .getRequest("cars/" + id)
      .toPromise()
      .then(
        (data) => {
          this.carsDataById = data;
          this.dailyAmount = this.carsDataById.dailyAmount;
        },
        (error) => {
          this.toastService.error(error.error.message);
        }
      );
  }

  onSubmit() {
    let daily1 = {
      id: null,
      driverId: this.dailyForm.controls["driverId"].value,
      carId: this.dailyForm.controls["carId"].value,
      startedDate: this.dailyForm.controls["startedDate"].value,
      endDate: this.dailyForm.controls["endDate"].value,
      paid: this.dailyForm.controls["paid"].value,
      total: this.totalAmount,
      day: this.days,
      remark: this.dailyForm.controls["remark"].value,
    };
    if (daily1.id) {
      this.apiService
        .putRequest("daily", daily1)
        .toPromise()
        .then(
          (_data) => {
            this.page = 1;
            this.getDailyTransactionsByPageAndSize();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    } else {
      this.apiService
        .postRequest("dailyTransactions", daily1)
        .toPromise()
        .then(
          (_data) => {
            this.getDailyTransactionsByPageAndSize();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    }
    this.dailyForm.reset();
    this.modalService.dismissAll();
  }

  getDateDifference() {
    var startDate = moment(this.f.startedDate.value);
    var endDate = moment(this.f.endDate.value);
    this.days = endDate.diff(startDate, "days");
    this.days += 1;
    this.total();
  }

  handlePageSizeChange(event: any) {
    this.size = event.target.value;
    this.page = 1;
    this.getDailyTransactionsByPageAndSize();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getDailyTransactionsByPageAndSize();
  }
}
