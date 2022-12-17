import {Component, Input, OnInit} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {Overlay} from '@angular/cdk/overlay';
import {PlaceOfOriginComponent} from '../../schemas/place-of-origin/place-of-origin.component';
import {ListsService} from '../../services/api/lists.service';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {languagesInterface} from '../../../environments/languages';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '../../services/loading-service.service';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-shop-designed-basic',
  templateUrl: './shop-designed-basic.component.html',
  styleUrls: ['./shop-designed-basic.component.css']
})
export class ShopDesignedBasicComponent implements OnInit {
  tab = 'basic';
  // @ts-ignore
  @Input() downloadedData: Subject;

  languageArr = languagesInterface;
  loading = false;

  DAYS_OF_WEEK = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
  };

  formVisitTime = new FormGroup({
    0: new FormArray([]),
    1: new FormArray([]),
    2: new FormArray([]),
    3: new FormArray([]),
    4: new FormArray([]),
    5: new FormArray([]),
    6: new FormArray([])
  });

  form = new FormGroup({

    name_national: new FormControl(''),
    name_international: new FormControl('', Validators.required),
    emblem: new FormControl(''),
    owner: new FormControl(''),
    country: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),

    address: new FormControl(''),
    zip: new FormControl(''),
    phone: new FormControl(''),
    mobile: new FormControl(''),
    fax: new FormControl(''),
    email: new FormControl(''),
    web: new FormControl(''),

    parking: new FormControl(''),
    type: new FormControl('select'),
    branch: new FormControl(''),
    unique: new FormControl('select'),
    language: new FormControl(this.langService.getLanguage()),
    refrigerator: new FormControl('select'),
    area: new FormControl('select'),
    quality: new FormControl('select'),
    tasting: new FormControl(''),
    venue: new FormControl(''),
    consultant: new FormControl(''),
    delivery: new FormControl(''),
    delivery_cost: new FormControl(''),
    delivery_upon_purchase: new FormControl(''),
    strongAlcohol: new FormControl(''),
    beer: new FormControl(''),
    tobacco: new FormControl(''),
    cheese: new FormControl(''),
    meat: new FormControl(''),
    bread: new FormControl(''),

    yours: new FormControl(false),
    userId: new FormControl(0),
  });


  routeData = {editable: false, download: false, available: true};

  countries = [];
  regiones = [];
  countriesMap = new Map();
  regionesMap = new Map();

  fileToUpload: File = null;
  noImage = '../../../assets/images/no-image.png';
  imageLink;
  isImageChanged = false;
  url;


  fileToUploadEmblem: File = null;
  imageLinkEmblem;
  isImageChangedEmblem = false;
  urlEmblem;

  cookies;

  shopTypes = [];
  shopUniqueBottles = [];
  shopRefrigerator = [];
  shopArea = [];
  shopQuality = [];
  shopPurchase = [];

  constructor(private cookieObserver: CookieObserverService,
              private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              private router: Router,
              public loadingService: LoadingServiceService) { }

  ngOnInit() {

    this.shopTypes = shopTypes;
    this.shopUniqueBottles = shopUniqueBottles;
    this.shopRefrigerator = shopRefrigerator;
    this.shopArea = shopArea;
    this.shopQuality = shopQuality;
    this.shopPurchase = shopPurchase;


    this.cookies = this.cookieObserver.observeCookie();

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      // this.filterRegiones();
      this.service.getRegiones().subscribe(regionData => {
// @ts-ignore
        this.regiones = regionData;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });
        // this.filterRegiones();
      });
    });
    this.yours.valueChanges.subscribe(y => {
      if (!y) {
        if (this.cookieObserver.cookies.id == this.userId.value) {
          this.userId.setValue('');
        }
      }
    });

    const id = this.activatedroute.snapshot.params.id;
    if (this.activatedroute.snapshot.data.download) {
      this.routeData.download = true;
      this.downloadedData.subscribe(data => {


        Object.keys(this.form.controls).forEach(key => {
          if (this.form.get(key) instanceof FormControl) {
// @ts-ignore
            this.form.get(key).setValue(data.commoninfo[key]);
          }
// @ts-ignore
          if (this.form.get(key) instanceof FormArray && data.commoninfo[key]) {
            let i = 0;
// @ts-ignore
            data.commoninfo[key].forEach(v => {

// @ts-ignore
              (this.form.get(key) as FormArray).at(i).setValue(data.commoninfo[key][i]);
              i++;
            });
          }
          if (key == 'emblem') {
// @ts-ignore
            this.imageLinkEmblem = environment.shopEmblemImageStore + `${this.activatedroute.snapshot.params.id + '_' + data.emblem}.png`;
            // this.form.get(key).setValue(downloadData.wineryinfo.id);
            // this.wineryName = downloadData.wineryinfo;
          }
        });
// @ts-ignore
        if (data.visittime && data.visittime != '') {
// @ts-ignore
          const timeData = JSON.parse(data.visittime);
          console.log(timeData);
          Object.keys(timeData).forEach(key => {
            if (timeData[key] !== '') {
              const day = key[2];
              // this.removeTimeRange(day, 0);
              this.times(day).push(new FormControl(timeData[key]));
            }
          });
        }

// @ts-ignore
        this.yours.setValue(1 * (this.cookieService.get('myId') * 1 === data.user));
// @ts-ignore
        this.userId.setValue(data.user);
// @ts-ignore
        if (data.user !== 0 && this.cookieService.get('myId') * 1 !== data.user * 1
          && this.cookieService.get('sequrity') != '4' || !this.activatedroute.snapshot.data.editable) {
          this.routeData.editable = false;
          this.form.disable();
        }
      });
    }

  }

  openPlaceOfOrigin(): void {

    const dialogRef = this.dialog.open(PlaceOfOriginComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '800px',
      height: '450px',
      autoFocus: false,
      data: this.form.value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {

        this.country.setValue(result.country * 1);
        if (result.regionsForm) {
          for (let i = 0; i < 6; i++) {
            this.regionsForm.controls[i].setValue(result.regionsForm[i] * 1);
          }
        }
      }

    });
  }

  get country() {
    return this.form.get('country');
  }

  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
  }

  onSelectFileEmblem(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.urlEmblem = event.target.result;
      }
      this.fileToUploadEmblem = event.target.files.item(0);

      this.isImageChangedEmblem = true;
    }
  }

  deleteImageEmblem() {
    this.fileToUploadEmblem = null;
    this.isImageChangedEmblem = true;
  }

  isContain(arr: any[], id: any) {
    let res = false;
    arr.forEach(x => {
      if (x.id == id) {
        res = true;
      }
    });
    return res;
  }


  get name_national() {
    return this.form.get('name_national');
  }
  get name_international() {
    return this.form.get('name_international');
  }

  get emblem() {
    return this.form.get('emblem');
  }

  get owner() {
    return this.form.get('owner');
  }


  get address() {
    return this.form.get('address');
  }

  get zip() {
    return this.form.get('zip');
  }

  get phone() {
    return this.form.get('phone');
  }

  get mobile() {
    return this.form.get('mobile');
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

  get parking() {
    return this.form.get('parking');
  }

  get type() {
    return this.form.get('type');
  }

  get branch() {
    return this.form.get('branch');
  }

  get unique() {
    return this.form.get('unique');
  }

  get language() {
    return this.form.get('language');
  }

  get refrigerator() {
    return this.form.get('refrigerator');
  }

  get area() {
    return this.form.get('area');
  }

  get quality() {
    return this.form.get('quality');
  }

  get tasting() {
    return this.form.get('tasting');
  }

  get venue() {
    return this.form.get('venue');
  }

  get consultant() {
    return this.form.get('consultant');
  }

  get delivery() {
    return this.form.get('delivery');
  }

  get strongAlcohol() {
    return this.form.get('strongAlcohol');
  }

  get beer() {
    return this.form.get('beer');
  }

  get tobacco() {
    return this.form.get('tobacco');
  }

  get cheese() {
    return this.form.get('cheese');
  }

  get meat() {
    return this.form.get('meat');
  }

  get bread() {
    return this.form.get('bread');
  }

  get yours() {
    return this.form.get('yours');
  }

  get userId() {
    return this.form.get('userId');
  }




  getBasicData() {

    if (this.langService.editable) {
      return;
    }

    console.log(this.form.value);
    // return;



    const visittime = this.formVisitTime.value;
    const visittimeDB = {};
    for (const day in visittime) {
      const nRows = Math.max(visittime[day].length / 2, 2);
      for (let i = 0; i < nRows; i++) {
        const timeNameFrom = `f_${day}_${1 + i}`;
        visittimeDB[timeNameFrom] = 2 * i >= visittime[day].length ? '' : visittime[day][2 * i];
        const timeNameTo = `t_${day}_${1 + i % 2}`;
        visittimeDB[timeNameTo] = 2 * i >= visittime[day].length ? '' : visittime[day][2 * i + 1];
      }
    }

    const formsData = {
      commoninfo: this.form.value,
      visittime: JSON.stringify(visittimeDB),
    };

    return formsData;

//     if (!this.activatedroute.snapshot.data.download) {
//       this.service.addShop(formsData).subscribe(data => {
// // @ts-ignore
//         if (data.id) {
//
//
//
//           if (this.isImageChangedEmblem) {
// // @ts-ignore
//             this.service.setImage('shop-emblem', data.id, this.fileToUploadEmblem).subscribe(() => {
//
// // @ts-ignore
//               this.router.navigate(['/shop-edit/' + data.id]);
//             });
//           } else {
//             // @ts-ignore
//             this.router.navigate(['/shop-edit/' + data.id]);
//           }
// // @ts-ignore
// //           this.router.navigate(['/winery/' + data.id]);
//         }
//       });
//     } else {
// // @ts-ignore
//       formsData.shopId = this.activatedroute.snapshot.params.id;
//       this.service.editShop(formsData).subscribe(() => {
//         if (this.isImageChangedEmblem) {
// // @ts-ignore
//           this.service.setImage('shop-emblem', formsData.shopId, this.fileToUploadEmblem).subscribe(() => {
//           });
//         }
//       });
//     }
  }

  get days() {
    return this.formVisitTime.controls;
  }

  get daysKeys() {
    return Object.keys(this.days);
  }

  times(day): FormArray {
    return (this.formVisitTime.get(day) as FormArray);
  }

  addTimeRange(day) {
    if (this.langService.editable) {
      return;
    }
    this.times(day).push(new FormControl('', Validators.required));
    this.times(day).push(new FormControl('', Validators.required));
  }

  removeTimeRange(day, time) {
    if (this.langService.editable) {
      return;
    }
    this.times(day).removeAt(time);
    this.times(day).removeAt(time);
  }

  getImageEmblem() {
    if (this.routeData.download) {
      // return environment.wineImageStore + `${this.wineData.id + '_' + this.wineData.image}.png`;
      return this.imageLinkEmblem;
    } else {
      return this.noImage;
    }
  }
}

export const shopTypes = [
  {value: 'store', defaultText: 'Store'},
  {value: 'supermarket', defaultText: 'Supermarket'},
  {value: 'grocery stores', defaultText: 'Grocery stores'},
  {value: 'gas station', defaultText: 'Gas station'},
  {value: 'kiosk', defaultText: 'Kiosk'},
];

export const shopUniqueBottles = [
  {value: '0-50', defaultText: 'less then 50'},
  {value: '50-100', defaultText: '50-100'},
  {value: '100-200', defaultText: '100-200'},
  {value: '200-300', defaultText: '200-300'},
  {value: '400-600', defaultText: '400-600'},
  {value: '600-800', defaultText: '600-800'},
  {value: '800-1000', defaultText: '800-1000'},
  {value: 'more then 1000', defaultText: 'More then 1000'},
];

export const shopRefrigerator = [
  {value: 'wine refrigerator', defaultText: 'Wine refrigerator'},
  {value: 'wine cellar', defaultText: 'Wine cellar'},
  {value: 'air conditioning', defaultText: 'Air conditioning'},
];


export const shopArea = [
  {value: '10/110', defaultText: 'less then 10/110'},
  {value: '10/110-20/220', defaultText: '10/110-20/220'},
  {value: '20/220-30/330', defaultText: '20/220-30/330'},
  {value: '30/330-40/440', defaultText: '30/330-40/440'},
  {value: '40/440-50/550', defaultText: '40/440-50/550'},
  {value: '50/550-70/770', defaultText: '50/550-70/770'},
  {value: '70/770-100/1100', defaultText: '70/770-100/1100'},
  {value: '100/1100-150/1650', defaultText: '100/1100-150/1650'},
  {value: '150/1650-200/2200', defaultText: '150/1650-200/2200'},
  {value: '200/2200-300/3300', defaultText: '200/2200-300/3300'},
  {value: '300/3300', defaultText: 'more then 300/3300'},
];


export const shopQuality = [
  {value: 'wine for every day', defaultText: 'wine for every day'},
  {value: 'local wines', defaultText: 'local wines'},
  {value: 'wine of the world', defaultText: 'wine of the world'},
  {value: 'aged wines', defaultText: 'aged wines'},
];

export const shopPurchase = [
  {value: 'Cost', defaultText: 'Cost'},
  {value: 'Free', defaultText: 'Free'},
  {value: 'purchase', defaultText: 'Free upon purchase on'},
];

