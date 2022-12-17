import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../services/language-service.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {CookieObserverService} from '../services/cookieObserver/cookie-observer.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  // templateUrl: './navigation.design.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
// @ts-ignore
  cookies: Observable;


  constructor(private cookieObserver: CookieObserverService,
              public cookieService: CookieService,
              public langService: LanguageServiceService,
              config: NgbDropdownConfig) {
    config.autoClose = 'outside';
  }
  ngOnInit() {
    this.cookies = this.cookieObserver.observeCookie();
    this.cookieObserver.cookieObserver.subscribe(q => {
      console.log(q);
    });

    this.cookieObserver.cookieChanged();
  }

}
