import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {environment} from '../../../../environments/environment'
import {BreadService} from '../../../services/bread/bread.service'
import {PermissionsallowedService} from '../../../services/permissionsallowed/permissionsallowed.service'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private bread:BreadService, private router:Router, private checkpermission:PermissionsallowedService) { }
  orderhistory:any; token:any; havepermshow:boolean=false
  iconprint:string='fa fa-print'

  ngOnInit() {
    this.checkpermission.checkgroupwithpermission('Payment','List Payment Record')
    this.havepermshow=this.checkpermission.checkgroupwithpermissionforhtmlview('Payment','Show Payment Record')
    this.bread.Get(environment.paypal_token).subscribe(good=>{this.token=good.json().result.access_token})
  	this.bread.Get(environment.orderhistory_API).subscribe(good=>{ this.orderhistory=good.json().result})
    localStorage.removeItem('orderdetails')
  }

  orderdetails(data){
    localStorage.setItem('orderdetails',JSON.stringify(data))
    this.router.navigate(['order-details'])
  }

  printpdf(data){
    this.iconprint='fa fa-download'
  	this.bread.Get(environment.pdfapplicationpaymentrecords_API+"/"+data.paypal_payment_id).subscribe(
  		good=>{this.iconprint='fa fa-print'; window.open(environment.authAPI+'application_payment_records_pdf/'+data.paypal_payment_id+'.pdf', '_blank')})
  }

}
