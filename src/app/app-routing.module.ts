import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddTutorialComponent } from "src/app/modules/tutorials/components/tutorial/add-tutorial/add-tutorial.component";
import { TutorialDetailsComponent } from "src/app/modules/tutorials/components/tutorial/tutorial-details/tutorial-details.component";
import { TutorialListsComponent } from "src/app/modules/tutorials/components/tutorial/tutorial-lists/tutorial-lists.component";
import { AddDriverComponent } from "src/app/modules/drivers/components/add-driver/add-driver.component";
import { LoginComponent } from "src/app/core/authentication/login/login.component";
import { RoleComponent } from "src/app/modules/admins/components/role/role.component";
import { AdminComponent } from "src/app/modules/admins/components/admin/admin.component";
import { DriverListComponent } from "src/app/modules/drivers/components/driver-list/driver-list.component";
import { ForgetPasswordComponent } from "src/app/modules/drivers/components/forgetPassword/forget-password.component";
import { EditDriverComponent } from "src/app/modules/drivers/components/edit-driver/edit-driver.component";
import { ResetPasswordComponent } from "src/app/modules/admins/components/reset-password/reset-password.component";
import { DailyTransactionComponent } from "src/app/modules/admins/components/daily-transaction/daily-transaction.component";
import { CarComponent } from "./modules/admins/components/car/car.component";
import { CarListComponent } from "./modules/admins/components/car-list/car-list.component";
import { CarEditComponent } from "./modules/admins/components/car-edit/car-edit.component";
import { LeaveListComponent } from "./modules/drivers/components/leave-list/leave-list.component";
import { MaintanenceComponent } from "./modules/admins/components/maintanence/maintanence.component";
import { TestPaginationComponent } from "./modules/admins/components/test-pagination/test-pagination.component";

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
  { path: "car", component: CarComponent },
  { path: "cars", component: CarListComponent },
  { path: "cars/:id", component: CarEditComponent },
  { path: "leaves", component: LeaveListComponent },
  { path: "maintain", component: MaintanenceComponent },
  { path: "test", component: TestPaginationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
