import { Component, OnInit } from '@angular/core';

import { Exchange } from '../../_models/exchange';
import { ExchangeService } from '../../_services/exchange.service';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  exchanges: Exchange[] = [];
  rateForm: FormGroup;

  constructor(private exchangeService: ExchangeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.rateForm = this.formBuilder.group({
      rate: ['', Validators.required]
    });

    // La pantalla se inicializa con el rate default mnx
    this.getExchanges();
  }

  // Consultar rate inicial
  getExchanges(){
    this.exchangeService.getExchanges().subscribe(
      res => {
        var data = res['rates'];
        for(var key in data){
          var actual = new Exchange(key, String(data[key]));
          this.exchanges.push(actual);
        }
      },
      err => console.error(err)
    )
  }

  // Consultar un rate
  getExchange(rate){
    this.exchanges = [];
    this.exchangeService.getExchange(rate['rate']).subscribe(
      res => {
        var data = res['rates'];
        for(var key in data){
          var actual = new Exchange(key, String(data[key]));
          this.exchanges.push(actual);
        }
        this.rateForm.reset();
      },
      err => {
        console.error(err)
        alert("Rate inválido, intenta con uno distinto");
        this.rateForm.reset();
        this.getExchanges();
      }
    )
  }
}
