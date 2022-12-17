import {Component, OnInit} from '@angular/core';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {environment} from '../../../environments/environment';
import {AccountServiceService} from '../../services/account-service.service';
import {ResolutionService} from '@src/app/services/resolution.service';

@Component({
  selector: 'app-accaunt-designed',
  templateUrl: './accaunt-designed.component.html',
  styleUrls: ['./accaunt-designed.component.css']
})
export class AccauntDesignedComponent implements OnInit {

  profile = null;

  noImage = '../../../assets/images/no-image.png';
  cookies: Observable<any>;
  constructor(private cookieObserver: CookieObserverService,
              public cookieService: CookieService,
              public langService: LanguageServiceService,
              private accountService: AccountServiceService,
              private service: RequestsService,
              public  resolutionService: ResolutionService,
              config: NgbDropdownConfig) {
    config.autoClose = 'outside';

    config.placement = 'left-bottom';
  }

  ngOnInit() {
    this.cookies = this.cookieObserver.observeCookie();
    this.cookieObserver.cookieChanged();
    this.cookies.subscribe(x => {
      // console.log(x);

      const idData = this.getCookieData();

      this.accountService.getProfile.subscribe(profile => {
        // console.log(profile);
// @ts-ignore
        this.profile = profile;
// @ts-ignore
        this.profile.id = idData.myId;

      });

    });
    // this.service.getProfile(thi)
  }


  getCookieData() {
    return {
      myId: this.cookieService.get('myId'),
      passwordHash: this.cookieService.get('hash')
    };
  }
  logout() {
    if (this.langService.editable) {
      return;
    }
    const sequrity = this.cookieService.get('sequrity');
    this.cookieService.delete('myId', '/');
    this.cookieService.delete('hash', '/');
    this.cookieService.delete('login', '/');
    this.cookieService.delete('sequrity', '/');
// @ts-ignore
    this.cookieService.set('sequrity', sequrity, 0, '/');
// @ts-ignore
    this.cookieService.set('logout', '1', 7, '/');
    this.cookieObserver.cookieChanged();
    // this.route.navigate(['login']);
  }
  getImage() {
    if (this.profile && this.profile.image) {
      return environment.userImageStore + `${this.profile.id + '_' + this.profile.image}.png`;
    } else {
      return this.noImage;
    }
  }

  isBigScreen() {
    return window.innerWidth > 1080
  }
}
