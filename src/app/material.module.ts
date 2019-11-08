import { NgModule } from '@angular/core'; 
import { MatInputModule, MatButtonModule, MatCardModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ]
})
export class MaterialModule { }
