import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { environment } from '../../../../environments/environment'
import { BreadService } from '../../../services/bread/bread.service'
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'
import { Json } from './edit-accounts-json'

@Component({
  selector: 'app-edit-accounts',
  templateUrl: './edit-accounts.component.html',
  styleUrls: ['./edit-accounts.component.css', '../../../../assets/css/pages/accounts.css']
})
export class EditAccountsComponent implements OnInit {

  constructor(private router: Router, private aroute:ActivatedRoute, private bread: BreadService, private checkpermission:PermissionsallowedService, private _json:Json) { }

  admin = {first_name: '', email: '', password: '', application_registration_ids: '', role_id: '', application_registrations: [], roles: 0}
  nameInvalid:boolean = false; emailInvalid:boolean = false; serviceInvalid:boolean = false; roleInvalid:boolean = false; roleOptions:boolean = true; buttondisabled:boolean=false; isadmin:boolean=false; createrole:boolean=false
  id:any; apps:any; roles:any; roleSelected:any; allroles:any
  appSelected=[]; adminrole=[]

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Administrator','Administrator Edit')
    this.aroute.params.subscribe(params=>{
      if(!params.id){this.router.navigate(['/all-accounts']); return false;}
      this.id=params.id
      this.bread.Get(environment.applicationregistration_API).subscribe(good=>{this.apps = good.json().result; this.fetchdata()}, bad=>{console.log(bad.json())})
    })
  }

  fetchdata(){
    this.bread.Get(environment.adminaddlistshowedit_API+"/"+this.id).subscribe(
      good=>{this.admin = good.json().result; if(JSON.parse(localStorage.getItem('credential')).owner_info.is_master_admin_application){this.isadmin=true}; this.roleSelected=this.admin.roles[0].id
             this.bread.Get(environment.roleaddlistupdatedelete_API).subscribe(good=>{this.roles = good.json().result; this.allroles=this._json.availablerole(this.adminrole, this.roles); if(this.allroles.length>0&&this.adminrole.length>0){this.roleOptions=false; this.createrole=false}else{this.roleOptions=true; this.createrole=true}}, bad=>{console.log(bad.json())})
              for(let i=0; i<this.admin.application_registrations.length; i++){ //to make checkbox checked
                this.adminrole.push(this.admin.application_registrations[i].id)
                for(let j=0; j<this.apps.length; j++){
                  if(this.admin.application_registrations[i].id==this.apps[j].id){
                    this.appSelected.push(this.apps[j].id)
                    this.apps[j].selected=true
                    this.roleOptions=false
                  }
                }
              }
            }, 
      bad=>{console.log(bad.json())})
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
    if(this.allroles.length>0&&this.appSelected.length>0){this.roleOptions=false; this.createrole=false}else{this.roleOptions=true; this.createrole=true}
  }

  onChange(roledetails){
    this.admin.roles = roledetails
  }

  editAccount(){   
    let admin = {first_name:this.admin.first_name, email:this.admin.email, password:this.admin.password, role_id: '', application_registration_ids: '', is_default_password: true, }
    admin.role_id = this.admin.roles[0].id? this.admin.roles[0].id.toString(): this.admin.roles
    if(this.allroles.length==1){admin.role_id = this.allroles[0].id}
    // if(this.allroles.length==0){admin.role_id = ''}

    if(admin.first_name == ''){
      this.nameInvalid = true; return false
    }else{this.nameInvalid = false}
    if(admin.email == ''){
      this.emailInvalid = true; return false
    }else{this.emailInvalid = false}
    if(this.appSelected.length == 0){
      this.serviceInvalid = true; return false
    }else{this.serviceInvalid = false}
    if(admin.role_id==''||admin.role_id == undefined){
      this.roleInvalid = true; return false
    }else{this.roleInvalid = false}

    admin.application_registration_ids = this.appSelected.join()
    // let callsidebar = new SidebarComponent(this.bread) //call other function in component
    // callsidebar.ngOnInit()}

    this.buttondisabled=true
    this.bread.Put(environment.adminaddlistshowedit_API+"/"+this.id+"/update", admin).subscribe(
      good=>{ let upapps = good.json().result.application_registrations; localStorage.setItem('menuapps', JSON.stringify(upapps)); SidebarComponent.updateUserStatus.next(true); this.router.navigate(['/all-accounts']);},
      bad =>{ console.log(bad.json()); this.buttondisabled=false})
  }

}
