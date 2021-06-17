import { Injectable } from "@angular/core";
import { BASE_URL } from "src/const";
import { Observable, BehaviorSubject } from "rxjs/index";
import { Role } from "src/app/models/role.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private url = BASE_URL + "roles";

  roles$ = new BehaviorSubject<Role[]>([]);

  roles: Role[] = [];

  constructor(private httpClient: HttpClient) {}

  loadRoles(){
    this.httpClient.get<Role[]>(this.url).subscribe(data=>{
      
      this.roles = data;
      this.roles$.next(this.roles);
      console.log('service ',this.roles$)
    });
  }

  loadAllRoles(): Observable<Role> {
    return this.httpClient.get<any>(this.url);
  }

  saveRole(role: Role) {
    this.httpClient.post<Role>(this.url, role).subscribe((data) => {
      console.log("role created in service ", data);
      this.roles.push(data);
      this.roles$.next(this.roles);
    });
  }

  updateRole(role: Role) {
    this.httpClient.put<Role>(this.url, role).subscribe((data) => {
      console.log("update role", data);
      this.roles = this.roles.map((rol) => (rol.id != role.id ? rol : data));
      this.roles$.next(this.roles);
    });
  }

  deleteRole(role:Role){
    this.httpClient.delete<Role>(this.url,role.id).subscribe((data)=>{
      console.log('delete role in service', role)
      this.roles = this.roles.filter(rol => rol.id != role.id);
      this.roles$.next(this.roles);
    })
  }

  delete(role): Observable<any>{
    console.log(this.url+'?id='+role.id)
    return this.httpClient.delete(this.url+'?id='+role.id);
  }
}
