import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-page-constructor-blocklist',
  templateUrl: './admin-page-constructor-blocklist.component.html',
  styleUrls: ['./admin-page-constructor-blocklist.component.css']
})
export class AdminPageConstructorBlocklistComponent extends SuperTabComponent implements OnInit {
  tab = 'constructor-blocklist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'address', name: 'Page', link: false, href: '', hrefId: '', searchFormControlName: 'address', default: '0'},
    {variable: 'block', name: 'Block', link: false, href: '', hrefId: '', searchFormControlName: 'block', default: '0'},
    // {variable: 'page_edit', name: 'Page', link: false, href: '', hrefId: '', searchFormControlName: 'page_edit', default: ''},
    {variable: 'col_edit', name: 'Column in edit', link: false, href: '', hrefId: '', searchFormControlName: 'col_edit', default: ''},
    {variable: 'row_edit', name: 'Row in edit', link: false, href: '', hrefId: '', searchFormControlName: 'row_edit', default: ''},
    {variable: 'col_view', name: 'Column in view', link: false, href: '', hrefId: '', searchFormControlName: 'col_view', default: ''},
    {variable: 'row_view', name: 'Row in view', link: false, href: '', hrefId: '', searchFormControlName: 'row_view', default: ''},
    {variable: 'tab', name: 'Tab', link: false, href: '', hrefId: '', searchFormControlName: 'tab', default: ''},
  ];

  storage = '';
  lists = {
    address: [
      {id: 0, name: 'select'},
      // {id: -1, name: 'Wineries'},
      // {id: -2, name: 'Events'},
    ],
    block: [
      {id: 0, name: 'select'},
      {id: -1, name: 'Blank block'},
    ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getPageBlocklist';
  apiSend = 'setPageBlock';
  apiDelete = 'deletePageBlock';



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

    if (this.isAdditionalDataDownloaded) {
      return;
    }
    this.isAdditionalDataDownloaded = true;



    this.service.getConstructorBlocks().subscribe(data => {
      console.log(data);
// @ts-ignore
      data.res.forEach(row => {
// @ts-ignore
        this.lists.block.push({id: row.id, name: row.name});
      });
    });

    this.service.getConstructorPages().subscribe(data => {
      console.log(data);
// @ts-ignore
      data.res.forEach(row => {
// @ts-ignore
        this.lists.address.push({id: row.id, name: row.name});
      });
    });

  }
}
