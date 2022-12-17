import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {ActivatedRoute} from '@angular/router';
import {LanguageServiceService} from '../../services/language-service.service';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {languagesInterface} from '@src/environments/languages';

@Component({
  selector: 'app-admin-language',
  templateUrl: './admin-language.component.html',
  styleUrls: ['./admin-language.component.css']
})
export class AdminLanguageComponent extends SuperTabComponent implements OnInit {
  tab = 'languagelist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    // id, code, lang, ispublic, order
    {variable: 'id', name: '#', link: false, href: '', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'code', name: 'Code', link: false, href: '', hrefId: '', searchFormControlName: 'code', default: ''},
    {variable: 'lang', name: 'Language', link: false, href: '', hrefId: '', searchFormControlName: 'lang', default: ''},
    {variable: 'ispublic', name: 'Public', link: false, href: '', hrefId: '', searchFormControlName: 'ispublic', type: 'checkbox', default: false},
    {variable: 'order', name: 'Order', link: false, href: '', hrefId: '', searchFormControlName: 'order', default: ''},
    {variable: 'replace', name: 'Alternative language', link: false, href: '', hrefId: '', searchFormControlName: 'replace', default: ''},
    {variable: 'same', name: 'Same language', link: false, href: '', hrefId: '', searchFormControlName: 'same', default: ''},
    {variable: 'translateForm', name: 'Language translate', link: false, href: '', hrefId: '', searchFormControlName: 'translateForm', default: '',
      type: 'translate', translatePage: 'language',
      translateDefault: ((row) => {
        return row.lang;
      }),
      translateLanguage: ((row) => {
        return null;
      }),
      translatePlace: ((row) => {
        return this.langService.morphStr(row.lang);
      })},
  ];


  storage = 'wineImages';
  lists = {

    replace: [
      {id: '', name: 'select'},
    ],
    same:  [
      {id: '', name: 'select'},
    ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getLanguagelist';
  apiSend = 'setLanguage';
  apiDelete = 'deleteLanguage';



  // @ts-ignore
  @ViewChild(AdminSuperlistComponent) superlist: AdminSuperlistComponent;

  constructor(
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    public langService: LanguageServiceService,
    private service: RequestsService,
  ) {
    super();
  }

  ngOnInit() {

//
    this.langService.mapReplacesSubject.subscribe(() => {
      languagesInterface.forEach(language => {
        this.lists.replace.push(language);
        this.lists.same.push(language);

      })
    })
  }

  getData() {
    this.superlist.getData();
  }

  public downloadAdditionalData() {

  }
}
