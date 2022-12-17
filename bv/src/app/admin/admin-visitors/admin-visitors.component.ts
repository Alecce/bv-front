import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {SuperTabComponent} from '@src/app/super-tab/super-tab.component';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {AdminSuperlistComponent} from '@src/app/admin/admin-superlist/admin-superlist.component';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '@src/app/services/api/requests.service';

@Component({
  selector: 'app-admin-visitors',
  templateUrl: './admin-visitors.component.html',
  styleUrls: ['./admin-visitors.component.css']
})
export class AdminVisitorsComponent extends SuperTabComponent implements OnInit, AfterViewInit {
  tab = 'visitors';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'tank', name: 'Tank', link: false, href: '', hrefId: '', searchFormControlName: 'tank', default: 'select'},
  ];

  storage = '';
  lists = {
  };

  disabledRows = {
    country_id: true,
  };
  api = 'getBarrellist';
  apiSend = 'setBarrel';
  apiDelete = 'deleteBarrel';



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
