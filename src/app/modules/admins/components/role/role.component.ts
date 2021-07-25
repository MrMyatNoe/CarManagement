import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Role } from "src/app/modules/admins/models/role.model";
import { ApiService } from "src/app/core/services/api/api.service";
import { ToastrService } from "ngx-toastr";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.css"],
})
export class RoleComponent implements OnInit {
  roleForm: FormGroup;
  rolesData: any;
  roleCount = 0;

  @ViewChild("mymodal", { static: false }) editModalDlg: any;
  closeResult: string;

  modalDialogLabel: string = "";
  modalButtonLabel: string = "";
  private url: string = "roles";
  roleSource: LocalDataSource;

  settings = {
    columns: {
      name: {
        title: "name",
      },
      level: {
        title: "level",
      },
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private apiService: ApiService,
    private toastService: ToastrService
  ) {
    this.roleForm = this.formBuilder.group({
      id: null,
      name: ["", [Validators.required]],
      level: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.apiService
      .getRequest(this.url)
      .toPromise()
      .then(
        (data) => {
          this.rolesData = data;
          this.roleSource = new LocalDataSource(this.rolesData);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  get f() {
    return this.roleForm.controls;
  }

  newRole() {
    this.modalDialogLabel = "New";
    this.modalButtonLabel = "Save";
    this.roleForm.reset();
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
    var model = this.roleForm.value;
    if (model.id) {
      this.apiService
        .putRequest(this.url, model)
        .toPromise()
        .then(
          (_data) => {
            this.getRoles();
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.apiService
        .postRequest(this.url, model)
        .toPromise()
        .then(
          (_data) => {
            this.getRoles();
          },
          (error) => {
            console.log(error);
          }
        );
    }
    this.roleForm.reset();
    this.modalService.dismissAll();
  }

  editRole(role: Role) {
    this.modalDialogLabel = "Edit";
    this.modalButtonLabel = "Update";
    let model = { ...role };
    this.roleForm.patchValue(model);
    this.open(this.editModalDlg);
  }

  deleteRole(role: Role) {
    this.apiService
      .deleteRoleByIdRequest(this.url, role)
      .toPromise()
      .then(
        (_data) => {
          this.getRoles();
          this.toastService.success("delete successfully");
        },
        (error) => {
          this.toastService.error(error.error.message);
          console.log(error.error.message);
        }
      );
  }

  onSearch(query: string = "") {
    this.roleSource.setFilter(
      [
        // fields we want to include in the search

        {
          field: "name",
          search: query,
        },
        {
          field: "level",
          search: query,
        },
      ],
      false
    );
  }
}
