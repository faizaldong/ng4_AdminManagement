import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { RowClassArgs } from '@progress/kendo-angular-grid';
import {environment} from '../../../../environments/environment'
import {BreadService} from '../../../services/bread/bread.service'
import {AlertsService} from '../../../services/alerts/alerts.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.css', '../../../../assets/css/pages/accounts.css']
})
export class AllRolesComponent implements OnInit {

  roleitem = {roleid: 0, rolename: '', roleservice: '', rolestatus:false}
	roles:any; filter:any; devicetotalalert:any; ownerid:any; ownerroleid:any
  deleteDisable:boolean=false; masteradmin:boolean=false; deviceshowalert:boolean=false; havepermdelete:boolean=false; havepermedit:boolean=false; havepermadd:boolean=false

	public rowCallback(context: RowClassArgs) { //disabled row based on status
  	if(context.dataItem.is_active){
  		return ''
  	}else{ return 'row-disabled'}
  }


  constructor(private router: Router, private bread: BreadService, private alert: AlertsService, private checkpermission:PermissionsallowedService) { }

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Roles','Roles Listing')
    this.havepermadd=this.checkpermission.checkgroupwithpermissionforhtmlview('Roles','Role Add')
    this.havepermedit=this.checkpermission.checkgroupwithpermissionforhtmlview('Roles','Role Details')
    this.havepermdelete=this.checkpermission.checkgroupwithpermissionforhtmlview('Roles','Role Delete')
    this.ownerid = JSON.parse(localStorage.getItem('credential')).owner_info.id
    this.bread.Get(environment.adminaddlistshowedit_API+"/"+this.ownerid).subscribe(good=>{this.ownerroleid = good.json().result.roles[0].id})
    this.masteradmin = JSON.parse(localStorage.getItem('credential')).owner_info.is_master_admin_application
  	this.kendoReaddata()
  }

  closeAlert(){
    this.deviceshowalert=false
  }

  kendoReaddata(){
    this.bread.Get(environment.roleaddlistupdatedelete_API).subscribe(good=>{this.roles = good.json().result;}, bad=>{console.log(bad.json())})
  }

  updateStatus(data){
    if(data.is_active){ this.bread.Put(environment.roleaddlistupdatedelete_API+"/"+data.id, {is_active: false}).subscribe(good=>{this.kendoReaddata(); this.devicetotalalert = this.alert.warning('Role '+data.role_name+' is disabled. Please alert that those users who assigned with this Role will be no access to any portals'); this.deviceshowalert=true;}, bad=>{console.log(bad.json())}) }
    else{this.bread.Put(environment.roleaddlistupdatedelete_API+"/"+data.id, {is_active: true}).subscribe(good=>{this.kendoReaddata(); }, bad=>{console.log(bad.json())})}
  }

  editRole(id){
    this.router.navigate(['/edit-role', {id:id}])
  }

  modalRole(data){
    this.roleitem.roleid=data.id
    this.roleitem.rolename=data.role_name
    this.roleitem.roleservice=data.role_services
    this.roleitem.rolestatus=data.is_active
  }

  deleteRole(){
    this.deleteDisable=true
    this.bread.Delete(environment.roleaddlistupdatedelete_API+"/"+this.roleitem.roleid).subscribe(good=>{this.kendoReaddata(); $("#deleteModal").modal('toggle'); this.deleteDisable=false}, bad=>{console.log(bad.json()); this.deleteDisable=false})
  }

}
