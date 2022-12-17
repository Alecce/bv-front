import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {IconBonvinoComponent} from '@src/app/schemas/icon-bonvino/icon-bonvino.component';
import {ListsService} from '@src/app/services/api/lists.service';
import {FormControl, FormGroup} from '@angular/forms';
import {languagesInterface} from '@src/environments/languages';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';

@Component({
  selector: 'app-language-navigate-mobile',
  templateUrl: './language-navigate-mobile.component.html',
  styleUrls: ['./language-navigate-mobile.component.css']
})
export class LanguageNavigateMobileComponent implements OnInit {
// @ts-ignore
  cookies: Observable;
  languageArr = languagesInterface;

  mapReplaces = new Map();
  mapSameLanguages = new Map();

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
}
