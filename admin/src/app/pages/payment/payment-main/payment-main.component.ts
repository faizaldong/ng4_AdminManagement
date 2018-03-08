import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {Json} from './payment-main-json';
import {BreadService} from '../../../services/bread/bread.service'
import {environment} from '../../../../environments/environment'

@Component({
  selector: 'app-payment-main',
  templateUrl: './payment-main.component.html',
  styleUrls: ['../../../../assets/css/pages/payment-layout.css',
              '../../../../assets/css/pages/payment.css',
              '../../../../assets/plugins/custom-payment-dropdown/css/noJS.css',
              '../../../../assets/plugins/custom-payment-dropdown/css/style.css' //when i enabled this file then at web header it appear the `Admin` word, but if this file disabled then drop down not working. lol
             ]
})
export class PaymentMainComponent implements OnInit {

  constructor(private router:Router, private _json:Json, private bread:BreadService) {}

  planchose:any; paymentmethodology:any;
  showsaved:boolean=false; disabledpay:boolean=false; totalsavedshow:boolean=false
  iconpay='fa fa-lock'; textpay='Pay Now'
  total:number=0; totalsaved:number=0; planid:number=0
  addedplans = JSON.parse(localStorage.getItem('addplans'))
  allplans = JSON.parse(localStorage.getItem('data')).filter(function(v){return v.plans.length>0})

  ngOnInit() {
    if(!this.addedplans){ this.router.navigate(['/upgrade-plans']); return false; }

    this.planchose = this._json.filterapp(this.addedplans,this.allplans)
    this.planid = this.planchose[0].planchose.id
    if(this.planchose[0].planchose.plan_frequency.name=='Anually'){ this.totalsavedshow=true; this.totalsaved=this.planchose[0].planchose.saved; this.planchose[0].planchose.savedshow=true;}
    this.total = this.planchose[0].planchose.priceshow

    function DropDown(el){
      this.dd = el;
      this.placeholder = this.dd.children('span');
      this.opts = this.dd.find('ul.dropdown > li > a');
      this.val = '';
      this.index = -1;
      this.initEvents();
    }

    DropDown.prototype = {
      initEvents : function() {
        var obj = this;

        obj.dd.on('click', function(event){
          $(this).toggleClass('active');
          return false;
        });

        obj.opts.on('click',function(){
          var opt = $(this);
          obj.val = opt.text();
          obj.index = opt.index();
          obj.placeholder.text(obj.val);
        });
      },
      getValue : function() {
        return this.val;
      },
      getIndex : function() {
        return this.index;
      }
    }

    $(function(){
      var dd = new DropDown($('.wrapper-dropdown-3'));

      $(document).click(function(){
        //all dropdowns
        $('.wrapper-dropdown-3').removeClass('active');
      });
    });

    // Payment Method Confirmation
    $('.payment-tabs .nav-item a').on('click', function(){
      $('.place-order').removeClass('disabled');
    });

  }

  choseanually(typepay, plan){
    this.planid = typepay.id
    if(typepay.plan_frequency.name=='Anually'){ this.totalsavedshow=true; this.totalsaved=this.planchose[0].planchose.saved; plan.planchose.savedshow=true; plan.planchose.priceshow=plan.planchose.priceanually; this.total=plan.planchose.priceanually }
    else{ plan.planchose.savedshow=false; plan.planchose.priceshow=plan.planchose.pricemonthly; this.total=plan.planchose.pricemonthly; this.totalsavedshow=false}
  }

  paymentmethod(paymethod){
    this.paymentmethodology=paymethod
  }

  paynow(){
    this.disabledpay=true
    this.iconpay='fa fa-circle-o-notch fa-spin fa-fw'
    this.textpay='processing..'
    // console.log({ response_type:'', payment_method: this.paymentmethodology, application_company_plan_id: this.planid })
    this.bread.Post(environment.paypal_make_payment, { response_type:'', payment_method: this.paymentmethodology, application_company_plan_id: 6 }).subscribe( good=>{window.location.href=good.json().result}, bad=>{console.log(bad)})
  }

}
