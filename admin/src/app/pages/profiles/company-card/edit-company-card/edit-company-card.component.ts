import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {environment} from '../../../../../environments/environment'
import {BreadService} from '../../../../services/bread/bread.service'
import {Json} from './edit-company-card-json'
import {PermissionsallowedService} from '../../../../services/permissionsallowed/permissionsallowed.service'
declare var $ :any; //to used jquery

@Component({
  selector: 'app-edit-company-card',
  templateUrl: './edit-company-card.component.html',
  styleUrls: ['./edit-company-card.component.css']
})
export class EditCompanyCardComponent implements OnInit {

  constructor(private _aroute: ActivatedRoute, private router: Router, private bread: BreadService, private _json:Json, private checkpermission:PermissionsallowedService) { }
  data = {'id':'', 'external_customer_id':'', 'first_name':'', 'last_name':'', 'expire_year':'', 'expire_month':'', 'number':'', 'type':'', 'billing_address': {'line1':'', 'postal_code':'', 'city':'', 'state':'', 'country_code':'', 'phone':''}}
  id:any; token:any; error:any; cardvalidate:any; 
  buttondisabled:boolean=true; showerror:boolean=false
  buttontext:string='Save'; iconpay=''; cardtype:string=''

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Application Vault','Update Application Vault')
  	this._aroute.params.subscribe(params => {
  		if(!params.id){ this.router.navigate(['/all-company-card']); return};
  		this.bread.Get(environment.vaultscreateupdatedelete_API+"/"+params.id).subscribe(good=>{ if(!good.json().result){this.router.navigate(['/all-company-card']); return}; this.data = good.json().result.card_detail; this.cardtype=this.data.type; this.buttondisabled=false; this.usedjquery()})
  	});
  	this.bread.Get(environment.paypal_token).subscribe(good=>{this.token=good.json().result.access_token})
  }

  closealertvault(){
  	this.showerror=false
  }

  updatecompanycard(){
  	this.buttondisabled=true
  	this.buttontext='Saving..'
  	this.iconpay='fa fa-circle-o-notch fa-spin fa-fw'
    this.data.billing_address.country_code = $("#country").countrySelect("getSelectedCountryData").iso2.toUpperCase()
  	let data = this._json.customedata(this.data)
  	this.bread.PatchVault(data, this.data.id, this.token).subscribe(
  		good=>{this.router.navigate(['/all-company-card'])},
  		bad=>{this.buttondisabled=false;this.buttontext='Save';this.iconpay=''; this.showerror=true; this.error = this._json.customizeerror(bad.json().details)}
  		)
  }

  usedjquery(){
    $("#country").countrySelect();
    $("#country").countrySelect("selectCountry", this.data.billing_address.country_code.toLowerCase());
  }

}
