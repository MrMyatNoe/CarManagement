import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs/index";
import { Role } from "src/app/models/role.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private API_ROUTE = environment.BASE_URL + "roles";

  roles$ = new BehaviorSubject<Role[]>([]);

  roles: Role[] = [];

  constructor(private httpClient: HttpClient) {}

  loadRoles() {
    this.httpClient.get<Role[]>(this.API_ROUTE).subscribe((data) => {
      this.roles = data;
      this.roles$.next(this.roles);
    });
  }

  loadAllRoles() {
    return this.httpClient.get<any>(this.API_ROUTE);
  }

  saveRole(role: Role) {
    this.httpClient.post<Role>(this.API_ROUTE, role).subscribe((data) => {
      console.log("role created in service ", data);
      this.roles.push(data);
      this.roles$.next(this.roles);
    });
  }

  updateRole(role: Role) {
    this.httpClient.put<Role>(this.API_ROUTE, role).subscribe((data) => {
      console.log("update role", data);
      this.roles = this.roles.map((rol) => (rol.id != role.id ? rol : data));
      this.roles$.next(this.roles);
    });
  }

  deleteRole(role: Role) {
    this.httpClient.delete<Role>(this.API_ROUTE, role.id).subscribe((data) => {
      console.log("delete role in service", role);
      this.roles = this.roles.filter((rol) => rol.id != role.id);
      this.roles$.next(this.roles);
    });
  }

  delete(role: Role): Observable<any> {
    return this.httpClient.delete(this.API_ROUTE + "?id=" + role.id);
  }
}
