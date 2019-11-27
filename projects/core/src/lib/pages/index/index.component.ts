import { Component, OnInit } from "@angular/core";
import { CookiesManagerService } from "../../services/cookies.manager";
@Component({
  selector: "index",
  templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit {
  public today: Date;
  public showBanner: boolean;

  constructor(private _cookiesManager: CookiesManagerService) {
    this.today = new Date();
    this.showBanner = false;
  }

  ngOnInit() {
    setTimeout(() => {
      this.showBanner = !this._cookiesManager.isConsented();
    }, 1500);
  }
}
