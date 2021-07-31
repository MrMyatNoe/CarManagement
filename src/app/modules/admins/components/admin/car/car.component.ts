import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api/api.service';
import * as divisionsData from 'src/assets/divisions.json'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  userFile: any;
  public message: string = "";
  public imagePath: any;
  // TODO change photo
  imageURL: string = "assets/drivers/myPP.jpg";
  carForm: FormGroup;
  divisionId = "";
  divisions : any;
  taxiNo: string = "W-1111";

  constructor(public fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router) { 
      this.carForm = this.fb.group({
        id: null,
        //divisionId: ["", [Validators.required]],
        brand: ["", [Validators.required]],
        carNo: ["", [Validators.required]],
        name: ["", [Validators.required]],
        modelYear: ["", [Validators.required]],
        startedDate: ["", [Validators.required]],
        color: ["", [Validators.required]],
        taxiNo: ["",],
        dailyAmount: ["", [Validators.required]],
        licenseDate: ["", [Validators.required]],
        photo: [""],
      });
    }

  ngOnInit() {
  }

  get f() {
    return this.carForm.controls;
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
      console.log('user file',this.userFile)
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
    var formData = new FormData();
    let car1 = {
      carNo: this.carForm.controls["carNo"].value,
      brand: this.carForm.controls["brand"].value,
      name: this.carForm.controls["name"].value,
      modelYear: this.carForm.controls["modelYear"].value,
      startedDate:  this.carForm.controls["startedDate"].value,
      color:this.carForm.controls["color"].value,
      taxiNo: this.carForm.controls["taxiNo"].value || this.taxiNo,
      dailyAmount: this.carForm.controls["dailyAmount"].value,
      licenseDate: this.carForm.controls["licenseDate"].value,
      photo:this.carForm.controls["photo"].value || this.imageURL,

    };

    formData.append("car", JSON.stringify(car1));
    formData.append("file", this.userFile);
    formData.forEach((value,key) => {
      console.warn(value,key)
    });
   
    this.apiService.createData("cars",formData).subscribe(
      (_data) => {
        this.toastService.success("Successfully");
       // this.router.navigate(["/src/app/components/driver-list"]);
        this.imageURL = "assets/drivers/myPP.jpg";
       // this.userFile.name = "";
      },
      (error) => {
        this.message = error.error.message;
        this.toastService.error(this.message);
      }
    );
  }

}
