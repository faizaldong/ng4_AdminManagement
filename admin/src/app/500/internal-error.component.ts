import { Component, OnInit } from '@angular/core';
import { Json } from './internal-error-json'

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.css']
})
export class InternalErrorComponent implements OnInit {

  constructor(private _json:Json) { }

  ngOnInit() {
  	this._json.usedjquery()
  }

}
