import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentMainComponent } from './payment-main.component';
import {Json} from './payment-main-json';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Payments',
        urls: [{title: 'Payments',url: '/payment'},{title: 'Payments'}]
    },
	component: PaymentMainComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentMainComponent],
  providers: [Json]
})
export class PaymentMainModule { }
