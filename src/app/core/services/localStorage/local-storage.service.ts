import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  saveAdminData(data: any) {
    localStorage.setItem("admindata", JSON.stringify(data));
    localStorage.setItem("role", data.roles[0]);
    localStorage.setItem("username", data.username);
    localStorage.setItem("webToken", data.token);
  }

  saveDriverData(data: any) {
    localStorage.setItem("driverData", JSON.stringify(data));
    localStorage.setItem("role", "driver");
    localStorage.setItem("username", data.username);
    localStorage.setItem("webToken", data.token);
  }

  removeAdminData() {
    localStorage.removeItem("admindata");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("webToken");
  }

  removeDriverData() {
    localStorage.removeItem("driverdata");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("webToken");
  }

  getItemRole() {
    return localStorage.getItem("role");
  }

  getItemUserName() {
    return localStorage.getItem("username");
  }
}
