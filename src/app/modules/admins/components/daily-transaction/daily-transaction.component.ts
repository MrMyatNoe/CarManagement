import { HttpParams } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/core/services/api/api.service";
import { routes } from "src/app/core/services/routes";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-daily-transaction",
  templateUrl: "./daily-transaction.component.html",
  styleUrls: ["./daily-transaction.component.css"],
})
export class DailyTransactionComponent implements OnInit {
  private DAILYS_ROUTE = routes.DAILYS;
  private CARS_ROUTE = routes.CARS;
  private DRIVERS_ROUTE = routes.DRIVERS;
  dailysData: any;

  dataSource: MatTableDataSource<any>;
  displayedColumns = [
    "driver",
    "car",
    "start",
    "end",
    "daily",
    "days",
    "total",
    "paid",
    "remain",
    "remark",
    "actions",
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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

  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
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
    this.getDailys();
    this.getCars();
    this.getDrivers();
  }

  ngOnInit(): void {}

  get f() {
    return this.dailyForm.controls;
  }

  getDailys() {
    this.apiService
      .getRequest(this.DAILYS_ROUTE)
      .toPromise()
      .then(
        (data) => {
          this.dailysData = data;
          this.dataSource = new MatTableDataSource(this.dailysData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCars() {
    this.apiService
      .getRequest(this.CARS_ROUTE)
      .toPromise()
      .then(
        (data) => {
          this.carsData = data;
          this.carId = this.carId || data[0].id;
          this.apiService
            .getRequest(this.CARS_ROUTE + this.carId)
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
      .getRequest(this.DRIVERS_ROUTE)
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

  newDaily() {
    this.modalDialogLabel = "New";
    this.modalButtonLabel = "Save";
    this.dailyForm.reset();
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
      .getRequest(this.CARS_ROUTE + id)
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
        .putRequest(this.DAILYS_ROUTE, daily1)
        .toPromise()
        .then(
          (_data) => {
            this.getDailys();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    } else {
      this.apiService
        .postRequest(this.DAILYS_ROUTE, daily1)
        .toPromise()
        .then(
          (_data) => {
            this.getDailys();
            this.dailyForm.reset();
            this.modalService.dismissAll();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    }
  }

  total() {
    this.totalAmount = this.days * this.dailyAmount;
  }

  getDateDifference() {
    var startDate = moment(this.f.startedDate.value);
    var endDate = moment(this.f.endDate.value);
    this.days = endDate.diff(startDate, "days");
    this.days += 1;
    this.total();
  }

  onEditClicked(row) {
    console.log("Edit clicked ", row.id);
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
