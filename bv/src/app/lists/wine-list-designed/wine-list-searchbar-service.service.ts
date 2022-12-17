import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {variables} from '@src/environments/variables';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WineListSearchbarServiceService {

  showWines = new ReplaySubject(1);
  public openSwitchSubject = new ReplaySubject(1);

  test = '';
  chosenGrape;
  chosenWinery;


  orders = {
    addtime: {name: 'addtime', direction: true},
    addtime_reverse: {name: 'addtime', direction: false},

    name_int: {name: 'international_wn', direction: true},
    name_int_reverse: {name: 'international_wn', direction: false},

    winery: {name: 'winery', direction: true},
    winery_reverse: {name: 'winery', direction: false},

    // name_nat: {name: 'wines.name', direction: true},
    // name_nat_reverse: {name: 'wines.name', direction: false},

    year: {name: 'vintage_year', direction: true},
    year_reverse: {name: 'vintage_year', direction: false},

    country: {name: 'countries.name', direction: true},
    country_reverse: {name: 'countries.name', direction: false},

    rating: {name: 'rating', direction: true},
    rating_reverse: {name: 'rating', direction: false},

    sort: {name: 'wines.id', direction: true},


    award: {name: 'has_award', direction: true},
    award_reverse: {name: 'has_award', direction: false},


    is_confirmed: {name: 'is_confirmed', direction: true},
    is_confirmed_reverse: {name: 'is_confirmed', direction: false},


    is_confirmed_competition: {name: 'is_confirmed_competition', direction: true},
    is_confirmed_competition_reverse: {name: 'is_confirmed_competition', direction: false},
  };


  tabs = {
    all: 'all',
    my: 'my',
    relatedWines: 'relatedWines',
    iAndWine: 'iAndWine',
    myRates: 'myRates',
    collection: 'collection',
    event: 'event',
    discoverEvent: 'discoverEvent',
    shop: 'shop',
    discoverShop: 'discoverShop',

    discoverCompetition: 'discoverCompetition',


    bengatCollection: 'bengatCollection',
    bengatRating: 'bengatRating',
  };

  bengat = variables.bengat;
  startingTab = this.bengat ? this.tabs.bengatCollection : this.tabs.all;

  public form = new FormGroup({
    searchId: new FormControl(''),
    searchInternationalName: new FormControl(''),
    searchYear: new FormControl(''),
    // searchColor: new FormControl(0),
    // searchType: new FormControl(0),
    searchCountry: new FormControl(0),
    searchWinery: new FormControl(''),
    tab: new FormControl(this.startingTab),
    wineryHelper: new FormControl(''),
    order: new FormControl('name_int'),

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
    type: new FormControl('0'),

    grand_type: new FormControl('0'),
    still: new FormControl('0'),
    sweetness: new FormControl('0'),
    sparkling: new FormControl('0'),
    method: new FormControl('0'),
    nongrape: new FormControl('0'),
    gas: new FormControl('0'),
    champagne_sweetness: new FormControl('0'),
    special: new FormControl('0'),


    priceLevel: new FormControl('0'),
    bottleSize: new FormControl('0'),

    year: new FormControl(''),
    alc_percent: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl(''),


    isKashrut: new FormControl(''),
    isQuality: new FormControl(''),
    isBiodynamic: new FormControl(''),
    isOrganic: new FormControl(''),
    isVegan: new FormControl(''),

    grapeSearch: new FormControl(''),
    grapeHelper: new FormControl(''),

    isForWinery: new FormControl(false),


    competition: new FormControl(0),
    competitionYear: new FormControl(''),
    award: new FormControl(0),
    // grantAward: new FormControl(0),
    // competitionGroup: new FormGroup({
    // }),
  });

  public formReset = new FormGroup({
    searchId: new FormControl(''),
    searchInternationalName: new FormControl(''),
    searchYear: new FormControl(''),
    // searchColor: new FormControl(0),
    // searchType: new FormControl(0),
    searchCountry: new FormControl(0),
    searchWinery: new FormControl(''),
    tab: new FormControl(this.startingTab),
    wineryHelper: new FormControl(''),
    order: new FormControl('name_int'),

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
    type: new FormControl('0'),

    grand_type: new FormControl('0'),
    still: new FormControl('0'),
    sweetness: new FormControl('0'),
    sparkling: new FormControl('0'),
    method: new FormControl('0'),
    nongrape: new FormControl('0'),
    gas: new FormControl('0'),
    champagne_sweetness: new FormControl('0'),
    special: new FormControl('0'),


    priceLevel: new FormControl('0'),
    bottleSize: new FormControl('0'),

    year: new FormControl(''),
    alc_percent: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl(''),


    isKashrut: new FormControl(''),
    isQuality: new FormControl(''),
    isBiodynamic: new FormControl(''),
    isOrganic: new FormControl(''),
    isVegan: new FormControl(''),

    grapeSearch: new FormControl(''),
    grapeHelper: new FormControl(''),

    isForWinery: new FormControl(false),


    competition: new FormControl(0),
    competitionYear: new FormControl(''),
    award: new FormControl(0),
    // grantAward: new FormControl(0),
    // competitionGroup: new FormGroup({
    // }),
  });
  resetFormValue = this.formReset.value;

  public isBarOpen = false;
  public formModel = this.form.value;

  constructor() {

    this.openSwitchSubject.subscribe(x => {
// @ts-ignore
      this.isBarOpen = x;
    })
  }

  public closeBar() {
    this.openSwitchSubject.next(0);
  }
  public openBar() {
    this.openSwitchSubject.next(1);
  }
  resetSearch() {

    console.log(this.resetFormValue);

    this.form.reset(this.resetFormValue);

    this.formModel = this.form.value;
    // return this.form.get('searchInternationalName').reset();

  }

  reloadFormModel() {
    this.formModel = this.form.value;
  }
}
