import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "src/app/core/services/api/api.service";
import { Admin } from "src/app/modules/admins/models/admin.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;

  modalDialogLabel: string = "";
  modalButtonLabel: string = "";
  closeResult: string;
  rolesData: any;
  adminsData: any;
  id: boolean;

  roleId = "";
  @ViewChild("mymodal", { static: false }) editModalDlg: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiService: ApiService,
    private toastService: ToastrService
  ) {
    this.adminForm = this.fb.group({
      id: null,
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      address: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.getAdmins();
  }

  get f() {
    return this.adminForm.controls;
  }

  getRoles() {
    this.apiService
      .getRequest("roles")
      .toPromise()
      .then(
        (data) => {
          console.log("roles : ", data);
          this.rolesData = data;
          this.roleId = this.roleId || data[0].id;
        },
        (error) => {
          this.toastService.error(error.error.message);
          console.log(error);
        }
      );
  }

  getAdmins() {
    this.apiService
      .getRequest("admins")
      .toPromise()
      .then(
        (data) => {
          this.adminsData = data;
          console.log("Admins data ", this.adminsData);
        },
        (error) => {
          this.toastService.error(error.error.message);
          console.log(error);
        }
      );
  }

  newAdmin() {
    this.modalDialogLabel = "New";
    this.modalButtonLabel = "Save";
    this.adminForm.reset();
    this.getRoles();
    this.id = false;
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

  onSubmit() {
    var model = this.adminForm.value;
    if (model.id) {
      this.apiService
        .putRequest("admins", model)
        .toPromise()
        .then(
          (_data) => {
            this.getAdmins();
          },
          (error) => {
            this.toastService.error(error.error.message);
            console.log(error);
          }
        );
    } else {
      this.apiService
        .postRequest("admins", model)
        .toPromise()
        .then(
          (_data) => {
            this.getAdmins();
            this.toastService.success("Data Saved successfully");
          },
          (error) => {
            this.toastService.error(error.error.message);
          }
        );
    }
    this.adminForm.reset();
    this.modalService.dismissAll();
  }

  editAdmin(admin: Admin) {
    this.modalDialogLabel = "Edit";
    this.modalButtonLabel = "Update";
    this.roleId = Object.values(admin.role)[0];
    this.getRoles();
    let model = { ...admin };
    this.id = true;
    this.adminForm.patchValue(model);
    this.open(this.editModalDlg);
  }

  role_change(id) {
    this.roleId = id;
  }

  deleteAdmin(admin: Admin) {
    this.apiService
      .deleteAdminByIdRequest("admins", admin)
      .toPromise()
      .then(
        (data) => {
          console.log(data.message);
          this.getAdmins();
        },
        (error) => {
          this.toastService.error(error.error.message);
          console.log("error", error);
        }
      );
  }
}
