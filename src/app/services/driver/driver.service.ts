import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Driver } from "src/app/models/driver.model";
import { environment } from "src/environments/environment";

const state = {
  driver: JSON.parse(localStorage["driver"] || "{}"),
};

@Injectable({
  providedIn: "root",
})
export class DriverService {
  private url = environment.BASE_URL + "drivers";

  public driver: Driver = {};

  constructor(private httpClient: HttpClient) {
    this.driver = state.driver as Driver;
  }

  createData(formData: FormData) {
    return this.httpClient.post(`${this.url}`, formData);
  }

  getLoginDriver() {
    return this.driver;
  }
}
