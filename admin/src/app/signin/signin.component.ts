import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from '../../environments/environment'
import {BreadService} from '../services/bread/bread.service'
import { AlertsService } from '../services/alerts/alerts.service';
import {Json} from './signin-json'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit {

  constructor(private arouter:ActivatedRoute, private router: Router, private _json:Json, private bread:BreadService, private _alert: AlertsService) { }
  signindata={email:'',password:'',scope: "admin", grant_type: "password", require_design_settings: true}
  resetpassword={email:''}
  signinbuttondisabled:boolean=false; resetbuttondisabled:boolean=false; alertrecoverpasswordopen:boolean=false; alertloginopen:boolean=false
  portalname:any; alert:any
	signintext:string='Sign In'

  ngOnInit() {
  	this.arouter.queryParams.subscribe(params=>{ if(params&&params.portal){ if(params.portal=='auth'){this.router.navigate(['/login']); return}; this.portalname=params.portal}else{this.router.navigate(['/login'])} });
  }

  signin(){
  	this.signinbuttondisabled=true
  	this.signintext='Signing..'
  	if(this.signindata.email!=''&&this.signindata.password!=''){
  		this.bread.PostnoBearer(environment.customlogin_API, this.signindata).subscribe(
        good=>{this.signinbuttondisabled=false; this.signintext='Sign In'; 
                if( this._json.checkappname(good.json(), this.portalname) ){this._json.redirectportal(good.json(), this.portalname)}
                else{this.alert=this._alert.warning('You dont have any grant to access '+this.portalname+' portal or the portal doesnt exist'); this.alertloginopen=true}
              },
        bad=>{this.signinbuttondisabled=false; this.signintext='Sign In'; console.log(bad.json())})
  	}
  }
  closeAlertLogin(){
    this.alertloginopen=false
  }

  reset(){
  	console.log(this.resetpassword)
  	if(this.resetpassword.email!=''){this.bread.PostnoBearer(environment.forgotpassword_API, this.resetpassword).subscribe(good=>{this.alert=this._alert.success('Email has been sent'); this.alertrecoverpasswordopen=true}, bad=>{console.log(bad.json())} )}
  }
  closealertrecoverpassword(){
  	this.alertrecoverpasswordopen=false
  }

  signuppage(){
    localStorage.setItem('portalname', this.portalname)
    this.router.navigate(['/signup'])
  }

  ngAfterViewInit() {
  	this._json.usedjquery()    
  }

}
