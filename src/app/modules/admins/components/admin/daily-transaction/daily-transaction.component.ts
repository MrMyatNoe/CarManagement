import { ThrowStmt } from "@angular/compiler";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
  // @Input('amount') amount:number
  // @Input('fee') fee:number
  // @Input('totalAmount') totalAmount:number;
  amount: number = 0;
  fee: number = 0;
  totalAmount: number = 0;

  modalDialogLabel: string = "";
  modalButtonLabel: string = "";
  closeResult: string;

  @ViewChild("mymodal", { static: false }) editModalDlg: any;

  dailyAmount: any;
  carsDataById: any;

  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.dailyForm = this.formBuilder.group({
      id: null,
      //amount: [0, [Validators.required]],
      //fee: [0, [Validators.required]],
      //total: [0, [Validators.required]],
      driverId: ["", [Validators.required]],
      carId: ["", [Validators.required]],
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

  trackByDaily(index, item) {
    console.log(" Daily : ", index, ": ", item);
    return index;
  }

  trackByCar(index, item) {
    console.log(" Car : ", index, ": ", item);
    return index;
  }

  trackByDriver(index, item) {
    console.log(" Driver : ", index, ": ", item);
    return index;
  }

  sum() {
    this.totalAmount = this.f.amount.value - this.f.fee.value;
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
        console.log("car by id", data);
        this.carsData = data;
    },
      (error)=>{
        this.toastService.error(error.error.message);
        console.log(error);
      })
  }

  onSubmit() {
    var model = this.dailyForm.value;
    console.log("model ", model);
    if (model.id) {
      this.apiService
        .putRequest("daily", model)
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
        .postRequest("daily", model)
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

}
