import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {ListsService} from '../../services/api/lists.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-autodescription-categories',
  templateUrl: './admin-autodescription-categories.component.html',
  styleUrls: ['./admin-autodescription-categories.component.css']
})
export class AdminAutodescriptionCategoriesComponent extends SuperTabComponent implements OnInit {
  tab = 'setAutodescriptionCategories';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'translateName', name: 'Translate of name', link: false, href: '', hrefId: '', searchFormControlName: 'translateName', default: '',
      type: 'translate', translatePage: 'wines_autodescription',
      translateLanguage: ((row) => {
        return null;
      }),
      translateDefault: ((row) => {
        return row.name;
      }),
      translatePlace: ((row) => {
        return this.langService.morphStr(row.group + '_' + row.name);
      })},
    {variable: 'place', name: 'Place', link: false, href: '', hrefId: '', searchFormControlName: 'place', default: ''},
    {variable: 'group', name: 'Group', link: false, href: '', hrefId: '', searchFormControlName: 'group', default: ''},
    {variable: 'translateGroup', name: 'Translate of group', link: false, href: '', hrefId: '', searchFormControlName: 'translateGroup', default: '',
      type: 'translate', translatePage: 'wines_autodescription',
      translateLanguage: ((row) => {
        return null;
      }),
      translateDefault: ((row) => {
        return row.group;
      }),
      translatePlace: ((row) => {
        return this.langService.morphStr(row.group);
      })},
    {variable: 'type', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'type', default: ''},
    {variable: 'group_place', name: 'Group place', link: false, href: '', hrefId: '', searchFormControlName: 'group_place', default: ''},
  ];

  storage = '';
  lists = {
    type: [
      {id: 'checkbox', name: 'checkbox'},
      {id: 'select', name: 'select'},
      {id: 'textarea', name: 'textarea'},
    ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getAutodescriptionlistCategories';
  apiSend = 'setAutodescriptionCategories';
  apiDelete = 'deleteAutodescriptionCategories';



  // @ts-ignore
  @ViewChild(AdminSuperlistComponent) superlist: AdminSuperlistComponent;

  constructor(
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    public langService: LanguageServiceService,
    private service: RequestsService,
    private listService: ListsService,
  ) {
    super();
  }

  ngOnInit() {
//
  }

  getData() {
    this.superlist.getData();
  }

  public downloadAdditionalData() {

  }
}
