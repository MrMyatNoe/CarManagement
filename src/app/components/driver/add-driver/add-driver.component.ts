import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  userFile: any;
  public message: string ='';
  public imagePath: any;
  imageURL: any;
  driverForm: FormGroup ;
  alert = false;
  errorMessage = false;

  constructor(public fb:FormBuilder,
    private driverService: DriverService) {
    this.driverForm = this.fb.group(
      {
        id: null,
        name: ['',[Validators.required]],
        nrc: ['',[Validators.required]],
        license: ['',[Validators.required]],
        gender: ['',[Validators.required]],
        address: ['',[Validators.required]],
        phone: ['',[Validators.required]]
      }
    )
   }

  ngOnInit(): void { }

  get f(){
    return this.driverForm.controls;
  }

  /**
   * 
   * @param event 
   * @returns image file
   */
  onSelectFile(event:any){
    if(event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if(mimeType.match(/image\/*/) == null)
      {
        this.message = 'Only images are avaliable';
        return;
      }

      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) =>{
        this.imageURL = reader.result;
      }
    }
  }

  /**
   * add data
   */
  onSubmitForm(){
    const formData = new FormData(); 
    const driver = this.driverForm.value;
    formData.append('driver',JSON.stringify(driver))
    formData.append('file',this.userFile)
    this.driverService.createData(formData).subscribe(
      data=>{
        console.log('successfully')
        this.alert = true;
        this.driverForm.reset({})
      },
      error=>{
        this.alert = false;
        this.errorMessage = true;
        console.log(error)
        this.message = error.error.message;
      }
    )
  }

  /*
  * close dialog
  */
  closeDialog(){
    this.alert = false
    this.errorMessage = false
  }
  
}
