import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MultiselectSubtableComponent} from '../multiselect-subtable/multiselect-subtable.component';
import {ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-winesubtype',
  templateUrl: './admin-winesubtype.component.html',
  styleUrls: ['./admin-winesubtype.component.css']
})
export class AdminWinesubtypeComponent extends SuperTabComponent implements OnInit, AfterViewInit {
  tab = 'wineSubTypelist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},


    {variable: 'type', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'type', type: 'multicheckbox',
      default: [],
      component: MultiselectSubtableComponent},
  ];

  storage = 'wineImages';
  lists = {
    type: [
      {id: '0', name: 'Select'}
    ],
  };

  disabledRows = {
    country_id: true,
  };
  api = 'getVineSubtypelist';
  apiSend = 'setVineSubtype';
  apiDelete = 'deleteVineSubtype';



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


    this.service.getWineType().subscribe(data => {
      // @ts-ignore
      data.forEach(x => {
        this.lists.type.push({id: x.id, name: x.type});
      });
    });
  }

}
