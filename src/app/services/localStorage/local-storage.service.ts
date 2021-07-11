import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  saveAdminData(data: any) {
    localStorage.setItem("admindata", JSON.stringify(data));
    localStorage.setItem("role", "admin");
  }

  saveDriverData(data: any) {
    localStorage.setItem("driverData", JSON.stringify(data));
    localStorage.setItem("role", "driver");
  }

  removeAdminData() {
    localStorage.removeItem("admindata");
    localStorage.removeItem("role");
  }

  removeDriverData() {
    localStorage.removeItem("driverdata");
    localStorage.removeItem("role");
  }
}
