import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title, DOCUMENT } from '@angular/platform-browser';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {AuthenticateService} from '../../services/authenticate/authenticate.service'

@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Input() layout;
    pageInfo;
  	name:string;
  	showHide:boolean;
    owneraccount:any

  	constructor(
      public router: Router,
      private activatedRoute: ActivatedRoute,
      private titleService: Title,
      private authenticate: AuthenticateService
    ) {
    	this.showHide = true;
      this
      .router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
          this.titleService.setTitle(event['title']);
          this.pageInfo = event;
          if(this.pageInfo.title=='Upgrade Plan'){
            document.getElementById('removenavcss').setAttribute('href','../../../assets/css/pages/remove-navs.css');
          }
          else if(this.pageInfo.title=='Payments'){
            document.getElementById('removenavcss').setAttribute('href','../../../assets/css/pages/remove-navs.css');
          }else if(this.pageInfo.title=='Payment Success'){
            document.getElementById('removenavcss').setAttribute('href','../../../assets/css/pages/remove-navs.css');
          }else if(this.pageInfo.title=='Payment Failed'){
            document.getElementById('removenavcss').setAttribute('href','../../../assets/css/pages/remove-navs.css');
          }else{
            document.getElementById('removenavcss').setAttribute('href','');
          }
      });
  	}

  	changeShowStatus(){
    	this.showHide = !this.showHide;
  	}

    ngOnInit(){
      this.owneraccount = JSON.parse(localStorage.getItem('credential'))
    }

    editAccount(id){
      this.router.navigate(['/edit-accounts', {id:id}]);
    }

    logout(){
      this.authenticate.logout()
    }

    ngAfterViewInit() {

        $(function () {
            $(".preloader").fadeOut();
        });

        var set = function () {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 0;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".sidebartoggler i").addClass("ti-menu");
            } else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
            }

            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $(".page-wrapper").css("min-height", (height) + "px");
            }

        };
        $(window).ready(set);
        $(window).on("resize", set);

        $(document).on('click', '.mega-dropdown', function (e) {
            e.stopPropagation();
        });

        $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
            $(".app-search").toggle(200);
        });

        (<any>$('.scroll-sidebar, .right-sidebar, .message-center')).perfectScrollbar();

        $("body").trigger("resize");
    }
}
