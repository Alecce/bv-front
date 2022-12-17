import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {LanguageServiceService} from '../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsService} from '../services/api/lists.service';
import {Overlay} from '@angular/cdk/overlay';
import {RequestsService} from '../services/api/requests.service';
import {debounceTime, filter} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Title} from '@angular/platform-browser';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  noImage = 'url(\'../../../assets/icons/placeholder-page.svg\') no-repeat center center /cover';

  imageUrl = '';
  winery = true;
  wineryPage = 1;
  wineryTotal = 0;
  chosenWinery;
  wineryList = [];

  countries = [];
  regiones = [];
  allRegiones = [];
  countriesMap = new Map();
  regionesMap = new Map();


  form = new FormGroup({
    searchInternationalName: new FormControl(''),
    searchWinery: new FormControl(''),
    wineryHelper: new FormControl(''),

    country: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),


    color: new FormControl('0'),

    grand_type: new FormControl('0'),
  });
  constructor(public service: RequestsService,
              public listService: ListsService,
              public langService: LanguageServiceService,
              public cookieService: CookieService,
              public activatedroute: ActivatedRoute,
              public accountService: AccountServiceService,
              private router: Router,
              public dialog: MatDialog,
              private titleService: Title,
              public overlay: Overlay) { }

  ngOnInit() {

    let title = 'Home - bonvino.com';
    this.titleService.setTitle(title);


    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      // this.filterRegiones();
      this.service.getRegiones().subscribe(data => {
// @ts-ignore
        this.regiones = data;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });
        // this.filterRegiones();
      });
    });

    this.wineryHelper.valueChanges.pipe(
      debounceTime(1000),
      filter(form => !form.invalid),
    ).subscribe(() => {
      this.wineryPage = 1;
      this.downloadWineries();
    });


    this.service.getHomepage().subscribe(data => {
      console.log(data);
// @ts-ignore
      if (data.res) {



// @ts-ignore
        if (data.res.image) {
// @ts-ignore
          this.imageUrl = `url(${environment.homeImageStore + data.res.id + '_' + data.res.image + '.png'}) no-repeat center center /cover`;
        } else {
          this.imageUrl = this.noImage;
        }
      } else {

        this.imageUrl = this.noImage;
      }
    });
  }
  get searchInternationalName() {
    return this.form.get('searchInternationalName');
  }
  get searchWinery() {
    return this.form.get('searchWinery');
  }
  get wineryHelper() {
    return this.form.get('wineryHelper');
  }
  get country() {
    return this.form.get('country');
  }
  get regionsForm() {
    return this.form.get('regionsForm');
  }
  get color() {
    return this.form.get('color');
  }
  get grand_type() {
    return this.form.get('grand_type');
  }
  downloadWineries() {
    this.listService.getWineries({search: this.wineryHelper.value, page: this.wineryPage}).subscribe(data => {
        // @ts-ignore
        this.wineryList = data.rows;
        // @ts-ignore
        this.wineryTotal = data.total;
      }
    );
  }
  selectWinery(id) {
    // console.log(id);
    this.searchWinery.setValue(id);
    if (id) {
      // @ts-ignore
      this.chosenWinery = this.wineryList.filter(x => x.id == id)[0];
    } else {
      this.chosenWinery = null;
    }
  }
  getWineryName(winery) {
    if (winery) {
      if (winery.international_name == winery.winery_name){
        return `${winery.international_name}`;
      }
      return `${winery.international_name} (${winery.winery_name})`;
    }
  }


  showWines() {

    const queryData = {};

    if (this.searchInternationalName.value != '') {
      // @ts-ignore
      queryData.searchInternationalName = this.searchInternationalName.value;
    }
    if (this.grand_type.value != '0') {
      // @ts-ignore
      queryData.grand_type = this.grand_type.value;
    }
    if (this.country.value != '0') {
      // @ts-ignore
      queryData.country = this.country.value;
    }
    if (Math.max(this.regionsForm.value) != 0) {
      // @ts-ignore
      queryData.regionsForm = JSON.stringify(this.regionsForm.value);
    }
    if (this.chosenWinery) {
      // @ts-ignore
      queryData.chosenWinery = JSON.stringify(this.chosenWinery);
    }

    // @ts-ignore
    queryData.autoload = '1';
    this.router.navigate(['wine-list'], {queryParams: queryData});
  }
  getSearchParams() {

    const queryData = {};

    if (this.searchInternationalName.value != '') {
      // @ts-ignore
      queryData.searchInternationalName = this.searchInternationalName.value;
    }
    if (this.grand_type.value != '0') {
      // @ts-ignore
      queryData.grand_type = this.grand_type.value;
    }
    if (this.country.value != '0') {
      // @ts-ignore
      queryData.country = this.country.value;
    }
    if (Math.max(this.regionsForm.value) != 0) {
      // @ts-ignore
      queryData.regionsForm = JSON.stringify(this.regionsForm.value);
    }
    if (this.chosenWinery) {
      // @ts-ignore
      queryData.chosenWinery = JSON.stringify(this.chosenWinery);
    }
    return queryData;
  }

  addWines() {
    this.router.navigate(['/wines-add/0']);
  }

  addWinesLink() {
    return '/wines-add/0';
  }



  getImage() {
    // if (this.eventData && this.eventData.image) {
    //   return environment.wineImageStore + `${this.eventData.id + '_' + this.eventData.image}.png`;
    //
    // } else {
    //   return this.noImage;
    // }
    return this.imageUrl;
  }
}
