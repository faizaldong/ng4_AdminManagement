import { Injectable } from '@angular/core';

@Injectable()
export class Json {

	adminidArr=[]
  constructor() { }

  appCbox(apps){
    $.each(apps, function(i,v){ apps[i].checked=true })
  }

  appidfilter(apps){
  	let pushapp=[]
  	$.each(apps, function(i,v){ v.checked=true; pushapp.push(v.id) })

		return pushapp
  }

  updateappidfilter(appfilter, app){
		let idindex = appfilter.findIndex(x => x==app.id)
  	if(app.checked){ appfilter.splice(idindex, 1); app.checked=false }
  	else{ appfilter.push(app.id); app.checked=true }
  	return appfilter
  }

  findbannedunadmin(admins){
  	let a = admins.filter(function(s) {return !s.is_banned})
  	a.map(o => o.checked = false)
  	return a
  }

  cboxstatus(data, idArr){
  	if(idArr.length==0){this.adminidArr=[]}
  	if(data.checked){
  		let idindex = this.adminidArr.findIndex(x => x==data.id)
  		this.adminidArr.splice(idindex, 1)
  		data.checked=false
  	}else{
  		this.adminidArr.push(data.id)
  		data.checked=true
  	}
  	return this.adminidArr
  }

  countapps(data){
    let totalauth=[]
    let totalwms=[]
    let totallds=[]
    $.each(data, function(i,v){
      $.each(v.application_registrations, function(j,k){
        if(k.id==3){totalauth.push(k)}
        if(k.id==2){totalwms.push(k)}
        if(k.id==1){totallds.push(k)}
      })
    })
    let totals={'totalauth':totalauth, 'totalwms':totalwms, 'totallds':totallds}
    return totals
  }

}
