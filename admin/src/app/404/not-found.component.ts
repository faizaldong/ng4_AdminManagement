import { Component, OnInit } from '@angular/core';
import { Json } from './not-found-json'

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['not-found.component.css']
})
export class NotFoundComponent implements OnInit { 

	constructor(private _json:Json) { }

	ngOnInit(){
		this._json.usedjquery()
	}

}
