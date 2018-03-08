import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Json} from './all-devices-json';
import { DevicesComponent } from './all-devices.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Device Management',
        urls: [{title: 'Device Management',url: '/devices'},{title: 'Device Management Page'}]
    },
	component: DevicesComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		GridModule,
    NgbModule,
    FormsModule
  ],
  declarations: [DevicesComponent],
  providers: [Json]
})
export class DevicesModule { }
