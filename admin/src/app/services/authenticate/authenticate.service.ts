import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Router } from '@angular/router'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from '../../../environments/environment'

@Injectable()
export class AuthenticateService {

  constructor(private http: Http, private router: Router) { }

  istokenActive(credential){
    if(credential){
      let timeloginStore = moment.duration(moment().diff(moment(JSON.parse(localStorage.getItem('timeto_expired'))))).asSeconds()
      let timetoRefresh = 6300 //1.45hours[*15minutes before 2hours need to refresh]

      if(timeloginStore <= timetoRefresh){ //console.log('noneedtorefresh')
        if(this.router.url=='/login'){this.router.navigate(['/dashboard'])}
        return true
      }else{ //15minutes to get expired console.log('needtorefresh')
        return this.refreshToken(credential).then(
          good => {
            if(good){
              if(this.router.url=='/login'){this.router.navigate(['/dashboard'])}
              return true
            }
          },
          bad => {this.logout()}
        )
      }
    }else{
      this.logout()
    }
  }

  refreshToken(credential){
    const url = environment.authAPI+environment.refreshexpiredtoken_API
    const headers = new Headers()
    headers.append('Content-Type','application/json')
    headers.append('app-name', 'AUTH')
    const body = JSON.stringify({grant_type: 'refresh_token' , refresh_token: credential.refresh_token})
    return this.http.post(url, body, {headers: headers})
    .map(
      good => {
        let credential = JSON.parse(good['_body'])
        localStorage.setItem('timeto_expired', JSON.stringify(new Date()))
        localStorage.setItem('credential_token', JSON.stringify(credential))
        window.location.reload()
        return true
      },
      bad => {
        console.log(bad)
      }
    )
    .toPromise()
  }

  logout(){
    window.location.replace("/login")//this.router.navigate(['/login']);
    localStorage.clear();
    return false
  }

}
