import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {RequestsService} from '../../services/api/requests.service';
import {ReplaySubject, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {ActivatedRoute} from '@angular/router';
import {ImageSubtableComponent} from '../admin-superlist/image-subtable/image-subtable.component';
import {environment} from '../../../environments/environment';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-biodynamic',
  templateUrl: './admin-biodynamic.component.html',
  styleUrls: ['./admin-biodynamic.component.css']
})
export class AdminBiodynamicComponent extends SuperTabComponent implements OnInit {
  tab = 'biodynamiclist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: true, href: 'biodinamic/', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.biodynamicImageStore},
  ];


  storage = 'biodinamic';
  lists = {
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getBiodynamiclist';
  apiSend = 'setBiodynamic';
  apiDelete = 'deleteBiodynamic';



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
