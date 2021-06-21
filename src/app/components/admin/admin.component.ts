import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { AdminService } from "src/app/services/admin/admin.service";
import { RoleService } from "src/app/services/role/role.service";
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
  rolesData: Observable<any> | undefined;
  adminsData: Observable<any> | undefined;
  @ViewChild("mymodal", { static: false }) editModalDlg: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private roleService: RoleService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getRoles();
    this.getAdmins();
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

  get f() {
    return this.adminForm.controls;
  }

  getRoles() {
    this.rolesData = this.roleService.loadAllRoles();
  }

  getAdmins() {
    this.adminsData = this.adminService.loadAllAdmins("admins");
    // this.adminService
    //   .getRequest("admins")
    //   .toPromise()
    //   .then(
    //     (data) => {
    //       console.log(data);
    //       this.adminsData = data;
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }

  newAdmin() {
    this.modalDialogLabel = "New";
    this.modalButtonLabel = "Save";
    this.adminForm.reset();
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
    console.log("New model ", model);
    // if(model.id){
    //   this.roleService.updateRole(model);
    // } else{
    this.adminService
      .postRequest("admins", model)
      .toPromise()
      .then(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    //}
    this.adminForm.reset();
    this.modalService.dismissAll();
  }
}
