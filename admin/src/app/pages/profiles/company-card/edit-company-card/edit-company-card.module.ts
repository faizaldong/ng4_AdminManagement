import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {EditCompanyCardComponent} from './edit-company-card.component'
import {Json} from './edit-company-card-json'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Edit Vault Card',
        urls: [{title: 'Edit Vault Card',url: '/edit-company-card/:id'},{title: 'Edit Vault Card'}]
    },
	component: EditCompanyCardComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule
  ],
  declarations: [EditCompanyCardComponent],
  providers: [Json]
})
export class EditCompanyCardModule { }
