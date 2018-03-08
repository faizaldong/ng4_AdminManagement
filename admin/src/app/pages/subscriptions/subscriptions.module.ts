import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionsComponent } from './subscriptions.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Subscription',
        urls: [{title: 'Subscription',url: '/subscription'},{title: 'Subscription'}]
    },
	component: SubscriptionsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubscriptionsComponent]
})
export class SubscriptionsModule { }
