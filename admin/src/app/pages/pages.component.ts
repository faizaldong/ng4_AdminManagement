import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PageComponent implements OnInit {

    constructor(public router: Router) { }

    ngOnInit() {

        // if (this.router.url === '/login') {
        //   this.router.navigate(['/login'])
        // }
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
        // if (this.router.url === '/devices') {
        //   this.router.navigate(['/devices'])
        // }
        // if (this.router.url === '/all-accounts') {
        //   this.router.navigate(['/all-accounts'])
        // }
        // if (this.router.url === '/add-accounts') {
        //   this.router.navigate(['/add-accounts'])
        // }
        // if (this.router.url === '/all-roles') {
        //   this.router.navigate(['/all-roles'])
        // }
        // if (this.router.url === '/activity-log') {
        //   this.router.navigate(['/activity-log'])
        // }
        // if (this.router.url === '/order-history') {
        //   this.router.navigate(['/order-history'])
        // }
    }

}
