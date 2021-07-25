import { Component, OnInit } from "@angular/core";
import { Tutorial } from "src/app/modules/tutorials/models/tutorial.model";
import { TutorialService } from "src/app/modules/tutorials/services/tutorial.service";

@Component({
  selector: "app-add-tutorial",
  templateUrl: "./add-tutorial.component.html",
  styleUrls: ["./add-tutorial.component.css"],
})
export class AddTutorialComponent implements OnInit {
  tutorial: Tutorial = {
    title: "",
    description: "",
    published: false,
  };
  submitted = false;
  alertMessage = false;
  message = "";

  constructor(private tutorialService: TutorialService) {
    console.log("here");
  }

  ngOnInit(): void {
    this.message = "";
  }

  saveTutorial() {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
    };
    this.tutorialService.saveTutorial(data).subscribe(
      (response) => {
        this.submitted = true;
      },
      (error) => {
        this.alertMessage = true;
        this.message = error.error.message;
      }
    );
  }

  newTutorial() {
    this.submitted = false;
    this.alertMessage = false;
    this.tutorial = {
      title: "",
      description: "",
      published: false,
    };
  }
}
