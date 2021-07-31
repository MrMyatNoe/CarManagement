import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Car } from '../../../models/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  carsData: any;
  private url: string = "cars";
  constructor( private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.apiService
      .getRequest(this.url)
      .toPromise()
      .then(
        (data) => {
          this.carsData = data;
          console.log(data);
          if (this.carsData.length === 0) {
            this.toastService.success("no data");
          } else {
            this.toastService.success("Driver list is here");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteCar(car: Car) {
    this.apiService
      .deleteDriverByIdRequest(this.url, car)
      .toPromise()
      .then(
        (data) => {
          console.log(data.message);
          this.getCars();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
