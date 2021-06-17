import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/const';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private url = BASE_URL + 'drivers';

  constructor(private httpClient: HttpClient) {}

  createData(formData: FormData) {
    return this.httpClient.post(`${this.url}`, formData);
  }
}
