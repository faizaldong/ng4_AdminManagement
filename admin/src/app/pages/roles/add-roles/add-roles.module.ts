import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Json } from './add-roles-json';
import { AddRolesComponent } from './add-roles.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Add Role',
        urls: [{title: 'Add Role',url: '/add-role'},{title: 'Add Role'}]
    },
	component: AddRolesComponent
}];

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  declarations: [AddRolesComponent],
  providers: [Json]
})
export class AddRolesModule { }
