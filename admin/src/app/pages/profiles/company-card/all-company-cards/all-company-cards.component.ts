import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { environment } from '../../../../../environments/environment'
import { BreadService } from '../../../../services/bread/bread.service'
import {PermissionsallowedService} from '../../../../services/permissionsallowed/permissionsallowed.service'

@Component({
  selector: 'app-all-company-cards',
  templateUrl: './all-company-cards.component.html',
  styleUrls: ['./all-company-cards.component.css']
})
export class AllCompanyCardsComponent implements OnInit {

  constructor(private router: Router, private bread: BreadService, private checkpermission:PermissionsallowedService) { }

  vaults:any; vaultid:any; vaultccid:any; vaultisactive:any; token:any
  vaulttext:string=''; deletetext:string='Vault Card'
  vaultshowerror:boolean=false; deletedisabled:boolean=false; havepermadd:boolean=false; havepermdelete:boolean=false; havepermshow:boolean=false
  id=[]
  vault={result: { cc_id: ''}}

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Application Vault','List Application Vault')
    this.havepermadd=this.checkpermission.checkgroupwithpermissionforhtmlview('Application Vault','Create Application Vault')
    this.havepermdelete=this.checkpermission.checkgroupwithpermissionforhtmlview('Application Vault','Destroy Application Vault')
    this.havepermshow=this.checkpermission.checkgroupwithpermissionforhtmlview('Application Vault','Update Application Vault')
    this.bread.Get(environment.paypal_token).subscribe(good=>{this.token=good.json().result.access_token})
  	this.kendoRead()
  }

  kendoRead(){
  	this.bread.Get(environment.vaultscreateupdatedelete_API).subscribe(good=>{ this.vaults = good.json().result})
  }

  closealertvault(){
    this.vaultshowerror=false
  }

  addvault(){
  	this.router.navigate(['/add-company-card'])
  }

  editvault(id){
    this.router.navigate(['/edit-company-card', { id: id }]);
  }

  deletevaultmultiple(){
    if(this.id.length==0){this.vaulttext='Please tick atleast 1 checkbox'; this.vaultshowerror=true; return}
    this.vaultshowerror=false
    this.deletedisabled=true
    this.deletetext='deleting..'
  	this.bread.Delete(environment.vaultscreateupdatedelete_API+'/'+this.id).subscribe(good=>{this.kendoRead();this.deletedisabled=false;this.deletetext='Vault Card'})
  }

  checkboxes(e) {
  	this.id = e.join()
  }

  pageChange(event){
    console.log(event)
  }

}
