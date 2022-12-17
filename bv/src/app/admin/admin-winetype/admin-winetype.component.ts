import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '../../services/language-service.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {RequestsService} from '../../services/api/requests.service';
import {MultiselectSubtableComponent} from '../multiselect-subtable/multiselect-subtable.component';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-winetype',
  templateUrl: './admin-winetype.component.html',
  styleUrls: ['./admin-winetype.component.css']
})
export class AdminWinetypeComponent extends SuperTabComponent implements OnInit {
  tab = 'wineTypelist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'type', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'type', default: ''},


    {variable: 'still', name: 'Still', link: false, href: '', hrefId: '', searchFormControlName: 'still', type: 'multicheckbox',
      default: '[]',
      component: MultiselectSubtableComponent},
  ];

  storage = 'wineImages';
  lists = {
    still: [
      {id: 'select', name: 'Select'},
      {id: 'usual', name: 'Usual'},
      {id: 'fortified', name: 'Fortified'},
      {id: 'concentrated', name: 'Concentrated'},
    ],
  };

  disabledRows = {
    country_id: true,
  };
  api = 'getVinetypelist';
  apiSend = 'setVinetype';
  apiDelete = 'deleteVinetype';



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
