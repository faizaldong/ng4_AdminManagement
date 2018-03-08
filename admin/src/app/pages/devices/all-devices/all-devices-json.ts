import { Injectable } from '@angular/core';

@Injectable()
export class Json {

  constructor(){ }
  devicedeleteArr=[]

  injectStatus(devices){
    $.each(devices, function(i, v){
    	devices[i].device_name = v.device_platform?v.device_platform:'' +" "+ v.device_manufacturer?v.device_manufacturer: '' +" ("+ v.device_model?v.device_model: '' +")"
      // devices[i].checked=false
    })
  }

  checkuncheckfordeleteDevice(phone, event, iddeviceArr){
    if(iddeviceArr.length==0){this.devicedeleteArr=[]}
	  	if(event=="true"){
	      this.devicedeleteArr.splice($.inArray(phone.id, this.devicedeleteArr),1);
	      phone.checked=false
	    }else{
	      this.devicedeleteArr.push(phone.id)
	      phone.checked=true
	    }
	  
	  return this.devicedeleteArr
  }

  onSelectedKeysChange(e, mySelection, selectAllState, device) {
    let len = mySelection.length;
    if (len === 0) {
      selectAllState = 'unchecked';
    }else if (len > 0 && len < device.length) {
      selectAllState = 'indeterminate';
    }else {
      selectAllState = 'checked';
    }
    return selectAllState
  }

  onSelectAllChange(checkedState, mySelection, selectAllState, device) {
    if (checkedState === 'checked') {
      mySelection = device.map((item) => item.id);
      selectAllState = 'checked';
    } else {
      mySelection = [];
      selectAllState = 'unchecked';
    }
    return selectAllState
  }

  checkIshaveunbanneddevice(device, mySelection){
  	let obArr=[]
  	$.each(device, function(i,v){
  		$.each(mySelection, function(i2,v2){
  			if(v.id==v2){
  				obArr.push(v)
  			}
  		})
  	})
  	let found = obArr.filter(function(s){ if(!s.is_banned){return true}})
  	if(found.length>0){return true}else{return false}
  }

}
