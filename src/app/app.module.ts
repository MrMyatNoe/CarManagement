import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddTutorialComponent } from "src/app/modules/tutorials/components/tutorial/add-tutorial/add-tutorial.component";
import { TutorialDetailsComponent } from "src/app/modules/tutorials/components/tutorial/tutorial-details/tutorial-details.component";
import { TutorialListsComponent } from "src/app/modules/tutorials/components/tutorial/tutorial-lists/tutorial-lists.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AddDriverComponent } from "src/app/modules/drivers/components/add-driver/add-driver.component";
import { LoginComponent } from "src/app/core/authentication/login/login.component";
import { RoleComponent } from "src/app/modules/admins/components/role/role.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminComponent } from "src/app/modules/admins/components/admin/admin.component";
import { DriverListComponent } from "src/app/modules/drivers/components/driver-list/driver-list.component";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ForgetPasswordComponent } from "src/app/modules/drivers/components/forgetPassword/forget-password.component";
import { EditDriverComponent } from "src/app/modules/drivers/components/edit-driver/edit-driver.component";
import { ResetPasswordComponent } from "src/app/modules/admins/components/reset-password/reset-password.component";
import { DailyTransactionComponent } from "src/app/modules/admins/components/daily-transaction/daily-transaction.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CarComponent } from "./modules/admins/components/car/car.component";
import { CarListComponent } from "./modules/admins/components/car-list/car-list.component";
import { HttpConfigInterceptor } from "./core/services/httpConfig.interceptor";
import { AuthServiceService } from "./core/services/auth/auth-service.service";
import { CarEditComponent } from "./modules/admins/components/car-edit/car-edit.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NavbarComponent } from "./core/navbar/navbar.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialListsComponent,
    AddDriverComponent,
    LoginComponent,
    RoleComponent,
    AdminComponent,
    DriverListComponent,
    ForgetPasswordComponent,
    EditDriverComponent,
    ResetPasswordComponent,
    DailyTransactionComponent,
    CarComponent,
    CarListComponent,
    CarEditComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
