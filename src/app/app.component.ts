import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "./core/services/localStorage/local-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Carmanagement";
  route: any;
  userName: any;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.route = localStorageService.getItemRole();
    this.userName = localStorageService.getItemUserName();
    console.warn(this.userName, ' ', this.route)
  }

  logout() {
    this.localStorageService.removeAdminData();
    this.router.navigate(["/login"]);
  }
}
