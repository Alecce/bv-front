import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {ImageSubtableComponent} from '../admin-superlist/image-subtable/image-subtable.component';
import {environment} from '../../../environments/environment';
import {RegionsSubtableComponent} from './regions-subtable/regions-subtable.component';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-quality',
  templateUrl: './admin-quality.component.html',
  styleUrls: ['./admin-quality.component.css']
})
export class AdminQualityComponent extends SuperTabComponent implements OnInit {
  tab = 'qualitylist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: true, href: 'quality/', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    // {variable: 'country_id', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'country_id', default: ''},
    {variable: 'years', name: 'Years', link: false, href: '', hrefId: '', searchFormControlName: 'years', default: ''},


    {variable: 'geolocationFull', name: 'Geolocation', link: false, href: '', hrefId: '', searchFormControlName: 'geolocationFull', type: 'special',
      default: {
        country: null,
        address: null,
        city: null,
        lat: null,
        lng: null,
        regions: [0, 0, 0, 0, 0, 0]
      },
      component: RegionsSubtableComponent},

    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.qualityImageStore},
  ];


  storage = 'qualities';
  lists = {
    country_id: [
    ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getQualitylist';
  apiSend = 'setQuality';
  apiDelete = 'deleteQuality';



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


    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.lists.country_id = data;
    });
//
  }
}
