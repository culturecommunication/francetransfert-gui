import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CookiesBannerComponent } from "./cookies-banner.component";

describe("FileItemComponent", () => {
  let component: CookiesBannerComponent;
  let fixture: ComponentFixture<CookiesBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CookiesBannerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
