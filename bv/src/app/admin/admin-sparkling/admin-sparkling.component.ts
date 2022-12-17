import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-sparkling',
  templateUrl: './admin-sparkling.component.html',
  styleUrls: ['./admin-sparkling.component.css']
})
export class AdminSparklingComponent extends SuperTabComponent implements OnInit, AfterViewInit {
  tab = 'sparklinglist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
  ];

  storage = '';
  lists = {
  };

  disabledRows = {
    country_id: true,
  };
  api = 'getSparklinglist';
  apiSend = 'setSparkling';
  apiDelete = 'deleteSparkling';



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
