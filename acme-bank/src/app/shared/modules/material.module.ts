import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// MATERIAL COMPONENTS //
import {
  MatTableModule,
  MatButtonModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule
  ],

  exports: [
    MatTableModule,
    MatButtonModule,
    MatTooltipModule
  ]
})

export class MaterialModule {}
