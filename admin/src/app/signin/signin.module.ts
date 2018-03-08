import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { Json } from './signin-json';


@NgModule({
  imports: [
    CommonModule,
    SigninRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [SigninComponent],
  providers: [Json]
})
export class SigninModule { }
