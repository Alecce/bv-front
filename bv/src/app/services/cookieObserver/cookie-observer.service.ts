import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CookieObserverService {
// @ts-ignore
  cookieObserver: BehaviorSubject = new BehaviorSubject();
  constructor(private cookieService: CookieService,
              public activatedRoute: ActivatedRoute) {
    this.checkCookiesOnLoad();


    if(!this.cookieService.get('interface')) {

      this.activatedRoute.queryParams.subscribe(x => {
        console.log(x);
        if (!x.lang && !this.cookieService.get('interface')) {
          this.cookieService.set('interface', 'english', 7, '/');
          this.cookieObserver.next(this.cookies);
        }
      });
    }



    this.cookieObserver.next(this.cookies);
    // this.cookieService.set('interface', 'english', 7, '/');
  }

// @ts-ignore
  public observeCookie(): Observable {

    return this.cookieObserver;
  }

  public cookieChanged(): void {
    // this.cookieObserver.next(this.cookieService.get('myId'));
    this.cookieObserver.next(this.cookies);
  }
  public get cookies() {


    return {
      id: this.cookieService.get('myId'),
      interface: this.cookieService.get('interface'),
      sequrity: this.cookieService.get('sequrity'),
      login: this.cookieService.get('login'),
    };
  }
  checkCookiesOnLoad() {

    const logout = this.cookieService.get('logout');

    if(logout) {
      this.cookieService.delete('sequrity', '/');
      this.cookieService.delete('sequrityForSend', '/');
      this.cookieService.delete('logout', '/');
    }

    // console.log(this.cookieService.get('sequrity'));
  }
}
