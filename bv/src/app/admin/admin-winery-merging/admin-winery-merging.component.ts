import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {KashrutWinerySubtableComponent} from '../admin-winery/kashrut-winery-subtable/kashrut-winery-subtable.component';
import {MapSubtableComponent} from '../admin-superlist/map-subtable/map-subtable.component';
import {ActivatedRoute} from '@angular/router';
import {LanguageServiceService} from '../../services/language-service.service';
import {OrganicWinerySubtableComponent} from '../admin-winery/organic-winery-subtable/organic-winery-subtable.component';
import {languagesContent} from '../../../environments/languages';
import {VisittimeSubtableComponent} from '../admin-superlist/visittime-subtable/visittime-subtable.component';
import {GrapesWinerySubtableComponent} from '../admin-winery/grapes-winery-subtable/grapes-winery-subtable.component';
import {QualityWinerySubtableComponent} from '../admin-winery/quality-winery-subtable/quality-winery-subtable.component';
import {VineyardWinerySubtableComponent} from '../admin-winery/vineyard-winery-subtable/vineyard-winery-subtable.component';
import {RequestsService} from '../../services/api/requests.service';
import {BiodynamicWinerySubtableComponent} from '../admin-winery/biodynamic-winery-subtable/biodynamic-winery-subtable.component';
import {VeganWinerySubtableComponent} from '../admin-winery/vegan-winery-subtable/vegan-winery-subtable.component';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {CookieService} from 'ngx-cookie-service';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-winery-merging',
  templateUrl: './admin-winery-merging.component.html',
  styleUrls: ['./admin-winery-merging.component.css']
})
export class AdminWineryMergingComponent extends SuperTabComponent implements OnInit {
  tab = 'winerymerging';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: true, href: 'winery/', hrefId: 'id', searchFormControlName: 'id', disabled: true, default: ''},
    {variable: 'language', name: 'Language', link: false, href: '', hrefId: '', searchFormControlName: 'language', default: this.langService.getLanguage()},
    {variable: 'winery_name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'winery_name', default: ''},
    {variable: 'international_name', name: 'Name (int)', link: false, href: '', hrefId: '', searchFormControlName: 'international_name', default: ''},
    {variable: 'country_id', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'counrty', default: ''},
    {variable: 'address', name: 'Address', link: false, href: '', hrefId: '', searchFormControlName: 'address', default: ''},
    {variable: 'city', name: 'City', link: false, href: '', hrefId: '', searchFormControlName: 'city', default: ''},
    {variable: 'phone', name: 'Phone', link: false, href: '', hrefId: '', searchFormControlName: 'phone', default: ''},
    {variable: 'mobile', name: 'Mobile', link: false, href: '', hrefId: '', searchFormControlName: 'mobile', default: ''},
    {variable: 'fax', name: 'Fax', link: false, href: '', hrefId: '', searchFormControlName: 'fax', default: ''},
    {variable: 'mail', name: 'Mail', link: false, href: '', hrefId: '', searchFormControlName: 'mail', default: ''},
    {variable: 'web', name: 'Web', link: false, href: '', hrefId: '', searchFormControlName: 'web', default: ''},
    {variable: 'zip', name: 'ZIP', link: false, href: '', hrefId: '', searchFormControlName: 'zip', default: ''},
    {variable: 'owner', name: 'Owner', link: false, href: '', hrefId: '', searchFormControlName: 'owner', default: ''},
    {variable: 'establishyear', name: 'Establish year', link: false, href: '', hrefId: '', searchFormControlName: 'establishyear', default: ''},
    {variable: 'headwinemaker', name: 'Head winemaker', link: false, href: '', hrefId: '', searchFormControlName: 'headwinemaker', default: ''},
    {variable: 'neutralheadwinemaker', name: 'Head winemaker (int)', link: false, href: '', hrefId: '', searchFormControlName: 'neutralheadwinemaker', default: ''},
    {variable: 'performance', name: 'Performance', link: false, href: '', hrefId: '', searchFormControlName: 'performance', default: ''},
    {variable: 'userid', name: 'Userid', link: false, href: '', hrefId: '', searchFormControlName: 'userid', default: ''},
    {variable: 'isnegotiator', name: 'Negotiator', link: false, href: '', hrefId: '', searchFormControlName: 'isnegotiator', default: ''},

    // {variable: 'visittime', name: 'Visittime', link: false, href: '', hrefId: '', searchFormControlName: 'visittime', default: ''},

    {variable: 'visittime', name: 'Visittime', link: false, href: '', hrefId: '', searchFormControlName: 'visittime', type: 'special',
      default: '[]',
      component: VisittimeSubtableComponent},


    {variable: 'grapeData', name: 'Grapes', link: false, href: '', hrefId: '', searchFormControlName: 'grapeData', type: 'special',
      default: [],
      component: GrapesWinerySubtableComponent},

    // {variable: 'vineyards', name: 'Vineyards', link: false, href: '', hrefId: '', searchFormControlName: 'vineyards', default: ''},
    {variable: 'vineyardData', name: 'Vineyards', link: false, href: '', hrefId: '', searchFormControlName: 'vineyardData', type: 'special',
      default: [],
      component: VineyardWinerySubtableComponent},

    // {variable: 'kashrut', name: 'Kashrut', link: false, href: '', hrefId: '', searchFormControlName: 'kashrut', default: ''},
    {variable: 'kashrutData', name: 'Kashrut', link: false, href: '', hrefId: '', searchFormControlName: 'kashrutData', type: 'special',
      default: [],
      component: KashrutWinerySubtableComponent},

    // {variable: 'quality', name: 'Quality', link: false, href: '', hrefId: '', searchFormControlName: 'quality', default: ''},
    {variable: 'qualityData', name: 'Quality', link: false, href: '', hrefId: '', searchFormControlName: 'qualityData', type: 'special',
      default: {qualities: []},
      component: QualityWinerySubtableComponent},


    // {variable: 'biodynamic', name: 'Biodynamic', link: false, href: '', hrefId: '', searchFormControlName: 'biodynamic', default: ''},
    {variable: 'biodynamicData', name: 'Biodynamic', link: false, href: '', hrefId: '', searchFormControlName: 'biodynamicData', type: 'special',
      default: [],
      component: BiodynamicWinerySubtableComponent},

    // {variable: 'organic', name: 'Organic', link: false, href: '', hrefId: '', searchFormControlName: 'organic', default: ''},
    {variable: 'organicData', name: 'Organic', link: false, href: '', hrefId: '', searchFormControlName: 'organicData', type: 'special',
      default: [],
      component: OrganicWinerySubtableComponent},

    // {variable: 'vegan', name: 'Vegan', link: false, href: '', hrefId: '', searchFormControlName: 'vegan', default: ''},
    {variable: 'veganData', name: 'Vegan', link: false, href: '', hrefId: '', searchFormControlName: 'veganData', type: 'special',
      default: [],
      component: VeganWinerySubtableComponent},

    {variable: 'geolocationFull', name: 'Geolocation', link: false, href: '', hrefId: '', searchFormControlName: 'geolocationFull', type: 'special',
      default: {geolocation: {
          country: null,
          address: null,
          city: null,
          lat: null,
          lng: null,
        }},
      component: MapSubtableComponent},
  ];


  storage = 'wineImages';
  lists = {
    language: [],
    country_id: [
    ],
    performance: [
      {id: '0', name: 'Select'},
      {id: '1', name: 'till 2000'},
      {id: '2', name: '2000-5000'},
      {id: '3', name: '5000-8000'},
      {id: '4', name: '8000-12000'},
      {id: '5', name: '12000-20000'},
      {id: '6', name: '20000-30000'},
      {id: '7', name: '30000-60000'},
      {id: '8', name: '60000-100000'},
      {id: '9', name: '100000-160000'},
      {id: '10', name: '160000-220000'},
      {id: '11', name: '220000-300000'},
      {id: '12', name: '300000-450000'},
      {id: '13', name: '450000-600000'},
      {id: '14', name: '600000-800000'},
      {id: '15', name: '800000-1200000'},
      {id: '16', name: '1200000-1500000'},
      {id: '17', name: '1500000-2000000'},
      {id: '18', name: '2000000-3000000'},
      {id: '19', name: '3000000-5000000'},
      {id: '20', name: '5000000 and more'},
    ],
    isnegotiator: [
      {id: 'not chosen', name: 'Select'},
      {id: 'NO', name: 'NO'},
      {id: 'NM', name: 'NM'},
      {id: 'CM', name: 'CM'},
      {id: 'RM', name: 'RM'},
      {id: 'SR', name: 'SR'},
      {id: 'RC', name: 'RC'},
      {id: 'MA', name: 'MA'},
      {id: 'ND', name: 'ND'},
    ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getWinerylist';
  apiSend = 'mergeWineries';
  apiDelete = 'deleteWinery';



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

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.lists.country_id = data;
    });
//
  }

}
