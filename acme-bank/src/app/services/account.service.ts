import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  all(query: any = false) {
    return this.httpClient.get(`${environment.api_url}/accounts`, query);
  }

}
