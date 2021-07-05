import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Admin } from "src/app/models/admin.model";
import { environment } from "src/environments/environment";
import { Driver } from "../../models/driver.model";
import { Role } from "../../models/role.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private API_ROUTE = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {}

  public getRequest(url: string) {
    return this.httpClient.get(this.API_ROUTE + url);
  }

  loadAllAdmins(url: string) {
    return this.httpClient.get<any>(this.API_ROUTE + url);
  }

  public postRequest(url: string, data: any) {
    return this.httpClient.post(this.API_ROUTE + url, data);
  }

  public putRequest(url: string, data: any) {
    return this.httpClient.put(this.API_ROUTE + url, data);
  }

  deleteAdminByIdRequest(url: string, admin: Admin): Observable<any> {
    return this.httpClient.delete(this.API_ROUTE + url + "?id=" + admin.id);
  }

  deleteRoleByIdRequest(url: string, role: Role): Observable<any> {
    return this.httpClient.delete(this.API_ROUTE + url + "?id=" + role.id);
  }

  deleteDriverByIdRequest(url: string, driver: Driver): Observable<any> {
    return this.httpClient.delete(this.API_ROUTE + url + "?id=" + driver.id);
  }
}
