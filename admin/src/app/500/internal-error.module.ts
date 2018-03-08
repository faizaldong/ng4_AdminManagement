import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InternalErrorComponent } from './internal-error.component'
import { InternalErrorRoutingModule } from './internal-error-routing.module'
import { Json } from './internal-error-json'

@NgModule({
  imports: [
  	InternalErrorRoutingModule,
    CommonModule,
    RouterModule
  ],
  declarations: [InternalErrorComponent],
  providers: [Json]
})
export class InternalErrorModule { }
