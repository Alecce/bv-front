import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-barrelsize',
  templateUrl: './admin-barrelsize.component.html',
  styleUrls: ['./admin-barrelsize.component.css']
})
export class AdminBarrelsizeComponent extends SuperTabComponent implements OnInit, AfterViewInit {
  tab = 'barrelsizelist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'value', name: 'Value', link: false, href: '', hrefId: '', searchFormControlName: 'value', default: ''},
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
  api = 'getBarrelsizelist';
  apiSend = 'setBarrelsize';
  apiDelete = 'deleteBarrelsize';



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
