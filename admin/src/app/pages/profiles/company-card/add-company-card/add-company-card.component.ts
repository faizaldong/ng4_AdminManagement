import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {BreadService} from '../../../../services/bread/bread.service'
import {environment} from '../../../../../environments/environment'
import {Json} from './add-company-card-json'
import {PermissionsallowedService} from '../../../../services/permissionsallowed/permissionsallowed.service'
declare var $ :any; //to used jquery

@Component({
  selector: 'app-add-company-card',
  templateUrl: './add-company-card.component.html',
  styleUrls: ['./add-company-card.component.css']
})
export class AddCompanyCardComponent implements OnInit {

  constructor(private bread: BreadService, private router: Router, private _json: Json, private checkpermission:PermissionsallowedService) { }

  data= {external_customer_id:'', number:'', type:'', expire_month:'', expire_year:'', first_name:'', last_name:'', billing_address: { line1:'', city:'', country_code:'', postal_code:'', state:'', phone:''}}
	token:any; id:any; error:any; cardvalidate:any; 
  buttontext:string='Save'; iconpay=''; visa:string=''; mastercard:string=''; amex:string=''
  buttondisabled:boolean=false; showerror:boolean=false

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Application Vault','Create Application Vault')
  	this.bread.Get(environment.paypal_token).subscribe(good=>{this.token=good.json().result.access_token})
    this.usedjquery()
  }

  closealertvault(){
    this.showerror=false
  }

  creditcardvalidate(event){
    this.visa=''
    this.mastercard=''
    this.amex=''

    if ($.payform.parseCardType(event)=='visa'){this.mastercard='transparent';this.amex='transparent'; this.data.type=$.payform.parseCardType(event)}
    else if ($.payform.parseCardType(event)=='mastercard'){this.visa='transparent';this.amex='transparent'; this.data.type=$.payform.parseCardType(event)} 
    else if ($.payform.parseCardType(event)=='amex'){this.visa='transparent';this.mastercard='transparent'; this.data.type=$.payform.parseCardType(event)}

    this.data.billing_address.country_code = $("#country").countrySelect("getSelectedCountryData").iso2.toUpperCase()
  }

  updatecompanycard(){
    // console.log(this.data)
    this.buttontext='Saving..'
    this.iconpay='fa fa-circle-o-notch fa-spin fa-fw'
    this.buttondisabled=true
    this.showerror=false
    this.bread.Post(environment.vaultscreateupdatedelete_API, {is_active:true}).subscribe(
      good=>{this.data.external_customer_id=good.json().token; this.id=good.json().result.id;
             this.bread.PostVault(this.data, this.token).subscribe(
               good=>{
                 this.bread.Put(environment.vaultscreateupdatedelete_API+"/"+this.id, {cc_id:good.json().id}).subscribe(
                   good=>{this.router.navigate(['/all-company-card'])},
                   bad=>{console.log(bad.json())})
               },
               bad=>{this.buttondisabled=false;this.buttontext='Save';this.iconpay=''; this.showerror=true; this.error = this._json.customizeerror(bad.json().details)})
      })
  }

  usedjquery(){
    $('#cardNumber').payform('formatCardNumber');
    $("#country").countrySelect();
  }

}


//visa: 4293120722484296
//mastercard: 5281037048916168
//amex: 342498818630298