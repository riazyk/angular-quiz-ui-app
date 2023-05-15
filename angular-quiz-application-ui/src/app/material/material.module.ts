import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatListModule
  ],
  exports:[
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatListModule
  ]
})
export class MaterialModule { }
