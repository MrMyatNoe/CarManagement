import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "./core/services/localStorage/local-storage.service";
import {TranslateService} from '@ngx-translate/core';

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
    private router: Router,
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang('en');
    this.route = localStorageService.getItemRole();
    this.userName = localStorageService.getItemUserName();
  }

  switchLanguage(language:string){
    this.translateService.use(language)
  }

  logout() {
    this.localStorageService.removeAdminData();
    this.router.navigate(["/login"]);
  }
}
