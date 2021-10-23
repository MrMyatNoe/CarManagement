import { Component, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { DatePipe } from "@angular/common";
import { ApiService } from "src/app/core/services/api/api.service";
import { routes } from "src/app/core/services/routes";

@Component({
  selector: "app-test-chart",
  templateUrl: "./test-chart.component.html",
  styleUrls: ["./test-chart.component.css"],
})
export class TestChartComponent implements OnInit {
  month: any;
  total: any;
  firstDay: any;
  lastDay: any;
  result: any;
  chart: any = [];

  constructor(private datePipe: DatePipe, private apiService: ApiService) {
    let date = new Date();
    let firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // console.log(firstDate, lastDate);

    this.firstDay = this.datePipe.transform(firstDate, "yyyy-MM-dd");
    this.lastDay = this.datePipe.transform(lastDate, "yyyy-MM-dd");

    //console.log(firstDay, lastDay);

    this.month = firstDate.toLocaleString("en-mm", { month: "long" });
  }

  ngOnInit() {
    // console.log(this.month);
    let params: any = {};
    params[`firstDate`] = this.firstDay;
    params[`lastDate`] = this.lastDay;
    console.log("in ng oninit", params);
    this.getLeavesByFirstDateAndLastDate(params);

    this.chart = new Chart("canvas", {
      type: "line",
      data: {
        datasets: [
          {
            label: this.month,
            //data: this.total,
            data: this.total,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
          },
        ],
        // datasets: [
        // {
        //   label: "Current Vallue",
        //   data: [0, 20, 40, 50],
        //   backgroundColor: "rgb(115 185 243 / 65%)",
        //   borderColor: "#007ee7",
        //   fill: true,
        // },
        // {
        //   label: "Invested Amount",
        //   data: [0, 20, 40, 60, 80],
        //   backgroundColor: "#47a0e8",
        //   borderColor: "#007ee7",
        //   fill: true,
        // },
        //],
        //labels: this.month,
        labels: ["January 2019"],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Leave Bar Chart",
          },
        },
      },
    });
  }

  private LEAVES_ROUTE = routes.LEAVES;

  getLeavesByFirstDateAndLastDate(params) {
    console.log("in method ", params);
    this.apiService
      .getRequestWithParams(
        this.LEAVES_ROUTE + "getByFirstDateAndLastDate",
        params
      )
      .toPromise()
      .then(
        (data) => {
          console.log("in method ", data);
          this.result = data;
          this.total = this.result.data.map((data: any) => data.total);
          console.log(this.total);
          //onst { total } = data;
          // this.total = data.map((_data: any) => _data.total);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngAfterViewInit() {}

  transformDate(date) {
    return this.datePipe.transform(date, "MM-yyyy");
  }
}
