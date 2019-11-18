import { Component } from "@angular/core";

@Component({
  selector: "app-upload-index",
  templateUrl: "./upload-index.component.html"
})
export class UploadIndexComponent {
  public today: Date;

  constructor() {
    this.today = new Date();
  }
}
