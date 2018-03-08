import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaymentFailedComponent } from './payment-failed.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Payment Failed',
        urls: [{title: '',url: '/payment-failed'},{title: ''}]
    },
	component: PaymentFailedComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentFailedComponent]
})
export class PaymentFailedModule { }
