import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment'
import {BreadService} from '../../services/bread/bread.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	totalaccounts:number; totaldevices:number

  constructor(private bread: BreadService) { }

  ngOnInit() {
  	this.bread.Get(environment.adminaddlistshowedit_API).subscribe(good=>{this.totalaccounts=good.json().result.length})
  	this.bread.Get(environment.deviceaddlistshowedit_API).subscribe(good=>{this.totaldevices=good.json().result.length})
  	let owner = JSON.parse(localStorage.getItem('credential'))
  	// console.log(owner.owner_info.roles[0].permissions)
  }

}
