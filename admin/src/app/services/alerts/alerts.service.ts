import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {

  constructor() { }

  alert = {}

  success(msg){
    return this.alert = {type: 'success', message: msg}
  }

  info(msg){
    return this.alert = {type: 'info', message: msg}
  }

  warning(msg){
    return this.alert = {type: 'warning', message: msg}
  }

  danger(msg){
    return this.alert = {type: 'danger', message: msg}
  }

}
