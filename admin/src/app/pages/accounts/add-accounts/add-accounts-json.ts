import {Injectable} from '@angular/core'

@Injectable()

export class Json{

	constructor(){ }

	availablerole(appselected, roles){
		let filterrole=[]
		if(appselected.length>0){
			$.each(roles, function(i,v){
				v.found=false
				v.notfound=false
				$.each(appselected, function(j,k){
					let found=v.role_services.filter(function(o){return o.id==k})
					if(found.length>0){v.found=true}else{v.notfound=true}
				})
			})
			filterrole = roles.filter(function(v){return v.notfound==false})
			return filterrole
		}else{
			return filterrole
		}
	}

}