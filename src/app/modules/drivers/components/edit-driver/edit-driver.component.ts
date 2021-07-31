import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/core/services/api/api.service";
import { DriverService } from "src/app/modules/drivers/services/driver.service";

@Component({
  selector: "app-edit-driver",
  templateUrl: "./edit-driver.component.html",
  styleUrls: ["./edit-driver.component.css"],
})
export class EditDriverComponent implements OnInit {
  userFile: any;
  public imagePath: any;
  imageURL: any;
  driverForm: FormGroup;
  alert = false;
  message = "";

  currentDriver: any = {
    id: "",
    name: "",
    nrc: "",
    gender: "",
    license: "",
    address: "",
    imageName: "",
  };

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
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
      img: [""],
    });
  }

  ngOnInit(): void {
    this.getDriverById();
  }

  getDriverById() {
    this.apiService
      .getRequest("drivers/" + this.route.snapshot.params.id)
      .toPromise()
      .then(
        (data) => {
          let model = { ...data };
          this.driverForm.patchValue(model);
        },
        (error) => {
          console.log(error);
        }
      );
  }

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
    const driver = this.driverForm.value;
    formData.append("driver", JSON.stringify(driver1));
    formData.append("file", this.userFile);
    console.log(driver);
    this.apiService.createData("drivers",formData).subscribe(
      (data) => {
        console.log("successfully", data);
        this.driverForm.reset({});

        this.userFile = null;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public driverImage() {
    console.log("this is ", this.imageURL);
    if (
      this.imageURL === undefined ||
      this.imageURL === null ||
      this.imageURL === undefined ||
      this.imageURL.length < 5
    ) {
      return "assets/drivers/myPP.jpg";
    } else {
      return this.imageURL;
    }
  }
}
