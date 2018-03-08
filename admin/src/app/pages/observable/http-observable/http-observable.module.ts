import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HttpObservableComponent } from './http-observable.component'


const routes: Routes = [{
	path: '',
	data: {
        title: 'Http Observable Page',
        urls: [{title: 'Dashboard',url: '/'},{title: 'Http Observable Page'}]
    },
	component: HttpObservableComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [HttpObservableComponent]
})
export class HttpObservableModule { }
