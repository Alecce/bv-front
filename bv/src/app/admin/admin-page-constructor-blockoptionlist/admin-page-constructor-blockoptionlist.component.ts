import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-page-constructor-blockoptionlist',
  templateUrl: './admin-page-constructor-blockoptionlist.component.html',
  styleUrls: ['./admin-page-constructor-blockoptionlist.component.css']
})
export class AdminPageConstructorBlockoptionlistComponent extends SuperTabComponent implements OnInit {
  tab = 'constructor-optionlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'block', name: 'Block', link: false, href: '', hrefId: '', searchFormControlName: 'block', default: '0'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'type', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'type', default: '0'},
    {variable: 'select', name: 'Select', link: false, href: '', hrefId: '', searchFormControlName: 'select', default: '', type: 'textarea'},
    {variable: 'parent', name: 'id parent', link: false, href: '', hrefId: '', searchFormControlName: 'parent', default: ''},
    {variable: 'order_edit', name: 'Order in edit', link: false, href: '', hrefId: '', searchFormControlName: 'order_edit', default: ''},
    {variable: 'order_view', name: 'Order in view', link: false, href: '', hrefId: '', searchFormControlName: 'order_view', default: ''},
    {variable: 'hide', name: 'Hide checkbox', link: false, href: '', hrefId: '', searchFormControlName: 'hide', type: 'checkbox'},
  ];

  storage = '';
  lists = {
    block: [
      {id: 0, name: 'select'},
    ],
    type: [
      {id: 0, name: 'select'},
      {id: 1, name: 'text'},
      {id: 12, name: 'link'},
      {id: 2, name: 'number'},
        {id: 3, name: 'pop up'},
      {id: 4, name: 'checkbox'},
        {id: 5, name: 'radio'},
      {id: 6, name: 'textarea'},
        {id: 7, name: 'checkbox group'},
        {id: 8, name: 'checkbox group with textbox'},
      {id: 9, name: 'temperature'},
      {id: 10, name: 'country/region'},
      {id: 13, name: 'country'},
      {id: 11, name: 'list of options'},
      {id: 14, name: 'user'},
    ],
  };

  // [segment]="inp.controlName"

  disabledRows = {
    // winery: true,
  };
  api = 'getBlockOptionlist';
  apiSend = 'setBlockOption';
  apiDelete = 'deleteBlockOption';



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

    if (this.isAdditionalDataDownloaded) {
      return;
    }
    this.isAdditionalDataDownloaded = true;



    this.service.getConstructorBlocks().subscribe(data => {
      console.log(data);
// @ts-ignore
      data.res.forEach(row => {
// @ts-ignore
        this.lists.block.push({id: row.id, name: row.name});
      });
    });


  }
}
