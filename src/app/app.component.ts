import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "./services/localStorage/local-storage.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Carmanagement";
  route;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    //alert("in app component.ts : " + this.router.url);
    this.route = localStorage.getItem("role");
    console.log(this.route);
  }

  logout() {
    this.localStorageService.removeAdminData();
    this.router.navigate(["/"]);
  }
}
