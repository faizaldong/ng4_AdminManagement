import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaymentSuccessComponent } from './payment-success.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Payment Success',
        urls: [{title: '',url: '/payment-success'},{title: ''}]
    },
	component: PaymentSuccessComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentSuccessComponent]
})
export class PaymentSuccessModule { }
