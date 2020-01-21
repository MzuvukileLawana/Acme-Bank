import { Component } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
 })

export class LoaderComponent {

  constructor(
    public spinner: NgxSpinnerService
  ) {}
}
