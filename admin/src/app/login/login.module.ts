import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { Json } from './login-json';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        NgbModule.forRoot(),
    ],
    declarations: [LoginComponent],
    providers: [Json]
})
export class LoginModule {
}