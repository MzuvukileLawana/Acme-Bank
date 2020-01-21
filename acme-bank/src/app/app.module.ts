import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/modules/shared.module';
import { AccountService } from '../app/services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    NotifierModule.withConfig( {
      position: {
        horizontal: {
          position: 'right'
        },
        vertical: {
          position: 'top'
        }
      },
      behaviour: {
        autoHide: 5000
      }
    })
  ],

  providers: [
    AccountService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
