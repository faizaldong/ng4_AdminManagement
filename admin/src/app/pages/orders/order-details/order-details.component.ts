import { Component, OnInit } from '@angular/core';
import {sprintf} from "sprintf-js";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css', '/../../../../assets/css/pages/payment-layout.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor() { }
  orderdetails=JSON.parse(localStorage.getItem('orderdetails'))

  ngOnInit() {
  	console.log(this.orderdetails)
  	console.log(sprintf("%s%s", '00000', this.orderdetails.id.toString()));
  }

}
