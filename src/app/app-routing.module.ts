import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeComponent } from './components/exchange/exchange.component';

const routes: Routes = [
  { path: '', component: ExchangeComponent},
  { path: 'exchange', component: ExchangeComponent},

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
