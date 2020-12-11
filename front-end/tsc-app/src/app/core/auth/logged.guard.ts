import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class LoggedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user$.pipe(
            take(1),
            // switchMap(user => {
            //     return user === undefined ? this.authService.authenticateCurrentUser() : [user]
            //  }),
            map(user => {
                // const isLoggedFromData = childRoute.data.isLogged;
                // return typeof isLoggedFromData === 'boolean' && isLoggedFromData === !!user;
                return !!user;
            }),
            tap((canContinue) => {
                if (!canContinue) { return; }
                const url = this.router.url;
                this.router.navigateByUrl(url);
            })
        )
    }
}