import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {ListsService} from '../../services/api/lists.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-autodescription-options',
  templateUrl: './admin-autodescription-options.component.html',
  styleUrls: ['./admin-autodescription-options.component.css']
})
export class AdminAutodescriptionOptionsComponent extends SuperTabComponent implements OnInit {
  tab = 'autodescriptionOptionlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [

    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'category', name: 'Category', link: false, href: '', hrefId: '', searchFormControlName: 'category', default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'sorting_category', name: 'Order', link: false, href: '', hrefId: '', searchFormControlName: 'sorting_category', default: ''},
    // {variable: 'subtitle', name: 'Subtitle', link: false, href: '', hrefId: '', searchFormControlName: 'subtitle', default: ''},
    {variable: 'translateForm', name: 'Text in form', link: false, href: '', hrefId: '', searchFormControlName: 'translateForm', default: '',
      type: 'translate', translatePage: 'wines_autodescription',
      translateLanguage: ((row) => {
        return null;
      }),
      translateDefault: ((row) => {
        return row.name;
      }),
      translatePlace: ((row) => {
        return this.langService.morphStr(row.category_group + '_' + row.category_name + '_' + row.name);
      })},
    {variable: 'translateText', name: 'Text in Description', link: false, href: '', hrefId: '', searchFormControlName: 'translateText', default: '',
      type: 'translate', translatePage: 'wines_autodescription_in_text',
      translateLanguage: ((row) => {
        // console.log(this.langService.schemaLanguage.value);
        return this.langService.schemaLanguage.value;
      }),
      translateDefault: ((row) => {
        return row.name;
      }),
      translatePlace: ((row) => {
        return this.langService.morphStr(row.category_group + '_' + row.category_name + '_' + row.name);
      })},
  ];
  // id, category, name
  storage = '';
  lists = {
    category: []
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getAutodescriptionOptionslist';
  apiSend = 'setAutodescriptionOptions';
  apiDelete = 'deleteAutodescriptionOptions';



  // @ts-ignore
  @ViewChild(AdminSuperlistComponent) superlist: AdminSuperlistComponent;

  constructor(
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    public langService: LanguageServiceService,
    private service: RequestsService,
    private listService: ListsService,
  ) {
    super();
  }

  ngOnInit() {
  }

  getData() {
    this.superlist.getData();
  }

  public downloadAdditionalData() {

    this.listService.getAutodescriptionCategoryList().subscribe(res => {
      // @ts-ignore
      res.rows.forEach(row => {
        this.lists.category.push({id: row.id, name: row.name});
      });
    });

//
  }
}
