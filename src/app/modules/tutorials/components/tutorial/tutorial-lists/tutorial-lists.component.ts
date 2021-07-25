import { Component, OnInit } from "@angular/core";
import { Tutorial } from "src/app/modules/tutorials/models/tutorial.model";
import { TutorialService } from "src/app/modules/tutorials/services/tutorial.service";

@Component({
  selector: "app-tutorial-lists",
  templateUrl: "./tutorial-lists.component.html",
  styleUrls: ["./tutorial-lists.component.css"],
})
export class TutorialListsComponent implements OnInit {
  tutorials: Tutorial[] = [];
  currentTutorial?: Tutorial;

  page = 1;
  count = 0;
  size = 3;
  currentIndex = -1;
  pageSizes = [3, 6, 9];
  title = "";
  published = 0;
  pending = 0;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
    this.getPublishedCount();
    this.getPendingCount();
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.size);

    this.tutorialService.getAll(params).subscribe(
      (response) => {
        const { tutorials, totalItems } = response;
        this.tutorials = tutorials;
        this.count = totalItems;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRequestParams(title: string, page: number, size: number): any {
    let params: any = {};
    if (title) {
      params[`title`] = title;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (size) {
      params[`size`] = size;
    }
    return params;
  }

  setActiveTutorial(tutorial: Tutorial, currentIndex: number) {
    this.currentTutorial = tutorial;
    this.currentIndex = currentIndex;
  }

  handlePageSizeChange(event: any): void {
    this.size = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  getPublishedCount() {
    this.tutorialService.getPublishedCount().subscribe((data) => {
      this.published = data;
      console.log("published data " + data);
    });
  }

  getPendingCount() {
    this.tutorialService.getPendingCount().subscribe((data) => {
      this.pending = data;
      console.log("pending data " + data);
    });
  }
}
