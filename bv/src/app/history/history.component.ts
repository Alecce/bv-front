import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {MatDialog} from '@angular/material/dialog';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {FormControl, FormGroup} from '@angular/forms';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {environment} from '@src/environments/environment';
import {of} from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

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

    commoninfo: {
      country: {name: 'Country', type: 'text'},
      regionsForm: {name: 'Regions', type: 'text'},
      name_national: {name: 'Winery name', type: 'text'},
      name_international: {name: 'Winery name in english', type: 'text'},
      address: {name: 'Address', type: 'text'},
      zip: {name: 'zip', type: 'text'},
      phone: {name: 'Phone', type: 'text'},
      mobile: {name: 'Mobile', type: 'text'},
      fax: {name: 'Fax', type: 'text'},
      email: {name: 'Mail', type: 'text'},
      web: {name: 'Web', type: 'text'},
      owner: {name: 'Owner', type: 'text'},
      establish_year: {name: 'When was it established', type: 'text'},
      winemaker_international: {name: 'Head winemaker in english', type: 'text'},
      winemaker_national: {name: 'Head winemaker', type: 'text'},
      lat: {name: 'Geolocation', type: 'text'},
      lng: {name: 'Geolocation', type: 'text'},
      performance: {name: 'Performance', type: 'text'},
      isKashrut: {name: 'Is kashrut', type: 'boolean'},
      isQuality: {name: 'Is quality', type: 'boolean'},
      isBiodynamic: {name: 'Is biodynamic', type: 'boolean'},
      isOrganic: {name: 'Is organic', type: 'boolean'},
      isVegan: {name: 'Is vegan', type: 'boolean'},
      language: {name: 'Language', type: 'text'},
    },

    deleted: {name: 'Deleted', type: 'boolean'},
    image: {name: 'Image', type: 'image'},
    emblem: {name: 'Emblem', type: 'image'},
    user: {name: 'User', type: 'text'},
    countryName: {name: 'Country', type: 'text'},
    visittime: {name: 'Visiting hours', type: 'visittime'},
    grapelist: {name: 'Grapes', type: 'none'},
    grapesFull: {name: 'Grapes', type: 'grapes'},
    grapeSynonims: {name: 'Grapes', type: 'none'},
    vineyardsFull: {name: 'Vineyards', type: 'list'},
    kashruts: {name: 'Kashrut', type: 'kashruts'},
    qualities: {name: 'Quality', type: 'list'},
    biodynamics: {name: 'Biodynamics', type: 'list'},
    organics: {name: 'Organic', type: 'list'},
    vegans: {name: 'Vegan', type: 'list'},
    country_id: {name: 'Country', type: 'text'},
    region1: {name: 'Region level 1', type: 'text'},
    region2: {name: 'Region level 2', type: 'text'},
    region3: {name: 'Region level 3', type: 'text'},
    region4: {name: 'Region level 4', type: 'text'},
    region5: {name: 'Region level 5', type: 'text'},
    region6: {name: 'Region level 6', type: 'text'},
    winery_name: {name: 'Winery name', type: 'text'},
    international_name: {name: 'Winery name in english', type: 'text'},
    address: {name: 'Address', type: 'text'},
    zip: {name: 'zip', type: 'text'},
    phone: {name: 'Phone', type: 'text'},
    mobile: {name: 'Mobile', type: 'text'},
    fax: {name: 'Fax', type: 'text'},
    mail: {name: 'Mail', type: 'text'},
    web: {name: 'Web', type: 'text'},
    owner: {name: 'Owner', type: 'text'},
    establishyear: {name: 'When was it established', type: 'text'},
    headwinemaker: {name: 'Head winemaker in english', type: 'text'},
    neutralheadwinemaker: {name: 'Head winemaker', type: 'text'},
    latitude: {name: 'Geolocation', type: 'text'},
    longtitude: {name: 'Geolocation', type: 'text'},
    grapes: {name: 'Grapes', type: 'text'},
    grapessinonims: {name: 'Grapes', type: 'text'},
    vineyards: {name: 'Vineyards', type: 'vineyard'},
    performance: {name: 'Performance', type: 'text'},
    iskashrut: {name: 'Is kashrut', type: 'boolean'},
    isquality: {name: 'Is quality', type: 'boolean'},
    isbiodynamic: {name: 'Is biodynamic', type: 'boolean'},
    isorganic: {name: 'Is organic', type: 'boolean'},
    isvegan: {name: 'Is vegan', type: 'boolean'},
    kashrut: {name: 'Kashrut', type: 'text'},
    quality: {name: 'Quality', type: 'text'},
    biodynamic: {name: 'Biodynamics', type: 'text'},
    organic: {name: 'Organic', type: 'text'},
    vegan: {name: 'Vegan', type: 'text'},
    language: {name: 'Language', type: 'text'},
    menu: {

    },
    additional: {

    },
  };


  changeList: HistoryData[] = [];
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
              private additionalService: AdditionalServiceService
  ) { }

  ngOnInit(): void {

    const req = {business_type: 'winery'};

    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {
      this.additionalService.transformAdditional(data, this.structure, this.form);
      console.log(this.structure);

      this.structure.forEach(block => {
        block.forEach(row => {
          // {name: 'Language', type: 'text'},
          if(row.input_type == 7) {

            this.valueNamesConvertor.additional[row.controlName] =
              {
                name: row.block_name + ', ' + row.title_name,
                type: 'multiselect',
                select_options: row.select_options
              };
          } else {

            this.valueNamesConvertor.additional[row.controlName] =
              {
                name: row.block_name + ', ' + row.title_name,
                type: 'text'
              };
          }
          this.valueNamesConvertor.menu[row.block_name] =
            {
              name: row.block_name,
              type: 'boolean'
            };
        })
      })
    });

    if (this.activatedroute.snapshot.params.id && this.activatedroute.snapshot.params.type) {
      this.address.id = this.activatedroute.snapshot.params.id;
      this.address.type = this.activatedroute.snapshot.params.type;
    }

    if(this.address.type == 'winery') {
      this.service.getWineryChangelog({id: this.address.id}).subscribe( (data: HistoryFullData) => {
        data.history.forEach((h: HistoryData) => {
          h.datetime = new Date(h.timestamp * 1000);
        });
        this.changeList = data.history;
        this.original = data.current;
      });
    }
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
  showDifference(change: HistoryData) {
    this.date.setValue(new Date(change.timestamp * 1000).toISOString().split('T')[0]);
    const beforeVersion = change.difference;
    const afterVersion = this.createAfter(change.timestamp);
    this.actualVersion = of(this.createActual(change.timestamp));

    this.fictions.length = 0;
    this.fictions.push({});

    this.idDifference = change.id;

    const arrDifferences: Difference[] = [];

    Object.keys(beforeVersion).forEach(key => {

      if(key == 'commoninfo') {

        Object.keys(beforeVersion.commoninfo).forEach(keyInner => {
          arrDifferences.push({
            part: key,
            title: keyInner,
            before: beforeVersion[key][keyInner],
            after: afterVersion[key][keyInner],
          });
        });
      } else if (key == 'menu' || key == 'additional') {
        const parsed = JSON.parse(afterVersion[key]);

        Object.keys(change.difference[key]).forEach(keyInner => {

          arrDifferences.push({
            part: key,
            title: keyInner,
            before: beforeVersion[key][keyInner],
            after: parsed[keyInner],
          });
        });


      } else if (key == 'grapelist' || key == 'grapesFull' || key == 'grapeSynonims') {

        // actually triggering for 'grapesFull' only

        if(key == 'grapesFull') {
          const beforeData: GrapeData = {
            grapelist: JSON.parse(beforeVersion.grapelist),
            grapesFull: beforeVersion.grapesFull,
            grapeSynonims: JSON.parse(beforeVersion.grapeSynonims),
          };

          const afterData: GrapeData = {
            grapelist: JSON.parse(afterVersion.grapelist),
            grapesFull: afterVersion.grapesFull,
            grapeSynonims: JSON.parse(afterVersion.grapeSynonims),
          };

          arrDifferences.push({
            part: '',
            title: key,
            before: beforeData,
            after: afterData,
          });
        }
      } else if (key == 'visittime') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = JSON.parse(beforeVersion[key]);
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = JSON.parse(afterVersion[key]);
        } else {
          after = null;
        }
        arrDifferences.push({
          part: '',
          title: key,
          before,
          after,
        });
      } else if (key == 'image') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = environment.wineryImageStore + `${this.address.id + '_' + beforeVersion[key]}.png`;
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = environment.wineryImageStore + `${this.address.id + '_' + afterVersion[key]}.png`;
        } else {
          after = null;
        }
        arrDifferences.push({
          part: '',
          title: key,
          before,
          after,
        });
      } else if (key == 'emblem') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = environment.wineryEmblemImageStore + `${this.address.id + '_' + beforeVersion[key]}.png`;
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = environment.wineryEmblemImageStore + `${this.address.id + '_' + afterVersion[key]}.png`;
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

    console.log(arrDifferences);
    this.differenceList = arrDifferences;
  }
  getDifferenceName(difference: Difference) {
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
    this.changeList.slice().reverse().forEach(change => {
      if(func(timestamp, change.timestamp)) {

        Object.keys(change.difference).forEach(key => {

          if(key == 'commoninfo') {

            Object.keys(change.difference.commoninfo).forEach(keyInner => {
              res.commoninfo[keyInner] = change.difference.commoninfo[keyInner];
            });

          } else if (key == 'menu' || key == 'additional') {
            const parsed = JSON.parse(res[key]);

            Object.keys(change.difference[key]).forEach(keyInner => {
              parsed[keyInner] = change.difference[key][keyInner];
            });

            res[key] = JSON.stringify(parsed);
          } else {
            res[key] = change.difference[key];
          }
        });
      }
    });
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
}

export class HistoryFullData {
  history: HistoryData[];
  current: any;
}
export class HistoryData {
  id: any;
  difference: any;
  timestamp: any;
  datetime?: any;
}
export class Difference {
  part: any;
  title: any;
  before: any;
  after: any;
}
export class GrapeData {
  grapelist: any[];
  grapesFull: any[];
  grapeSynonims: any[];
}
