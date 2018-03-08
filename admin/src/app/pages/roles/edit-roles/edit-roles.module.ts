import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditRolesComponent } from './edit-roles.component';
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Edit Roles',
        urls: [{title: 'Edit Roles',url: '/edit-roles'},{title: 'Edit Roles'}]
    },
	component: EditRolesComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule
  ],
  declarations: [EditRolesComponent]
})
export class EditRolesModule { }
