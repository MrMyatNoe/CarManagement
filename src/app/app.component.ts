import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "./services/localStorage/local-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Carmanagement";

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  logout() {
    this.localStorageService.removeAdminData();
    this.router.navigate(["/"]);
  }
}
