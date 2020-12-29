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

    // La pantalla se inicializa con el rate default 'mnx'
    this.getExchanges();
  }

  // Consultar rate inicial
  getExchanges(){
    this.exchanges = [];
    this.exchangeService.getExchanges().subscribe(
      res => {
        for(var key in res['rates']){
          this.exchanges.push(new Exchange(key, String(res['rates'][key])));
        }
      },
      err => { 
        alert("Rate inválido, intenta con uno distinto");
      }
    )
  }

  // Consultar un rate
  getExchange(rate){
    this.exchanges = [];
    this.exchangeService.getExchange(rate['rate']).subscribe(
      res => {
        for(var key in res['rates']){
          this.exchanges.push(new Exchange(key, String(res['rates'][key])));
        }
        this.rateForm.reset();
      },
      err => {
        alert("Rate inválido, intenta con uno distinto");
        this.rateForm.reset();
        this.getExchanges();
      }
    )
  }
}
