import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "./core/services/localStorage/local-storage.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Carmanagement";
}
