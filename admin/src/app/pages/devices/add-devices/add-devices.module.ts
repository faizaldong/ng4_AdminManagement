import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AddDevicesComponent} from './add-devices.component'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Add Device',
        urls: [{title: 'Add Device',url: '/add-devices'},{title: 'Add Device'}]
    },
	component: AddDevicesComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		FormsModule,
		NgbModule
  ],
  declarations: [AddDevicesComponent],
  bootstrap: [AddDevicesComponent]
})
export class AddDevicesModule { }
