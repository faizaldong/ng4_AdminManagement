import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate/authenticate.service';
import { environment } from '../../environments/environment';
import { BreadService } from '../services/bread/bread.service'
import { AlertsService } from '../services/alerts/alerts.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

    constructor(
      private arouter:ActivatedRoute,
      public router: Router,
      public alertsS: AlertsService,
      private authenticateS: AuthenticateService,
      private bread: BreadService
    ) {}

    username:string=""; password:string=""; email:string=""; logintext:string="Sign In"
    alertLoginOpen:boolean=false; alertRecoverPasswordOpen:boolean=false; loginClicked:boolean=false; reset:boolean=false; resetClicked:boolean=true;
    alert = {};

    ngOnInit() {
      let credential=JSON.parse(localStorage.getItem('credential'))
      if(credential && credential.token.access_token){this.authenticateS.istokenActive(credential)}
    }

    closeAlertLogin(){
      this.alertLoginOpen=false
    }

    closeAlertRecoverPassword(){
      this.alertRecoverPasswordOpen=false
    }

    SignIn(){
      if((this.username&&this.password)!=""){
        this.loginClicked=true;
        this.logintext='Signing..'
        this.bread.PostnoBearer(environment.customlogin_API, {email: this.username, password: this.password, scope: "admin", grant_type: "password", require_design_settings: true}).subscribe(
          good=>{ const credential = JSON.parse(good['_body'])
                  localStorage.setItem('timeto_expired', JSON.stringify(new Date()))
                  localStorage.setItem('credential', JSON.stringify(credential))
                  localStorage.setItem('credential_token', JSON.stringify(credential.token))
                  window.location.replace("/dashboard") // this.router.navigate(['/dashboard'])
                },
          bad =>{this.loginClicked=false;this.logintext='Signing..'; this.alert=this.alertsS.danger('The username or password you entered is invalid'); this.alertLoginOpen=true; console.log(bad.json()) }
        )
      }else{
        this.alert=this.alertsS.warning('Oops! Please enter your email address and password in order to login'); this.alertLoginOpen=true
      }
    }

    Reset(){
      if(this.email!=""){
        this.reset=true; this.resetClicked=false
        this.bread.PostnoBearer(environment.validateemail_API, {email: this.email}).subscribe(
          good=> {
            this.bread.PostnoBearer(environment.forgotpassword_API, {email: this.email, proper_mail: this.email})
              .subscribe(
                good => {
                  this.reset=false; this.resetClicked=true
                  this.alert = this.alertsS.success('Please check your email for a message with your code');
                  this.alertRecoverPasswordOpen=true
                  this.router.navigate(['/login'])
                }
              )
          },
          bad => { this.reset=false; this.resetClicked=true; this.alert=this.alertsS.danger('Email not exist.'); this.alertRecoverPasswordOpen=true }
        )
      }else{
        this.alert = this.alertsS.warning('Oops! Please enter your email address'); this.alertRecoverPasswordOpen=true
      }
    }


    ngAfterViewInit() {
        $(function() {
            $(".preloader").fadeOut();
        });
        $(function() {
            (<any>$('[data-toggle="tooltip"]')).tooltip()
        });
        $('#to-recover').on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
        $('#to-login').on("click", function() {
            $("#loginform").slideDown();
            $("#recoverform").hide();
        });
    }

}
