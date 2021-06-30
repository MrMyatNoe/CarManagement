import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "src/app/services/api/api.service";
import { Admin } from "src/app/models/admin.model";

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

  roleId = "";
  @ViewChild("mymodal", { static: false }) editModalDlg: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private apiService: ApiService
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
          this.rolesData = data;
          this.roleId = this.roleId || data[0].id;
        },
        (error) => {
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
        },
        (error) => {
          console.log(error);
        }
      );
  }

  newAdmin() {
    this.modalDialogLabel = "New";
    this.modalButtonLabel = "Save";
    this.adminForm.reset();
    this.getRoles();
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
    console.log("model ", model);
    if (model.id) {
      this.apiService
        .putRequest("admins", model)
        .toPromise()
        .then(
          (_data) => {
            this.getAdmins();
          },
          (error) => {
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
          },
          (error) => {
            console.log(error);
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
          console.log("error", error);
        }
      );
  }
}
