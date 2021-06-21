import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/admin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  public getRequest(url : string){
    console.log(this.url+ url)
    return this.httpClient.get(this.url+ url);
  }

  public postRequest(url : string, data){
    return this.httpClient.post(this.url + url , data)
  }

  loadAllAdmins(url: string) {
    return this.httpClient.get<any>(this.url+ url);
  }
}
