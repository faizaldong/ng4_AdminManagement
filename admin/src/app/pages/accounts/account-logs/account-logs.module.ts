import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AccountLogsComponent } from './account-logs.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Activity Log',
        urls: [{title: 'Activity Log',url: '/activity-log'},{title: 'Activity Log'}]
    },
	component: AccountLogsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountLogsComponent]
})
export class AccountLogsModule { }
