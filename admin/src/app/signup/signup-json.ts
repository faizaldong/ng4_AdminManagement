import { Injectable } from '@angular/core';

@Injectable()
export class Json {


  adminArr=[]
  branchArr=[]

  constructor() { }

  errorstatusfalse(data){
    let error=[]
    if(data.company_registration_no){ $.each(data.email, function(i,v){ error.push('Company registration number '+v) })}
    if(data.company_name){ $.each(data.email, function(i,v){ error.push('Company name '+v) })}
    if(data.contact_no){ $.each(data.email, function(i,v){ error.push('Contact number '+v) })}
    if(data.first_name){ $.each(data.email, function(i,v){ error.push('First name '+v) })}
    if(data.password){ $.each(data.email, function(i,v){ error.push('Password '+v) })}
    if(data.email){ $.each(data.email, function(i,v){ error.push('Email '+v) })}

    return error
  }

  usedjquery(){
    $(function() {$(".preloader").fadeOut();});
    $(function() {(<any>$('[data-toggle="tooltip"]')).tooltip()});
    $('#to-recover').on("click", function() {$("#loginform").slideUp(); $("#recoverform").fadeIn();});
    $('#to-login').on("click", function() {$("#loginform").slideDown(); $("#recoverform").hide();});
  }

}
