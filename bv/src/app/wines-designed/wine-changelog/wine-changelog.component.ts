import {Component, OnInit} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {
  ChangelogData,
  ChangelogFullData,
  Difference
} from '@src/app/wineries-designed/winery-changelog/winery-changelog.component';
import {FormControl, FormGroup} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@src/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {of} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-wine-changelog',
  templateUrl: './wine-changelog.component.html',
  styleUrls: ['./wine-changelog.component.css']
})
export class WineChangelogComponent implements OnInit {

  date = new FormControl();
  idDifference = 0;

  address = {
    type: null,
    id: null
  };

  fictions = [];
  actualVersion;

  structure: InputData[][] = [];
  form = new FormGroup({


  });
  valueNamesConvertorToBackend = {};

  valueNamesConvertor = {

    serving_designed: {
      from: {name: 'from', type: 'text'},
      to: {name: 'to', type: 'text'},
      needDecanter: {name: 'Need decanter', type: 'boolean'},
      servingTemperature: {name: 'Serving temperature', type: 'text'},
      glass: {name: 'Glass', type: 'text'},
      drinkingTime: {name: 'Drinking time', type: 'text'},
    },
    advanced_designed: {
      maceration_range: {name: 'Maceration range', type: 'boolean'},
      maceration_temperature: {name: 'Maceration temperature', type: 'text'},
      maceration_type: {name: 'Maceration type', type: 'boolean'},
      fermentation_type: {name: 'Fermentation type', type: 'boolean'},
      fermentation_temperature: {name: 'Fermentation temperature', type: 'text'},
      fermentation_range: {name: 'Fermentation range', type: 'boolean'},
      kashrut: {name: 'Kashrut', type: 'boolean'},
      quality: {name: 'Quality', type: 'boolean'},
      organic: {name: 'Organic', type: 'boolean'},
      vegan: {name: 'Vegan', type: 'boolean'},
      biodynamic: {name: 'Biodynamic', type: 'boolean'},
      bottled_by: {name: 'Bottled', type: 'text'},
      bottled_date: {name: 'Bottled date', type: 'text'},
      ph: {name: 'pH', type: 'text'},
      volatile_acidity: {name: 'Volatile acidity', type: 'text'},
      sugar: {name: 'Sugar', type: 'text'},
      energy: {name: 'Energy', type: 'text'},
      priceLevel: {name: 'Price level', type: 'text'},
      nonfiltered: {name: 'Nonfiltered', type: 'boolean'},
      lightfiltered: {name: 'Lightfiltered', type: 'boolean'},
      sulfurDioxide: {name: 'Sulfur dioxide', type: 'boolean'},
      malolactic_fermentation_type: {name: 'Malolactic fermentation type', type: 'boolean'},
      malolactic_fermentation: {name: 'Malolactic fermentation', type: 'boolean'},
      batonnage: {name: 'Batonnage', type: 'boolean'},
      screwcap: {name: 'Screwcap', type: 'text'},
      passover: {name: 'Passover', type: 'boolean'},
      mevushal: {name: 'Mevushal', type: 'boolean'},
      kosherPesah: {name: 'Kosher pesah', type: 'boolean'},
      barrel_aged: {name: 'Barrel aged', type: 'boolean'},
      maceration_is_fahrenheit: {name: 'Deleted', type: 'none'},
      fermentation_is_fahrenheit: {name: 'Deleted', type: 'none'},
      destemming: {name: 'Destemming', type: 'text'},
      sorting: {name: 'Sorting', type: 'boolean'},
      sorting_optic: {name: 'Sorting optic', type: 'boolean'},
      sorting_manual: {name: 'Sorting manual', type: 'boolean'},
      crushing: {name: 'Crushing', type: 'text'},
      transfer: {name: 'Transfer', type: 'boolean'},
      maceration_carbonic: {name: 'Maceration carbonic', type: 'boolean'},
      fermentation_tank: {name: 'Fermentation tank', type: 'text'},
      fermentation_open_top: {name: 'Fermentation open top', type: 'text'},
      fermentation_yeast: {name: 'Fermentation yeast', type: 'text'},
      malolactic_partial: {name: 'Malolactic partial', type: 'boolean'},
      fining: {name: 'Fining', type: 'text'},
      total_dry_extract: {name: 'Total dry extract', type: 'text'},
      filtration: {name: 'Filtration', type: 'text'},

    },
    basic_designed: {
      name_national: {name: 'Name', type: 'text'},
      name_international: {name: 'Name international', type: 'text'},
      year: {name: 'Year', type: 'text'},
      alc_percent: {name: 'Alcohol', type: 'text'},
      barrel_aged: {name: 'barrel aged', type: 'boolean'},
      barrel_aged_range: {name: 'Deleted', type: 'boolean'},
      color: {name: 'Color', type: 'text'},
      type: {name: 'Type', type: 'text'},
      still: {name: 'Still', type: 'text'},
      sparkling: {name: 'Sparkling', type: 'text'},
      sweetness: {name: 'Sweetness', type: 'text'},
      method: {name: 'Method', type: 'text'},
      nongrape: {name: 'Nongrape', type: 'text'},
      description: {name: 'Description', type: 'text'},
      description_int: {name: 'Description int', type: 'text'},
      fitToCollection: {name: 'Fit to collection', type: 'boolean'},
      language: {name: 'Language', type: 'text'},
      grand_type: {name: 'Type', type: 'text'},
      gas: {name: 'gas', type: 'text'},
      champagne_sweetness: {name: 'Champagne sweetness', type: 'text'},
      special: {name: 'Special type', type: 'text'},
      series: {name: 'Series', type: 'text'},
      series_int: {name: 'Series in english', type: 'text'},
      maker_national: {name: 'Winemaker', type: 'text'},
      maker_international: {name: 'Winemaker in english', type: 'text'},
      consultant_national: {name: 'Consultant', type: 'text'},
      consultant_international: {name: 'Consultant in english', type: 'text'},

    },

    deleted: {name: 'Deleted', type: 'boolean'},
    image: {name: 'Image', type: 'image'},
    grapelistDB: {name: 'Grapelist', type: 'list'},
    barrelsDB: {name: 'Barrel', type: 'list'},
    autodescription: {name: 'Autodescription', type: 'list'},
    qualitiesWine: {name: 'Quality', type: 'list'},
    kashrutsWine: {name: 'Kashrut', type: 'list'},
    biodynamicWine: {name: 'Biodynamic', type: 'list'},
    organicWine: {name: 'Organic', type: 'list'},
    veganWine: {name: 'Vegan', type: 'list'},
    menu: {name: 'Menu', type: 'list'},
    user: {name: 'User', type: 'none'},
    qualities: {name: 'Quality', type: 'list'},
    kashruts: {name: 'Kashrut', type: 'list'},
    biodynamics: {name: 'Biodynamic', type: 'list'},
    organics: {name: 'Organic', type: 'list'},
    vegans: {name: 'Vegan', type: 'list'},
    pressingDB: {name: 'Pressing', type: 'list'},
    wrappingDB: {name: 'Wrapping', type: 'list'},
    palletDB: {name: 'Pallet', type: 'list'},
    competitionDB: {name: 'Deleted', type: 'none'},
    wineryinfo: {name: 'Deleted', type: 'none'},
    dumpgrape: {name: 'Grapes', type: 'list'},
    profPointsDB: {name: 'Deleted', type: 'none'},
    additionalGrapes: {name: 'Grapes', type: 'list'},
    additionalVineyards: {name: 'Vineyrds', type: 'list'}
  };


  changeList: ChangelogData[] = [];
  original = null;
  differenceList: Difference[] = [];

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public dialog: MatDialog,
              private accountService: AccountServiceService,
              public overlay: Overlay,
              private titleService: Title,
              private additionalService: AdditionalServiceService
  ) { }

  ngOnInit(): void {

    let title = 'Wine changelog - bonvino.com';
    this.titleService.setTitle(title);

    // const req = {business_type: 'winery'};
    //
    // this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {
    //   this.additionalService.transformAdditional(data, this.structure, this.form);
    //   console.log(this.structure);
    //
    //   this.structure.forEach(block => {
    //     block.forEach(row => {
    //       // {name: 'Language', type: 'text'},
    //       if(row.input_type == 7) {
    //
    //         this.valueNamesConvertor.additional[row.controlName] =
    //           {
    //             name: row.block_name + ', ' + row.title_name,
    //             type: 'multiselect',
    //             select_options: row.select_options
    //           };
    //       } else {
    //
    //         this.valueNamesConvertor.additional[row.controlName] =
    //           {
    //             name: row.block_name + ', ' + row.title_name,
    //             type: 'text'
    //           };
    //       }
    //       this.valueNamesConvertor.menu[row.block_name] =
    //         {
    //           name: row.block_name,
    //           type: 'boolean'
    //         };
    //     })
    //   })
    // });

    if (this.activatedroute.snapshot.params.id) {
      this.address.id = this.activatedroute.snapshot.params.id;
    }

    this.service.getWineChangelog({id: this.address.id}).subscribe( (data: ChangelogFullData) => {
      data.history.forEach((h: ChangelogData) => {
        h.datetime = new Date(h.timestamp * 1000);
      });
      this.changeList = data.history;
      this.original = data.current;
    });
  }
  reverse() {

  }
  deleteDifference(j) {
    this.differenceList.splice(j, 1);
  }
  editDifference() {
    // console.log(this.differenceList);
    console.log(this.date.value);

    const saveData = {
      commoninfo: {},
      additional: {},
      menu: {},
    };
    this.differenceList.forEach((diff: Difference) => {
      if(diff.part == 'menu' || diff.part == 'additional' || diff.part == 'commoninfo'){
// @ts-ignore
        saveData[diff.part][diff.title] = diff.before;
      } else if (diff.title == 'grapesFull') {
// @ts-ignore
        saveData.grapeSynonims = JSON.stringify(diff.before.grapeSynonims);
// @ts-ignore
        saveData.grapelist = JSON.stringify(diff.before.grapelist);
// @ts-ignore
        saveData.grapesFull = diff.before.grapesFull;
      } else if(diff.title == 'visittime') {
// @ts-ignore
        saveData[diff.title] = JSON.stringify(diff.before);
      } else {
// @ts-ignore
        saveData[diff.title] = diff.before;
      }
    });
    const data = {
      id: this.idDifference,
      difference: JSON.stringify(saveData),
      timestamp: new Date(this.date.value).getTime() / 1000
    };
    this.service.editWineryHistory(data).subscribe();
  }
  deleteHistory() {
    const data = {
      id: this.idDifference
    };
    this.service.deleteWineryHistory(data).subscribe(() => {

      this.fictions.length = 0;
    });
  }
  showDifference(change: ChangelogData) {
    this.date.setValue(new Date(change.timestamp * 1000).toISOString().split('T')[0]);
    const beforeVersion = change.difference;
    const afterVersion = this.createAfter(change.timestamp);
    this.actualVersion = of(this.createActual(change.timestamp));

    this.fictions.length = 0;
    this.fictions.push({});

    this.idDifference = change.id;

    const arrDifferences: Difference[] = [];

    Object.keys(beforeVersion).forEach(key => {

      if(key == 'geolocation' || key == 'instruction' || key == 'advanced' || key == 'description' || key == 'commoninfo') {

      } else if(key == 'basic_designed' || key == 'advanced_designed' || key == 'serving_designed') {

        Object.keys(beforeVersion[key]).forEach(keyInner => {
          arrDifferences.push({
            part: key,
            title: keyInner,
            before: beforeVersion[key][keyInner],
            after: afterVersion[key][keyInner],
          });
        });
      } else if (key == 'image') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = environment.wineImageStore + `${this.address.id + '_' + beforeVersion[key]}.png`;
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = environment.wineImageStore + `${this.address.id + '_' + afterVersion[key]}.png`;
        } else {
          after = null;
        }
        arrDifferences.push({
          part: '',
          title: key,
          before,
          after,
        });
      } else {
        arrDifferences.push({
          part: '',
          title: key,
          before: beforeVersion[key],
          after: afterVersion[key],
        });
      }
    });

    // console.log(arrDifferences);
    this.differenceList = arrDifferences;
  }
  getDifferenceName(difference: Difference) {
    // console.log(difference);
    if(difference.part == '') {
      return this.valueNamesConvertor[difference.title].name;
    } else {
      return this.valueNamesConvertor[difference.part][difference.title].name;
    }
  }
  getDifferencePointName(difference, i) {
    return this.valueNamesConvertor[difference.part][difference.title].select_options[i].id;
  }
  getDifferenceType(difference: Difference) {
    if(difference.part == '') {
      return this.valueNamesConvertor[difference.title].type;
    } else {
      return this.valueNamesConvertor[difference.part][difference.title].type;
    }
  }

  getIcon(value) {
    return value ? 'icn-done' : 'icn-close-bonvine';
  }
  createVersion(timestamp, func) {

    const res = JSON.parse(JSON.stringify(this.original));

    // console.log(res);
    this.changeList.slice().reverse().forEach(change => {
      if(func(timestamp, change.timestamp)) {

        Object.keys(change.difference).forEach(key => {

          if(key == 'serving_designed' || key == 'advanced_designed' || key == 'basic_designed') {

            Object.keys(change.difference[key]).forEach(keyInner => {
              res[key][keyInner] = change.difference[key][keyInner];
            });

          } else {
            res[key] = change.difference[key];
          }
        });
      }
    });
    // console.log(res);
    return res;
  }
  createActual(timestamp) {

    return this.createVersion(timestamp, ((t, d) => t <= d));
  }
  createAfter(timestamp,) {

    return this.createVersion(timestamp, ((t, d) => t < d));
  }

  getImage(image) {
    return image;
  }


  getDateColor(change) {
    if (this.idDifference == change.id) {
      return 'wine-color';
    } else {
      return '';
    }
  }
}
