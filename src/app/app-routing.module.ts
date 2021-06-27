import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { AddDriverComponent } from "./components/driver/add-driver/add-driver.component";
import { DriverListComponent } from "./components/driver/driver-list/driver-list.component";
import { RoleComponent } from "./components/role/role.component";
import { AddTutorialComponent } from "./components/tutorial/add-tutorial/add-tutorial.component";
import { TutorialDetailsComponent } from "./components/tutorial/tutorial-details/tutorial-details.component";
import { TutorialListsComponent } from "./components/tutorial/tutorial-lists/tutorial-lists.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "tutorials", component: TutorialListsComponent },
  { path: "tutorials/:id", component: TutorialDetailsComponent },
  { path: "addTutorial", component: AddTutorialComponent },
  { path: "addDriver", component: AddDriverComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: SignUpComponent },
  { path: "role", component: RoleComponent },
  { path: "admin", component: AdminComponent },
  { path: "drivers", component: DriverListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
