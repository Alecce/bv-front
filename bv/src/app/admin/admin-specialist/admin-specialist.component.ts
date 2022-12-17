import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-specialist',
  templateUrl: './admin-specialist.component.html',
  styleUrls: ['./admin-specialist.component.css']
})
export class AdminSpecialistComponent extends SuperTabComponent implements OnInit {
  tab = 'specialistlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'user', name: 'User ID', link: false, href: '', hrefId: '', searchFormControlName: 'user', default: ''},
    {variable: 'pointsystem', name: 'Pointsystem', link: false, href: '', hrefId: '', searchFormControlName: 'pointsystem', default: ''},
  ];


  storage = 'wineImages';
  lists = {
    pointsystem: [
      {id: '20', name: '20 points system'},
      {id: '100', name: '100 points system'},
      {id: '5', name: 'stars system'},
    ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getSpecialistlist';
  apiSend = 'setSpecialist';
  apiDelete = 'deleteSpecialist';



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
