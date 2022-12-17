import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ReplaySubject, Subject} from 'rxjs';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {LanguageServiceService} from '../../services/language-service.service';

@Component({
  selector: 'app-admin-barrel',
  templateUrl: './admin-barrel.component.html',
  styleUrls: ['./admin-barrel.component.css']
})
export class AdminBarrelComponent extends SuperTabComponent implements OnInit, AfterViewInit {
  tab = 'barrellist';
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
    tank: [
      {id: 'clay', name: 'Clay'},
      {id: 'stainless steel tank', name: 'Stainless steel'},
      {id: 'wood oak', name: 'Wood'},
      {id: 'Cement (concrete) tanks', name: 'Cement (concrete)'},
      {id: 'Plastic tanks', name: 'Plastic tanks'},
      {id: 'Glass', name: 'Glass'},
    ],
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
