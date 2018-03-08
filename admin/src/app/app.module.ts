import * as $ from 'jquery';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
// import { GridModule } from '@progress/kendo-angular-grid';

import { AuthGuard } from './shared/guard/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthenticateService } from './services/authenticate/authenticate.service';
import { BreadService } from './services/bread/bread.service';
import { AlertsService } from './services/alerts/alerts.service';
import { RoleService } from './services/role/role.service';
import { PermissionsallowedService } from './services/permissionsallowed/permissionsallowed.service';
import { Json } from './app-json';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule, AppRoutingModule],
  providers: [AuthGuard, AuthenticateService, BreadService, AlertsService, RoleService, PermissionsallowedService, Json],
  bootstrap: [AppComponent]
})
export class AppModule { }
