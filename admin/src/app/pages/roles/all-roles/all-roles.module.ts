import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AllRolesComponent } from './all-roles.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'All Roles',
        urls: [{title: 'All Roles',url: '/all-roles'},{title: 'All Roles'}]
    },
	component: AllRolesComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule,
    NgbModule
  ],
  declarations: [AllRolesComponent]
})
export class AllRolesModule { }
