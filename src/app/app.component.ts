import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "./core/services/localStorage/local-storage.service";

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
  ) {
    this.route = localStorageService.getItem();
  }

  logout() {
    this.localStorageService.removeAdminData();
    this.router.navigate(["/login"]);
  }
}
