import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AlertsService } from '../../../services/alerts/alerts.service';
import {environment} from '../../../../environments/environment'
import {BreadService} from '../../../services/bread/bread.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'

@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.css', '../../../../assets/css/pages/accounts.css']
})
export class AddDevicesComponent implements OnInit {

  device = {device_id: '', current_worker_id: '', last_worker_id: '', is_active: true}
  createDisable:boolean=false; showdevicealert:boolean=false;
  devicealert:any; workers:any

  constructor(private router: Router, private alert: AlertsService, private bread: BreadService, private checkpermission:PermissionsallowedService) { }

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Device Managements','Create Device')
    this.bread.Get(environment.workeraddlistshowupdate_API).subscribe(good=>{this.workers = good.json().result}, bad=>{console.log(bad.json())})
  }

  closeAlertLogin(){
    this.showdevicealert=false
  }

  createDevice(){
    if(this.device.device_id=="" || this.device.current_worker_id=="" || this.device.last_worker_id==""){
      this.devicealert = this.alert.warning('All fields are required')
      this.showdevicealert=true
      return false
    }else{this.createDisable=true; this.showdevicealert=false}
    this.bread.Post(environment.deviceaddlistshowedit_API, this.device).subscribe(good=>{this.router.navigate(['/all-devices'])}, bad=>{console.log(bad.json()); this.showdevicealert=true; this.devicealert = this.alert.danger('Sorry, only 3 device is allowed'); this.createDisable=false})
  }
}
