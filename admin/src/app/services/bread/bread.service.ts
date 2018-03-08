import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Router} from '@angular/router'
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { environment } from '../../../environments/environment'
import { AuthenticateService } from '../authenticate/authenticate.service'

@Injectable()
export class BreadService {

  credential_token=JSON.parse(localStorage.getItem('credential_token'))

  constructor(private authenticate: AuthenticateService, private http: Http, private router: Router){ }

  Get(pathAPI){
    if(this.authenticate.istokenActive(this.credential_token)){
      const url = environment.authAPI+pathAPI
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('app-name', 'AUTH')
      headers.append('Authorization', this.credential_token.token_type+" "+this.credential_token.access_token)

      return this.http.get(url, {headers: headers})
    }
  }
  Post(pathAPI, data){
    if(this.authenticate.istokenActive(this.credential_token)){
      const url = environment.authAPI+pathAPI
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('app-name', 'AUTH')
      headers.append('Authorization', this.credential_token.token_type+" "+ this.credential_token.access_token)
      const body = JSON.stringify(data)

      return this.http.post(url, body, {headers: headers})
    }
  }
  Put(pathAPI, data){
    if(this.authenticate.istokenActive(this.credential_token)){
      const url = environment.authAPI+pathAPI
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('app-name', 'AUTH')
      headers.append('Authorization', this.credential_token.token_type+" "+ this.credential_token.access_token)
      const body = JSON.stringify(data)

      return this.http.put(url, body, {headers: headers})
    }
  }
  Delete(pathAPI){
    if(this.authenticate.istokenActive(this.credential_token)){
      const url = environment.authAPI+pathAPI
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('app-name', 'AUTH')
      headers.append('Authorization', this.credential_token.token_type+" "+ this.credential_token.access_token)

      return this.http.delete(url, {headers: headers})
    }
  }

  PostVault(data, token){
    if(this.authenticate.istokenActive(this.credential_token)){
      const url = environment.paypal_vault
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', "Bearer "+ token)
      const body = JSON.stringify(data)

      return this.http.post(url, body, {headers: headers})
    }
  }
  PatchVault(data, cc_id, token){
    if(this.authenticate.istokenActive(this.credential_token)){
      const url = environment.paypal_vault+cc_id
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', "Bearer "+ token)
      const body = JSON.stringify(data)

      return this.http.patch(url, body, {headers: headers})
    }
  }
  DeleteVault(cc_id, token){
    if(this.authenticate.istokenActive(this.credential_token)){
      const url = environment.paypal_vault+cc_id
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', "Bearer "+ token)

      return this.http.delete(url, {headers: headers})
    }
  }

  PostnoBearer(pathAPI, data){
    const url = environment.authAPI+pathAPI
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const body = JSON.stringify(data)

    return this.http.post(url, body, {headers: headers})
  }

  webUpload(pathAPI, data){
    if(this.authenticate.istokenActive(this.credential_token)){
      const url = environment.authAPI+pathAPI
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('app-name', 'AUTH')
      headers.append('Authorization', this.credential_token.token_type+" "+ this.credential_token.access_token)
      const body = JSON.stringify(data)

      return this.http.post(url, body, {headers: headers})
    }
  }

}