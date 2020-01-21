import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ACME Bank';

  private readonly notifier: NotifierService;
  private account_list: any[];
  private total_balance: number;


  constructor(
    private service: AccountService,
    public loader: NgxSpinnerService,
    notifierService: NotifierService
    ) {
      this.notifier = notifierService;
    }

  withdraw(account_number: any, account_type: any, balance: any) {
    this.loader.show();
    const index = this.account_list.findIndex(object => object.account_number === account_number && object.account_type === account_type && object.balance === balance);

    if (index >= 0) {
      if (this.account_list[index].account_type === 'savings') {
        if (parseFloat(this.account_list[index].balance) <= this.total_balance) {
          this.total_balance -= parseFloat(this.account_list[index].balance);
          this.account_list[index].balance = '00.00';
          this.account_list[index].display_balance = `ZAR ${this.account_list[index].balance}`;
          this.notifier.notify('success', 'Withdraw successfully');
          this.loader.hide();
        } else {
          this.notifier.notify('error', `You are trying to withdraw ${this.account_list[index].display_balance} but the total balance is ZAR ${this.total_balance.toFixed(2)}`);
          this.notifier.notify('error', 'You cannot withdraw more than the balance');
          this.loader.hide();
        }
      } else if (this.account_list[index].account_type === 'cheque') {
        if (parseFloat(this.account_list[index].balance.replace('-', '')) <= this.total_balance) {
          if (this.account_list[index].balance.includes('-', '') && (parseFloat(this.account_list[index].balance.replace('-', '')) < this.total_balance)) {
            this.total_balance -= parseFloat(this.account_list[index].balance.replace('-', ''));
            this.account_list[index].balance = '-500.00';
            this.account_list[index].display_balance = `-ZAR ${parseFloat(this.account_list[index].balance.replace('-', '')).toFixed(2).toString()}`;
          } else if (this.account_list[index].balance === '00.00' && this.total_balance > 0 ) {
            if (this.total_balance > 0 && this.total_balance >= 500.00) {
              this.total_balance -= parseFloat(this.account_list[index].balance.replace('-', ''));
              this.account_list[index].balance = '-500.00';
              this.account_list[index].display_balance = `-ZAR ${parseFloat(this.account_list[index].balance.replace('-', '')).toFixed(2).toString()}`;
            } else if (this.account_list[index].balance === '00.00' && (this.total_balance > 0 && this.total_balance < 500.00)) {
              this.account_list[index].balance = '-' + this.total_balance.toString();
              this.total_balance  = parseFloat('00.00');
              this.account_list[index].display_balance = `-ZAR ${parseFloat(this.account_list[index].balance.replace('-', '')).toFixed(2).toString()}`;
            }
          } else {
            this.total_balance -= parseFloat(this.account_list[index].balance);
            this.account_list[index].balance = '00.00';
            this.account_list[index].display_balance = `-ZAR ${this.account_list[index].balance}`;
          }
          this.notifier.notify('success', 'Withdraw successfully');
          this.loader.hide();
        } else {
          this.notifier.notify('error', `You are trying to withdraw ${this.account_list[index].display_balance.replace('-', '')} but the total balance is ZAR ${this.total_balance.toFixed(2)}`);
          this.notifier.notify('error', 'You cannot withdraw more than the balance');
          this.loader.hide();
        }
      }
    }
  }

  private getPageData() {
    this.loader.show();

    this.service.all().subscribe (
      (result: any) => {
        this.account_list = [];
        this.total_balance = 0;

        for (let i = 0; i < result.length; i++) {
          if (result[i].balance.includes('-')) {
            this.account_list.push({
              account_number: result[i].account_number,
              account_type: result[i].account_type,
              display_balance: `-ZAR ${result[i].balance.replace('-', '')}`,
              balance: result[i].balance
            });
          } else {
            this.account_list.push({
              account_number: result[i].account_number,
              account_type: result[i].account_type,
              display_balance: `ZAR ${result[i].balance}`,
              balance: result[i].balance
            });
          }
          this.total_balance += parseFloat(result[i].balance);
        }
        this.loader.hide();
      },
      (e: any) => {
        this.notifier.notify('error', 'Failed to retrieve accounts');
      },
    );
  }

  ngOnInit() {
    this.getPageData();
  }
}
