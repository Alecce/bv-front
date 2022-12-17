import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '../../services/language-service.service';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AdminSuperlistComponent} from '../admin-superlist/admin-superlist.component';
import {SuperTabComponent} from '../../super-tab/super-tab.component';
import {ImageSubtableComponent} from '../admin-superlist/image-subtable/image-subtable.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent extends SuperTabComponent implements OnInit {
  public tab = 'userlest';
  isAdditionalDataDownloaded = false;

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() wineryData: ReplaySubject;

  // 'id' => 'text',
  // 'login' => 'text',
  // 'mail' => 'text',
  // 'fname' => 'text',
  // 'lname' => 'text',
  // 'country' => 'list',
  // 'security' => 'list',
  // 'name_visible' => 'raw',
  // 'invisible' => 'raw',
  // 'birthdate' => 'date',
  // 'gender' => 'list',
  // 'city' => 'raw',
  // 'address' => 'raw',
  // 'business_name' => 'raw',

  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'profile/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'login', name: 'Login', link: false, href: '', hrefId: '', searchFormControlName: 'searchLogin'},
    {variable: 'mail', name: 'Email', link: false, href: '', hrefId: '', searchFormControlName: 'searchMail'},
    {variable: 'contact_phone', name: 'Phone', link: false, href: '', hrefId: '', searchFormControlName: 'searchPhone'},
    {variable: 'drop_password', name: 'Drop password', link: false, href: '', hrefId: '', searchFormControlName: 'dp', type: 'checkbox'},
    {variable: 'fname', name: 'First name', link: false, href: '', hrefId: '', searchFormControlName: 'searchFirstName'},
    {variable: 'lname', name: 'Last name', link: false, href: '', hrefId: '', searchFormControlName: 'searchLastName'},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry'},
    // {variable: 'interface', name: 'Interface', link: false, href: '', hrefId: '', searchFormControlName: 'searchInterface'},
    {variable: 'security', name: 'Security', link: false, href: '', hrefId: '', searchFormControlName: 'searchSecurity', default: '1'},
    {variable: 'name_visible', name: 'Name visibility', link: false, href: '', hrefId: '', searchFormControlName: 'searchNameVisibility', default: '1'},
    {variable: 'invisible', name: 'Address visibility', link: false, href: '', hrefId: '', searchFormControlName: 'searchAddressVisibility', default: '0'},
    {variable: 'birthdate', name: 'Birthdate', link: false, href: '', hrefId: '', searchFormControlName: 'searchBirthdate'},
    {variable: 'gender', name: 'Gender', link: false, href: '', hrefId: '', searchFormControlName: 'searchGender', default: '0'},
    {variable: 'city', name: 'City', link: false, href: '', hrefId: '', searchFormControlName: 'searchCity'},
    {variable: 'address', name: 'Address', link: false, href: '', hrefId: '', searchFormControlName: 'searchAddress'},
    {variable: 'business_name', name: 'Business name', link: false, href: '', hrefId: '', searchFormControlName: 'searchBusinessName'},
    {variable: 'specialist', name: 'Is specialist', link: false, href: '', hrefId: '', searchFormControlName: 'isSpecialist', default: '0', type: 'checkbox'},
    {variable: 'specialist_name', name: 'Specialist name', link: false, href: '', hrefId: '', searchFormControlName: 'searchSpecialistName'},
    {variable: 'collector', name: 'Is collector', link: false, href: '', hrefId: '', searchFormControlName: 'isCollector', default: '0', type: 'checkbox'},
    {variable: 'imageData', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'imageData', type: 'image',
      default: {
        id: 'newRow',
        imageData: {
          old: false,
          id: 0
        }
      },
      component: ImageSubtableComponent, imagePath: environment.userImageStore},
  ];


  storage = 'user';
  lists = {
    gender: [
      {id: 0, name: 'not chosen'},
      {id: 1, name: 'male'},
      {id: 2, name: 'female'},
    ],
    country: [
    ],
    name_visible: [
      {id: 1, name: 'no'},
      {id: 0, name: 'yes'},
    ],
    invisible: [
      {id: 0, name: 'no'},
      {id: 1, name: 'yes'},
    ],
    security: [
      {id: 1, name: 'user'},
      {id: 2, name: 'business'},
      {id: 3, name: 'translator'},
      {id: 4, name: 'admin'},
    ],
  };
  disabledRows = {};

  api = 'getAdminUserList';
  apiSend = 'setUserFromAdmin';
  apiDelete = 'deleteUserFromAdmin';

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

    // this.service.getAdminUserList().subscribe(data => {
    //
    // });

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.lists.country = data;
    });
  }
}
