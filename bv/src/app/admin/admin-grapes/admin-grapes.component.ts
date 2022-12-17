import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-grapes',
  templateUrl: './admin-grapes.component.html',
  styleUrls: ['./admin-grapes.component.css']
})
export class AdminGrapesComponent extends SuperTabComponent implements OnInit {
  tab = 'grapeslist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'synonyms', name: 'Synonyms', link: false, href: '', hrefId: '', searchFormControlName: 'synonyms', default: '', type: 'textarea'},
    {variable: 'clones', name: 'Clones', link: false, href: '', hrefId: '', searchFormControlName: 'clones', default: '', type: 'textarea'},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'country', default: ''},
    {variable: 'color', name: 'Color', link: false, href: '', hrefId: '', searchFormControlName: 'color', default: ''},
    {variable: 'type', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'type', default: ''},
    {variable: 'uses', name: 'Uses', link: false, href: '', hrefId: '', searchFormControlName: 'uses', default: ''},
  ];


  storage = 'wineImages';
  lists = {
    test: [

    ]
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getGrapelist';
  apiSend = 'setGrape';
  apiDelete = 'deleteGrape';



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
