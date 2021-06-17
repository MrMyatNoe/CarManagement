import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/const';
import { Tutorial } from 'src/app/models/tutorial.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private url = BASE_URL + "tutorials";

  constructor(private http: HttpClient) {}

  getAll(params: any): Observable<any>{
    console.log(params);
    return this.http.get<any>(this.url,{ params });
  }

  saveTutorial(data: Tutorial): Observable<any> {
    return this.http.post(this.url,data);
  }

  get(id: string): Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`);
  }

  update(data: any): Observable<any>{
    return this.http.put(`${this.url}`,data);
  }

  delete(id:any): Observable<any>{
    return this.http.delete(`${this.url}?id=${id}`);
  }

  getPublishedCount(): Observable<any>{
    return this.http.get<any>(`${this.url}/published`)
  }

  getPendingCount(): Observable<any>{
    return this.http.get<any>(`${this.url}/pending`)
  }
}
