import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    /**
     * Check if Trainer has been logged in. If not redirect to login page.
     * @param route 
     * @param state 
     * @returns true if user is logged in.
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // Check if is logged in.
        if (this.auth.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['login']); // Reroute to Login Page.
        return false;
    }
}
