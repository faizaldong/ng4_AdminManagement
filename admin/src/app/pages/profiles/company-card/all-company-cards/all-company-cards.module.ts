import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { GridModule } from '@progress/kendo-angular-grid'
import {AllCompanyCardsComponent} from './all-company-cards.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{
	path: '',
	data: {
        title: 'All Vault Card',
        urls: [{title: 'All Vault Card',url: '/all-company-card'},{title: 'All Vault Card'}]
    },
	component: AllCompanyCardsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    GridModule,
    NgbModule
  ],
  declarations: [AllCompanyCardsComponent]
})
export class AllCompanyCardsModule { }
