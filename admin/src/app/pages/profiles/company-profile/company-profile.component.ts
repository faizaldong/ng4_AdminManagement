import { Component, OnInit } from '@angular/core';
import {Json} from './company-profile-json'
import {environment} from '../../../../environments/environment'
import {BreadService} from '../../../services/bread/bread.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css', '../../../../assets/css/pages/accounts.css']
})
export class CompanyProfileComponent implements OnInit {

  companyprofile={company_logo: '', company_name: '', email: '', address: '', contact_no: '', fax_no: '', company_registration_no: '', application_company_addresses: [], subscription_plan_id: 1}
  branch={name: '', email: '', addresss: '', tel_no: '', fax_no: ''}
  branchdeleteModal={}
  subscribeplans=[]

	company:any;
	showbranch:string='true'
  havebranch:boolean=true; updateDisable:boolean=false; showupdateAlert:boolean=false
  constructor(private bread: BreadService, private _j: Json, private checkpermission:PermissionsallowedService) { }

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Admins','Admin Update Profile')
    this.bread.Get(environment.companyaddlistshowedit_API).subscribe(good=>{this.company = good.json(); this._j.assignData(this.company, this.companyprofile)})
    this.bread.Get(environment.applicationplanaddlistshowedit_API).subscribe(good=>{this.subscribeplans = good.json().result})
  }

  closeAlertLogin(){
    this.showupdateAlert=false
  }

  getcompanyLogo(event) {
    let files = event.target.files;
    let file = files[0];
    if (files && file) {
      let myReader:FileReader = new FileReader();
          myReader.onloadend = (e) => {
            let image = myReader.result;
            this.bread.webUpload(environment.webuploadbase64_API, this._j.webUpload64(image)).subscribe(good=>{this.companyprofile.company_logo = good.json().result[0].image_url})
          }
          myReader.readAsDataURL(file);
    }
  }

  subscribed(subscriptionplanid){
    this.companyprofile.subscription_plan_id=parseInt(subscriptionplanid)
  }

  showBranch(event){
  	if(event=='true'){
  		this.showbranch='true'
      this.havebranch=true
  	}else{this.showbranch='false'; this.havebranch=false} 
  }

  insertBranch(){
    this.companyprofile.application_company_addresses.push(this._j.addBranch(this.branch)) 
  }

  deleteBranchmodal(index, branch){
    this.branchdeleteModal = this._j.deleteBranchModal(index, branch)
  }

  deleteBranch(){
    this.companyprofile.application_company_addresses.splice(this._j.deleteBranch(this.branchdeleteModal), 1)
  }

  updateProfile(){
    if(!this.havebranch){ this.companyprofile.application_company_addresses=[]}
    // console.log(this.companyprofile)
    this.updateDisable=true
    this.bread.Put(environment.companyaddlistshowedit_API+"/"+this.company.result.id, this.companyprofile).subscribe(good=>{this.companyprofile.application_company_addresses= good.json().result.application_company_addresses; this.updateDisable=false; this.showupdateAlert=true}, bad=>{console.log(bad.json()); this.updateDisable=false})
  }

}
