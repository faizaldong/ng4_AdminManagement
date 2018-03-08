import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router'
import { environment } from '../../environments/environment'
import {BreadService} from '../services/bread/bread.service'
import {Json} from './signup-json'
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: Http, private bread: BreadService, private router: Router, private _j: Json) { }
  signup={company_registration_no:'',company_name:'',contact_no:'',admins:[{first_name:'',password:'',email:''}]}
  passwordtype:string='password'; passwordicon:string='fa fa-eye-slash'
  nameerrortext:string='Name is required'; passworderrortext:string='Password is required'; emailerrortext:string='Email is required'; companynameerrortext:string='Company Name is required'; contactnoerrortext:string='Company Contact Number is required'; companyregerrortext:string='Company Registration Number is required'  
  passwordhide:boolean=true; nameinvalid:boolean=false; passwordinvalid:boolean=false; emailinvalid:boolean=false; companynameinvalid:boolean=false; contactnoinvalid:boolean=false; companyregnoinvalid:boolean=false; showalertsignup:boolean=false; disabledbutton:boolean=false
  erroralerttext=[]

  ngOnInit() {
    this._j.usedjquery()
  }

  hidepassword(){
    if(this.passwordhide){ this.passwordtype='text'; this.passwordicon='fa fa-eye hide'; this.passwordhide=false}
    else{this.passwordtype='password'; this.passwordicon='fa fa-eye-slash'; this.passwordhide=true}
  }

  signupsubmit(){
    //START VALIDATE FIELD
    if(this.signup.admins[0].first_name==""){this.nameinvalid=true; return};this.nameinvalid=false
    if(this.signup.admins[0].password==""){this.passwordinvalid=true; return};this.passwordinvalid=false
    if(this.signup.admins[0].email==""){this.emailinvalid=true; return};this.emailinvalid=false
    if(this.signup.company_name==""){this.companynameinvalid=true; return};this.companynameinvalid=false
    if(this.signup.contact_no==""){this.contactnoinvalid=true; return};this.contactnoinvalid=false
    if(this.signup.company_registration_no==""){this.companyregnoinvalid=true; return};this.companyregnoinvalid=false
    //END VALIDATE FIELD
    this.disabledbutton=true
    this.bread.PostnoBearer(environment.signup_API, this.signup).subscribe(good=>{this.disabledbutton=false; this.router.navigate(['/login'])},
      bad=>{this.disabledbutton=false
            this.showalertsignup=true
            this.erroralerttext = this._j.errorstatusfalse(bad.json().error)
            console.log(this.erroralerttext)
      })
  }

  closealertsignup(){
    this.showalertsignup=false
  }

  haveaccount(){
    if(localStorage.getItem("portalname")){ window.location.href='signinportal?portal='+localStorage.getItem("portalname"); localStorage.removeItem('portalname')}
    else{this.router.navigate(['/login'])}
  }

}
