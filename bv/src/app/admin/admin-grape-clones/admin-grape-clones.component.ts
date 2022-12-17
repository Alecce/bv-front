import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-grape-clones',
  templateUrl: './admin-grape-clones.component.html',
  styleUrls: ['./admin-grape-clones.component.css']
})
export class AdminGrapeClonesComponent extends SuperTabComponent implements OnInit {
  tab = 'grapeCloneslist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'grapeName', name: 'Grape name', link: false, href: '', hrefId: '', searchFormControlName: 'grapeName', default: '', type: 'disabled'},
    {variable: 'grapeId', name: 'Grape ID', link: false, href: '', hrefId: '', searchFormControlName: 'grapeId', default: ''},
    {variable: 'cloneName', name: 'Clone', link: false, href: '', hrefId: '', searchFormControlName: 'cloneName', default: ''},
  ];


  storage = 'wineImages';
  lists = {
    test: [

    ]
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getGrapeClonelist';
  apiSend = 'setGrapeClone';
  apiDelete = 'deleteGrapeClone';



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

  afterChange(form: FormGroup, result) {
    form.get('grapeName').setValue(result.name);
  }
}
