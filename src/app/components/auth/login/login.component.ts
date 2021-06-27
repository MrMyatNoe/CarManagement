import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  imageURL: string = "assets/drivers/myPP.jpg";

  constructor() {}

  ngOnInit(): void {}
}
