import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {languagesInterface} from '../../../environments/languages';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-autodescription',
  templateUrl: './admin-autodescription.component.html',
  styleUrls: ['./admin-autodescription.component.css']
})
export class AdminAutodescriptionComponent extends SuperTabComponent implements OnInit {
  tab = 'autodescriptionlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'language', name: 'Language', link: false, href: '', hrefId: '', searchFormControlName: 'language', default: ''},
    {variable: 'code', name: 'Schema name', link: false, href: '', hrefId: '', searchFormControlName: 'code', default: ''},
    {variable: 'adschema', name: 'Schema', link: false, href: '', hrefId: '', searchFormControlName: 'adschema', type: 'textarea', default: ''},
    {variable: 'delimiter', name: 'Delimiter', link: false, href: '', hrefId: '', searchFormControlName: 'delimiter', default: ''},
    {variable: 'active', name: 'Active', link: false, href: '', hrefId: '', searchFormControlName: 'active', type: 'checkbox', default: false},
  ];

  storage = '';
  lists = {
    language: []
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getAutodescriptionlist';
  apiSend = 'setAutodescription';
  apiDelete = 'deleteAutodescription';



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

    this.langService.languagesLoaded.subscribe(() => {
      languagesInterface.forEach(x => {

        this.lists.language.push({id: x.value, name: x.name});
      });
    })

    // languagesInterface.forEach(x => {
    //   this.lists.language.push(
    //     {id: x.place, name: x.name}
    //     );
    // });
//
  }

  getData() {
    this.superlist.getData();
  }

  public downloadAdditionalData() {

  }
}
