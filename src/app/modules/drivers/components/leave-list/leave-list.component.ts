import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/core/services/api/api.service";

@Component({
  selector: "app-leave-list",
  templateUrl: "./leave-list.component.html",
  styleUrls: ["./leave-list.component.css"],
})
export class LeaveListComponent implements OnInit {
  leaveForm: FormGroup;
  carsData: any;
  carId: "";
  driversData: any;
  driverId: "";
  leavesData: any;
  carsDataById: any;
  days: number = 0;

  // pagination
  page: any = 1;
  size: any = 5;
  pageSizes = [5, 10, 15];

  modalDialogLabel: string = "";
  modalButtonLabel: string = "";
  closeResult: string;
  @ViewChild("mymodal", { static: false }) editModalDlg: any;

  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.leaveForm = this.formBuilder.group({
      id: null,
      driverId: ["", [Validators.required]],
      carId: ["", [Validators.required]],
      startedDate: [""],
      endDate: [""],
      reason: [""],
    });
  }

  get f() {
    return this.leaveForm.controls;
  }

  ngOnInit() {
    this.getLeavesByPageAndSize();
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

  getLeavesByPageAndSize() {
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
          this.leavesData = data;
        },
        (error) => {
          this.toastService.error(error.error.message);
        }
      );
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
        },
        (error) => {
          this.toastService.error(error.error.message);
        }
      );
  }

  onSubmit() {
    let daily1 = {
      id: null,
      driverId: this.leaveForm.controls["driverId"].value,
      carId: this.leaveForm.controls["carId"].value,
      startedDate: this.leaveForm.controls["startedDate"].value,
      endDate: this.leaveForm.controls["endDate"].value,
      day: this.days,
      reason: this.leaveForm.controls["reason"].value,
    };
    if (daily1.id) {
      this.apiService
        .putRequest("leaves", daily1)
        .toPromise()
        .then(
          (_data) => {
            this.page = 1;
            this.getLeavesByPageAndSize();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    } else {
      this.apiService
        .postRequest("leaves", daily1)
        .toPromise()
        .then(
          (_data) => {
            this.getLeavesByPageAndSize();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    }
    this.leaveForm.reset();
    this.modalService.dismissAll();
  }

  getDateDifference() {
    var startDate = moment(this.f.startedDate.value);
    var endDate = moment(this.f.endDate.value);
    this.days = endDate.diff(startDate, "days");
    this.days += 1;
  }

  handlePageSizeChange(event: any) {
    this.size = event.target.value;
    this.page = 1;
    this.getLeavesByPageAndSize();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getLeavesByPageAndSize();
  }
}
