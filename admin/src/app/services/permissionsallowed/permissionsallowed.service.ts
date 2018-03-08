import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable()
export class PermissionsallowedService {

  constructor(private router:Router) { }
  permissions=JSON.parse(localStorage.getItem('permissionsgroup'))

  checkgroupwithpermission(permissiongroup, permissionaccess){
  	// console.log(this.permissions.permissions)
  	if(this.permissions.permissions.filter(function(v){return v.name==permissiongroup}).length>0){ 
  		if(this.permissions.permissions.filter(function(v){return v.name==permissiongroup})[0].permissions.filter(function(v){return v.name==permissionaccess}).length>0){return true}
  		else if(this.permissions.permissions.filter(function(v){return v.name==permissiongroup})[0].permissions.filter(function(v){return v.name==permissionaccess}).length>0){return true}
  		else{this.router.navigate(['/403']); return false} }
  	else{ this.router.navigate(['/403']); return false}
  }

  checkgroupwithpermissionforhtmlview(permissiongroup, permissionaccess){
  	// console.log(this.permissions.permissions)
  	if(this.permissions.permissions.filter(function(v){return v.name==permissiongroup}).length>0){ 
  		if(this.permissions.permissions.filter(function(v){return v.name==permissiongroup})[0].permissions.filter(function(v){return v.name==permissionaccess}).length>0){return true}
  		else if(this.permissions.permissions.filter(function(v){return v.name==permissiongroup})[0].permissions.filter(function(v){return v.name==permissionaccess}).length>0){return true}
  		else{return false} }
  	else{return false}
  }

}
