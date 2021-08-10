import { formatDate } from "@angular/common";
import { ThrowStmt } from "@angular/compiler";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
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
      paid:[""],
    });
  }

  get f() {
    return this.dailyForm.controls;
  }

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
          this.apiService.getRequest("cars/"+ this.carId).toPromise().then(
            (data)=>{
              console.log("car by id", data)
              this.carsDataById = data
              this.dailyAmount = this.carsDataById.dailyAmount
          },
            (error)=>{
              this.toastService.error(error.error.message);
              console.log(error);
            })
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
          console.log('this is ',error);
        }
      );
  }

  // trackByDaily(index, item) {
  //   console.log(" Daily : ", index, ": ", item);
  //   return index;
  // }

  // trackByCar(index, item) {
  //   console.log(" Car : ", index, ": ", item);
  //   return index;
  // }

  // trackByDriver(index, item) {
  //   console.log(" Driver : ", index, ": ", item);
  //   return index;
  // }

  total() {
    console.log('total', this.days)
    this.totalAmount = this.days * this.dailyAmount
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
    console.log("dismissed reason " + reason);
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
    this.apiService.getRequest("cars/"+ id).toPromise().then(
      (data)=>{
        console.log("car by id", data)
        this.carsDataById = data
        this.dailyAmount = this.carsDataById.dailyAmount
    },
      (error)=>{
        this.toastService.error(error.error.message);
        console.log(error);
      })
  }

  onSubmit() {
    let daily1 = { 
      id: null,
    driverId: this.dailyForm.controls["driverId"].value,
    carId: this.dailyForm.controls["carId"].value,
    startedDate: this.dailyForm.controls["startedDate"].value,
    endDate: this.dailyForm.controls["endDate"].value,
    paid:this.dailyForm.controls["paid"].value,
    total:this.totalAmount,
    day:this.days,
    }
    console.log(daily1)
    if (daily1.id) {
      this.apiService
        .putRequest("daily", daily1)
        .toPromise()
        .then(
          (_data) => {
            this.getDailyTransactions();
          },
          (error) => {
            this.toastService.error(error.error.message);
            console.log(error);
          }
        );
    } else {
      this.apiService
        .postRequest("dailyTransactions", daily1)
        .toPromise()
        .then(
          (_data) => {
            this.getDailyTransactions();
          },
          (error) => {
            this.toastService.error(error.error.message);
            console.log(error);
          }
        );
    }
    this.dailyForm.reset();
    this.modalService.dismissAll();
  }

  getDateDifference(){
    console.log(this.f.startedDate.value, " : ", this.f.endDate.value)
    var startDate = moment(this.f.startedDate.value)
    var endDate = moment(this.f.endDate.value);
    this.days = endDate.diff(startDate, 'days')
    this.days +=1;
    console.log(endDate.diff(startDate, 'days'))
    this.total();
  }
}
