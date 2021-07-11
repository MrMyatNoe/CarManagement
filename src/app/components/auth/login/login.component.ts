import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api/api.service";
import { LocalStorageService } from "src/app/services/localStorage/local-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  imageURL: string = "assets/drivers/myPP.jpg";
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      driverCheck: [""],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    let params = new HttpParams();

    params = params.append("password", this.f.password.value);

    if (this.f.driverCheck.value) {
      params = params.append("phone", this.f.email.value);
      console.log("in if ");
      this.apiService
        .postRequest("drivers/login", params)
        .toPromise()
        .then(
          (data) => {
            console.log(data);
            this.toastService.success("Login successfully");
            this.localStorageService.saveDriverData(data);
            this.router.navigateByUrl("drivers/drivers");
          },
          (error) => {
            this.toastService.error(error.error.message);
            console.log(error);
          }
        );
    } else {
      console.log("in else ");
      params = params.append("email", this.f.email.value);
      this.apiService
        .postRequest("admins/login", params)
        .toPromise()
        .then(
          (data) => {
            console.log(data);
            this.toastService.success("Login successfully");
            this.localStorageService.saveAdminData(data);
            this.router.navigateByUrl("admins/admin");
          },
          (error) => {
            this.toastService.error(error.error.message);
            console.log(error);
          }
        );
    }
  }
}
