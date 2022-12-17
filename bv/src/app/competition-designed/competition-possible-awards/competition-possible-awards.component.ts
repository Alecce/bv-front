import {Component, Input, OnInit} from '@angular/core';
import {environment} from '@src/environments/environment';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {Subject} from 'rxjs';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {competitionTypes} from '@src/app/competition-designed/competition-basic/competition-basic.component';
import {CookieService} from 'ngx-cookie-service';
import {ListsService} from '@src/app/services/api/lists.service';
import {ActivatedRoute, Router} from '@angular/router';
import {languagesContent} from '@src/environments/languages';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-competition-possible-awards',
  templateUrl: './competition-possible-awards.component.html',
  styleUrls: ['./competition-possible-awards.component.css']
})
export class CompetitionPossibleAwardsComponent implements OnInit {
  tab = 'awards';
  // @ts-ignore
  @Input() downloadedData: Subject;


  routeData = {editable: false, download: false, available: true};


  form = new FormGroup({



    prizes: new FormArray([]),
    categories: new FormArray([]),


  });


  countries = [];
  countriesMap = new Map();
  competitionTypes = competitionTypes;
  // competitionIsOpenTo = competitionIsOpenTo;

  // imageLink = null;
  // url;
  languageArr = languagesContent;
  // fileToUpload: File = null;
  noImage = '../../../assets/icons/placeholder-wine.svg';
  // isImageChanged = false;
  wineList = [];
  winePage = 1;
  wineTotal = 0;
  chosenWines = [];
  cookies;

  tabs = {
    basic: 'basic',
    wines: 'wines',
  };

  formFullfiled = false;

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private cookieObserver: CookieObserverService,
              public overlay: Overlay) { }

  ngOnInit() {

    this.cookies = this.cookieObserver.observeCookie();
    // this.competitionIsOpenTo.forEach(o => {
    //   this.openTo.addControl(o.value, new FormControl(false));
    // });
    //
    // this.formFullfiled = true;

//     this.geoData.subscribe(data => {
//       console.log(data);
//
// // @ts-ignore
//       this.lng.setValue(data.lng);
// // @ts-ignore
//       this.lat.setValue(data.lat);
//     });

//     this.service.getCountries().subscribe(data => {
// // @ts-ignore
//       this.countries = data;
//       this.countries.forEach(x => {
//         this.countriesMap.set(x.id, x.name);
//       });
//     });

    // this.wineHelper.valueChanges.pipe(
    //   debounceTime(1000),
    //   filter(form => !form.invalid),
    // ).subscribe(() => {
    //   this.downloadWines();
    // });


    this.downloadedData.subscribe(data => {
      console.log(data);


//       Object.keys(this.form.controls).forEach(key => {
// // @ts-ignore
//         if (this.form.get(key) instanceof FormControl && data.competition.commoninfo[key]) {
// // @ts-ignore
//           this.form.get(key).setValue(data.competition.commoninfo[key]);
//         }
//       });

      data.awards.forEach(award => {
        this.addPrize(award);
      });
      data.categories.forEach(category => {
        this.addCategory(category);
        console.log(category);
      });

      // this.geoData.next(data);

      // console.log(data.commoninfo.image);
// @ts-ignore
//       if (data.commoninfo.image * 1) {
// // @ts-ignore
//         this.imageLink = environment.eventImageStore + `${this.activatedroute.snapshot.params.id + '_' + data.commoninfo.image}.png`;
//       }


// // @ts-ignore
//       this.yours.setValue(1 * (this.cookieService.get('myId') * 1 === data.competition.commoninfo.user));
// // @ts-ignore
//       this.userId.setValue(data.competition.commoninfo.user * 1);
// // @ts-ignore
//       if (data.competition.commoninfo.user !== 0 && this.cookieService.get('myId') * 1 !== data.competition.commoninfo.user * 1
//         && this.cookieService.get('sequrity') != '4' || !this.activatedroute.snapshot.data.editable) {
//         this.routeData.editable = false;
//         this.form.disable();
//       }

// @ts-ignore
//       this.chosenWines = data.winelist.wine_list;
    });
  }

  get name_national() {
    return this.form.get('name_national');
  }
  get name_international() {
    return this.form.get('name_international');
  }
  get address() {
    return this.form.get('address');
  }
  get city() {
    return this.form.get('city');
  }
  get type() {
    return this.form.get('type');
  }
  get language() {
    return this.form.get('language');
  }
  get details() {
    return this.form.get('details');
  }
  get fee() {
    return this.form.get('fee');
  }
  get active() {
    return this.form.get('active');
  }
  get public() {
    return this.form.get('public');
  }
  get from() {
    return this.form.get('from');
  }
  get to() {
    return this.form.get('to');
  }
  get start_time() {
    return this.form.get('start_time');
  }
  get end_time() {
    return this.form.get('end_time');
  }
  get phone() {
    return this.form.get('phone');
  }
  get fax() {
    return this.form.get('fax');
  }
  get email() {
    return this.form.get('email');
  }
  get web() {
    return this.form.get('web');
  }
  get image() {
    return this.form.get('image');
  }
  get country() {
    return this.form.get('country');
  }
  get wineHelper() {
    return this.form.get('wineHelper');
  }
  get lat() {
    return this.form.get('lat');
  }
  get lng() {
    return this.form.get('lng');
  }


  get yours() {
    return this.form.get('yours');
  }

  get userId() {
    return this.form.get('userId');
  }


  get openTo() : FormGroup {
    return this.form.get('openTo') as FormGroup;
  }
  get commercialMarket() : FormGroup {
    return this.form.get('commercialMarket') as FormGroup;
  }
  get isEntriesLimited() : FormGroup {
    return this.form.get('isEntriesLimited') as FormGroup;
  }
  get entriesLimit() : FormGroup {
    return this.form.get('entriesLimit') as FormGroup;
  }
  imageLink(i) {
    return this.prizes.at(i).get('imageLink').value;
  }
  fileToUpload(i) {
    return this.prizes.at(i).get('fileToUpload').value;
  }
  url(i) {
    return this.prizes.at(i).get('url').value;
  }



  checkValidation(input: AbstractControl) {
    if (input.untouched) {
      return 'border-secondary';
    } else if (input.valid) {
      return 'border-info';
    } else {
      return 'border-danger';
    }
  }

  downloadWines() {
    this.listService.getWines({search: this.wineHelper.value, page: this.winePage}).subscribe(data => {
        // @ts-ignore
        this.wineList = data.rows;
      }
    );
  }
  selectWine(wine) {
    // console.log(id);
    this.chosenWines.forEach(w => {
      if (w.id == wine.id) {
        return;
      }
    });
    this.chosenWines.push(wine);
    // this.winery.setValue(id);
    // if (id) {
    //   this.wineryName = this.wineryList.filter(x => x.id == id)[0];
    // } else {
    //   this.wineryName = null;
    // }
  }
  getWineName(wine) {
    if (wine) {
      if (wine.international_wn == wine.name || !wine.name) {
        return `${wine.international_wn}`;
      }
      return `${wine.international_wn} (${wine.name})`;
    }
  }
  removeWine(wine) {
    this.chosenWines = this.chosenWines.filter(w => {
      return w.id != wine.id;
    });
  }






  getAwardData() {

    return this.form.value;

  }



  addCategory(p) {
    if (this.langService.editable) {
      return;
    }
    if (p) {
      this.categories.push(this.newCategoryGroup(p));
    } else {
      this.categories.push(this.newBlancCategoryGroup());
    }
  }
  removeCategory(i) {
    if (this.langService.editable) {
      return;
    }
    this.categories.removeAt(i);
  }
  get categories(): FormArray {
    return this.form.get('categories') as FormArray;
  }

  newBlancCategoryGroup() {
    return new FormGroup({
      name: new FormControl(''),
      name_int: new FormControl(''),
      year: new FormControl(''),
      description: new FormControl(''),
      description_int: new FormControl(''),
      timestamp: new FormControl(Date.now()),
    });
  }


  newCategoryGroup(p) {


    return new FormGroup({
      name: new FormControl(p.name),
      name_int: new FormControl(p.name_int),
      year: new FormControl(p.year),
      description: new FormControl(p.description),
      description_int: new FormControl(p.description_int),
      timestamp: new FormControl(p.timestamp),

    });
  }

  getCategoryName(i) {
    return this.categories.at(i).value.name + ' - ' + this.categories.at(i).value.name_int;
  }


  addPrize(p) {
    if (this.langService.editable) {
      return;
    }
    if (p) {
      this.prizes.push(this.newPrizeGroup(p));
    } else {
      this.prizes.push(this.newBlancPrizeGroup());
    }
  }
  removePrize(i) {
    if (this.langService.editable) {
      return;
    }
    this.prizes.removeAt(i);
  }
  get prizes(): FormArray {
    return this.form.get('prizes') as FormArray;
  }

  newBlancPrizeGroup() {
    return new FormGroup({
      name: new FormControl(''),
      name_int: new FormControl(''),
      image: new FormControl(''),
      imageLink: new FormControl(''),
      category: new FormControl(''),
      isImageChanged: new FormControl(false),
      fileToUpload: new FormControl(null),
      url: new FormControl(null),
      timestamp: new FormControl(Date.now()),
    });
  }


  newPrizeGroup(p) {

    let imageLink;
// @ts-ignore
    if (p.image * 1) {
// @ts-ignore
      imageLink = environment.awardImageStore + `${p.id + '_' + p.image}.png`;
    } else {
      imageLink = '';
    }

    return new FormGroup({
      name: new FormControl(p.name),
      name_int: new FormControl(p.name_int),
      image: new FormControl(p.image),
      imageLink: new FormControl(imageLink),
      category: new FormControl(p.category),
      isImageChanged: new FormControl(false),
      fileToUpload: new FormControl(null),
      url: new FormControl(null),
      timestamp: new FormControl(p.timestamp),

    });
  }
  getImage(i) {
    const imageLink = this.prizes.at(i).get('imageLink').value;

    if (imageLink) {
      return imageLink;
    } else {
      return this.noImage;
    }
  }
  onSelectFile(event, i) { // called each time file input changes
    console.log(i);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

        this.prizes.at(i).get('url').setValue(event.target.result);
        // @ts-ignore
        // this.url = event.target.result;
      };
      this.prizes.at(i).get('fileToUpload').setValue(event.target.files.item(0));
      // this.fileToUpload = event.target.files.item(0);

      this.prizes.at(i).get('isImageChanged').setValue(true);
      // this.isImageChanged = true;
    }
  }
  deleteImage(i) {
    if (this.langService.editable) {
      return;
    }
    // this.imageLink = null;
    // this.fileToUpload = null;
    // this.isImageChanged = true;

    this.prizes.at(i).get('imageLink').setValue(null);
    this.prizes.at(i).get('fileToUpload').setValue(null);
    this.prizes.at(i).get('isImageChanged').setValue(true);
  }
}
