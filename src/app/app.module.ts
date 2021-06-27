import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddTutorialComponent } from "./components/tutorial/add-tutorial/add-tutorial.component";
import { TutorialDetailsComponent } from "./components/tutorial/tutorial-details/tutorial-details.component";
import { TutorialListsComponent } from "./components/tutorial/tutorial-lists/tutorial-lists.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AddDriverComponent } from "./components/driver/add-driver/add-driver.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { RoleComponent } from "./components/role/role.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminComponent } from "./components/admin/admin.component";
import { DriverListComponent } from "./components/driver/driver-list/driver-list.component";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialListsComponent,
    AddDriverComponent,
    LoginComponent,
    SignUpComponent,
    RoleComponent,
    AdminComponent,
    DriverListComponent,
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
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
