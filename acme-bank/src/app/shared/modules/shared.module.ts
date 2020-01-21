// SHARED MODULE //

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from '../components/loader/loader.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    NgxSpinnerModule
  ],

  declarations: [
    LoaderComponent
  ],

  providers: [],

  exports: [
    NgxSpinnerModule,
    MaterialModule,
    LoaderComponent
  ],
})

export class SharedModule {}
