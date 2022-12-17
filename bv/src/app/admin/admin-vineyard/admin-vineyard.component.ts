import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {MapSubtableComponent} from '../admin-superlist/map-subtable/map-subtable.component';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {GrapesWinerySubtableComponent} from '../admin-winery/grapes-winery-subtable/grapes-winery-subtable.component';
import {languagesContent} from '../../../environments/languages';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-vineyard',
  templateUrl: './admin-vineyard.component.html',
  styleUrls: ['./admin-vineyard.component.css']
})
export class AdminVineyardComponent extends SuperTabComponent implements OnInit {
  tab = 'vineyardlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: true, href: 'vineyard/', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'language', name: 'Language', link: false, href: '', hrefId: '', searchFormControlName: 'language', default: this.langService.getLanguage()},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'international', name: 'Name (int)', link: false, href: '', hrefId: '', searchFormControlName: 'international', default: ''},
    {variable: 'phone', name: 'Phone', link: false, href: '', hrefId: '', searchFormControlName: 'phone', default: ''},
    {variable: 'mobile', name: 'Mobile', link: false, href: '', hrefId: '', searchFormControlName: 'mobile', default: ''},
    {variable: 'fax', name: 'Fax', link: false, href: '', hrefId: '', searchFormControlName: 'fax', default: ''},
    {variable: 'mail', name: 'Mail', link: false, href: '', hrefId: '', searchFormControlName: 'mail', default: ''},
    {variable: 'web', name: 'Web', link: false, href: '', hrefId: '', searchFormControlName: 'web', default: ''},
    {variable: 'square', name: 'Square', link: false, href: '', hrefId: '', searchFormControlName: 'square', default: ''},
    {variable: 'unitsofarea', name: 'Units of area', link: false, href: '', hrefId: '', searchFormControlName: 'unitsofarea', default: ''},
    // {variable: 'establishyear', name: 'Establish year', link: false, href: '', hrefId: '', searchFormControlName: 'establishyear', default: ''},
    {variable: 'userid', name: 'Id user', link: false, href: '', hrefId: '', searchFormControlName: 'userid', default: ''},
    {variable: 'owner', name: 'Owner', link: false, href: '', hrefId: '', searchFormControlName: 'owner', default: ''},

    {variable: 'grapeData', name: 'Grape data', link: false, href: '', hrefId: '', searchFormControlName: 'grapeData', type: 'special',
      default: [],
      component: GrapesWinerySubtableComponent},


    {variable: 'geolocationFull', name: 'Geolocation', link: false, href: '', hrefId: '', searchFormControlName: 'geolocationFull', type: 'special',
      default: {geolocation: {
          country: null,
          address: null,
          city: null,
          lat: null,
          lng: null,
          regions: [0, 0, 0, 0, 0, 0]
        }},
      component: MapSubtableComponent},
  ];


  storage = 'wineImages';
  lists = {
    language: [],
    unitsofarea: [
      {id: 'acre', name: 'Acres'},
      {id: 'dunam', name: 'Dunams'},
      {id: 'square metres', name: 'Square metres'},
      {id: 'ares', name: 'Ares'},
      {id: 'hectares', name: 'Hectares'},
      {id: 'square yards', name: 'Square yards'},
    ],
    // eventtype: [
    //   {place: 'select', id: 'select', name: 'Select'},
    //   {place: 'auction', id: 'auction', name: 'Auction'},
    //   {place: 'course', id: 'course', name: 'Course'},
    //   {place: 'harvest', id: 'harvest', name: 'Harvest'},
    //   {place: 'lecture', id: 'lecture', name: 'Lecture'},
    //   {place: 'meeting', id: 'meeting', name: 'Meeting'},
    //   {place: 'new_wine_launch', id: 'new_wine_launch', name: 'New wine Launch'},
    //   {place: 'wine_competition', id: 'wine_competition', name: 'Wine Competition'},
    //   {place: 'wine_exhibition', id: 'wine_exhibition', name: 'Wine exhibition'},
    //   {place: 'wine_tasting', id: 'wine_tasting', name: 'Wine tasting'},
    //   {place: 'wine_tour', id: 'wine_tour', name: 'Wine tour'},
    // ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getVineyardlist';
  apiSend = 'setVineyard';
  apiDelete = 'deleteVineyard';




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

    languagesContent.forEach(x => {

      this.lists.language.push({id: x.value, name:x.name});
    });

//     this.service.getCountries().subscribe(data => {
// // @ts-ignore
//       this.lists.country = data;
//     });
//
  }
}
