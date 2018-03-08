import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { Json } from './all-accounts-json'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllAccountsComponent } from './all-accounts.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'All Accounts',
        urls: [{title: 'All Accounts',url: '/all-accounts'},{title: 'All Accounts'}]
    },
	component: AllAccountsComponent
}];

@NgModule({
  imports: [
    CommonModule,
		GridModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  declarations: [AllAccountsComponent],
  providers: [Json]
})
export class AllAccountsModule { }
