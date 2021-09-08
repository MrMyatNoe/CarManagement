import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {
    this.getItemRole();
    this.getItemUserName();
  }

  saveAdminData(data: any) {
    localStorage.setItem("adminData", JSON.stringify(data));
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
    localStorage.removeItem("adminData");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("webToken");
  }

  removeDriverData() {
    localStorage.removeItem("driverData");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("webToken");
  }

  getItemRole() {
    console.log("local role", localStorage.getItem("role"));
    return localStorage.getItem("role");
  }

  getItemUserName() {
    console.log("local user name", localStorage.getItem("useranme"));
    return localStorage.getItem("username");
  }
}
