import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  saveAdminData(data: any) {
    console.log("login admin storage", data.roles[0]);
    localStorage.setItem("admindata", JSON.stringify(data));
    localStorage.setItem("role", data.roles[0]);
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

  getItem() {
    return localStorage.getItem("role");
  }
}
