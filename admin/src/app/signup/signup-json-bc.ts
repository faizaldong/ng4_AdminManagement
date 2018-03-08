import { Injectable } from '@angular/core';

@Injectable()
export class Json {


  adminArr=[]
  branchArr=[]

  constructor() { }

  addAdmin(admin){
    let adminObj={first_name: admin.add_first_name, email: admin.add_email, address: admin.add_address, contact_no:admin.add_contact_no, password:admin.add_password}
    this.adminArr.push(adminObj)
    return this.adminArr
  }

  modaleditAdmin(index, admin){
    let adminedit={index:index, edit_first_name:admin.first_name, edit_last_name:'', edit_address:admin.address, edit_postal_code:'', edit_contact_no:admin.contact_no, edit_email:admin.email, edit_password:admin.password}
    return adminedit
  }

  editAdmin(admins, admin){
    admins[admin.index].first_name=admin.edit_first_name
    admins[admin.index].email=admin.edit_email
    admins[admin.index].address=admin.edit_address
    admins[admin.index].contact_no=admin.edit_contact_no
    admins[admin.index].password=admin.edit_password
  }

  addBranch(branch){
    let branchObj={branch_name: branch.add_branch_name, branch_email: branch.add_branch_email, branch_tel_no: branch.add_branch_tel_no, branch_fax_no:branch.add_branch_fax_no, address:branch.add_address, postal_code:branch.add_postal_code, district_id:branch.add_district_id, building_no:branch.add_building_no, unit_no:branch.add_unit_no}
    this.branchArr.push(branchObj)
    return this.branchArr
  }

  modaleditBranch(index, branch){
    let branchedit={index:index, edit_branch_name:branch.branch_name, edit_branch_email:branch.branch_email, edit_address:branch.address, edit_branch_tel_no:branch.branch_tel_no, edit_branch_fax_no:branch.branch_fax_no,}
    return branchedit
  }
  
  editBranch(branches, branch){
    branches[branch.index].branch_name=branch.edit_branch_name
    branches[branch.index].branch_email=branch.edit_branch_email
    branches[branch.index].address=branch.edit_address
    branches[branch.index].branch_tel_no=branch.edit_branch_tel_no
    branches[branch.index].branch_fax_no=branch.edit_branch_fax_no
  }

  usedjquery(){
    $(function() {$(".preloader").fadeOut();});
    $(function() {(<any>$('[data-toggle="tooltip"]')).tooltip()});
    $('#to-recover').on("click", function() {$("#loginform").slideUp(); $("#recoverform").fadeIn();});
    $('#to-login').on("click", function() {$("#loginform").slideDown(); $("#recoverform").hide();});
  }

}
