import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {environment} from '../../../../environments/environment'
import {BreadService} from '../../../services/bread/bread.service'
import {AlertsService} from '../../../services/alerts/alerts.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'

@Component({
  selector: 'app-edit-devices',
  templateUrl: './edit-devices.component.html',
  styleUrls: ['./edit-devices.component.css', '../../../../assets/css/pages/accounts.css']
})
export class EditDevicesComponent implements OnInit {

  device = { device_id: '', current_worker_id: '', last_worker_id: '', is_active: true }
  workers:any; devicealert:any; id:any
  showdevicealert:boolean=false; editDisable:boolean=false
  constructor(private router: Router, private _aroute:ActivatedRoute, private bread: BreadService, private alert: AlertsService, private checkpermission:PermissionsallowedService) { }

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Device Managements','Destroy Device')
    this._aroute.params.subscribe(params => { 
      if(!params.id){this.router.navigate(['/all-devices']); return false;}
      this.id=params.id
      this.bread.Get(environment.deviceaddlistshowedit_API+"/"+this.id).subscribe(good=>{this.device = good.json().result}, bad=>{console.log(bad.json())})
      this.bread.Get(environment.workeraddlistshowupdate_API).subscribe(good=>{this.workers = good.json().result}, bad=>{console.log(bad.json())})
    })
    // 
  }

  closeAlertLogin(){
    this.showdevicealert=false
  }

  createDevice(){
    if(this.device.device_id=="" || this.device.current_worker_id=="" || this.device.last_worker_id==""){
      this.devicealert = this.alert.warning('All fields are required') 
      this.showdevicealert=true 
      return false
    }else{this.showdevicealert=false ; this.editDisable=true}
    this.bread.Put(environment.deviceaddlistshowedit_API+"/"+this.id, this.device).subscribe(good=>{this.router.navigate(['/all-devices'])}, bad=>{console.log(bad.json()); this.editDisable=false})
  }

}
