import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'
import { BreadService } from '../../services/bread/bread.service';
import { AuthenticateService } from '../../services/authenticate/authenticate.service'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit, OnInit {

  public static updateUserStatus: Subject<boolean> = new Subject();

  menuservices:any; adminaccess:any

  constructor(private router:Router, private authenticate: AuthenticateService, private bread: BreadService) {
    //WHEN USER UPDATE ADMIN SERVICES [EDIT ACCOUNT]
    SidebarComponent.updateUserStatus.subscribe(res => {
      this.adminaccess = JSON.parse(localStorage.getItem('menuapps'));
      this.bread.Get(environment.applicationregistration_API).subscribe(good=>{ this.menuservices=this._json(good.json().result, this.adminaccess)}, bad=>{console.log(bad.json())})
    })

    //PAGE RELOAD
    let allservices = JSON.parse(localStorage.getItem('credential')).owner_info.application_registrations //FROM BEARER
    let updatedapps = JSON.parse(localStorage.getItem('menuapps')) //FROM EDIT ACCOUNT
    if(updatedapps){this.bread.Get(environment.applicationregistration_API).subscribe(good=>{ this.menuservices=this._json(good.json().result, updatedapps)}, bad=>{console.log(bad.json())})}
    else{this.bread.Get(environment.applicationregistration_API).subscribe(good=>{ this.menuservices=this._json(good.json().result, allservices)}, bad=>{console.log(bad.json())})}
  }

  ngOnInit(){ }

  _json(allservices, adminservices){
    $.each(allservices, function(i,v){
      $.each(adminservices, function(j,k){
        if(v.id==k.id){ allservices[i].is_true=true }
      }) 
    })
    return allservices
  }

  redirectportal(portalname){
    let pname=portalname.toLowerCase()
    let credential_token=JSON.parse(localStorage.getItem('credential_token'))
    if(this.authenticate.istokenActive(credential_token)){
      if(pname=='wms'){ window.open(environment.wmsportal_APP+"/"+credential_token.access_token+"/"+credential_token.refresh_token+"/"+credential_token.expires_in, '_blank'); }
      if(pname=='lds'){ window.open(environment.ldsportal_APP+"/"+credential_token.access_token+"/"+credential_token.refresh_token+"/"+credential_token.expires_in, '_blank'); }
      if(pname=='finance'){ window.open(environment.ldsportal_APP+"/"+credential_token.access_token+"/"+credential_token.refresh_token+"/"+credential_token.expires_in, '_blank'); }
      if(pname=='hr'){ window.open(environment.ldsportal_APP+"/"+credential_token.access_token+"/"+credential_token.refresh_token+"/"+credential_token.expires_in, '_blank'); }
    }
  }


  ngAfterViewInit() {
    $(function () {
        // var url = window.location.toString();
        // var element = $('ul#sidebarnav a').filter(function () {
        //     let a = <HTMLAnchorElement>this;
        //     return (a.href == url ? true : false);
        // }).addClass('active').parent().addClass('active');
        // while (true) {
        //     if (element.is('li')) {
        //         element = element.parent().addClass('in').parent().addClass('active');
        //     }
        //     else {
        //         break;
        //     }
        // }

        (<any>$('#sidebarnav')).metisMenu();
    });
  }
}
