import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { RoleService } from "src/app/services/role/role.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { Role } from "src/app/models/role.model";
import { AdminService } from "src/app/services/admin/admin.service";

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

  rolesSubscriber$;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private roleService: RoleService,
    private adminService: AdminService
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
    this.adminService.getRequest("roles").toPromise().then((data) =>{      
      this.rolesData = data
    },(error)=>{
      console.log(error)
    })
  }

  get f() {
    return this.roleForm.controls;
  }

  newRole() {
    this.modalDialogLabel = 'New';
    this.modalButtonLabel = 'Save';
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

  onSubmit(){
    var model =  this.roleForm.value;
    if(model.id){
      this.roleService.updateRole(model);
    } else{
    this.adminService
    .postRequest("roles", model)
    .toPromise()
    .then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    }
    this.roleForm.reset();
    this.modalService.dismissAll();
    this.getRoles();
  }

  editRole(role:Role) {
    this.modalDialogLabel = 'Edit';
    this.modalButtonLabel = 'Update';
    let model = {... role};
    this.roleForm.patchValue(model);
    this.open(this.editModalDlg);
  }
  
  deleteRole(role:Role){
    this.roleService.delete(role).subscribe(
      data=>{
        console.log(data.message);
        this.getRoles();
      }
    );
  }
}
