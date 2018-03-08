import { Injectable } from '@angular/core';

@Injectable()
export class Json {

  constructor() { }

  assignData(companydetails, companyObj){
    companyObj.company_logo = companydetails.result[0].company_logo? companydetails.result[0].company_logo: companydetails.result.company_logo
    companyObj.company_name = companydetails.result[0].company_name? companydetails.result[0].company_name: companydetails.result.company_name
    companyObj.email = companydetails.result[0].email? companydetails.result[0].email: companydetails.result.email
    companyObj.address = companydetails.result[0].address? companydetails.result[0].address: companydetails.result.address
    companyObj.contact_no = companydetails.result[0].contact_no? companydetails.result[0].contact_no: companydetails.result.contact_no
    companyObj.fax_no = companydetails.result[0].fax_no? companydetails.result[0].fax_no: companydetails.result.fax_no
    companyObj.company_registration_no = companydetails.result[0].company_registration_no? companydetails.result[0].company_registration_no: companydetails.result.company_registration_no
    companyObj.application_company_addresses = companydetails.result[0].application_company_addresses? companydetails.result[0].application_company_addresses: companydetails.result.application_company_addresses
  }

  addBranch(branch){
    let b = {branch_name: '', branch_email: '', address: '', branch_tel_no: '', branch_fax_no: ''}
    b.branch_name= branch.name
    b.branch_email= branch.email
    b.address= branch.addresss
    b.branch_tel_no= branch.tel_no
    b.branch_fax_no= branch.fax_no
    $("#addBranch").modal('toggle')
    return b
  }

  deleteBranchModal(index, branch){
    let b = {index: 0,branch_name: '', branch_email: '', address: ''}
    b.index = index
    b.branch_name= branch.branch_name
    b.branch_email= branch.branch_email
    b.address= branch.address

    return b
  }

  deleteBranch(branch){
    $("#deleteBranchmodal").modal('toggle')
    return branch.index
  }

  webUpload64(img64){
    let jsonwebupload = { "folder_name": "CompanyLogo", "exact": true, "height": 100, "width": 300, "ignore_ratio": true, "base64_images": [ img64 ] }
    return jsonwebupload
  }

}
