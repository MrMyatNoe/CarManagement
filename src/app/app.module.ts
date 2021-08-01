import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
import { ResetPasswordComponent } from "src/app/modules/admins/components/admin/reset-password/reset-password.component";
import { DailyTransactionComponent } from "src/app/modules/admins/components/admin/daily-transaction/daily-transaction.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CarComponent } from './modules/admins/components/admin/car/car.component';
import { CarListComponent } from './modules/admins/components/admin/car-list/car-list.component';

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
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
