import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {

  constructor() { }

  listofPermissions(rolepermission, service){
    let permissions = []
    for(let i=0; i<rolepermission.length; i++){
      if(rolepermission[i].application_registration.name==service){
        permissions = rolepermission[i]
      }
    }

    return permissions
  }

  addrole_permissionlistinjected(data){
  	for(let i=0; i<data.length; i++){
     data[i].selected=false
     data[i].permission_ids=[]
     for(let j=0; j<data[i].permissions.length; j++){
       data[i].permissions[j].selected=false
       for(let k=0; k<data[i].permissions[j].permissions.length; k++){
         data[i].permissions[j].permissions[k].selected=false
       }
     }
   }
   return data
  }

  editrole_permissionlistinjected(permissiongroupby, roledetails){
   //  for(let y=0; y<data.length; y++){
   //  	data[y].selected=false
	  //   data[y].permission_ids=[]
	  //   for(let i=0; i<data[y].permissions.length; i++){
	  //   	data[y].permissions[i].selected=false
	  //   	for(let j=0; j<data[y].permissions[i].permissions.length; j++){
	  //   		$.each(roledetails.permissions, function(i4,v4){
	  //   			if(data[y].permissions[i].permissions[j].id==v4.id){
	  //   				data[y].permission_ids.push(data[y].permissions[i].permissions[j].id)
	  //   				data[y].permissions[i].permissions[j].selected=true
	  //   			}
	  //   		})
	  //   	}
	  //   }
	  // }
   // return data
    $.each(permissiongroupby, function(j,k){
      permissiongroupby[j].permission_ids=[]
      $.each(roledetails.permissions, function(i,v){
        if(k.application_registration.id==v.application_registration_id){
          permissiongroupby[j].selected=true
          $.each(k.permissions, function(l,m){
            if(m.name==v.group){
              k.permissions[l].selected=true
              $.each(m.permissions, function(n,o){
                if(o.id==v.id){
                  m.permissions[n].selected=true
                  permissiongroupby[j].permission_ids.push(m.permissions[n].id)
                }
              })
            }
          })
        }
      })
    })
    return permissiongroupby
  }

  duplicate(permissiongroupby, duplicate){
    $.each(duplicate, function(i,v){
      $.each(permissiongroupby, function(j,k){
        if(k.application_registration.id==v.application_registration_id){
          permissiongroupby[j].selected=true
          permissiongroupby[j].permission_ids.push(duplicate[i].id)
          $.each(k.permissions, function(l,m){
            if(m.name==v.group){
              k.permissions[l].selected=true
              $.each(m.permissions, function(n,o){
                if(o.id==v.id){
                  m.permissions[n].selected=true
                }
              })
            }
          })
        }
      })
    })
  }

  checkALLBox(rolepermission, service, event){
  	for(let i=0; i<rolepermission.length; i++){
      if(rolepermission[i].application_registration.name==service.name){
        if(event=='true'){//uncheck all
          rolepermission[i].selected=false;
          for(let j=0; j<rolepermission[i].permissions.length; j++){
            rolepermission[i].permissions[j].selected=false
            for(let k=0; k<rolepermission[i].permissions[j].permissions.length; k++){
              rolepermission[i].permission_ids=[]
              rolepermission[i].permissions[j].permissions[k].selected=false
            }
          }
         }
        else{//check all
          rolepermission[i].selected=true;
          for(let j=0; j<rolepermission[i].permissions.length; j++){
            rolepermission[i].permissions[j].selected=true
            for(let k=0; k<rolepermission[i].permissions[j].permissions.length; k++){
              rolepermission[i].permission_ids.push(rolepermission[i].permissions[j].permissions[k].id)
              rolepermission[i].permissions[j].permissions[k].selected=true
            }
          }
         }
      }
    }
    return rolepermission
  }

  checkBoxbyGroup(rolepermission, pergroup, event){
  	for(let i=0; i<rolepermission.length; i++){
      if(rolepermission[i].application_registration.id == pergroup.permissions[0].application_registration_id){
        if(event=='true'){
          pergroup.selected=false
          for(let j=0; j<pergroup.permissions.length; j++){
            pergroup.permissions[j].selected=false
            rolepermission[i].permission_ids=[]
            // rolepermission[i].permission_ids.splice(j, 1)
          }
          let notfoundgroupselected = rolepermission[i].permissions.filter(function(v){return v.selected==true})
          if(notfoundgroupselected.length==0){rolepermission[i].selected=false}//set portal checkbox unchecked if no groups checked
        }else{
          rolepermission[i].selected=true
          pergroup.selected=true
          for(let j=0; j<pergroup.permissions.length; j++){
            pergroup.permissions[j].selected=true
            rolepermission[i].permission_ids.push(pergroup.permissions[j].id)
          }
        }
      }
    }
    return rolepermission
  }

  checkBox(rolepermission, per, event){
  	for(let i=0; i<rolepermission.length; i++){
      if(rolepermission[i].application_registration.id == per.application_registration_id){
        if(event=='true'){
          per.selected=false
          $.each(rolepermission[i].permission_ids, function(j,k){ //remove id form array
          	if(k==per.id){
          		rolepermission[i].permission_ids.splice(j, 1)
          	}
          })
          $.each(rolepermission[i].permissions, function(l,m){
            if(m.name==per.group){
              $.each(m.permissions, function(n,o){ if(o.id==per.id){m.permissions[n].selected=false} })//set the chose permission to false
              let notfoundpermissionselected = m.permissions.filter(function(v){return v.selected==true})
              if(notfoundpermissionselected.length==0){rolepermission[i].permissions[l].selected=false}//set group checkbox unchecked if no permissions checked
            }
          })
          let notfoundgroupselected = rolepermission[i].permissions.filter(function(v){return v.selected==true})
          if(notfoundgroupselected.length==0){rolepermission[i].selected=false}//set portal checkbox unchecked if no groups checked
        }else{
          rolepermission[i].selected=true
          per.selected=true
          rolepermission[i].permission_ids.push(per.id)
          $.each(rolepermission[i].permissions, function(l,m){
            if(m.name==per.group){
              rolepermission[i].permissions[l].selected=true
            }
          })
        }
      }
    }
    return rolepermission
  }

}
