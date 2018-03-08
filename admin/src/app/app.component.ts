import { Component, OnInit} from '@angular/core';
import { Json } from './app-json'
import { environment} from '../environments/environment'
import { BreadService } from './services/bread/bread.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(private bread:BreadService, private _json:Json){ }
  title = 'app';
  role:any

  ngOnInit(){
  	if(localStorage.getItem('credential')){
	  	this.bread.Get(environment.permissiongroupby_API).subscribe(good=>{this._json.findauth(good.json().result)}, bad=>{console.log(bad.json())})
  	}
  }
}
