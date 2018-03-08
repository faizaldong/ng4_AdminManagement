import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpgradePlansComponent } from './upgrade-plans.component';
import { Json } from './upgrade-plans-json'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Upgrade Plan',
        // urls: [{title: 'Upgrade Plan',url: '/upgrade-plans'},{title: 'Upgrade Plan'}]
    },
	component: UpgradePlansComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [UpgradePlansComponent],
  providers: [Json]
})
export class UpgradePlansModule { }
