import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Driver } from "src/app/models/driver.model";
import { ApiService } from "src/app/services/api/api.service";
import { DriverService } from "src/app/services/driver/driver.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"],
})
export class ForgetPasswordComponent implements OnInit {
  updatePasswordFrom: FormGroup;
  imageURL: string = "assets/drivers/myPP.jpg";
  public driver: Driver = {};

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router,
    private driverService: DriverService
  ) {
    this.updatePasswordFrom = this.fb.group({
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  get f() {
    return this.updatePasswordFrom.controls;
  }

  ngOnInit() {
    this.driver = this.driverService.getLoginDriver();
  }

  onSubmit() {
    let params = new HttpParams();
    params = params.append("phone", this.f.phone.value);
    params = params.append("password", this.f.password.value);
    this.apiService
      .postRequest("drivers/resetpassword", params)
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
