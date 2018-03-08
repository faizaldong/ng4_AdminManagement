import { Component, OnInit } from '@angular/core';
import { Json } from './access-denied-json'

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(private _json:Json) { }

  ngOnInit(){
		this._json.usedjquery()
	}

}
