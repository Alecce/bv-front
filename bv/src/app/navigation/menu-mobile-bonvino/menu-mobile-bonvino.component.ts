import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ListsService} from '@src/app/services/api/lists.service';
import {languagesInterface} from '@src/environments/languages';
import {IconBonvinoComponent} from '@src/app/schemas/icon-bonvino/icon-bonvino.component';
import {Observable} from 'rxjs';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {variables} from '@src/environments/variables';
import {environment} from '@src/environments/environment';

@Component({
  selector: 'app-menu-mobile-bonvino',
  templateUrl: './menu-mobile-bonvino.component.html',
  styleUrls: ['./menu-mobile-bonvino.component.css']
})
export class MenuMobileBonvinoComponent implements OnInit {

// @ts-ignore
  cookies: Observable;
  @ViewChild('container') private container: ElementRef;
  @Output() menuOpened = new EventEmitter<boolean>();
  isMenuOpened = false;

  @ViewChild(NgbDropdown) private dropdown: NgbDropdown;

  variables = variables;

  // @ts-ignore
  @Input() navigationPages;
  // @ts-ignore
  @Input() navigationPagesBengat;

// @ts-ignore
  cookies: Observable;
  languageArr = languagesInterface;

  mapReplaces = new Map();
  mapSameLanguages = new Map();

  languagesOpen = false;
  profileOpen = false;



  profile = null;
  noImage = '../../../assets/images/no-image.png';

// @ts-ignore
  @ViewChild('icon1') public icon1: IconBonvinoComponent;
// @ts-ignore
  @ViewChild('icon2') public icon2: IconBonvinoComponent;

  form = new FormGroup({
    language: new FormControl('')
  });

  constructor(private service: RequestsService,
              public langService: LanguageServiceService,
              private cookieService: CookieService,
              public accountService: AccountServiceService,
              public listService: ListsService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              private cookieObserver: CookieObserverService) { }

  ngOnInit() {



    this.service.getLanguageList().subscribe(data => {

      console.log(data);
// @ts-ignore
      data = data.sort((a, b) => {
        return a.order - b.order;
      });
      const arr = [];
// @ts-ignore
      data.forEach(l => {
        const lang = {
          id: l.id,
          place: l.lang.toLowerCase(),
          name: l.lang,
          label: l.lang,
          value: l.lang.toLowerCase(),
          ispublic: l.ispublic,
          replaceLanguage: l.replace,
          sameLanguage: l.same,
          code: l.code,
          icon: ''
        };
        if (l.code) {
          lang.icon = 'flag-icon-' + l.code;
        }

        if(!languagesInterface.find(x => {
          return x.id == lang.id;
        })) {
          languagesInterface.push(lang);
        }
        //
        // this.mapReplaces.set(lang.value, lang);

      });

      this.langService.languagesLoaded.next(true);

// @ts-ignore
      languagesInterface.forEach(l => {
        const replace = languagesInterface.find(lang => {
          return lang.id == l.replaceLanguage;
        });

        this.mapReplaces.set(l.value, replace && replace.value);


        const sameLanguage = languagesInterface.find(lang => {
          return lang.id == l.sameLanguage;
        });
        this.mapSameLanguages.set(l.value, sameLanguage && sameLanguage.value);

      });
      // console.log(this.mapReplaces);
      this.langService.setLanguageReplaces(this.mapReplaces);
      this.langService.setSameLanguages(this.mapSameLanguages);

      console.log(this.cookieService.get('interface'));
      console.log(this.activatedRoute.snapshot.queryParams.lang);

      if(!this.cookieService.get('interface') && this.activatedRoute.snapshot.queryParams.lang) {
        const paramQueryLanguage = this.getLanguageByCode(this.activatedRoute.snapshot.queryParams.lang);

        console.log(paramQueryLanguage);
        this.cookieService.set('interface', paramQueryLanguage.value, 7, '/');

        this.cookieObserver.cookieObserver.next(this.cookieObserver.cookies);
      }
      this.langService.addLanguageParam();
    });
    this.cookies = this.cookieObserver.observeCookie();
    this.cookies.subscribe(cookie => {
      this.langService.setLanguage(cookie.interface);
    });


    this.cookies.subscribe(x => {
      // console.log(x);

      const idData = this.getCookieData();

      this.accountService.getProfile.subscribe(profile => {
        console.log(profile);
        if(profile) {

// @ts-ignore
          this.profile = profile;
// @ts-ignore
          this.profile.id = idData.myId;
        }

      });

    });
  }

  getLanguageByCode(code) {

    return languagesInterface.find(lang => {
      return lang.code == code;
    });
  }

  getLanguageByValue(value) {

    return languagesInterface.find(lang => {
      return lang.value == value;
    });
  }

  changeLanguage(language) {


    if (this.langService.editable) {
      return;
    }
    this.langService.setLanguage(language);

    console.log(language);
// @ts-ignore
    this.cookieService.set('interface', language, 7, '/');
    this.cookieObserver.cookieChanged();
    if (this.cookieService.get('myId')) {

      this.service.setLanguage({language}).subscribe();
    }
    this.langService.addLanguageParam();
  }

  getLanguage() {
    const res = this.langService.getLanguage();
    // console.log(res);
    return res;
  }

  switchEdition() {
    this.langService.switchEdition();
  }
  paintMouseOver(color) {
    this.icon1.paintSpecial( color);
    this.icon2.paintSpecial( color);
  }


  routeToHome() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/'])
    );
    console.log(this.router.url)
  }

  routeToWinerylist() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['winery-list'])
    );
    console.log(this.router.url)
  }

  routeToWinelist() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['wine-list'])
    );
    console.log(this.router.url)
  }

  routeToWinelistRates() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['wine-list'], { queryParams: { tab: 'myRates' } })
    );
    console.log(this.router.url)
  }

  routeToWinelistCollection() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['wine-list' ], { queryParams: { tab: 'collection' } })
    );
    console.log(this.router.url)
  }

  routeToEventlist() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['event-list'])
    );
  }


  public getWidth() {

    // console.log(this.container);
    if(this.container && this.container.nativeElement && this.container.nativeElement.offsetWidth) {

      // console.log(this.container.nativeElement.offsetWidth);
      return this.container.nativeElement.offsetWidth - 18;
    }
  }
  onMenuOpened() {
    // console.log($event);
// @ts-ignore
    this.menuOpened.emit(true);

    this.isMenuOpened = true;
  }
  onMenuClosed() {

    this.isMenuOpened = false;
    this.languagesOpen = false;
    this.profileOpen = false;
  }

  clickOnMenu($event) {
    if(this.langService.editable) {
      $event.stopPropagation();
    }
  }

  getListOfPages() {
    return this.variables.bengat ? this.navigationPagesBengat : this.navigationPages;
  }

  switchLanguageList() {
    this.languagesOpen = !this.languagesOpen;
  }
  switchProfileList() {
    this.profileOpen = !this.profileOpen;
  }
  getImage() {
    if (this.profile && this.profile.image) {
      return environment.userImageStore + `${this.profile.id + '_' + this.profile.image}.png`;
    } else {
      return this.noImage;
    }
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
  routeTo(route) {

    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate([route], { queryParams: { tab: 'collection' } })
    );

    // 'my-business/' + cookieService.get('myId')
    return;
  }
}
