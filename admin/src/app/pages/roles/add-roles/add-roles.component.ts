import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router'
import {environment} from '../../../../environments/environment'
import { BreadService } from '../../../services/bread/bread.service'
import { RoleService } from '../../../services/role/role.service'
import { AlertsService } from '../../../services/alerts/alerts.service'
import { Json } from './add-roles-json';
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'

@Component({
  selector: 'app-add-roles',
  moduleId: module.id,
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css', '../../../../assets/css/pages/accounts.css']
})

export class AddRolesComponent implements OnInit {

  roles = {name: '', permission_ids: '', is_active: true}
  listpermissionArray=[]; serviceFilter=[]; duplicaterolelisting=[]; isdup=[]
  rolepermission:any; roleAlert:any; duplicatepermissionsid:any;
  showRoleAlert:boolean=false; createDisable:boolean=false


  constructor(private bread: BreadService, private role: RoleService, private alert: AlertsService, private router: Router, private checkpermission:PermissionsallowedService, private _json:Json) { }

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Roles','Role Add')
    this.bread.Get(environment.permissiongroupby_API).subscribe(good=>{this.rolepermission = this.role.addrole_permissionlistinjected(good.json().result); this.listdownAllPermissions(this.rolepermission[0].application_registration.name)}, bad=>{console.log(bad.json())})
    this.bread.Get(environment.roleaddlistupdatedelete_API).subscribe(good=>{this.duplicaterolelisting = good.json().result})
  }

  closeAlertRole(){  
    this.showRoleAlert=false
  }

  duplicateradio(data){
    this.duplicatepermissionsid=data
  }
  isduplicate(){
    if(this.duplicatepermissionsid){
      this.isdup = this.duplicatepermissionsid.permissions
      this.role.addrole_permissionlistinjected(this.rolepermission)
      this.role.duplicate(this.rolepermission,this.isdup)
      this.roleAlert = this.alert.success('You have duplicate "'+this.duplicatepermissionsid.role_name+'" Role. Please set new Role Title'); this.showRoleAlert=true;
    }else{this.roleAlert = this.alert.info("You aren't duplicating any role"); this.showRoleAlert=true;}
  }
  isnoduplicate(){
    this.isdup = []
  }

  selectdeselectAllBox(service, event){ //event is checkbox value [true/false]
    this.rolepermission = this.role.checkALLBox(this.rolepermission, service, event)
    if(this.isdup.length>0){this.roleAlert = this.alert.warning('Your duplicate role has been removed. Please choose either create role with new permission or duplicate existing role'); this.showRoleAlert=true; this.isdup = []}
  }

  selectdeselectGroupBox(pergroup, event){
    this.rolepermission = this.role.checkBoxbyGroup(this.rolepermission, pergroup, event)
    if(this.isdup.length>0){this.roleAlert = this.alert.warning('Your duplicate role has been removed. Please choose either create role with new permission or duplicate existing role'); this.showRoleAlert=true; this.isdup = []}
    
  }

  selectdeselectBox(per, event){
    this.rolepermission = this.role.checkBox(this.rolepermission, per, event)
    if(this.isdup.length>0){this.roleAlert = this.alert.warning('Your duplicate role has been removed. Please choose either create role with new permission or duplicate existing role'); this.showRoleAlert=true; this.isdup = []}
  }

  listdownAllPermissions(service){
    this.listpermissionArray = this.role.listofPermissions(this.rolepermission, service)
  }

  createRole(){
    let permpush=[]
    $.each(this.rolepermission, function(i,v){
      if(v.permission_ids.length>0){
        $.each(v.permission_ids, function(j,k){
          permpush.push(k)
        })
      }
    })

    if(this.roles.name=="" || permpush.length==0){this.roleAlert = this.alert.warning('Role Title and Role Permission are required. Else you can duplicate the role.'); this.showRoleAlert=true; return}
    this.showRoleAlert=false;
    this.roles.permission_ids = permpush.join(",")
    this.createDisable=true
    // console.log(this.roles)
    this.bread.Post(environment.roleaddlistupdatedelete_API, this.roles).subscribe(good=>{this.router.navigate(['/all-roles'])}, bad=>{console.log(bad.json()); this.createDisable=false})
  }

}
