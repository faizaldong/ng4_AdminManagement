import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {environment} from '../../../../environments/environment'
import { BreadService } from '../../../services/bread/bread.service'
import { RoleService } from '../../../services/role/role.service'
import { AlertsService } from '../../../services/alerts/alerts.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css', '../../../../assets/css/pages/accounts.css']
})
export class EditRolesComponent implements OnInit {

	roles = {name: '', permission_ids: ''}
	id:any; rolepermission:any; roledetails:any; roleAlert:any; duplicatepermissionsid:any;
	listpermissionArray=[]; duplicatepermission=[]; isdup=[]
  showRoleAlert:boolean=false; editDisable:boolean=false

  constructor(private router: Router, private arouter:ActivatedRoute, private bread: BreadService, private role:RoleService, private alert: AlertsService, private checkpermission:PermissionsallowedService) { }

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Roles','Role Edit')
    this.arouter.params.subscribe(params=>{
      if(!params.id){this.router.navigate(['/all-roles']); return false;}
      this.id=params.id
      this.bread.Get(environment.roleaddlistupdatedelete_API).subscribe(good=>{this.duplicatepermission = good.json().result})
      this.bread.Get(environment.roleaddlistupdatedelete_API+"/"+this.id).subscribe(good=>{this.roledetails=good.json().result; this.roles.name = this.roledetails.role_name; this.getpermissions()})
    })
  }

  getpermissions(){
    this.bread.Get(environment.permissiongroupby_API).subscribe(good=>{this.rolepermission = this.role.editrole_permissionlistinjected(good.json().result, this.roledetails); this.listdownAllPermissions(this.rolepermission[0].application_registration.name)},
                                                                bad=>{})
  }

  closeAlertRole(){
    this.showRoleAlert=false
  }

  duplicateradio(data){
    this.duplicatepermissionsid = data
  }
  isduplicate(){
    if(this.duplicatepermissionsid){
      this.isdup = this.duplicatepermissionsid.permissions
      this.role.addrole_permissionlistinjected(this.rolepermission)
      this.role.duplicate(this.rolepermission,this.isdup)
      this.roleAlert = this.alert.success('You have duplicated "'+this.duplicatepermissionsid.role_name+'" Role'); this.showRoleAlert=true;
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

  editRole(){

    let permpush=[]
    if(this.isdup.length>0){
      $.each(this.isdup, function(i,v){
        permpush.push(v.id)
      })
    }else{
      $.each(this.rolepermission, function(i,v){
        if(v.permission_ids.length>0){
          $.each(v.permission_ids, function(j,k){
            permpush.push(k)
          })
        }
      })
    }
    console.log(this.isdup)
    console.log(this.rolepermission)
    
    // if(this.roles.name=="" || permpush.length==0){this.roleAlert = this.alert.warning('Role Title and Role Permission are required. Else you can duplicate the role.'); this.showRoleAlert=true ;return}
    // this.showRoleAlert=false
    // this.editDisable=true
    // this.roles.permission_ids = permpush.join(",")
    // this.bread.Put(environment.roleaddlistupdatedelete_API+"/"+this.id, this.roles).subscribe(good=>{this.router.navigate(['/all-roles']); this.editDisable=false}, bad=>{console.log(bad.json()); this.editDisable=false})
  }

}
