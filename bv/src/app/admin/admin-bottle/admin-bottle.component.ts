import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {AdminSuperlistComponent} from '@src/app/admin/admin-superlist/admin-superlist.component';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '@src/app/services/api/requests.service';
import {SuperTabComponent} from '@src/app/super-tab/super-tab.component';
import {ReplaySubject, Subject} from 'rxjs';

@Component({
  selector: 'app-admin-bottle',
  templateUrl: './admin-bottle.component.html',
  styleUrls: ['./admin-bottle.component.css']
})
export class AdminBottleComponent  extends SuperTabComponent implements OnInit, AfterViewInit {
  tab = 'bottlelist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'size', name: 'Size', link: false, href: '', hrefId: '', searchFormControlName: 'size', default: ''},
  ];

  storage = '';
  lists = {
  };

  disabledRows = {
  };
  api = 'getBottlelist';
  apiSend = 'setBottle';
  apiDelete = 'deleteBottle';


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
