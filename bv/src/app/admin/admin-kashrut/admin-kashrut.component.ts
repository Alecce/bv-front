import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {ImageSubtableComponent} from '../admin-superlist/image-subtable/image-subtable.component';
import {environment} from '../../../environments/environment';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-kashrut',
  templateUrl: './admin-kashrut.component.html',
  styleUrls: ['./admin-kashrut.component.css']
})
export class AdminKashrutComponent extends SuperTabComponent implements OnInit {
  tab = 'kashrutlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    // 'kashrut.id as id',
    // 'kashrut.international as international',
    // 'kashrut.hebrew as hebrew',
    // 'kashrut.abbr as abbr',
    // 'kashrut.picture as picture',

    {variable: 'id', name: '#', link: true, href: 'kashrut/', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'international', name: 'Name (int)', link: false, href: '', hrefId: '', searchFormControlName: 'international', default: ''},
    {variable: 'hebrew', name: 'Name (hebrew)', link: false, href: '', hrefId: '', searchFormControlName: 'hebrew', default: ''},
    {variable: 'abbr', name: 'Abbr', link: false, href: '', hrefId: '', searchFormControlName: 'abbr', default: ''},

    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.kashrutImageStore},
  ];


  storage = 'kashrut';
  lists = {
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getKashrutlist';
  apiSend = 'setKashrut';
  apiDelete = 'deleteKashrut';



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
