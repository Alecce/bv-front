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
  selector: 'app-admin-vegan',
  templateUrl: './admin-vegan.component.html',
  styleUrls: ['./admin-vegan.component.css']
})
export class AdminVeganComponent extends SuperTabComponent implements OnInit {
  tab = 'veganlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: true, href: 'vegan/', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.veganImageStore},
  ];


  storage = 'vegan';
  lists = {
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getVeganlist';
  apiSend = 'setVegan';
  apiDelete = 'deleteVegan';



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
