import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {RequestsService} from '../../services/api/requests.service';
import {ReplaySubject, Subject} from 'rxjs';
import {MapSubtableComponent} from '../admin-superlist/map-subtable/map-subtable.component';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../services/language-service.service';
import {ActivatedRoute} from '@angular/router';
import {WinesSubtableComponent} from './wines-subtable/wines-subtable.component';
import {languagesContent} from '../../../environments/languages';
import {SuperTabComponent} from '../../super-tab/super-tab.component';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.css']
})
export class AdminEventComponent extends SuperTabComponent implements OnInit {
  tab = 'eventlist';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;


  tableCols = [


    {variable: 'id', name: '#', link: true, href: 'event/', hrefId: 'id', searchFormControlName: 'searchId', disabled: true, default: ''},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'name', default: ''},
    {variable: 'neutral', name: 'Name (int)', link: false, href: '', hrefId: '', searchFormControlName: 'neutral', default: ''},
    {variable: 'language', name: 'Language', link: false, href: '', hrefId: '', searchFormControlName: 'language', default: this.langService.getLanguage()},
    {variable: 'eventtype', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'eventtype', default: ''},
    {variable: 'userid', name: 'Id user', link: false, href: '', hrefId: '', searchFormControlName: 'userid', default: ''},
    // {variable: 'winelist', name: '___', link: false, href: '', hrefId: '', searchFormControlName: 'winelist', default: ''},
    {variable: 'hide_names', name: 'Hide wine names', link: false, href: '', hrefId: '', searchFormControlName: 'hide_names', type: 'checkbox', default: ''},
    // {variable: 'time', name: 'Time', link: false, href: '', hrefId: '', searchFormControlName: 'time', default: ''},

    {variable: 'time', name: 'Time', link: false, href: '', hrefId: '', searchFormControlName: 'time', type: 'subtable', default: '',
      page: 'event_common_info',
      subtable: [
        {variable: 'day', control: 'day', default: '', type: 'date', place: 'month', name: 'Month'},
        {variable: 'beginning_time', control: 'beginning_time', default: '', type: 'time', place: 'beginning_time', name: 'Beginning time'},
        {variable: 'end_time', control: 'end_time', default: '', type: 'time', place: 'end_time', name: 'End time'},
      ]
    },
    //
    // // {variable: 'visittime', name: 'Visittime', link: false, href: '', hrefId: '', searchFormControlName: 'visittime', default: ''},
    //
    // {variable: 'visittime', name: 'Visittime', link: false, href: '', hrefId: '', searchFormControlName: 'visittime', type: 'special',
    //   default: '[]',
    //   component: VisittimeSubtableComponent},
    //
    //
    {variable: 'wineData', name: 'Winelist', link: false, href: '', hrefId: '', searchFormControlName: 'wineData', type: 'special',
      default: [],
      component: WinesSubtableComponent},


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
    // country_id: [
    // ],
    language: [],
    eventtype: [
      {place: 'select', id: 'select', name: 'Select'},
      {place: 'auction', id: 'auction', name: 'Auction'},
      {place: 'course', id: 'course', name: 'Course'},
      {place: 'harvest', id: 'harvest', name: 'Harvest'},
      {place: 'lecture', id: 'lecture', name: 'Lecture'},
      {place: 'meeting', id: 'meeting', name: 'Meeting'},
      {place: 'new_wine_launch', id: 'new_wine_launch', name: 'New wine Launch'},
      {place: 'wine_competition', id: 'wine_competition', name: 'Wine Competition'},
      {place: 'wine_exhibition', id: 'wine_exhibition', name: 'Wine exhibition'},
      {place: 'wine_tasting', id: 'wine_tasting', name: 'Wine tasting'},
      {place: 'wine_tour', id: 'wine_tour', name: 'Wine tour'},
    ],
    // isnegotiator: [
    //   {id: 'not chosen', name: 'Select'},
    //   {id: 'NO', name: 'NO'},
    //   {id: 'NM', name: 'NM'},
    //   {id: 'CM', name: 'CM'},
    //   {id: 'RM', name: 'RM'},
    //   {id: 'SR', name: 'SR'},
    //   {id: 'RC', name: 'RC'},
    //   {id: 'MA', name: 'MA'},
    //   {id: 'ND', name: 'ND'},
    // ],
  };

  disabledRows = {
    // winery: true,
  };
  api = 'getEventlist';
  apiSend = 'setEvent';
  apiDelete = 'deleteEvent';




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
