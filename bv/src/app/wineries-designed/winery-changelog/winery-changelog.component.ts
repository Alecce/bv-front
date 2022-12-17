import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {of} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {CompareServiceService} from '@src/app/services/compare-service.service';

@Component({
  selector: 'app-winery-changelog',
  templateUrl: './winery-changelog.component.html',
  styleUrls: ['./winery-changelog.component.css']
})
export class WineryChangelogComponent implements OnInit {

  date = new FormControl();
  idDifference = 0;

  address = {
    type: null,
    id: null
  };

  fictions = [];
  actualVersion;

  valueNamesConvertorToBackend = {};
  valueNamesConvertor = this.compareService.valueNamesConvertor;


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
              private compareService: CompareServiceService,
              private additionalService: AdditionalServiceService
  ) { }

  ngOnInit(): void {

    let title = 'Winery changelog - bonvino.com';
    this.titleService.setTitle(title);

    if (this.activatedroute.snapshot.params.id) {
      this.address.id = this.activatedroute.snapshot.params.id;
    }

    this.service.getWineryChangelog({id: this.address.id}).subscribe( (data: ChangelogFullData) => {
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

    const arrDifferences = this.compareService.getDifferencesList(beforeVersion, afterVersion, this.address.id);
    console.log(arrDifferences);
    this.differenceList = arrDifferences;
  }
  getDifferenceName(difference: Difference) {
    // if(difference.part == '') {
    //   return this.valueNamesConvertor[difference.title].name;
    // } else {
    //   if(this.valueNamesConvertor[difference.part][difference.title]) {
    //     return this.valueNamesConvertor[difference.part][difference.title].name;
    //   } else {
    //     return '';
    //   }
    // }

    return this.compareService.getDifferenceName(difference);
  }
  getDifferencePointName(difference, i) {
    // return this.valueNamesConvertor[difference.part][difference.title].select_options[i].id;

    return this.compareService.getDifferencePointName(difference, i);
  }
  getDifferenceType(difference: Difference) {
    // if(difference.part == '') {
    //   return this.valueNamesConvertor[difference.title].type;
    // } else {
    //   if(this.valueNamesConvertor[difference.part][difference.title]) {
    //     return this.valueNamesConvertor[difference.part][difference.title].type;
    //   } else {
    //     return '';
    //   }
    // }


    return this.compareService.getDifferenceType(difference);
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


  getDateColor(change) {
    if (this.idDifference == change.id) {
      return 'wine-color';
    } else {
      return '';
    }
  }
  wineryEditLink() {
    return '/winery-edit/' + this.activatedroute.snapshot.params.id;
  }
}


export class ChangelogFullData {
  history: ChangelogData[];
  current: any;
}
export class ChangelogData {
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
