import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '../../services/api/requests.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-page-constructor-pagelist',
  templateUrl: './admin-page-constructor-pagelist.component.html',
  styleUrls: ['./admin-page-constructor-pagelist.component.css']
})
export class AdminPageConstructorPagelistComponent extends SuperTabComponent implements OnInit {
  tab = 'constructor-pagelist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'parentpage', name: 'Parent page', link: false, href: '', hrefId: '', searchFormControlName: 'parentpage', default: '0'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'active', name: 'Active', link: false, href: '', hrefId: '', searchFormControlName: 'active', default: '', type: 'checkbox'},
    {variable: 'is_schema', name: 'Is schema', link: false, href: '', hrefId: '', searchFormControlName: 'is_schema', default: '', type: 'checkbox'},
    {variable: 'businessOnly', name: 'Business only', link: false, href: '', hrefId: '', searchFormControlName: 'businessOnly', default: '', type: 'checkbox'},

  ];

  storage = '';
  lists = {
    parentpage: [
      {id: 0, name: 'select'},
      {id: 'business', name: 'business'},
    ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getConstructorPagelist';
  apiSend = 'setConstructorPage';
  apiDelete = 'deleteConstructorPage';



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
  }

  getData() {
    this.superlist.getData();
  }

  public downloadAdditionalData() {

  }
}
