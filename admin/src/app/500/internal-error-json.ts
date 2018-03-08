import {Injectable} from '@angular/core';

@Injectable()
export class Json{

	usedjquery(){
    $(function() {$(".preloader").fadeOut();});
    $(function() {(<any>$('[data-toggle="tooltip"]')).tooltip()});
    $('#to-recover').on("click", function() {$("#loginform").slideUp(); $("#recoverform").fadeIn();});
    $('#to-login').on("click", function() {$("#loginform").slideDown(); $("#recoverform").hide();});
  }

}