import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Tutorial } from "src/app/modules/tutorials/models/tutorial.model";
import { TutorialService } from "src/app/modules/tutorials/services/tutorial.service";

@Component({
  selector: "app-tutorial-details",
  templateUrl: "./tutorial-details.component.html",
  styleUrls: ["./tutorial-details.component.css"],
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial: Tutorial = {
    title: "",
    description: "",
    published: false,
  };

  message = "";

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = "";
    this.getTutorial(this.route.snapshot.params.id);
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe(
      (data) => {
        this.currentTutorial = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePublished(status: boolean): void {
    const data = {
      id: this.currentTutorial.id,
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
    };

    this.tutorialService.update(data).subscribe(
      (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe(
      (data) => {
        console.log(data.response);
        this.message = data.response;
        this.router.navigate(["/tutorials"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTutorial(): void {
    this.tutorialService.update(this.currentTutorial).subscribe(
      (data) => {
        this.currentTutorial = data;
        console.log(data);
        this.message = "Tutorial Updated Successfully";
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
