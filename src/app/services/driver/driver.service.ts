import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private url = environment.BASE_URL + 'drivers';

  constructor(private httpClient: HttpClient) {}

  createData(formData: FormData) {
    return this.httpClient.post(`${this.url}`, formData);
  }
}
