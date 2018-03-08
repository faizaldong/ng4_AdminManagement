import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment'
import {BreadService} from '../../services/bread/bread.service'

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  constructor(private bread:BreadService) { }
  plans={application_registrations:[]}

  ngOnInit() {
  	let credential = JSON.parse(localStorage.getItem('credential'))
  	this.bread.Get(environment.companyaddlistshowedit_API+"/"+credential.owner_info.application_company_id+"?subscription_only=true").subscribe(good=>{this.plans=good.json().result.application_company_license.application_company_plan}, bad=>{console.log(bad.json())})
  }

}
