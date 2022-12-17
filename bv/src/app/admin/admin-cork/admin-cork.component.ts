import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ReplaySubject, Subject} from 'rxjs';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {LanguageServiceService} from '../../services/language-service.service';
import {environment} from '@src/environments/environment';
import {ImageSubtableComponent} from '@src/app/admin/admin-superlist/image-subtable/image-subtable.component';

@Component({
  selector: 'app-admin-cork',
  templateUrl: './admin-cork.component.html',
  styleUrls: ['./admin-cork.component.css']
})
export class AdminCorkComponent extends SuperTabComponent implements OnInit, AfterViewInit {
  tab = 'corklist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'corkscrew', name: 'Need corkscrew', link: false, href: '', hrefId: '', searchFormControlName: 'corkscrew', type: 'checkbox'},
    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.corkImageStore},
  ];

  storage = 'cork';
  lists = {
  };

  disabledRows = {
    country_id: true,
  };
  api = 'getCorklist';
  apiSend = 'setCork';
  apiDelete = 'deleteCork';



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
