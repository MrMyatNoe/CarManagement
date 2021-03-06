import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Admin } from "src/app/modules/admins/models/admin.model";
import { environment } from "src/environments/environment";
import { Driver } from "src/app/modules/drivers/models/driver.model";
import { Role } from "src/app/modules/admins/models/role.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private API_ROUTE = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {}

  public getRequest(url: string) {
    console.log(url);
    return this.httpClient.get(this.API_ROUTE + url);
  }

  public getRequestWithParams(url: string, params: HttpParams) {
    return this.httpClient.get(this.API_ROUTE + url, { params: params });
  }

  public postRequest(url: string, data: any) {
    console.log(url + " : " + data);
    return this.httpClient.post(this.API_ROUTE + url, data);
  }

  createData(url: string,formData: FormData) {
    console.log("form data",formData.get('file')," url",url)
    return this.httpClient.post(this.API_ROUTE + url, formData);
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
