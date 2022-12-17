import {Component, OnInit} from '@angular/core';
import {CookieObserverService} from '../services/cookieObserver/cookie-observer.service';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../services/language-service.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private titleService: Title,
    private route: Router) { }

  ngOnInit() {

    let title = 'Logout - bonvino.com';
    this.titleService.setTitle(title);

  }
  submit() {
    if (this.langService.editable) {
      return;
    }
    this.cookieService.delete('myId');
    this.cookieService.delete('hash');
    this.cookieObserver.cookieChanged();
    this.route.navigate(['login']);
  }
}
