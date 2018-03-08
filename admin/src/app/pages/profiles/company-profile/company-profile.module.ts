import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyProfileComponent } from './company-profile.component';
import {Json} from './company-profile-json'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Company Profile',
        urls: [{title: 'Company Profile',url: '/company-profile'},{title: 'Company Profile'}]
    },
	component: CompanyProfileComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    GridModule,
    NgbModule
  ],
  declarations: [CompanyProfileComponent],
  providers: [Json],
})
export class CompanyProfileModule { }
