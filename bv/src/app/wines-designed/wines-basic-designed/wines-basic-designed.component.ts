import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {debounceTime, filter} from 'rxjs/operators';
import {forkJoin, Subject} from 'rxjs';
import {ListsService} from '../../services/api/lists.service';
import {Overlay} from '@angular/cdk/overlay';
import {environment} from '../../../environments/environment';
import {languagesInterface} from '../../../environments/languages';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-wines-basic-designed',
  templateUrl: './wines-basic-designed.component.html',
  styleUrls: ['./wines-basic-designed.component.css']
})
export class WinesBasicDesignedComponent implements OnInit {
  tab = 'basic';

  languageArr = languagesInterface;

  routeData = {editable: false, download: false, available: true};
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  // @ts-ignore
  @Input() isParentShowNoValidation;
  isWineryOwner = false;

  public form = new FormGroup({
    isTest: new FormControl(false),
    language: new FormControl(this.langService.getLanguage()),
    name_national: new FormControl(''),
    name_international: new FormControl('', Validators.required),
    alterNames: new FormArray([]),

    winery: new FormControl(null, Validators.required),
    wineryHelper: new FormControl(null),
    year: new FormControl(''),
    alc_percent: new FormControl(''),
    barrel_aged: new FormControl(false),
    barrel_aged_range: new FormControl(''),
    professional_points: new FormArray([]),
    professional_confirmation: new FormArray([]),

    color: new FormControl('nocolor'),
    type: new FormControl('0'),

    grand_type: new FormControl('select'),
    still: new FormControl('select'),
    sweetness: new FormControl('select'),
    sparkling: new FormControl('select'),
    method: new FormControl('select'),
    nongrape: new FormControl('select'),

    gas: new FormControl('select'),
    champagne_sweetness: new FormControl('select'),
    special: new FormControl('select'),

    image: new FormControl(''),
    description: new FormControl(''),
    fitToCollection: new FormControl(''),
    description_int: new FormControl(''),
    series: new FormControl(''),
    series_int: new FormControl(''),
    maker_national: new FormControl(''),
    maker_international: new FormControl(''),

    consultant_national: new FormControl(''),
    consultant_international: new FormControl(''),

    brand: new FormControl(''),

  });

  wineryList = [];
  wineryPage = 1;
  wineryTotal = 0;
  wineryName = null;

  url = null;
  imageLink;
  fileToUpload: File = null;
  noImage = '../../../assets/icons/placeholder-wine.svg';
  isImageChanged = false;
  wineTypeList = [];
  sparklingSubTypeList = [];
  availableTypesForSubTypes = [];
  wineSubTypeList = [];
  professionalList = [];
  nongrapeSubTypeList = [];


  professionalPointsList = [];

  grandTypesArr = grandTypes;
  stillArr = still;
  methodArr = method;
  sweetnessArr = sweetness;
  champagneSweetnessArr = champagneSweetness;
  gasArr = gas;
  colorArr = color;

  seriesArr = [];

  constructor(private service: RequestsService,
              public listService: ListsService,
              public accountService: AccountServiceService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public overlay: Overlay
  ) { }

  ngOnInit() {
    this.isWineryOwnerSubject.subscribe(v => {
      this.isWineryOwner = v;
    });



    const getWineType = this.service.getWineType();
    const getSubTypeList = this.service.getWineSubType();
    const getProfList = this.service.getProfessionalList();
    // const getCountries = this.service.getCountries();
    const getSparklingSubType = this.service.getSparklingType();
    const getNongrapeSubType = this.service.getNongrapeTypes();


    forkJoin([getWineType, getProfList, getSubTypeList, getSparklingSubType, getNongrapeSubType]).subscribe(results => {

      // @ts-ignore
      this.wineTypeList = results[0];
      // @ts-ignore
      this.professionalList = results[1];
      // @ts-ignore
      this.wineSubTypeList = results[2];
      this.wineSubTypeList.forEach(x => {
        x.typeList = JSON.parse(x.type);
        x.typeList.forEach(t => {
          this.availableTypesForSubTypes.push(t);
        });

      });
      // @ts-ignore
      this.sparklingSubTypeList = results[3];
      // @ts-ignore
      this.nongrapeSubTypeList = results[4];

      console.log(this.wineSubTypeList);
      this.activatedroute.data.subscribe(data => {
        if (data.download) {
          this.routeData.download = true;
          this.downloadedData.subscribe(downloadData => {


            console.log(downloadData);
            Object.keys(this.form.controls).forEach(key => {
              if (this.form.get(key) instanceof FormControl) {
                if (key != 'wineryHelper' && key != 'image' && key != 'winery' && downloadData.basic_designed[key]) {
                  this.form.get(key).setValue(downloadData.basic_designed[key]);
                }

                if (key == 'winery') {
                  this.form.get(key).setValue(downloadData.wineryinfo.id);
                  this.wineryName = downloadData.wineryinfo;
                }

                if (key == 'image') {
                  if (downloadData.image * 1) {
                    this.imageLink = environment.wineImageStore + `${this.activatedroute.snapshot.params.id + '_' + downloadData.image}.png`;
                  }
                  // this.form.get(key).setValue(downloadData.wineryinfo.id);
                  // this.wineryName = downloadData.wineryinfo;
                }
              }
            });

            if (downloadData.profPointsDB) {

              // const profpointData = JSON.parse(downloadData.profPointsDB);

              console.log(downloadData.profPointsDB);
              downloadData.profPointsDB.forEach(point => {
                // console.log(point);
                // const opinion = point.split(':');
                if (point.notNeutralSpecialist) {
                  this.professionalPointsList.push(point);
                  this.addProfessionalConfirmation(point)
                } else {
                  this.addProfessionalPoint(point);
                }
              });
              // console.log(profpointData);
            }



            if (downloadData.alterNames) {


              downloadData.alterNames.forEach(point => {


                this.addAlterNames(point);

              });
            }
            // @ts-ignore
            // if (downloadData.user !== 0 && this.cookieService.get('myId') * 1 !== downloadData.user * 1 || !this.activatedroute.snapshot.data.editable) {
            //   this.routeData.editable = false;
            //   this.form.disable();
            // }
          });
        } else {
          const id = this.activatedroute.snapshot.params.id;

          if (id != '0') {

            this.service.getWineryData(id).subscribe(downloadData => {
              // @ts-ignore
              this.winery.setValue(downloadData.wineryinfo.id);
              // @ts-ignore
              this.wineryName = downloadData.wineryinfo;
            }, err => {

            });
          }
          this.addProfessionalPoint(null);
        }
      });

    });


    this.wineryHelper.valueChanges.pipe(
      debounceTime(1000),
      filter(form => !form.invalid),
    ).subscribe(() => {
      this.wineryPage = 1;
      this.downloadWineries();
    });
  }
  get name_international() {
    return this.form.get('name_international');
  }
  get wineryHelper() {
    return this.form.get('wineryHelper');
  }
  get winery() {
    return this.form.get('winery');
  }
  get barrel_aged() {
    return this.form.get('barrel_aged');
  }
  get fitToCollection() {
    return this.form.get('fitToCollection');
  }
  get grand_type() {
    return this.form.get('grand_type');
  }
  get still() {
    return this.form.get('still');
  }
  get sweetness() {
    return this.form.get('sweetness');
  }
  get sparkling() {
    return this.form.get('sparkling');
  }
  get method() {
    return this.form.get('method');
  }
  get nongrape() {
    return this.form.get('nongrape');
  }
  get gas() {
    return this.form.get('gas');
  }
  get champagne_sweetness() {
    return this.form.get('champagne_sweetness');
  }
  get type() {
    return this.form.get('type');
  }
  get color() {
    return this.form.get('color');
  }
  get special() {
    return this.form.get('special');
  }


  get language() {
    return this.form.get('language');
  }

  downloadWineries() {
    this.listService.getWineries({search: this.wineryHelper.value, page: this.wineryPage, language: this.langService.chainLanguage}).subscribe(data => {
        // @ts-ignore
        this.wineryList = data.rows;
        // @ts-ignore
        this.wineryTotal = data.total;
      }
    );
  }

  selectWinery(id) {
    this.winery.setValue(id);
    if (id) {
      this.wineryName = this.wineryList.filter(x => x.id == id)[0];
    } else {
      this.wineryName = null;
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
  getWineryLink(winery) {
    return '/winery/' + winery.id;
  }
  getWinerySeries(winery) {

    // console.log(winery);
    // return winery.series;

    return this.seriesArr;
  }
  getSeriesName(series, wineryLanguage) {


    if(!series.name || !series.international || series.name  == series.international) {
      return series.name || series.international;
    } else {

      if(wineryLanguage == this.langService.getLanguage()) {
        return series.name;
      } else {
        return series.international;
      }
    }
    // return series.name;


    // if(!series.name || !series.international || series.name  == series.international) {
    //   return series.name || series.international;
    // } else {
    //   return `${series.name} (${series.international})`
    // }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
      }
      this.fileToUpload = event.target.files.item(0);

      this.isImageChanged = true;
    }
  }
  deleteImage() {
    if (this.langService.editable) {
      return;
    }
    this.imageLink = null;
    this.fileToUpload = null;
    this.isImageChanged = true;
  }
  get professional_confirmation(): FormArray {
    return this.form.get('professional_confirmation') as FormArray;
  }

  addProfessionalConfirmation(point) {
    if (this.langService.editable) {
      return;
    }
    (this.professional_confirmation as FormArray).push(this.getFormProfessionalConfirmation(point));
  }
  getFormProfessionalConfirmation(point) {


    return new FormGroup({
      professional: new FormControl(point.specialist),
      point: new FormControl(point.points),
      system: new FormControl(point.system),
      confirmation: new FormControl(point.confirmation),
    });
  }

  get professional_points(): FormArray {
    return this.form.get('professional_points') as FormArray;
  }
  addProfessionalPoint(point) {
    if (this.langService.editable) {
      return;
    }
    if (point) {
      (this.professional_points as FormArray).push(this.getFormProfessionalPoint(point));
    } else {
      (this.professional_points as FormArray).push(this.getBlancFormProfessionalPoint());
    }
  }


  removeProfessionalPoint(point) {
    if (this.langService.editable) {
      return;
    }
    (this.professional_points as FormArray).removeAt(point);
  }

  getBlancFormProfessionalPoint() {

    return new FormGroup({
      professional: new FormControl('not chosen'),
      point: new FormControl(''),
      system: new FormControl('')
    });
  }
  getFormProfessionalPoint(point) {


    return new FormGroup({
      professional: new FormControl(point.specialist),
      point: new FormControl(point.points),
      system: new FormControl(point.system)
    });
  }


  get alterNames(): FormArray {
    return this.form.get('alterNames') as FormArray;
  }
  addAlterNames(point) {
    if (this.langService.editable) {
      return;
    }
    if (point) {
      (this.alterNames as FormArray).push(this.getFormAlterNames(point));
    } else {
      (this.alterNames as FormArray).push(this.getBlancFormAlterNames());
    }
  }


  removeAlterNames(point) {
    if (this.langService.editable) {
      return;
    }
    (this.alterNames as FormArray).removeAt(point);
  }

  getBlancFormAlterNames() {
    return new FormGroup({
      language: new FormControl('not chosen'),
      name: new FormControl(''),
    });
  }
  getFormAlterNames(point) {
    return new FormGroup({
      language: new FormControl(point.language),
      name: new FormControl(point.name),
    });
  }

  public getResult() {
    if (this.grand_type.value != 'nongrape') {
      this.nongrape.setValue('select');
    } else {
      this.color.setValue('nocolor');
      this.sweetness.setValue('select');
    }
    if (this.grand_type.value != 'sparkling') {
      this.sparkling.setValue('select');
      this.method.setValue('select');
      this.gas.setValue('select');
      this.champagne_sweetness.setValue('select');
    }
    if (this.grand_type.value != 'still') {
      this.still.setValue('select');
      this.type.setValue('0');
      this.sweetness.setValue('select');
    }
    if (!this.availableTypesForSubTypes.includes(this.type.value + '')) {
      this.special.setValue('0');
    }
    return this.form.value;
  }

  getImage() {
    if (this.routeData.download) {
      // return environment.wineImageStore + `${this.wineData.id + '_' + this.wineData.image}.png`;
      return this.imageLink;
    } else {
      return this.noImage;
    }
  }
  setWineryPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.wineryPage = page;
    this.downloadWineries();
    return page;
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
  isBigScreen() {
    return window.innerWidth > 1080
  }

  getProfessionalName(pp) {
    let res = '';
    this.professionalList.forEach(professional => {
      if(professional.id == pp.value.professional) {
        res = professional.name;
      }
    });
    return res;
  }

  getProfessionalPoints(pp) {
    return ' ' + pp.value.point;
  }

  getProfessionalSystem(pp) {
    if(pp.value.system && pp.value.system != 'select') {
      return ' / ' + pp.value.system;
    } else {
      return '';
    }
  }

  isInvalid(field) {
    return this.isParentShowNoValidation && field.invalid;
  }

  reloadBrands(winery) {


    // @ts-ignore
    this.seriesArr.length = 0;
    winery.series.forEach(s => {
      this.seriesArr.push(s);
    });
  }

}

export const grandTypes = [
  {value: 'still', defaultText: 'Still'},
  {value: 'sparkling', defaultText: 'Sparkling'},
  {value: 'nongrape', defaultText: 'Nongrape'},
];

export const still = [
  {value: 'usual', defaultText: 'Usual'},
  {value: 'fortified', defaultText: 'Fortified'},
  {value: 'concentrated', defaultText: 'Concentrated'},
];

export const method = [
  {value: 'traditional', defaultText: 'traditional'},
  {value: 'ancestral', defaultText: 'ancestral'},
  {value: 'transfer', defaultText: 'transfer'},
  {value: 'dioise', defaultText: 'dioise'},
  {value: 'charmat', defaultText: 'charmat'},
  {value: 'continuous', defaultText: 'continuous'},
  {value: 'carbonation', defaultText: 'carbonation'},
];

export const sweetness = [
  {value: 'dry', defaultText: 'Dry'},
  {value: 'semi-dry', defaultText: 'Semi-dry'},
  {value: 'semi-sweet', defaultText: 'Semi-sweet'},
  {value: 'sweet', defaultText: 'Sweet'},
];

export const champagneSweetness = [
  {value: 'Extra Brut', defaultText: 'Extra Brut'},
  {value: 'Brut', defaultText: 'Brut'},
  {value: 'Extra Dry', defaultText: 'Extra Dry'},
  {value: 'Sec', defaultText: 'Sec'},
  {value: 'Demi-Sec', defaultText: 'Demi-Sec'},
  {value: 'Doux', defaultText: 'Doux'},
];

export const gas = [
  {value: 'Beady', defaultText: 'Beady'},
  {value: 'Semi-sparkling', defaultText: 'Semi-sparkling'},
  {value: 'Sparkling', defaultText: 'Sparkling'},
];

export const color = [
  {value: 'white', defaultText: 'White'},
  {value: 'rose', defaultText: 'Rose'},
  {value: 'red', defaultText: 'Red'},
  {value: 'orange', defaultText: 'Orange'},
];
