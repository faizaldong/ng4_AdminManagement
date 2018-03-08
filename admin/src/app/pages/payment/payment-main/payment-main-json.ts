import { Injectable } from '@angular/core';

@Injectable()
export class Json {

  constructor() { }

  filterapp(addedplans, allplans){
    let getapps=[]
    let saved=0
    $.each(allplans, function(i,v){
      $.each(addedplans, function(j,k){
        if(v.application_registration.id==k.application_registration_id){
          getapps.push(v)
        }
      })
    })
    $.each(getapps, function(i,v){
      $.each(addedplans, function(j,k){
        if(v.application_registration.id==k.application_registration_id){
          let plans = getapps[i].plans.filter(function(v){ return v.plan_name==k.plan_name})
          getapps[i].plans=[]
          getapps[i].plans=plans
          getapps[i].planchose=addedplans[j]
          getapps[i].planchose.savedshow=false
          getapps[i].planchose.priceshow=getapps[i].planchose.price
          $.each(v.plans, function(m,n){ if(n.plan_frequency_id==3){ getapps[i].planchose.priceanually=parseInt(n.price)}else{getapps[i].planchose.pricemonthly=parseInt(n.price)}  })

        }
      })
      if(v.planchose.priceanually&&v.planchose.pricemonthly){ getapps[i].planchose.saved=v.planchose.pricemonthly-v.planchose.priceanually} //MAKE SURE MONTHLY PRICE IS ALWAYS HIGHER THAN ANUALLY PRICE ELSE WILL GET (-)
      if(v.planchose.priceanually&&!v.planchose.pricemonthly){getapps[i].planchose.saved=v.planchose.priceanually}
    })
    return getapps
  }

}
