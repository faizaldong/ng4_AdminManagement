import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailsComponent } from './order-details.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Order : 00000'+JSON.parse(localStorage.getItem('orderdetails')).id,
        urls: [{title: '',url: '/order-details'},{title: ''}]
    },
	component: OrderDetailsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderDetailsComponent]
})
export class OrderDetailsModule { }
