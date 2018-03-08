import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router'
import {environment} from '../../../../environments/environment'
import { BreadService } from '../../../services/bread/bread.service'
import { RoleService } from '../../../services/role/role.service'
import { AlertsService } from '../../../services/alerts/alerts.service'

@Component({
  selector: 'app-add-roles',
  moduleId: module.id,
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css', '../../../../assets/css/pages/accounts.css']
})

export class AddRolesComponent implements OnInit {

  roles = {name: '', permission_ids: ''}
  rolepermission:any
  roleAlert:any
  listpermissionArray=[]; serviceFilter=[]
  showRoleAlert:boolean=false; createDisable:boolean=false


  constructor(private bread: BreadService, private role: RoleService, private alert: AlertsService, private router: Router) { }

  ngOnInit() {
    this.bread.Get(environment.permissiongroupby_API).subscribe(good=>{this.rolepermission = good.json().result
                                                                       for(let i=0; i<this.rolepermission.length; i++){
                                                                         this.rolepermission[i].selected=false
                                                                         this.rolepermission[i].permission_ids=[]
                                                                         for(let j=0; j<this.rolepermission[i].permissions.length; j++){
                                                                           this.rolepermission[i].permissions[j].selected=false
                                                                           for(let k=0; k<this.rolepermission[i].permissions[j].permissions.length; k++){
                                                                             this.rolepermission[i].permissions[j].permissions[k].selected=false
                                                                           }
                                                                         }
                                                                       }
                                                                       this.listdownAllPermissions(this.rolepermission[0].application_registration.name)
                                                                      },
                                                                bad=>{})
  }

  closeAlertRole(){
    this.showRoleAlert=false
  }

  selectdeselectAllBox(service, event){ //event is checkbox value [true/false]
    for(let i=0; i<this.rolepermission.length; i++){
      if(this.rolepermission[i].application_registration.name==service.name){
        if(event=='true'){//uncheck all
          this.rolepermission[i].selected=false;
          for(let j=0; j<this.rolepermission[i].permissions.length; j++){
            this.rolepermission[i].permissions[j].selected=false
            for(let k=0; k<this.rolepermission[i].permissions[j].permissions.length; k++){
              this.rolepermission[i].permission_ids=[]
              this.rolepermission[i].permissions[j].permissions[k].selected=false
            }
          }
         }
        else{//check all
          this.rolepermission[i].selected=true;
          for(let j=0; j<this.rolepermission[i].permissions.length; j++){
            this.rolepermission[i].permissions[j].selected=true
            for(let k=0; k<this.rolepermission[i].permissions[j].permissions.length; k++){
              this.rolepermission[i].permission_ids.push(this.rolepermission[i].permissions[j].permissions[k].id)
              this.rolepermission[i].permissions[j].permissions[k].selected=true
            }
          }
         }
      }
    }
  }

  selectdeselectGroupBox(pergroup, event){
    for(let i=0; i<this.rolepermission.length; i++){
      if(this.rolepermission[i].application_registration.id == pergroup.permissions[0].application_registration_id){
        if(event=='true'){
          pergroup.selected=false
          for(let j=0; j<pergroup.permissions.length; j++){
            pergroup.permissions[j].selected=false
            this.rolepermission[i].permission_ids=[]
          }          
        }else{
          pergroup.selected=true
          for(let j=0; j<pergroup.permissions.length; j++){
            pergroup.permissions[j].selected=true
            this.rolepermission[i].permission_ids.push(pergroup.permissions[j].id)
          }
        }
      }
    }
  }

  selectdeselectBox(per, event){
    for(let i=0; i<this.rolepermission.length; i++){
      if(this.rolepermission[i].application_registration.id == per.application_registration_id){
        if(event=='true'){
          per.selected=false
          this.rolepermission[i].permission_ids.push(per.id)       
        }else{
          per.selected=true
          this.rolepermission[i].permission_ids.push(per.id)
        }
      }
    }
  }

  listdownAllPermissions(service){
    let serviceName = this.rolepermission
    for(let i=0; i<serviceName.length; i++){
      if(serviceName[i].application_registration.name==service){
        this.listpermissionArray = serviceName[i]
      }
    }
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
    this.bread.Post(environment.roleaddlistupdatedelete_API, this.roles).subscribe(good=>{this.router.navigate(['/all-roles'])}, bad=>{console.log(bad.json()); this.createDisable=false})
  }

}
