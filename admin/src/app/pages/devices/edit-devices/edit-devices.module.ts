import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import {Routes, RouterModule} from '@angular/router'
import { EditDevicesComponent } from './edit-devices.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Edit Device',
        urls: [{title: 'Edit Device',url: '/edit-devices'},{title: 'Edit Device'}]
    },
	component: EditDevicesComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		FormsModule,
    NgbModule
  ],
  declarations: [EditDevicesComponent],
  bootstrap: [EditDevicesComponent]
})
export class EditDevicesModule { }
