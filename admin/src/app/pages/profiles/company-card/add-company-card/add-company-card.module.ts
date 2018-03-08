import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AddCompanyCardComponent} from './add-company-card.component'
import {Json} from './add-company-card-json'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Add Vault Card',
        urls: [{title: 'Add Vault Card',url: '/add-company-card'},{title: 'Add Vault Card'}]
    },
	component: AddCompanyCardComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule
  ],
  declarations: [AddCompanyCardComponent],
  providers: [Json]
})
export class AddCompanyCardModule { }
