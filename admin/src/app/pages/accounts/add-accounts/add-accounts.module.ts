import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddAccountsComponent } from './add-accounts.component';
import { Json } from './add-accounts-json'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Add Account',
        urls: [{title: 'Add Account',url: '/add-accounts'},{title: 'Add Account'}]
    },
	component: AddAccountsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		FormsModule
  ],
  declarations: [AddAccountsComponent],
	bootstrap: [AddAccountsComponent],
  providers: [Json]
})
export class AddAccountsModule { }
