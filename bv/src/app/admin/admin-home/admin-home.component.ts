import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {environment} from '../../../environments/environment';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {ImageSubtableComponent} from '../admin-superlist/image-subtable/image-subtable.component';
import {RequestsService} from '../../services/api/requests.service';
import {ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '../../services/language-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent extends SuperTabComponent implements OnInit {
  tab = 'home';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},

    // {variable: 'advantage_1', name: 'Advantage 1', link: false, href: '', hrefId: '', searchFormControlName: 'advantage_1', type: 'textarea', default: ''},
    // {variable: 'advantage_2', name: 'Advantage 2', link: false, href: '', hrefId: '', searchFormControlName: 'advantage_2', type: 'textarea', default: ''},
    // {variable: 'advantage_3', name: 'Advantage 3', link: false, href: '', hrefId: '', searchFormControlName: 'advantage_3', type: 'textarea', default: ''},
    {variable: 'active', name: 'Active', link: false, href: '', hrefId: '', searchFormControlName: 'active', type: 'checkbox', default: false},

    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.homeImageStore},
  ];


  storage = 'home';
  lists = {

  };

  disabledRows = {
    country_id: true,
  };
  api = 'getHomelist';
  apiSend = 'setHome';
  apiDelete = 'deleteHome';



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

  public downloadAdditionalData() {
  }

}
