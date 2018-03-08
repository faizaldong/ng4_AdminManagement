import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

		credential = JSON.parse(localStorage.getItem('credential_token'))

    constructor(private router: Router) { }

    //WHEN USER WANT TO ACCESS PAGES THIS WILL TRIGGER
    canActivate() {
        if (this.credential && this.credential.access_token) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
