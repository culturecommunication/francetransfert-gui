import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [],
  imports: [MatInputModule, MatButtonModule, MatCardModule, MatListModule],
  exports: [MatInputModule, MatButtonModule, MatCardModule, MatListModule]
})
export class MaterialModule {}
