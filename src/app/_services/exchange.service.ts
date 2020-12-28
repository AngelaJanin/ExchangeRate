import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exchange} from '../_models/exchange';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  API_URI = 'https://api.exchangerate-api.com/v4/latest/';

  constructor(private http: HttpClient) { }

  getExchanges(){
    return this.http.get(this.API_URI+'/mxn');
  }

  getExchange(rate: string){
    return this.http.get(this.API_URI + rate);
  }
}
