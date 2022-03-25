import {Injectable} from "@angular/core";
import {HttpInterceptor} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
      if(this.auth.isAuthenticated()) {
        req = req.clone({
          setParams: {
            auth: this.auth.token
          }
        })
      }

      return next.handle(req)
        .pipe(
          catchError(error => {
            if(error.status === 401) {
              this.auth.logout()
              this.router.navigate(['/admin', 'login'])
            }
            return throwError((error))
          })
        )
  }
}
