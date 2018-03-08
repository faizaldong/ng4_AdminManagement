import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { environment } from '../../../../environments/environment'
import { BreadService } from '../../../services/bread/bread.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'
import { Json } from './add-accounts-json'

@Component({
  selector: 'app-add-accounts',
  templateUrl: './add-accounts.component.html',
  styleUrls: ['./add-accounts.component.css', '../../../../assets/css/pages/accounts.css']
})
export class AddAccountsComponent implements OnInit {

  constructor(private router: Router, private bread: BreadService, private checkpermission:PermissionsallowedService, private _json:Json) {}

  admin = {first_name: '', email: '', role_id: '', application_registration_ids: '', is_default_password: true}
  nameInvalid:boolean = false; emailInvalid:boolean = false; serviceInvalid:boolean = false; roleInvalid:boolean = false; roleOptions:boolean = true; createDisable:boolean=false
  roles: any; allroles:any; createrole:boolean=false; apps: any; appSelected=[]

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Administrator','Administrator Add')
    this.bread.Get(environment.roleaddlistupdatedelete_API).subscribe(good => {this.roles = good.json().result}, bad => {console.log(bad.json())})
    this.bread.Get(environment.applicationregistration_API).subscribe(good => {this.apps = good.json().result}, bad => {console.log(bad.json())})
  }

  appChose(e, appdetails){
    if(e.target.checked){
      this.appSelected.push(appdetails.id)
      this.allroles=this._json.availablerole(this.appSelected, this.roles)
    }else{
      let removeApp = this.appSelected.findIndex(item => item === appdetails.id)
      this.appSelected.splice(removeApp, 1);
      this.allroles=this._json.availablerole(this.appSelected, this.roles)
    }
    // console.log(this.allroles)
    if(this.allroles.length>0&&this.appSelected.length>0){this.roleOptions=false; this.createrole=false}else{this.roleOptions=true; this.createrole=true}
  }

  createAccount(){
    if(this.admin.first_name == ''){
      this.nameInvalid = true; return false
    }else{this.nameInvalid = false}
    if(this.admin.email == ''){
      this.emailInvalid = true; return false
    }else{this.emailInvalid = false}
    if(this.appSelected.length == 0){
      this.serviceInvalid = true; return false
    }else{this.serviceInvalid = false}
    if(this.admin.role_id==''||this.admin.role_id == undefined){
      this.roleInvalid = true; return false
    }else{this.roleInvalid = false}
    this.admin.application_registration_ids = this.appSelected.join()
    this.createDisable=true
    // console.log(this.admin)
    this.bread.Post(environment.adminaddlistshowedit_API, this.admin).subscribe(good => {this.router.navigate(['/all-accounts']);}, bad => {console.log(bad.json()); this.createDisable=false}
    )
  }
}
