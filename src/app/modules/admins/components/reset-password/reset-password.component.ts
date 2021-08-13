import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/core/services/api/api.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  updatePasswordFrom: FormGroup;
  imageURL: string = "assets/drivers/myPP.jpg";

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.updatePasswordFrom = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  get f() {
    return this.updatePasswordFrom.controls;
  }

  ngOnInit() {
    // /this.driver = this.driverService.getLoginDriver();
  }

  onSubmit() {
    let params = new HttpParams();
    params = params.append("email", this.f.email.value);
    params = params.append("password", this.f.password.value);
    this.apiService
      .postRequest("admins/resetpassword", params)
      .toPromise()
      .then(
        (data) => {
          console.log(data);
          this.toastService.success("Password Reset Successfully");
          this.router.navigateByUrl("/login");
        },
        (error) => {
          console.log(error);
          this.toastService.error(error.error.message);
        }
      );
  }
}
