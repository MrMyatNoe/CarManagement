import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "./core/services/localStorage/local-storage.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Carmanagement";
  route: any;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.route = localStorageService.getItem();
    console.log("app component :", localStorageService.getItem());
  }

  logout() {
    this.localStorageService.removeAdminData();
    this.router.navigate(["/login"]);
  }
}
