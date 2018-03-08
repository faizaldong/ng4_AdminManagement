import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid'

import { OrderHistoryComponent } from './order-history.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Payment History',
        urls: [{title: 'Payment History',url: '/order-history'},{title: 'Payment History'}]
    },
	component: OrderHistoryComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule
  ],
  declarations: [OrderHistoryComponent]
})
export class OrderHistoryModule { }
