import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router'
import { environment } from '../../environments/environment'
import {BreadService} from '../services/bread/bread.service'
import {Json} from './signup-json-bc'
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

		company={company_registration_no:'', company_name:'', company_logo:'', email:'', contact_no:'', unit_no:'', building_no:'', address:'', postal_code:'', subscription_plan_id:1, admins:[], application_company_addresses:[], requested_admin:'', requested_device:''}
		admin={add_first_name:'', add_last_name:'', add_address:'', add_postal_code:'', add_contact_no:'', add_email:'', add_password:''}
		branch={add_branch_name:'', add_branch_email:'', add_branch_tel_no:'', add_branch_fax_no:'', add_name:'', add_address:'', add_postal_code:'', add_district_id:'', add_building_no:'', add_unit_no:''}
		adminedit={}; branchedit={}
		admins=[]; application_company_addresses=[]

		agreeterm:boolean=false; showtermcheckbox:boolean=false; signupdisabled:boolean=false

    constructor(private http: Http, private bread: BreadService, private router: Router, private _j: Json) { }

    ngOnInit() {
        this._j.usedjquery()
    }

    insertAdmin(){
    	if((this.admin.add_first_name&&this.admin.add_email&&this.admin.add_address&&this.admin.add_contact_no&&this.admin.add_password)!=""){
    		this.admins = this._j.addAdmin(this.admin)
    		$('#addAdmin').modal('toggle')
    	}
    }

    modaleditAdmin(index, admin){
    	this.adminedit = this._j.modaleditAdmin(index, admin)
    }
    
    editAdmin(){
    	this._j.editAdmin(this.admins, this.adminedit)
    	$('#editAdmin').modal('toggle')
    }

    deleteAdmin(index){
    	this.admins.splice(index, 1)
    }

    insertBranch(){
    	if((this.branch.add_branch_name&&this.branch.add_branch_email&&this.branch.add_address&&this.branch.add_branch_tel_no&&this.branch.add_branch_fax_no)!=""){
        this.application_company_addresses = this._j.addBranch(this.branch)
        $('#addBranch').modal('toggle')
      }
    }

    modaleditBranch(index, branch){
    	this.branchedit = this._j.modaleditBranch(index, branch)
    }

    editBranch(){
    	this._j.editBranch(this.application_company_addresses, this.branchedit)
    	$('#editBranch').modal('toggle')
    }

    deleteBranch(index){
    	this.application_company_addresses.splice(index, 1)
    }

    signup(){
    	if(!this.agreeterm){this.showtermcheckbox=true; return}
  		this.showtermcheckbox=false
    	this.company.admins=this.admins
    	this.company.application_company_addresses=this.application_company_addresses
      this.signupdisabled=true
    	this.bread.PostnoBearer(environment.signup_API, this.company).subscribe(good=>{this.signupdisabled=true; this.router.navigate(['/login'])}, bad=>{console.log(bad.json()); this.signupdisabled=false})
    }

    haveaccount(){
      if(localStorage.getItem("signinportal")){ window.location.href='signinportal?portal=lds'; localStorage.removeItem('signinportal')}
      else{this.router.navigate(['/login'])}
    }
}
