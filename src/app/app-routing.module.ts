import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { ForgetPasswordComponent } from "./components/auth/forgetPassword/forget-password.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { AddDriverComponent } from "./components/driver/add-driver/add-driver.component";
import { DriverListComponent } from "./components/driver/driver-list/driver-list.component";
import { EditDriverComponent } from "./components/driver/edit-driver/edit-driver.component";
import { RoleComponent } from "./components/role/role.component";
import { AddTutorialComponent } from "./components/tutorial/add-tutorial/add-tutorial.component";
import { TutorialDetailsComponent } from "./components/tutorial/tutorial-details/tutorial-details.component";
import { TutorialListsComponent } from "./components/tutorial/tutorial-lists/tutorial-lists.component";
import { ResetPasswordComponent } from "./components/admin/reset-password/reset-password.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "tutorials", component: TutorialListsComponent },
  { path: "tutorials/:id", component: TutorialDetailsComponent },
  { path: "addTutorial", component: AddTutorialComponent },
  { path: "drivers/addDriver", component: AddDriverComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: SignUpComponent },
  { path: "admins/role", component: RoleComponent },
  { path: "admins/admin", component: AdminComponent },
  { path: "drivers/drivers", component: DriverListComponent },
  { path: "forgetpassword", component: ForgetPasswordComponent },
  { path: "drivers/drivers/:id", component: EditDriverComponent },
  { path: "resetpassword", component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
