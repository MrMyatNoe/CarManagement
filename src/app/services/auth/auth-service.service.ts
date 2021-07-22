import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private webToken: string;
  constructor() {}

  setAuth(token: string) {
    this.webToken = token;
  }
}
