import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  saveAdminData(data: any) {
    localStorage.setItem("admindata", JSON.stringify(data));
  }

  removeAdminData() {
    localStorage.removeItem("admindata");
  }
}
