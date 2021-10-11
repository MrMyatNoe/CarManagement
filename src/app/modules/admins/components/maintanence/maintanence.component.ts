import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/core/services/api/api.service";
import { Maintenance } from "../../models/maintenance.model";

@Component({
  selector: "app-maintanence",
  templateUrl: "./maintanence.component.html",
  styleUrls: ["./maintanence.component.css"],
})
export class MaintanenceComponent implements OnInit {
  carsData: any;
  carId: "";
  maintenanceData: any;
  maintenanceForm: FormGroup;
  total: number = 0;

  modalDialogLabel: string = "";
  modalButtonLabel: string = "";
  closeResult: string;

  @ViewChild("mymodal", { static: false }) editModalDlg: any;

  carsDataById: any;
  days: number = 0;

  private url: string = "maintenances";

  dataSource: MatTableDataSource<any>;
  displayedColumns = ["car", "start", "end", "days", "total", "actions"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.maintenanceForm = this.formBuilder.group({
      id: null,
      carId: ["", [Validators.required]],
      shop: [""],
      startedDate: [""],
      endDate: [""],
      total: [""],
    });
  }

  ngOnInit() {
    this.getMaintenances();
    this.getCars();
  }

  getMaintenances() {
    this.apiService
      .getRequest(this.url)
      .toPromise()
      .then(
        (data) => {
          this.maintenanceData = data;
          this.dataSource = new MatTableDataSource(this.maintenanceData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  get f() {
    return this.maintenanceForm.controls;
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

  newMaintenance() {
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
    let maintain1 = {
      id: null,
      carId: this.maintenanceForm.controls["carId"].value,
      startedDate: this.maintenanceForm.controls["startedDate"].value,
      endDate: this.maintenanceForm.controls["endDate"].value,
      total: this.maintenanceForm.controls["total"].value,
      days: this.days,
      shop: this.maintenanceForm.controls["shop"].value,
    };
    if (maintain1.id) {
      this.apiService
        .putRequest("maintenances", maintain1)
        .toPromise()
        .then(
          (_data) => {
            this.getMaintenances();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    } else {
      this.apiService
        .postRequest("maintenances", maintain1)
        .toPromise()
        .then(
          (_data) => {
            this.getMaintenances();
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    }
    this.maintenanceForm.reset();
    this.modalService.dismissAll();
  }

  getDateDifference() {
    var startDate = moment(this.f.startedDate.value);
    var endDate = moment(this.f.endDate.value);
    this.days = endDate.diff(startDate, "days");
    this.days += 1;
  }

  editMaintenance(maintenance: Maintenance) {
    this.modalDialogLabel = "Edit";
    this.modalButtonLabel = "Update";
    let model = { ...maintenance };
    console.log(model);
    this.maintenanceForm.patchValue(model);
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
