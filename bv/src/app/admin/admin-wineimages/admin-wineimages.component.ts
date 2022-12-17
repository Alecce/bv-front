import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {LanguageServiceService} from '../../services/language-service.service';
import {environment} from '../../../environments/environment';
import {ImageSubtableComponent} from '../admin-superlist/image-subtable/image-subtable.component';

@Component({
  selector: 'app-admin-wineimages',
  templateUrl: './admin-wineimages.component.html',
  styleUrls: ['./admin-wineimages.component.css']
})
export class AdminWineimagesComponent extends SuperTabComponent implements OnInit {
  tab = 'wineImages';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'grand_type', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'grand_type', default: 'any'},
    {variable: 'wine_color', name: 'Color', link: false, href: '', hrefId: '', searchFormControlName: 'wine_color', default: 'any'},
    {variable: 'image_type', name: 'Image Type', link: false, href: '', hrefId: '', searchFormControlName: 'image_type', default: 'any'},
    {variable: 'priority', name: 'Priority', link: false, href: '', hrefId: '', searchFormControlName: 'priority', default: 0},
    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.placeholderImageStore},
  ];


  storage = 'placeholderImages';
  lists = {
    grand_type: [
      {id: 'any', name: 'any'},
      {id: 'select', name: 'no select'},
      {id: 'still', name: 'still'},
      {id: 'sparkling', name: 'sparkling'},
      {id: 'nongrape', name: 'nongrape'},
    ],
    image_type: [
      {id: 'any', name: 'any'},
      {id: 'card', name: 'card'},
      {id: 'page', name: 'page'},
    ],
    wine_color: [
      {id: 'any', name: 'any'},
      {id: 'nocolor', name: 'no color'},
      {id: 'white', name: 'white'},
      {id: 'rose', name: 'rose'},
      {id: 'red', name: 'red'},
      {id: 'orange', name: 'orange'},
    ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getWineImagelist';
  apiSend = 'setWineImage';
  apiDelete = 'deleteWineImage';



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
