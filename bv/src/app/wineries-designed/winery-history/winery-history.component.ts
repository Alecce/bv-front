import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Difference} from '@src/app/wineries-designed/winery-changelog/winery-changelog.component';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {of, ReplaySubject} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {CompareServiceService} from '@src/app/services/compare-service.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';

@Component({
  selector: 'app-winery-history',
  templateUrl: './winery-history.component.html',
  styleUrls: ['./winery-history.component.css']
})
export class WineryHistoryComponent implements OnInit {

  logReload = new ReplaySubject(10);


  date = new FormControl();
  idDifference = 0;

  address = {
    type: null,
    id: null
  };

  fictionsShow = [];
  fictionsEdit = [];
  actualVersion;

  structure: InputData[][] = [];
  form = new FormGroup({


  });


  countries = [];
  regiones = [];
  countriesMap = new Map();
  regionesMap = new Map();

  changeList: HistoryData[] = [];
  original = null;
  lastVersion = null;
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
              private additionalService: AdditionalServiceService,
              public downloadingService: DownloadDataServiceService,
              private compareService: CompareServiceService,
  ) { }

  ngOnInit(): void {

    let title = 'Winery history - bonvino.com';
    this.titleService.setTitle(title);

    this.downloadingService.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      this.downloadingService.getRegiones().subscribe(dataR => {
// @ts-ignore
        this.regiones = dataR;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });
      });
    });


    if (this.activatedroute.snapshot.params.id) {
      this.address.id = this.activatedroute.snapshot.params.id;
    }

    this.loadList();
    this.logReload.subscribe((test) => {
      this.loadList();
    })
  }

  public loadList() {
    this.service.getWineryHistory({id: this.address.id}).subscribe( (data: HistoryFullData) => {
      data.history.forEach((h: HistoryData) => {
        h.datetime = new Date(h.timestamp * 1000);
      });
      this.changeList = data.history;
      this.original = data.current;
    });

    this.service.getWinery(this.address.id).subscribe(data => {
      this.lastVersion = data;
    })
  }

  showForEditHistory(change: HistoryData) {
    this.date.setValue(new Date(change.timestamp * 1000).toISOString().split('T')[0]);
    this.actualVersion = of(change.snapshot);

    this.fictionsShow.length = 0;
    this.fictionsEdit.length = 0;
    this.fictionsEdit.push({});

    this.idDifference = change.id;

    // console.log();

    const comparation = this.compareService.getDifferencesListHistory(change.snapshot, this.lastVersion, this.address.id);


    const differences = [];

    comparation.forEach(d => {
      if(true || JSON.stringify(d.before) != JSON.stringify(d.after) && !(!d.before && !d.after)) {
        differences.push(d);
      }
    });

    this.differenceList = differences;
    console.log(differences);

  }


  showHistory(change: HistoryData) {
    this.date.setValue(new Date(change.timestamp * 1000).toISOString().split('T')[0]);
    this.actualVersion = of(change.snapshot);

    this.fictionsShow.length = 0;
    this.fictionsEdit.length = 0;
    this.fictionsShow.push({});

    this.idDifference = change.id;

  }


  getImage(image) {
    return image;
  }

  deleteHistory() {
    const deleteData = {
      id: this.idDifference,
    };
    this.service.deleteWineryHistory(deleteData).subscribe(() => {
      this.fictionsEdit.length = 0;
    });
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

  getDifferenceName(difference: Difference) {
    return this.compareService.getDifferenceName(difference);
  }
  getDifferencePointName(difference, i) {

    return this.compareService.getDifferencePointName(difference, i);
  }
  getDifferenceType(difference: Difference) {

    return this.compareService.getDifferenceType(difference);
  }
  getIcon(value) {
    return value ? 'icn-done' : 'icn-close-bonvine';
  }

  getCountryFromObject(obj) {

    if(obj) {
      return JSON.parse(obj).country;
    }
    return 0;
  }

  getRegionsFromObject(obj) {

    if(obj) {
      return JSON.parse(obj).regionsForm;
    }
    return [];
  }
}

export class HistoryFullData {
  history: HistoryData[];
  current: any;
}
export class HistoryData {
  id: any;
  snapshot: any;
  timestamp: any;
  datetime?: any;
}
