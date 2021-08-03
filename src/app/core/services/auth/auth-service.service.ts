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
    console.log('set constructor', this.webToken, " : ", this.authState)
 
  }

  setAuth(token: string) {
    console.log('set auth', this.webToken)
    this.webToken = token;
  }

  get getToken() {
    console.log('get token', this.webToken)
    return this.webToken;
  }

  logout() {
    this.webToken = "";
    this.authState = false
    localStorage.removeItem('webToken');
    localStorage.removeItem('driverData')
    localStorage.removeItem('adminData')
    this._router.navigateByUrl("/login")
}
}
