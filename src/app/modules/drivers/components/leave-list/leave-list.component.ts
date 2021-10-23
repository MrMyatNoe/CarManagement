import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/core/services/api/api.service";
import { routes } from "src/app/core/services/routes";

@Component({
  selector: "app-leave-list",
  templateUrl: "./leave-list.component.html",
  styleUrls: ["./leave-list.component.css"],
})
export class LeaveListComponent implements OnInit {
  private CARS_ROUTE = routes.CARS;
  private DRIVERS_ROUTE = routes.DRIVERS;
  private LEAVES_ROUTE = routes.LEAVES;

  dataSource: MatTableDataSource<any>;
  displayedColumns = [
    "driver",
    "car",
    "start",
    "end",
    "days",
    "reason",
    "actions",
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  leaveForm: FormGroup;
  carsData: any;
  carId: "";
  driversData: any;
  driverId: "";
  leavesData: any;
  carsDataById: any;
  days: number = 0;

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
    this.getLeaves();
    this.getCars();
    this.getDrivers();
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

  getLeaves() {
    this.apiService
      .getRequest(this.LEAVES_ROUTE)
      .toPromise()
      .then(
        (data) => {
          this.leavesData = data;
          this.dataSource = new MatTableDataSource(this.leavesData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.log(error);
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
      .getRequest(this.CARS_ROUTE + id)
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
    let leave1 = {
      id: null,
      driverId: this.leaveForm.controls["driverId"].value,
      carId: this.leaveForm.controls["carId"].value,
      startedDate: this.leaveForm.controls["startedDate"].value,
      endDate: this.leaveForm.controls["endDate"].value,
      days: this.days,
      reason: this.leaveForm.controls["reason"].value,
    };
    if (leave1.id) {
      this.apiService
        .putRequest(this.LEAVES_ROUTE, leave1)
        .toPromise()
        .then(
          (_data) => {
            this.getLeaves();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    } else {
      this.apiService
        .postRequest(this.LEAVES_ROUTE, leave1)
        .toPromise()
        .then(
          (_data) => {
            this.getLeaves();
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

  newLeave() {
    this.modalDialogLabel = "New";
    this.modalButtonLabel = "Save";
    this.leaveForm.reset();
    this.open(this.editModalDlg);
  }

  onEditClicked(row) {
    console.log("Edit clicked ", row.id);
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
