import {Injectable} from '@angular/core'

@Injectable()
export class Json{

	customedata(data){
		let dataArr=[]

		if(data.first_name){let datapush = {"op": "replace","path": "/first_name","value": data.first_name}; dataArr.push(datapush)}
		if(data.last_name){let datapush = {"op": "replace","path": "/last_name","value": data.last_name}; dataArr.push(datapush)}
		if(data.number){let datapush = {"op": "replace","path": "/number","value": data.number}; dataArr.push(datapush)}
		if(data.type){let datapush = {"op": "replace","path": "/type","value": data.type}; dataArr.push(datapush)}
		if(data.expire_month){let datapush = {"op": "replace","path": "/expire_month","value": data.expire_month}; dataArr.push(datapush)}
		if(data.expire_year){let datapush = {"op": "replace","path": "/expire_year","value": data.expire_year}; dataArr.push(datapush)}
		if(data.billing_address.line1){let datapush = {"op": "replace","path": "/billing_address/line1","value": data.billing_address.line1}; dataArr.push(datapush)}
		if(data.billing_address.postal_code){let datapush = {"op": "replace","path": "/billing_address/postal_code","value": data.billing_address.postal_code}; dataArr.push(datapush)}
		if(data.billing_address.city){let datapush = {"op": "replace","path": "/billing_address/city","value": data.billing_address.city}; dataArr.push(datapush)}
		if(data.billing_address.state){let datapush = {"op": "replace","path": "/billing_address/state","value": data.billing_address.state}; dataArr.push(datapush)}
		if(data.billing_address.country_code){let datapush = {"op": "replace","path": "/billing_address/country_code","value": data.billing_address.country_code}; dataArr.push(datapush)}
		if(data.billing_address.phone){let datapush = {"op": "replace","path": "/billing_address/phone","value": data.billing_address.phone}; dataArr.push(datapush)}
		return dataArr
	}

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
