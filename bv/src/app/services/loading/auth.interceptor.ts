import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CookieObserverService} from '../cookieObserver/cookie-observer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingServiceService} from '../loading-service.service';
import {Injectable} from "@angular/core";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {


  counter = 0;
  test = false;
  constructor(private cookieService: CookieService,
              private cookieObserver: CookieObserverService,
              private route: Router,
              private snackBar: MatSnackBar,
              private loadingService: LoadingServiceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const c = (req.url.indexOf('.svg') == -1);
    // console.log(req.url);
    // console.log(req.url.indexOf('.svg'));
    // console.log(c);
    this.loadingService.startLoading(c);
    return next.handle(req).pipe(
      map((responce) => {
        // console.log(req);
        // console.log(responce);

        this.loadingService.endLoading(c);
        return responce;
      }));
  }
}
