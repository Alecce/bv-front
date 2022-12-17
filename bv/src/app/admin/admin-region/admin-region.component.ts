import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent extends SuperTabComponent implements OnInit, AfterViewInit {
  tab = 'regionlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  // id, parent, level, index, name, ISO2, ISO3, indexCode, closest_parent, closest_parent_id
  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'parent', name: 'Parent', link: false, href: '', hrefId: '', searchFormControlName: 'parent', type: 'disabled', default: ''},
    {variable: 'level', name: 'Level', link: false, href: '', hrefId: '', searchFormControlName: 'level', type: 'disabled', default: ''},
    {variable: 'index', name: 'Index', link: false, href: '', hrefId: '', searchFormControlName: 'index', default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'ISO2', name: 'ISO2', link: false, href: '', hrefId: '', searchFormControlName: 'ISO2', default: ''},
    {variable: 'ISO3', name: 'ISO3', link: false, href: '', hrefId: '', searchFormControlName: 'ISO3', default: ''},
  ];

  storage = '';
  lists = {
  };

  disabledRows = {
    country_id: true,
  };
  api = 'getRegionlist';
  apiSend = 'setRegion';
  apiDelete = 'deleteRegion';



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

  }

  getData() {
    this.superlist.getData();
  }

  ngAfterViewInit(): void {
  }

  public downloadAdditionalData() {

  }

}
