import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DriverService } from "src/app/services/driver/driver.service";

@Component({
  selector: "app-add-driver",
  templateUrl: "./add-driver.component.html",
  styleUrls: ["./add-driver.component.css"],
})
export class AddDriverComponent implements OnInit {
  userFile: any;
  public message: string = "";
  public imagePath: any;
  imageURL: string = "assets/drivers/myPP.jpg";
  driverForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private driverService: DriverService,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.driverForm = this.fb.group({
      id: null,
      name: ["", [Validators.required]],
      nrc: ["", [Validators.required]],
      license: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
      imageName: [""],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.driverForm.controls;
  }

  /**
   *
   * @param event
   * @returns image file
   */
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are avaliable";
        return;
      }

      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (onLoadevent: any) => {
        this.imageURL = onLoadevent.target.result;
      };
    }
  }

  /**
   * add data
   */
  onSubmitForm() {
    const formData = new FormData();
    let driver1 = {
      name: this.driverForm.controls["name"].value,
      nrc: this.driverForm.controls["nrc"].value,
      license: this.driverForm.controls["license"].value,
      gender: this.driverForm.controls["gender"].value,
      address: this.driverForm.controls["address"].value,
      phone: this.driverForm.controls["phone"].value,
      password: this.driverForm.controls["password"].value,
      imageName: this.userFile.name,
    };

    // console.log(driver1);
    formData.append("driver", JSON.stringify(driver1));
    formData.append("file", this.userFile);
    this.driverService.createData(formData).subscribe(
      (_data) => {
        this.toastService.success("Successfully");
        this.router.navigate(["/src/app/components/driver/driver-list"]);
      },
      (error) => {
        this.message = error.error.message;
        this.toastService.error(this.message);
      }
    );
  }
}
