import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import * as bootstrap from "bootstrap"
import { RowClassArgs } from '@progress/kendo-angular-grid';
import {environment} from '../../../../environments/environment'
import {BreadService} from '../../../services/bread/bread.service'
import {AlertsService} from '../../../services/alerts/alerts.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'
import { Json } from './all-accounts-json'

@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.css']
})
export class AllAccountsComponent implements OnInit {

  constructor(private bread: BreadService, private router: Router, private _json: Json, private alert:AlertsService, private checkpermission:PermissionsallowedService) { }
  totalsbyapp={totalauth:[], totalwms:[], totallds:[]}
  admins:any; idDelete:any; nameDelete:any; emailDelete:any; filter:any; owneraccount:any; apps:any; adminallow:any; adminsall:any; foundadminunbanned:any; adminalertdetails:any; cboxrestrict:any; adminidtounbanned:any;
  buttondelete:boolean = false; adminshowalert:boolean=false; havepermadd:boolean=false; havepermedit:boolean=false; havepermdelete:boolean=false
  Gsearch:String=''; unbannedtext:String=''
  appidFilter=[]; adminidtodelete=[]
  page:number=1; take:number=10;

  public rowCallback(context: RowClassArgs) { //disabled row based on status
    const isEven = context.index % 2 == 0;
    if(context.dataItem.disabled){
      return 'row-disabled1'
    }else{
      return ''
    }
   }

  public gridData: any[];
  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Administrator','Administrator Listing')
    this.havepermadd=this.checkpermission.checkgroupwithpermissionforhtmlview('Administrator','Administrator Add')
    this.havepermedit=this.checkpermission.checkgroupwithpermissionforhtmlview('Administrator','Administrator Edit')
    this.havepermdelete=this.checkpermission.checkgroupwithpermissionforhtmlview('Administrator','Administrator Delete')
    this.owneraccount = JSON.parse(localStorage.getItem('credential'))
    this.bread.Get(environment.adminprofile_API).subscribe(good=>{this.adminallow = good.json().result.application_company.application_company_license.application_company_plan.allowed_admin})
    this.bread.Get(environment.adminaddlistshowedit_API+"/"+this.owneraccount.owner_info.id).subscribe(good=>{this.apps = good.json().result.application_registrations; this.appidFilter = this._json.appidfilter(this.apps)}, bad=>{console.log(bad.json())})
    this.bread.Get(environment.adminaddlistshowedit_API).subscribe(good=>{this.totalsbyapp=this._json.countapps(good.json().result)}, bad=>{console.log(bad.json())})
    this.kendoReaddata()
  }

  closealert(){
    this.adminshowalert=false
  }

  kendoReaddata(){
    this.bread.Get(environment.adminaddlistshowedit_API+"?search="+this.Gsearch+"&application_registration_ids="+this.appidFilter.join()+"&page="+this.page+"&take="+this.take)
    .subscribe(good=>{ this.admins = {data: good.json().result, total: good.json().total}; this.adminsall = good.json().result; this._json.appCbox(this.apps)}, 
               bad=>{console.log(bad.json)})
  }

  pageChange(event){
    if(event.skip==0){this.page = 1}else{ let no = event.skip.toString(); no = no.slice(0, -1); no = parseInt(no)+1; this.page=no}
    this.take = event.take
    this.kendoReaddata()
  }

  kendoSearchFilterData(){
    this.bread.Get(environment.adminaddlistshowedit_API+"?search="+this.Gsearch+"&application_registration_ids="+this.appidFilter.join()+"&page="+this.page+"&take="+this.take)
    .subscribe(good=>{this.admins = {data: good.json().result, total: good.json().total}},
               bad =>{console.log(bad.json)})
  }

  globalsearch(event){
    this.Gsearch=event
    this.kendoSearchFilterData()
  }

  appfilter(index, app){
    this.appidFilter = this._json.updateappidfilter(this.appidFilter, app)
    this.kendoSearchFilterData()
  }

  addAccount(){
    this.foundadminunbanned = this._json.findbannedunadmin(this.adminsall)
    if(this.foundadminunbanned.length >= this.adminallow){ this.adminalertdetails = this.alert.warning('Sorry, only 3 admins is allowed'); this.adminshowalert=true; return}
    this.router.navigate(['/add-accounts'])
  }

  editAccount(id){
    this.router.navigate(['/edit-accounts', {id:id}]);
  }

  deleteModal(user){
    this.idDelete = user.id
    this.nameDelete = user.first_name;
    this.emailDelete = user.email
  }
  deleteAccount(){
    this.buttondelete=true; 
    this.bread.Delete(environment.admindelete_API+"?id="+this.idDelete).subscribe(good=>{this.kendoReaddata(); $("#deleteModal").modal('toggle'); this.buttondelete=false}, bad=>{console.log(bad.json()); this.buttondelete=false})
  }

  updateStatus(data){
    if(data.is_banned){
      this.adminidtounbanned = data.id
      this.foundadminunbanned = this._json.findbannedunadmin(this.adminsall)
      if(this.foundadminunbanned.length >= this.adminallow){ //if no slot available
        // $("#unbannedModal").modal('show')
        $('#unbannedModal').modal({backdrop: 'static', keyboard: false})
        this.cboxrestrict=1
        this.unbannedtext= 'You have reached your limit slots. Please choose 1 admin to replace with admin you want to unbanned'
      }else{ this.bread.Delete(environment.admindelete_API+"?unbanned_admin_id="+data.id).subscribe(good=>{console.log(good.json())}, bad=>{console.log(bad.json())}) }
    }
    else if(!data.is_banned&&data.disabled){
      this.bread.Put(environment.adminaddlistshowedit_API+"/"+data.id+"/update", {disabled: false}).subscribe(good=>{this.kendoReaddata()}, bad=>{console.log(bad.json())})
    }
    else if(!data.is_banned&&!data.disabled){
      this.bread.Put(environment.adminaddlistshowedit_API+"/"+data.id+"/update", {disabled: true}).subscribe(good=>{this.kendoReaddata()}, bad=>{console.log(bad.json())})
    }
  }

  closemodalunbanned(){
    this.adminidtodelete=[]
    $("#unbannedModal").modal('toggle')
  }

  cboxadminid(data){
    this.adminidtodelete = this._json.cboxstatus(data, this.adminidtodelete)
  }

  unbannedAccount(){
    if(this.adminidtodelete.length>0){
      console.log(environment.admindelete_API+"?id=&"+this.adminidtodelete.join()+"&unbanned_admin_id="+this.adminidtounbanned)
      this.bread.Delete(environment.admindelete_API+"?id="+this.adminidtodelete.join()+"&unbanned_admin_id="+this.adminidtounbanned).subscribe(good=>{this.adminidtodelete=[]; this.kendoReaddata(); $("#unbannedModal").modal('toggle'); this.adminalertdetails = this.alert.success('Successfully unbanned Admin'); this.adminshowalert=true }, bad=>{console.log(bad.json())})
    }
  }


}
