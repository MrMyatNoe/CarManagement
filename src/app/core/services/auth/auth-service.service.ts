import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private webToken: string;
  private authState = false;
  constructor(
    private readonly _router: Router
  ) {
    this.webToken = localStorage.getItem('webToken')
    this.authState = this.webToken ? true : false 
  }

  setAuth(token: string) {
    this.webToken = token;
  }

  get getToken() {
    return this.webToken;
  }

  logout() {
    this.webToken = "";
    this.authState = false
    localStorage.removeItem('webToken');


    this._router.navigateByUrl("/auth")
}
}
