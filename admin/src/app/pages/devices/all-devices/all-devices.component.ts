import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'
import { GridDataResult, PageChangeEvent, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import {Json} from './all-devices-json'
import {environment} from '../../../../environments/environment'
import {BreadService} from '../../../services/bread/bread.service'
import {AlertsService} from '../../../services/alerts/alerts.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'
import * as bootstrap from "bootstrap"

@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(private router: Router, private bread: BreadService, private alert: AlertsService, private _json: Json, private checkpermission:PermissionsallowedService) { }

  device:any; deviceid:any; deviceownid:any; deviceuser:any; deviceuserlastseen:any; devicetotal:any; devicetotalalert:any; filter:any; deviceallow:any; foundadminunbanned:any; unbanned_id:any; deleteid:any; cboxrestrict:any
  deviceshowalert:boolean=false; unbanneddevicefound:boolean=false; havepermdelete:boolean=true; havepermshow:boolean=false; havepermadd:boolean=false
  unbannedtext:String=""; selectedkendobox:String=""
  checkedlength:number=0; page:number=1; take:number=60
  public mySelection: number[] = []; idfordelete=[];
  public selectAllState: SelectAllCheckboxState = 'unchecked';

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Device Managements','List Device')
    this.havepermadd=this.checkpermission.checkgroupwithpermissionforhtmlview('Device Managements','Create Device')
    this.havepermdelete=this.checkpermission.checkgroupwithpermissionforhtmlview('Device Managements','Destroy Device')
    this.havepermshow=this.checkpermission.checkgroupwithpermissionforhtmlview('Device Managements','Show Device')
    this.bread.Get(environment.adminprofile_API).subscribe(good=>{this.deviceallow = good.json().result.application_company.application_company_license.application_company_plan.allowed_device})
    this.kendoReaddata()
  }

  closeAlertLogin(){
    this.deviceshowalert=false
  }

  kendoReaddata(){
    this.bread.Get(environment.deviceaddlistshowedit_API).subscribe(
      good=>{this.device = good.json().result; this.devicetotal=this.device.length; this._json.injectStatus(this.device)
         // console.log(this.device)
      },
      bad=>{console.log(bad.json())})
  }

  searchData(event){
    this.bread.Get(environment.deviceaddlistshowedit_API+"?search="+event).subscribe(good=>{this.device = good.json().result; this.devicetotal=this.device.length}, bad=>{console.log(bad.json())})
  }

  pageChange(event){
    // console.log(event)
  }

  onSelectedKeysChange(e) {
    console.log(e)
    this.selectAllState = this._json.onSelectedKeysChange(e, this.mySelection, this.selectAllState, this.device)
    this.checkedlength=e.length
    this.selectedkendobox = e.join()
  }

  onSelectAllChange(checkedState: SelectAllCheckboxState) {
    this.selectAllState = this._json.onSelectAllChange(checkedState, this.mySelection, this.selectAllState, this.device)
  }

  unbannedmultiple(){
    if(this.checkedlength==0){this.devicetotalalert = this.alert.warning('Please tick atleast 1 device with status "Banned" for unbanned'); this.deviceshowalert=true; return}
    this.unbanneddevicefound = this._json.checkIshaveunbanneddevice(this.device, this.mySelection)
    if(this.unbanneddevicefound){this.devicetotalalert = this.alert.warning('Please tick device with status "Banned" only'); this.deviceshowalert=true; return}//if tick with active/disabled device. should tick device with banned status only
    if(this.checkedlength>this.deviceallow){this.devicetotalalert = this.alert.warning('Your requested to unbanned device is more that slots you have. You can unbanned '+this.deviceallow+' devices only'); this.deviceshowalert=true; return}
    this.deviceshowalert=false
    this.foundadminunbanned = this.device.filter(function(s){ return !s.is_banned})//get total unbanned device
    this.foundadminunbanned.map(o => o.checked = false)
    if(this.foundadminunbanned.length==this.deviceallow){//if no slot available
      // $("#unbannedModal").modal('show');
      console.log(this.foundadminunbanned)
      $('#unbannedModal').modal({backdrop: 'static', keyboard: false})
      this.cboxrestrict=this.checkedlength; 
      this.unbannedtext= 'You have reached your limit slots. Please delete '+this.checkedlength+' device'
    }else{//have slot
      this.unbanned_id=this.selectedkendobox
      this.bread.Delete(environment.devicedelete_API+"?id=&unbanned_id="+this.unbanned_id).subscribe(good=>{this.kendoReaddata(); $("#unbannedModal").modal('hide'); this.devicetotalalert = this.alert.success('Successfully unbanned device'); this.deviceshowalert=true}, bad=>{console.log(bad.json())})
    }
    // this.unbannedtext= 'Allowed device is '+this.deviceallow+', unbanned device is '+this.foundadminunbanned+', your total request for unbanned device is '+this.checkedlength
  }

  addDevice(){
    if(this.devicetotal>=this.deviceallow){this.devicetotalalert = this.alert.warning('Sorry, only 3 device is allowed'); this.deviceshowalert=true; return false;}
    this.router.navigate(['/add-devices'])
  }

  editDevice(id){
    this.router.navigate(['/edit-devices', { id: id }]);
  }

  status(data){
    this.unbanned_id=data.id
    if(data.is_banned){
      this.foundadminunbanned = this.device.filter(function(s){ return !s.is_banned})//get total unbanned device
      this.foundadminunbanned.map(o => o.checked = false)
      if(this.foundadminunbanned.length==this.deviceallow){//if no slot available
        // $("#unbannedModal").modal('show');
        $('#unbannedModal').modal({backdrop: 'static', keyboard: false})
        this.cboxrestrict=1; 
        this.unbannedtext="You have reached your limit slots. Please delete 1 device"}
      else{//have slot
        this.bread.Delete(environment.devicedelete_API+"?id=&unbanned_id="+this.unbanned_id).subscribe(good=>{this.kendoReaddata(); $("#unbannedModal").modal('hide'); this.devicetotalalert = this.alert.success('Successfully unbanned device'); this.deviceshowalert=true}, bad=>{console.log(bad.json())})
      }
    }else if(!data.is_banned&&data.is_active){
      this.bread.Put(environment.deviceaddlistshowedit_API+"/"+data.id, {device_id:data.device_id ,current_worker_id:data.current_worker_id ,last_worker_id:data.last_worker_id ,is_active:false}).subscribe(good=>{this.kendoReaddata()}, bad=>{console.log(bad.json())})
    }else if(!data.is_banned&&!data.is_active){
      this.bread.Put(environment.deviceaddlistshowedit_API+"/"+data.id, {device_id:data.device_id ,current_worker_id:data.current_worker_id ,last_worker_id:data.last_worker_id ,is_active:true}).subscribe(good=>{this.kendoReaddata()}, bad=>{console.log(bad.json())})
    }
  }

  closemodalunbanned(){
    this.idfordelete=[]
    $("#unbannedModal").modal('hide')
  }

  cboxdeletedeviceforunbanned(phone, event){
    this.idfordelete = this._json.checkuncheckfordeleteDevice(phone, event, this.idfordelete)
  }

  unbannedphone(phone, event){
    let id = this.idfordelete.join()?this.idfordelete.join(): this.selectedkendobox
    this.bread.Delete(environment.devicedelete_API+"?id="+id+"&unbanned_id="+this.unbanned_id).subscribe(good=>{this.kendoReaddata(); $("#unbannedModal").modal('hide'); this.devicetotalalert = this.alert.success('Successfully unbanned device'); this.deviceshowalert=true}, bad=>{console.log(bad.json())})
  }

  deleteModal(device){
    this.deviceid = device.id
    this.deviceownid = device.device_id
    this.deviceuser = device.current_worker?device.current_worker.first_name: ''
    this.deviceuserlastseen = device.current_worker?device.current_worker.last_seen: ''
  }

  deleteDevice(){
    this.bread.Delete(environment.devicedelete_API+"?id="+this.deviceid+"&unbanned_id=").subscribe(good=>{this.kendoReaddata(); $('#deleteModal').modal('toggle')}, bad=>{console.log(bad.json())})
  }

}
