import {Injectable} from '@angular/core'

@Injectable()
export class Json{

	findauth(data){
		let found = data.filter(function(v){return v.application_registration.name=='AUTH'})
		localStorage.setItem('permissionsgroup', JSON.stringify(found[0]))
	}
} 
