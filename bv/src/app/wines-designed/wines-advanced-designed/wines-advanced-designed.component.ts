import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Overlay} from '@angular/cdk/overlay';
import {ListsService} from '../../services/api/lists.service';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {forkJoin, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {CompetitionSelectComponent} from '@src/app/schemas/competition-select/competition-select.component';
import {environment} from '@src/environments/environment.prod';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-wines-advanced-designed',
  templateUrl: './wines-advanced-designed.component.html',
  styleUrls: ['./wines-advanced-designed.component.css']
})
export class WinesAdvancedDesignedComponent implements OnInit, AfterViewInit {
  tab = 'advanced';

  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  isWineryOwner = false;

  form = new FormGroup({
    filtration: new FormControl('0'),
    // nightHarvest: new FormControl(0),
    nonfiltered: new FormControl(0),
    lightfiltered: new FormControl(0),
    sulfurDioxide: new FormControl(0),
    // handPicked: new FormControl(0),
    passover: new FormControl(0),
    mevushal: new FormControl(0),
    screwcap: new FormControl(0),
    biodynamicSearch: new FormControl(''),
    biodynamic: new FormControl(0),
    biodynamicWine: new FormGroup({}),
    organicSearch: new FormControl(''),
    organic: new FormControl(false),
    organicWine: new FormGroup({}),
    veganSearch: new FormControl(''),
    vegan: new FormControl(0),
    veganWine: new FormGroup({}),


    kashrutsSearch: new FormControl(''),
    kashrut: new FormControl(0),
    kosherPesah: new FormControl(0),
    kashrutsWine: new FormGroup({}),


    qualitySearch: new FormControl(''),
    quality: new FormControl(''),
    qualitiesWine: new FormGroup({}),

    destemming: new FormControl('0'),
    sorting: new FormControl(''),
    sorting_manual: new FormControl(''),
    sorting_optic: new FormControl(''),
    crushing: new FormControl('0'),
    transfer: new FormControl(0),

    maceration_type: new FormControl('day'),
    maceration_range: new FormControl(''),
    maceration_temperature: new FormControl(''),
    maceration_temperature_f: new FormControl(''),
    maceration_is_fahrenheit: new FormControl('0'),
    maceration_carbonic: new FormControl(''),



    fermentation_type: new FormControl(''),
    fermentation_range: new FormControl(''),
    fermentation_temperature: new FormControl(''),
    fermentation_temperature_f: new FormControl(''),
    fermentation_is_fahrenheit: new FormControl('0'),

    fermentation_tank: new FormControl('0'),
    fermentation_open_top: new FormControl(0),
    fermentation_yeast : new FormControl('0'),


    malolactic_fermentation: new FormControl(false),
    malolactic_fermentation_type: new FormControl(''),
    malolactic_partial: new FormControl(''),


    batonnage: new FormControl(false),
    //
    competitions: new FormArray([]),
    //
    barrel_full: new FormArray([]),
    wrappings: new FormArray([]),
    pallet: new FormArray([]),
    pressing: new FormArray([]),
    //
    //
    bottled_by: new FormControl(''),
    bottled_date: new FormControl(''),
    fining: new FormControl(''),

    //
    volatile_acidity: new FormControl(''),
    ph: new FormControl(''),
    sugar: new FormControl(''),
    energy: new FormControl(''),
    priceLevel: new FormControl(0),
    total_dry_extract: new FormControl(''),

    barrel_aged: new FormControl(false),

  });


  finingArr = finingArr;
  // op-up Earth Filtration (DE)/Pad Filtration/Membrane Filtration
  // /Cross-Flow Filtration/Ultra-Filtration/Ceramic Membrane Crossflow/Microfiltration/Reverse osmosis/Centrifuge

  filtrationArr = filtrationArr;

  competitionList = [];
  awardList = [];
  barrelTypeList = [];
  barrelSizeList = [];
  wrappingList = [];
  wrappingTypeList = wrappingTypeList;
  boxMaterialList = boxMaterialList;
  boxPositionList = boxPositionList;

  priceList = [];
  corkList = [];


  kashrutList = [];
  qualityList = [];
  biodynamicList = [];
  organicList = [];
  veganList = [];

  kashrutSearchList = [];
  qualitySearchList = [];
  biodynamicSearchList = [];
  organicSearchList = [];
  veganSearchList = [];


  kashrutPage = 1;
  kashrutTotal = 0;
  qualityPage = 1;
  qualityTotal = 0;
  biodynamicPage = 1;
  biodynamicTotal = 0;
  organicPage = 1;
  organicTotal = 0;
  veganPage = 1;
  veganTotal = 0;

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              public accountService: AccountServiceService,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialog: MatDialog,
              public overlay: Overlay) { }


  ngOnInit() {
    this.isWineryOwnerSubject.subscribe(v => {
      this.isWineryOwner = v;

      if(!v) {
        this.maceration_range.disable();
        this.maceration_temperature.disable();
        this.maceration_temperature_f.disable();
        this.fermentation_temperature.disable();
        this.fermentation_temperature_f.disable();
        this.fermentation_range.disable();
        this.competitions.controls.forEach((c1: FormGroup) => {
          // console.log(c1.controls);

          Object.keys(c1.controls).forEach(c2 => {
            c1.controls[c2].disable();
          });
          // // @ts-ignore
          // if(c1.controls) {
          //   // @ts-ignore
          //   c1.controls.forEach(c2 => {
          //     c2.disable();
          //   })
          // }
        });
        this.pallet.controls.forEach((c1: FormGroup) => {
          console.log(c1.controls);

          // @ts-ignore
          c1.controls.forEach(c2 => {
            c2.disable();
          })
        });
        this.pressing.controls.forEach((c1: FormGroup) => {
          // @ts-ignore
          c1.controls.forEach(c2 => {
            c2.disable();
          })
        });
        this.bottled_date.disable();
        this.screwcap.disable();


      } else {

        this.maceration_range.enable();
        this.maceration_temperature.enable();
        this.maceration_temperature_f.enable();
        this.fermentation_temperature.enable();
        this.fermentation_temperature_f.enable();
        this.fermentation_range.enable();
        this.competitions.controls.forEach((c1: FormGroup) => {
          // console.log(c1.controls);
          // // @ts-ignore
          // if(c1.controls) {
          //   // @ts-ignore
          //   c1.controls.forEach(c2 => {
          //     c2.enable();
          //   })
          // }

          Object.keys(c1.controls).forEach(c2 => {
            c1.controls[c2].enable();
          });
        });
        this.pallet.controls.forEach((c1: FormGroup) => {
          // @ts-ignore
          c1.controls.forEach(c2 => {
            c2.enable();
          })
        });
        this.pressing.controls.forEach((c1: FormGroup) => {
          // @ts-ignore
          c1.controls.forEach(c2 => {
            c2.enable();
          })
        });
        this.bottled_date.enable();
        this.screwcap.enable();
      }




    });






    const getAwardsList = this.service.getAwardsList();
    const getCompetitionsList = this.service.getCompetitionsList();

    const getBarrelTypeList = this.service.getBarrelTypeList();
    const getBarrelSizeList = this.service.getBarrelSizeList();

    const getWrapList = this.service.getWrapList();
    const getPriceList = this.service.getPriceList();
    const getCorkTypeList = this.service.getCorkTypes();


    forkJoin([getAwardsList, getCompetitionsList, getBarrelTypeList, getWrapList, getPriceList, getCorkTypeList, getBarrelSizeList]).subscribe(results => {

      // @ts-ignore
      this.awardList = results[0];
      // @ts-ignore
      this.competitionList = results[1];
      // @ts-ignore
      this.barrelTypeList = results[2];
      // @ts-ignore
      this.barrelSizeList = results[6];
      // @ts-ignore
      this.wrappingList = results[3];
      // @ts-ignore
      this.priceList = results[4];
      // @ts-ignore
      this.corkList = results[5];


      this.activatedroute.data.subscribe(data => {
        if (data.download) {
          this.downloadedData.subscribe(downloadData => {
            Object.keys(this.form.controls).forEach(key => {
              if (this.form.get(key) instanceof FormControl && downloadData.advanced_designed[key]) {
                this.form.get(key).setValue(downloadData.advanced_designed[key]);
              }
            });

            if (downloadData.wrappingDB) {
              const wrappingData = JSON.parse(downloadData.wrappingDB);
              wrappingData.forEach(wrap => {
                this.addWrapping(wrap);
              });
            }
            if (downloadData.palletDB) {
              const palletData = JSON.parse(downloadData.palletDB);
              palletData.forEach(pallet => {
                this.addPallet(pallet);
              });
            }
            if (downloadData.barrelsDB) {
              const barrelData = JSON.parse(downloadData.barrelsDB);
              barrelData.forEach(barrel => {
                this.addBarrelInfo(barrel);
              });
            }
            if (downloadData.pressingDB) {
              const pressingData = JSON.parse(downloadData.pressingDB);
              pressingData.forEach(pressing => {
                this.addPressingInfo(pressing);
              });
            }
            if (downloadData.competitionDB) {
              const competitionData = JSON.parse(downloadData.competitionDB);
              competitionData.forEach(comp => {
                console.log(comp);
                this.addCompetition(comp);
              });
            }

            if (downloadData.qualitiesWine) {
              downloadData.qualitiesWine.forEach(v => {
                this.qualitiesWine.addControl(v.id + '', new FormControl(true));
              });
            }
            if (downloadData.kashrutsWine) {
              downloadData.kashrutsWine.forEach(v => {
                this.kashrutsWine.addControl(v.id + '', new FormControl(true));
              });
            }
            if (downloadData.biodynamicWine) {
              downloadData.biodynamicWine.forEach(v => {
                this.biodynamicWine.addControl(v.id + '', new FormControl(true));
              });
            }
            if (downloadData.organicWine) {
              downloadData.organicWine.forEach(v => {
                this.organicWine.addControl(v.id + '', new FormControl(true));
              });
            }
            if (downloadData.veganWine) {
              downloadData.veganWine.forEach(v => {
                this.veganWine.addControl(v.id + '', new FormControl(true));
              });
            }

// // @ts-ignore
//             if (downloadData.user !== 0 && this.cookieService.get('myId') * 1 !== downloadData.user * 1 || !this.activatedroute.snapshot.data.editable) {
//               this.routeData.editable = false;
//               this.form.disable();
//             }

            this.fermentation_temperature_f.setValue(this.celsiusToFahrenheit(this.fermentation_temperature.value), {emitEvent: false});
            this.maceration_temperature_f.setValue(this.celsiusToFahrenheit(this.maceration_temperature.value), {emitEvent: false});
          });
        } else {
          this.addWrapping(null);
          this.addBarrelInfo(null);
          this.addCompetition(null);
        }
      });
    });

    this.fermentation_temperature_f.valueChanges.subscribe(x => {
      this.fermentation_temperature.setValue(this.fahrenheitToCelsius(x), {emitEvent: false});
    });
    this.fermentation_temperature.valueChanges.subscribe(x => {
      this.fermentation_temperature_f.setValue(this.celsiusToFahrenheit(x), {emitEvent: false});
    });
    this.maceration_temperature_f.valueChanges.subscribe(x => {
      this.maceration_temperature.setValue(this.fahrenheitToCelsius(x), {emitEvent: false});
    });
    this.maceration_temperature.valueChanges.subscribe(x => {
      this.maceration_temperature_f.setValue(this.celsiusToFahrenheit(x), {emitEvent: false});
    });
  }

  celsiusToFahrenheit(cel) {
    if (cel === '' || cel === null) {
      return '';
    }
    return Math.round((32 + cel * 9 / 5) * 10) / 10;
  }
  fahrenheitToCelsius(fah) {
    if (fah === '' || fah === null) {
      return '';
    }
    return Math.round(((fah - 32) * 5 / 9) * 10) / 10;
  }
  ngAfterViewInit(): void {
    this.kashrutsSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(() => {
      this.kashrutPage = 1;
      this.downloadKashrut();
    });

    this.qualitySearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(() => {
      this.qualityPage = 1;
      this.downloadQuality();
    });

    this.biodynamicSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(() => {
      this.biodynamicPage = 1;
      this.downloadBiodynamic();
    });

    this.organicSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(() => {
      this.organicPage = 1;
      this.downloadOrganic();
    });

    this.veganSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(() => {
      this.veganPage = 1;
      this.downloadVegan();
    });

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

  downloadKashrut() {
    this.listService.getKashrutListForWinery({search: this.kashrutsSearch.value, page: this.kashrutPage}).subscribe(data => {
        // @ts-ignore
        this.kashrutSearchList = data.rows;
        // @ts-ignore
        this.kashrutTotal = data.total;
      }
    );
  }
  selectKashrut(kashrut) {
    if (!this.isContain(this.kashrutList, kashrut.id)) {

      this.kashrutsWine.addControl(kashrut.id + '', new FormControl(false));
      this.kashrutList.push(kashrut);

      this.sortingKashrut();
    }
  }
  removeKashrutFromWinery(i) {
    const cntrl = this.kashrutList[i].id + '';
    // @ts-ignore
    this.kashrutList.splice(i, 1);
    this.kashrutsWine.removeControl(cntrl);
    this.sortingKashrut();
  }

  downloadQuality() {
    this.listService.getQualityListForWinery({search: this.qualitySearch.value, page: this.qualityPage}).subscribe(data => {
        // @ts-ignore
        this.qualitySearchList = data.rows;
        // @ts-ignore
        this.qualityTotal = data.total;
      }
    );
  }
  selectQuality(v) {
    if (!this.isContain(this.qualityList, v.id)) {

      this.qualitiesWine.addControl(v.id + '', new FormControl(false));
      this.qualityList.push(v);

      this.sortingQuality();
    }
  }
  removeQualityFromWinery(i) {
    const cntrl = this.qualityList[i].id + '';
    // @ts-ignore
    this.qualityList.splice(i, 1);
    this.qualitiesWine.removeControl(cntrl);
    this.sortingQuality();
  }

  downloadBiodynamic() {
    this.listService.getBiodinamicListForWinery({search: this.biodynamicSearch.value, page: this.biodynamicPage}).subscribe(data => {
        // @ts-ignore
        this.biodynamicSearchList = data.rows;
        // @ts-ignore
        this.biodynamicTotal = data.total;
      }
    );
  }
  selectBiodynamic(v) {
    if (!this.isContain(this.biodynamicList, v.id)) {

      this.biodynamicWine.addControl(v.id + '', new FormControl(false));
      this.biodynamicList.push(v);

      this.sortingBio();
    }
  }
  removeBiodynamicFromWinery(i) {
    const cntrl = this.biodynamicList[i].id + '';
    // @ts-ignore
    this.biodynamicList.splice(i, 1);
    this.biodynamicWine.removeControl(cntrl);
    this.sortingBio();
  }

  downloadOrganic() {
    this.listService.getOrganicListForWinery({search: this.organicSearch.value, page: this.organicPage}).subscribe(data => {
        // @ts-ignore
        this.organicSearchList = data.rows;
        // @ts-ignore
        this.organicTotal = data.total;
      }
    );
  }
  selectOrganic(v) {
    if (!this.isContain(this.organicList, v.id)) {

      this.organicWine.addControl(v.id + '', new FormControl(false));
      this.organicList.push(v);

      this.sortingOrganic();
    }
  }
  removeOrganicFromWinery(i) {
    const cntrl = this.veganList[i].id + '';
    // @ts-ignore
    this.organicList.splice(i, 1);
    this.veganWine.removeControl(cntrl);
    this.sortingOrganic();
  }

  downloadVegan() {
    this.listService.getVeganListForWinery({search: this.veganSearch.value, page: this.veganPage}).subscribe(data => {
        // @ts-ignore
        this.veganSearchList = data.rows;
        // @ts-ignore
        this.veganTotal = data.total;
      }
    );
  }
  selectVegan(v) {
    if (!this.isContain(this.veganList, v.id)) {

      this.veganWine.addControl(v.id + '', new FormControl(false));
      this.veganList.push(v);

      this.sortingVegan();
    }
  }
  removeVeganFromWinery(i) {
    const cntrl = this.veganList[i].id + '';
    // @ts-ignore
    this.veganList.splice(i, 1);
    this.veganWine.removeControl(cntrl);
    this.sortingVegan();
  }

  get kashrutsSearch() {
    return this.form.get('kashrutsSearch');
  }
  get qualitySearch() {
    return this.form.get('qualitySearch');
  }
  get biodynamicSearch() {
    return this.form.get('biodynamicSearch');
  }
  get organicSearch() {
    return this.form.get('organicSearch');
  }
  get veganSearch() {
    return this.form.get('veganSearch');
  }

  getFormBarrelBlank() {
    return new FormGroup({
      stuff: new FormControl('not chosen'),
      month: new FormControl(''),
      type: new FormControl('not chosen'),
      size: new FormControl('not chosen'),
      use: new FormControl('not chosen'),
      percent: new FormControl(''),
      sur_lie: new FormControl(0),
    });
  }
  getFormBarrel(barrel) {
    return new FormGroup({
      stuff: new FormControl(barrel.stuff),
      month: new FormControl(barrel.month),
      type: new FormControl(barrel.type),
      size: new FormControl(barrel.size),
      use: new FormControl(barrel.use),
      percent: new FormControl(barrel.percent),
      sur_lie: new FormControl(barrel.sur_lie),
    });
  }

  addBarrelInfo(barrel) {
    if (this.langService.editable) {
      return;
    }
    if (barrel) {
      (this.barrel_full as FormArray).push(this.getFormBarrel(barrel));
    } else {
      (this.barrel_full as FormArray).push(this.getFormBarrelBlank());
    }
  }
  removeBarrelInfo(barrel) {
    if (this.langService.editable) {
      return;
    }
    (this.barrel_full as FormArray).removeAt(barrel);
  }


  get barrel_full(): FormArray {
    return this.form.get('barrel_full') as FormArray;
  }

  getFormPressingBlank() {
    return new FormGroup({
      type: new FormControl('0'),
      gently: new FormControl(false),
      order: new FormControl('0'),
      percent: new FormControl(''),
    });
  }
  getFormPressing(pressing) {
    return new FormGroup({
      type: new FormControl(pressing.type),
      gently: new FormControl(pressing.gently),
      order: new FormControl(pressing.order),
      percent: new FormControl(pressing.percent),
    });
  }

  addPressingInfo(pressing) {
    if (this.langService.editable) {
      return;
    }
    if (pressing) {
      (this.pressing as FormArray).push(this.getFormPressing(pressing));
    } else {
      (this.pressing as FormArray).push(this.getFormPressingBlank());
    }
  }
  removePressingInfo(pressing) {
    if (this.langService.editable) {
      return;
    }
    (this.pressing as FormArray).removeAt(pressing);
  }


  get pressing(): FormArray {
    return this.form.get('pressing') as FormArray;
  }


  get filtration() {
    return this.form.get('filtration');
  }
  get destemming() {
    return this.form.get('destemming');
  }
  get sorting() {
    return this.form.get('sorting');
  }
  get crushing() {
    return this.form.get('crushing');
  }
  get transfer() {
    return this.form.get('transfer');
  }
  get maceration_carbonic() {
    return this.form.get('maceration_carbonic');
  }
  get fermentation_open_top() {
    return this.form.get('fermentation_open_top');
  }
  get fermentation_tank() {
    return this.form.get('fermentation_tank');
  }
  get fermentation_yeast() {
    return this.form.get('fermentation_yeast');
  }
  get malolactic_partial() {
    return this.form.get('malolactic_partial');
  }
  get fining() {
    return this.form.get('fining');
  }
  get total_dry_extract() {
    return this.form.get('total_dry_extract');
  }


  get malolactic_fermentation() {
    return this.form.get('malolactic_fermentation');
  }
  get batonnage() {
    return this.form.get('batonnage');
  }
  addCompetition(comp) {
    if (this.langService.editable) {
      return;
    }

    if (comp) {
      this.competitions.push(this.fullCompetitionsGroup(comp));
    } else {
      this.competitions.push(this.newCompetitionsGroup());
    }
  }
  removeCompetition(i) {
    if (this.langService.editable) {
      return;
    }
    this.competitions.removeAt(i);
  }
  get competitions(): FormArray {
    return this.form.get('competitions') as FormArray;
  }

  fullCompetitionsGroup(comp) {
    return new FormGroup({
      is_confirmed: new FormControl(comp.is_confirmed),
      competition: new FormControl(comp.competition),
      year: new FormControl(comp.year),
      award: new FormControl(comp.award),
      event: new FormControl(comp.event)
    });
  }
  newCompetitionsGroup() {
    return new FormGroup({
      is_confirmed: new FormControl(''),
      competition: new FormControl(0),
      year: new FormControl(''),
      award: new FormControl(0),
      event: new FormControl(0)
    });
  }

  relevantAwards(i) {
    return this.awardList.filter(award => {
      if (this.competitionId(i) != 0 && (award.competition === 0 || award.competition == this.competitionId(i))) {
        return true;
      }
      return false;
    });
  }

  competitionId(i) {
    return this.competitions.at(i).value.competition;
  }


  addWrapping(wrap) {
    if (this.langService.editable) {
      return;
    }
    if (wrap) {
      this.wrappings.push(this.newWrappingGroup(wrap));
    } else {
      this.wrappings.push(this.newBlancWrappingGroup());
    }
  }
  removeWrapping(i) {
    if (this.langService.editable) {
      return;
    }
    this.wrappings.removeAt(i);
  }
  get wrappings(): FormArray {
    return this.form.get('wrappings') as FormArray;
  }

  newBlancWrappingGroup() {
    return new FormGroup({
      type: new FormControl('Glass bottle'),
      material: new FormControl(''),
      position: new FormControl(''),
      barcode_box: new FormControl(''),
      weight: new FormControl(''),
      lengths: new FormControl(''),

      size: new FormControl(6),
      total_bottles: new FormControl(''),
      count_in_pack: new FormControl(''),
      barcode_bottles: new FormControl(''),
      priceLevel: new FormControl('0'),
      wine_on_tap: new FormControl(false),
      paper: new FormControl(false),
    });
  }
  newWrappingGroup(wrap) {
    // console.log(wrap.size);
    return new FormGroup({
      type: new FormControl(wrap.type),
      material: new FormControl(wrap.material),
      position: new FormControl(wrap.position),
      barcode_box: new FormControl(wrap.barcode_box),
      weight: new FormControl(wrap.weight),
      lengths: new FormControl(wrap.lengths),

      size: new FormControl(wrap.size),
      total_bottles: new FormControl(wrap.total_bottles),
      count_in_pack: new FormControl(wrap.count_in_pack),
      barcode_bottles: new FormControl(wrap.barcode_bottles),
      priceLevel: new FormControl(wrap.priceLevel),
      wine_on_tap: new FormControl(wrap.wine_on_tap),
      paper: new FormControl(wrap.paper),
    });
  }


  addPallet(wrap) {
    if (this.langService.editable) {
      return;
    }
    if (wrap) {
      this.pallet.push(this.newPalletGroup(wrap));
    } else {
      this.pallet.push(this.newBlancPalletGroup());
    }
  }
  removePallet(i) {
    if (this.langService.editable) {
      return;
    }
    this.pallet.removeAt(i);
  }
  get pallet(): FormArray {
    return this.form.get('pallet') as FormArray;
  }

  newBlancPalletGroup() {
    return new FormGroup({
      total_bottles: new FormControl(''),
      total_boxes: new FormControl(''),
      barcode: new FormControl(''),
      weight: new FormControl(''),
      lengths: new FormControl(''),
    });
  }
  newPalletGroup(pallet) {
    return new FormGroup({
      total_bottles: new FormControl(pallet.total_bottles),
      total_boxes: new FormControl(pallet.total_boxes),
      barcode: new FormControl(pallet.barcode),
      weight: new FormControl(pallet.weight),
      lengths: new FormControl(pallet.lengths),

    });
  }
  // get nightHarvest() {
  //   return this.form.get('nightHarvest');
  // }
  get nonfiltered() {
    return this.form.get('nonfiltered');
  }
  get lightfiltered() {
    return this.form.get('lightfiltered');
  }
  get sulfurDioxide() {
    return this.form.get('sulfurDioxide');
  }
  // get handPicked() {
  //   return this.form.get('handPicked');
  // }
  get passover() {
    return this.form.get('passover');
  }
  get mevushal() {
    return this.form.get('mevushal');
  }
  get screwcap() {
    return this.form.get('screwcap');
  }


  reloadSertifications (winery) {

    console.log(winery);

    this.kashrutList = winery.kashruts;
    this.kashrutList.forEach(v => {
      if (!this.kashrutsWine.value[v.id + '']) {
        this.kashrutsWine.addControl(v.id + '', new FormControl(false));
      }
    });
    this.qualityList = winery.qualities;
    this.qualityList.forEach(v => {
      if (!this.qualitiesWine.value[v.id + '']) {
        this.qualitiesWine.addControl(v.id + '', new FormControl(false));
      }
    });
    this.biodynamicList = winery.biodynamics;
    this.biodynamicList.forEach(v => {
      if (!this.biodynamicWine.value[v.id + '']) {
        this.biodynamicWine.addControl(v.id + '', new FormControl(false));
      }
    });
    this.organicList = winery.organics;
    this.organicList.forEach(v => {
      if (!this.organicWine.value[v.id + '']) {
        this.organicWine.addControl(v.id + '', new FormControl(false));
      }
    });
    this.veganList = winery.vegans;
    this.veganList.forEach(v => {
      if (!this.veganWine.value[v.id + '']) {
        this.veganWine.addControl(v.id + '', new FormControl(false));
      }
    });


    this.sortingKashrut();
    this.sortingQuality();
    this.sortingBio();
    this.sortingOrganic();
    this.sortingVegan();
  }
  get kashrutsWine(): FormGroup {
    return this.form.get('kashrutsWine') as FormGroup;
  }
  get qualitiesWine(): FormGroup {
    return this.form.get('qualitiesWine') as FormGroup;
  }
  get biodynamicWine(): FormGroup {
    return this.form.get('biodynamicWine') as FormGroup;
  }
  get organicWine(): FormGroup {
    return this.form.get('organicWine') as FormGroup;
  }
  get veganWine(): FormGroup {
    return this.form.get('veganWine') as FormGroup;
  }
  get kashrut(): FormControl {
    return this.form.get('kashrut') as FormControl;
  }
  get kosherPesah(): FormControl {
    return this.form.get('kosherPesah') as FormControl;
  }
  get quality(): FormControl {
    return this.form.get('quality') as FormControl;
  }
  get biodynamic(): FormControl {
    return this.form.get('biodynamic') as FormControl;
  }
  get organic(): FormControl {
    return this.form.get('organic') as FormControl;
  }
  get vegan(): FormControl {
    return this.form.get('vegan') as FormControl;
  }

  getQualitiesWine() {
    console.log(this.qualitiesWine.value);

    const res = [];

    this.qualityList.forEach(v => {
      if (this.qualitiesWine.get(v.id + '').value) {
        res.push(v.id);
      }
    });
    return JSON.stringify(res);
  }

  getKashrutsWine() {

    const res = [];

    this.kashrutList.forEach(v => {
      if (this.kashrutsWine.get(v.id + '').value) {
        res.push(v.id);
      }
    });
    return JSON.stringify(res);
  }
  getBiodynamicWine() {

    const res = [];

    this.biodynamicList.forEach(v => {
      if (this.biodynamicWine.get(v.id + '').value) {
        res.push(v.id);
      }
    });
    return JSON.stringify(res);
  }
  getOrganicWine() {

    const res = [];

    this.organicList.forEach(v => {
      if (this.organicWine.get(v.id + '').value) {
        res.push(v.id);
      }
    });
    return JSON.stringify(res);
  }
  getVeganWine() {

    const res = [];

    this.veganList.forEach(v => {
      if (this.veganWine.get(v.id + '').value) {
        res.push(v.id);
      }
    });
    return JSON.stringify(res);
  }

  setKashrutsPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.kashrutPage = page;
    this.downloadKashrut();
    return page;
  }
  setQualitiesPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.qualityPage = page;
    this.downloadQuality();
    return page;
  }
  setBiodynamicPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.biodynamicPage = page;
    this.downloadBiodynamic();
    return page;
  }
  setOrganicPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.organicPage = page;
    this.downloadOrganic();
    return page;
  }
  setVeganPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.veganPage = page;
    this.downloadVegan();
    return page;
  }

  get maceration_type() {
    return this.form.get('maceration_type');
  }
  get maceration_temperature_f() {
    return this.form.get('maceration_temperature_f');
  }
  get maceration_temperature() {
    return this.form.get('maceration_temperature');
  }
  get maceration_range() {
    return this.form.get('maceration_range');
  }
  get bottled_date() {
    return this.form.get('bottled_date');
  }

  get maceration_is_fahrenheit() {
    return this.form.get('maceration_is_fahrenheit');
  }
  get fermentation_temperature_f() {
    return this.form.get('fermentation_temperature_f');
  }
  get fermentation_range() {
    return this.form.get('fermentation_range');
  }
  get fermentation_temperature() {
    return this.form.get('fermentation_temperature');
  }
  get fermentation_is_fahrenheit() {
    return this.form.get('fermentation_is_fahrenheit');
  }
  get fermentation_type() {
    return this.form.get('fermentation_type');
  }
  get malolactic_fermentation_type() {
    return this.form.get('malolactic_fermentation_type');
  }
  get barrel_aged() {
    return this.form.get('barrel_aged');
  }
  get bottled_by() {
    return this.form.get('bottled_by');
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }
  avaliableBarrelTypes(i) {
    // console.log(this.barrel_full.at(i));
    return this.barrelTypeList.filter(x => {
      return x.tank && x.tank == this.barrel_full.at(i).get('stuff').value;
    })
  }

  avaliableBarrelSizes(i) {
    return this.barrelSizeList.filter(x => {
      return x.tank && x.tank == this.barrel_full.at(i).get('stuff').value;
    })
  }


  openAwardSelect(i): void {
    if (this.langService.editable) {
      return;
    }

    const data = {
      form: this.competitions.at(i),
      options: {
        hasCompetitionOption: true,
        hasAwardOption: true
      }
    };

    const dialogRef = this.dialog.open(CompetitionSelectComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      // this.userId.setValue(result);

    });
  }
  getImage(cork) {
    return environment.corkImageStore + `${cork.id + '_' + cork.image}.png`;
  }




  getKashrutName(kashrut) {

    if(this.langService.isSameLanguage('hebrew') && kashrut.national) {
      return kashrut.national;
    } else {
      return kashrut.international;
    }
  }
  sortingKashrut() {

    this.kashrutList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getKashrutName(a);
      const secondTextInCurrentLanguage = this.getKashrutName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  getQualityName(quality) {

    return this.langService.getTextFromEverySource('quality_names', '', quality.id, quality.name);

  }
  sortingQuality() {

    this.qualityList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getQualityName(a);
      const secondTextInCurrentLanguage = this.getQualityName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  getBiodynamicName(biodynamic) {

    return this.langService.getTextFromEverySource('biodynamic_names', '', biodynamic.id, biodynamic.name);

  }
  sortingBio() {

    this.biodynamicList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getBiodynamicName(a);
      const secondTextInCurrentLanguage = this.getBiodynamicName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  getOrganicName(organic) {

    return this.langService.getTextFromEverySource('organic_names', '', organic.id, organic.name);

  }
  sortingOrganic() {

    this.organicList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getOrganicName(a);
      const secondTextInCurrentLanguage = this.getOrganicName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  getVeganName(vegan) {

    return this.langService.getTextFromEverySource('vegan_names', '', vegan.id, vegan.name);

  }
  sortingVegan() {

    this.veganList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getVeganName(a);
      const secondTextInCurrentLanguage = this.getVeganName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }
}


export const finingArr = [
  {id: 0, name: 'Decanting'},
  {id: 0, name: 'Cold'},
  {id: 0, name: 'Egg whites'},
  {id: 0, name: 'Blood'},
  {id: 0, name: 'Bones'},
  {id: 0, name: 'Milk'},
  {id: 0, name: 'Isinglass'},
  {id: 0, name: 'Irish moss'},
  {id: 0, name: 'Bentonite'},
  {id: 0, name: 'Gelatin'},
  {id: 0, name: 'Casein'},
  {id: 0, name: 'Carrageenan'},
  {id: 0, name: 'Alginate'},
  {id: 0, name: 'Diatomaceous earth'},
  {id: 0, name: 'Pectinase'},
  {id: 0, name: 'Pectolyase'},
  {id: 0, name: 'PVPP'},
  {id: 0, name: 'Kieselsol (colloidal silica)'},
  {id: 0, name: 'Copper sulfate'},
  {id: 0, name: 'Dried albumen'},
  {id: 0, name: 'Hydrated yeast'},
  {id: 0, name: 'Activated carbon'},
  {id: 0, name: 'Chitosan'},
];

export const filtrationArr = [
  {id: 0, name: 'Earth Filtration (DE)'},
  {id: 0, name: 'Pad Filtration'},
  {id: 0, name: 'Membrane Filtration'},
  {id: 0, name: 'Cross-Flow Filtration'},
  {id: 0, name: 'Ultra-Filtration'},
  {id: 0, name: 'Ceramic Membrane Crossflow'},
  {id: 0, name: 'Microfiltration'},
  {id: 0, name: 'Reverse osmosis'},
  {id: 0, name: 'Centrifuge'},
];


export const wrappingTypeList = [
  {id: 'Glass bottle', text: 'Glass bottle'},
  {id: 'Can', text: 'Can'},
  {id: 'Ceramic bottle', text: 'Ceramic bottle'},
  {id: 'Ceramic jar', text: 'Ceramic jar'},
  {id: 'Pouche', text: 'Pouche'},
  {id: 'Tetra Pak', text: 'Tetra Pak'},
  {id: 'Plastic bottle', text: 'Plastic bottle'},
  {id: 'Bag-in-box - BIB', text: 'Bag-in-box - BIB'},
  {id: 'Wine barrel', text: 'Wine barrel'},
  {id: 'Wine on tap', text: 'Wine on tap'},
];

export const boxMaterialList = [
  {id: 'Cardboard', text: 'Cardboard'},
  {id: 'Wood', text: 'Wood'},
  {id: 'Paper', text: 'Paper'},
  {id: 'Plastic', text: 'Plastic'},
];

export const boxPositionList = [
  {id: 'Vertical', text: 'Vertical'},
  {id: 'Horizontal', text: 'Horizontal'},
];
