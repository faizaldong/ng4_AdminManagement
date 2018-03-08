export const environment = {
  production: false,

  //HOST APP
  'wmsportal_APP': 'https://www.google.com',
  'ldsportal_APP': 'https://www.google.com',

  //HOST API
  'authAPI': 'http://saas.staging.auth.apptimice.com/',
  'wmsAPI': 'http://staging.wms.apptimice.com/',
  'ldsAPI': 'http://staging.lds.apptimice.com/',
  'hrAPI': 'http://staging.hr.apptimice.com/',
  'financeAPI': 'http://staging.finance.apptimice.com/',
  'paypal_vault': 'https://api.sandbox.paypal.com/v1/vault/credit-cards/',

  //PATH API
  'signup_API': 'api/application_companies',
  'customlogin_API': 'api/login',
  'refreshexpiredtoken_API': 'api/oauth/token',
  'validateemail_API': 'admin/api/validate/email',
  'forgotpassword_API': 'admin/api/forgot/password',
  'resetpassword_API': 'admin/api/reset/password',
  'tokeninfo_API': 'api/oauth/token/info',
  'paypal_token': 'admin/api/paypal/token',
  'paypal_make_payment': 'admin/api/application_payment/make_payment',
  'vaultscreateupdatedelete_API': 'admin/api/vaults',

  'applicationplanaddlistshowedit_API': 'admin/api/application_company_plans', // show&update=> /:id
  'applicationregistration_API': 'admin/api/application_registrations',

  'applicationplancollectionlistshow_API': 'admin/api/application_company_plans', // show=> /:id

  'adminaddlistshowedit_API': 'admin/api/admins', // show=> /:id, edit=> /:id/update,
  'admindelete_API': 'admin/api/delete/admins', // delete&unbanned => ?id=&unbanned_admin_id=
  'adminprofile_API': 'admin/api/profile/admins',

  'companyaddlistshowedit_API': 'admin/api/application_companies', // show&update=> /:id

  'roleaddlistupdatedelete_API': 'admin/api/roles', // update&delete=> /:id, 

  'deviceaddlistshowedit_API': 'admin/api/device_managements', // show&update=> /:id
  'devicedelete_API': 'admin/api/delete/devices', // delete=> ?id&unbanned_id

  'workeraddlistshowupdate_API': 'admin/api/workers', // update&show=> /:id
  'workerdelete_API': 'admin/api/delete/workers?id=', 
  'workerdistance_API': 'admin/api/workers/list_by_distance?latitude=&longitude=',

  'orderhistory_API': 'admin/api/application_payment',

  'permissionaddlistshowupdatedelete_API': 'admin/api/permissions', // update&delete=> /:id
  'permissiongroupby_API': 'admin/api/permissions?group=application_registrations',

  'webupload_API': 'api/upload',
  'webuploadbase64_API': 'api/upload_base64',

  'pdfapplicationpaymentrecords_API': 'application_payment_records_pdf'
};



// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// # Credentials for REST APIs
//   client_id: AZpO0S058nLcOhgQ-0YI9gjbeaSoRSbMpK-BIrYGsmuZf2rk_Jjr-KjtUzRvYxXu9jRV-yx3WlwcW3vy
//   client_secret: EDAxLJxd7vtR8Xd-t2ZOnDTwsdPLx4CLZzixm8siZo8olupfZMqKFxIzDd9WJDcqUIXCmi7znh7dA0Z1