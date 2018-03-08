import {Injectable} from '@angular/core'
import {environment} from '../../environments/environment'

@Injectable()
export class Json{

  checkappname(appnames, portalrequested){
    let appnamecheck = appnames.owner_info.application_registrations.filter(function(v){if(v.name.toLowerCase()==portalrequested){return v}})
    if(appnamecheck.length==0){return false}else{return true}
  }
  
  redirectportal(credential,portalname){
    if(portalname=='wms'){ window.location.replace(environment.wmsportal_APP+"/"+credential.token.access_token+"/"+credential.token.refresh_token+"/"+credential.token.expires_in); }
    if(portalname=='lds'){ window.location.replace(environment.ldsportal_APP+"/"+credential.token.access_token+"/"+credential.token.refresh_token+"/"+credential.token.expires_in); }
  }
	

  usedjquery(){
  	$(function() {$(".preloader").fadeOut();});
    $(function() {(<any>$('[data-toggle="tooltip"]')).tooltip()});
    $('#to-recover').on("click", function() {$("#loginform").slideUp(); $("#recoverform").fadeIn();});
    $('#to-login').on("click", function() {$("#loginform").slideDown(); $("#recoverform").hide();});
  }

} 
