import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "../services/localStorage/local-storage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  route: any;
  userName: any;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang("en");
    this.route = localStorageService.getItemRole();
    this.userName = localStorageService.getItemUserName();
  }

  switchLanguage(language: string) {
    this.translateService.use(language);
  }

  logout() {
    this.localStorageService.removeAdminData();
    this.router.navigate(["/login"]);
  }
}
