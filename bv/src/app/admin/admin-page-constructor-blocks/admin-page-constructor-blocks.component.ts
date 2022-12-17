import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-page-constructor-blocks',
  templateUrl: './admin-page-constructor-blocks.component.html',
  styleUrls: ['./admin-page-constructor-blocks.component.css']
})
export class AdminPageConstructorBlocksComponent extends SuperTabComponent implements OnInit {
  tab = 'constructor-blocks';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [

    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'has_schema', name: 'Using in schemas', link: false, href: '', hrefId: '', searchFormControlName: 'has_schema', type: 'checkbox', default: ''},
    {variable: 'search', name: 'Using in search', link: false, href: '', hrefId: '', searchFormControlName: 'search', type: 'checkbox', default: ''},

  ];

  storage = '';
  lists = {
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getBlocklist';
  apiSend = 'setBlock';
  apiDelete = 'deleteBlock';



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
