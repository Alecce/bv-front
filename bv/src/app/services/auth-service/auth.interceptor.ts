import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CookieObserverService} from '../cookieObserver/cookie-observer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingServiceService} from '../loading-service.service';
import {InvalidDataErrorComponent} from '../invalid-data-error/invalid-data-error.component';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  test = false;
  constructor(private cookieService: CookieService,
              private cookieObserver: CookieObserverService,
              private route: Router,
              private snackBar: MatSnackBar,
              private loadingService: LoadingServiceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log('intercepting');

    const auth = JSON.stringify({
      id: this.cookieService.get('myId'),
      hash: this.cookieService.get('hash'),
      sequrity: this.cookieService.get('sequrityForSend')
    });

    const authReq = req.clone({
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Authorization': auth,
        // 'Id': 'id'
      })
    });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        // console.log(authReq);
        // console.log(next.handle(authReq).subscribe(data => {
        //   console.log(data);
        // }));
        this.loadingService.loading = false;
        if (error.status === 404 || error.status === 400) {
          console.log(error.error == 'page do not exist');
          if (error.error == 'page do not exist') {
            this.route.navigate(['page404']);
          } else {
            this.snackBar.open(error.error, 'close', {
              duration: 100000,
            });
          }
        } else if (error.status === 422) {
          // this.snackBar.open(error.error.message, 'close', {
          //   duration: 100000,
          // });
          this.snackBar.openFromComponent(InvalidDataErrorComponent, {
            duration: 100000,
          });
        } else if (error && error.status === 401) {
//           console.log('auth fail');
//
// // @ts-ignore
//           this.cookieService.delete('myId', '/');
// // @ts-ignore
//           this.cookieService.delete('hash', '/');
// // @ts-ignore
//           this.cookieService.delete('sequrity', '/');
//           this.cookieObserver.cookieChanged();
//           this.route.navigate(['login']);
          const text = 'Wrong authentication. Try to exit and enter or may be you have no rights to process this.';
          this.snackBar.open(text, 'close', {
            duration: 100000,
          });
          return of(null);
        } else {
          const text = error.error + error.error.message;
          this.snackBar.open(text, 'close', {
            duration: 100000,
          });
        }
      }));
  }
}
