import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { KendoComponent } from './kendo.component'


const routes: Routes = [{
	path: '',
	data: {
        title: 'Kendo Page',
        urls: [{title: 'Dashboard',url: '/'},{title: 'Kendo Page'}]
    },
	component: KendoComponent
}];

@NgModule({
  imports: [ GridModule, RouterModule.forChild(routes), ButtonsModule ],
  declarations: [ KendoComponent ],
  bootstrap:    [ KendoComponent ]
})
export class KendoModule { }
