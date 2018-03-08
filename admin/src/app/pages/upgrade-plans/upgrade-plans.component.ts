import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { environment } from '../../../environments/environment'
import { BreadService } from '../../services/bread/bread.service'
import { Json } from './upgrade-plans-json'

@Component({
  selector: 'app-upgrade-plans',
  templateUrl: './upgrade-plans.component.html',
  styleUrls: ['../../../assets/css/pages/subscription.css']
})
export class UpgradePlansComponent implements OnInit {

	appscached:any; apps:any; updateapps:any; appname:any; checkstorage:any
  enablecheckout:boolean=false
  checkoutot:number=0
  tabpaymenttype:String='Monthly'

  constructor(private bread: BreadService, private _json: Json, private router:Router) { }

  ngOnInit() {
    localStorage.removeItem('addplans')
    this.checkstorage = localStorage.getItem('addplans')
  	this.bread.Get(environment.applicationplancollectionlistshow_API+"?group=true").subscribe(good=>{ localStorage.setItem('data',JSON.stringify( good.json().result)); this.apps = this._json.planbasedonpaymenttype(JSON.parse(localStorage.getItem('data')), this.tabpaymenttype) })
  }

  paymenttype(appname, apps, paymenttype){
    let data = JSON.parse(localStorage.getItem('data'))

    this.tabpaymenttype=paymenttype
    this.updateapps=apps
    this.appname=appname
    this.apps = this._json.planbasedonpaymenttypechose(data, this.updateapps, this.appname, this.tabpaymenttype);
  }

  addorcontactaction(appsindex, apps, plan,){
    
    if(plan.plan_name!='ENTERPRISE'){
      this.apps = this._json.planselected(appsindex, apps, plan)
      localStorage.setItem('addplans', JSON.stringify(this._json.addplan(apps[appsindex], plan, this.checkstorage)))
      this.checkstorage = JSON.parse(localStorage.getItem('addplans'))
      if(this.checkstorage.length>0){this.checkoutot=this.checkstorage.length; this.enablecheckout=true}
    }else{
      window.open('http://coolasia.net/contact-us/', '_blank');
    }
  }

  checkout(){
    this.router.navigate(['/payment'])
  }

}
