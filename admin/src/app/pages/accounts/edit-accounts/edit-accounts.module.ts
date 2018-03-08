import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditAccountsComponent } from './edit-accounts.component'
import { Json } from './edit-accounts-json'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Edit Accounts',
        urls: [{title: 'Edit Accounts',url: '/edit-accounts'},{title: 'Edit Accounts'}]
    },
	component: EditAccountsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditAccountsComponent],
  providers: [Json]
})
export class EditAccountsModule { }
