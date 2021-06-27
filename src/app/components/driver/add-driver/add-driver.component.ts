import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  alert = false;
  errorMessage = false;

  // TODO how to reset image
  @ViewChild("myInput", { static: false })
  myInputVariable: ElementRef;

  constructor(public fb: FormBuilder, private driverService: DriverService) {
    this.driverForm = this.fb.group({
      id: null,
      name: ["", [Validators.required]],
      nrc: ["", [Validators.required]],
      license: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
      img: [""],
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
    // let driver1 = {
    //   name: this.driverForm.controls["name"].value,
    //   nrc: this.driverForm.controls["nrc"].value,
    //   license: this.driverForm.controls["license"].value,
    //   gender: this.driverForm.controls["gender"].value,
    //   address: this.driverForm.controls["address"].value,
    //   phone: this.driverForm.controls["phone"].value,
    // };

    const driver = this.driverForm.value;
    formData.append("driver", JSON.stringify(driver));
    formData.append("file", this.userFile);
    this.driverService.createData(formData).subscribe(
      (data) => {
        console.log("successfully");
        this.alert = true;
        this.driverForm.reset({});

        this.userFile = null;
        //TODO reset image
        console.log("before ", this.myInputVariable.nativeElement.value);
        this.myInputVariable.nativeElement.value = "";
        console.log("after ", this.myInputVariable.nativeElement.value);
      },
      (error) => {
        this.alert = false;
        this.errorMessage = true;
        console.log(error);
        this.message = error.error.message;
      }
    );
  }

  /*
   * close dialog
   */
  closeDialog() {
    this.alert = false;
    this.errorMessage = false;
  }
}
