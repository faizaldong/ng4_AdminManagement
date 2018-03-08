import {Injectable} from '@angular/core'

@Injectable()
export class Json{
	
	constructor(){}

	customizeerror(error){
		$.each(error, function(i,v){
			if(v.field=='first_name'){error[i].cfield='First Name'}
			if(v.field=='last_name'){error[i].cfield='Last Name'}
			if(v.field=='billing_address.line1'){error[i].cfield='Address'}
			if(v.field=='billing_address.city'){error[i].cfield='City'}
			if(v.field=='billing_address.country_code'){error[i].cfield='Country Code'}
			if(v.field=='billing_address.postal_code'){error[i].cfield='Postal Code'}
			if(v.field=='billing_address.state'){error[i].cfield='State'}
			if(v.field=='billing_address.phone'){error[i].cfield='Phone'}
			if(v.field=='number'){error[i].cfield='Card Number'}
			if(v.field=='type'){error[i].cfield='Card Type'}
			if(v.field=='expire_month'){error[i].cfield='Expiry Month'}
			if(v.field=='expire_year'){error[i].cfield='Expiry Year'}
		})
		return error
	}
}