import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './access-denied.component'
import { AccessDeniedRoutingModule } from './access-denied-routing.module'
import { Json } from './access-denied-json'

@NgModule({
  imports: [
  	AccessDeniedRoutingModule,
    CommonModule,
    RouterModule
  ],
  declarations: [AccessDeniedComponent],
  providers: [Json]
})
export class AccessDeniedModule { }