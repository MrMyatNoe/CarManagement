import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { ForgetPasswordComponent } from "./components/auth/forgetPassword/forget-password.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { AddDriverComponent } from "./components/driver/add-driver/add-driver.component";
import { DriverListComponent } from "./components/driver/driver-list/driver-list.component";
import { EditDriverComponent } from "./components/driver/edit-driver/edit-driver.component";
import { RoleComponent } from "./components/role/role.component";
import { AddTutorialComponent } from "./components/tutorial/add-tutorial/add-tutorial.component";
import { TutorialDetailsComponent } from "./components/tutorial/tutorial-details/tutorial-details.component";
import { TutorialListsComponent } from "./components/tutorial/tutorial-lists/tutorial-lists.component";
import { ResetPasswordComponent } from "./components/admin/reset-password/reset-password.component";
import { DailyTransactionComponent } from "./components/dailyTrans/daily-transaction/daily-transaction.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "tutorials", component: TutorialListsComponent },
  { path: "tutorials/:id", component: TutorialDetailsComponent },
  { path: "addTutorial", component: AddTutorialComponent },
  { path: "drivers/addDriver", component: AddDriverComponent },
  { path: "login", component: LoginComponent },
  { path: "roles", component: RoleComponent },
  { path: "admins", component: AdminComponent },
  { path: "drivers", component: DriverListComponent },
  { path: "forgetpassword", component: ForgetPasswordComponent },
  { path: "drivers/:id", component: EditDriverComponent },
  { path: "resetpassword", component: ResetPasswordComponent },
  { path: "daily", component: DailyTransactionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
