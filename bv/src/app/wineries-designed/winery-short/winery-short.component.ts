import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {forkJoin, ReplaySubject, Subject} from 'rxjs';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Title} from '@angular/platform-browser';
import {RequestsService} from '@src/app/services/api/requests.service';
import {WineryInformationSubscreenComponent} from '@src/app/wineries-designed/winery-information-subscreen/winery-information-subscreen.component';
import {AdditionalViewSchemaComponent} from '@src/app/schemas/additional-view-schema/additional-view-schema.component';
import {environment} from '@src/environments/environment';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {WineryContactsSubscreenComponent} from '@src/app/wineries-designed/winery-contacts-subscreen/winery-contacts-subscreen.component';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {performanceArr} from '@src/app/wineries-designed/winery-basic/winery-basic.component';

@Component({
  selector: 'app-winery-short',
  templateUrl: './winery-short.component.html',
  styleUrls: ['./winery-short.component.css']
})
export class WineryShortComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @Input() data;
  // @ts-ignore
  @Input() listerner: Subject;

  @Input() wineryDataInput;

  wineryDeleted = false;
  userId = null;
  tabs = [];
  additionalTabs = new ReplaySubject(10);
  downloadedData = new ReplaySubject(10);
  wineryData = null;
  noImage = 'url(\'../../../assets/icons/placeholder-page.svg\') no-repeat center center /cover';
  image = '';

  visitTime = [
    {text: '', day: 'Sunday'},
    {text: '', day: 'Monday'},
    {text: '', day: 'Tuesday'},
    {text: '', day: 'Wednesday'},
    {text: '', day: 'Thursday'},
    {text: '', day: 'Friday'},
    {text: '', day: 'Saturday'},
  ];

  routeData = {editable: false, download: false, available: true};

  additionalStructure = new ReplaySubject(10);
  structure = [];
  menu = {};

  additional = {
    structure: [],
    menu: {}
  };


  id = null;
  showOptions = false;

  countries = [];
  regiones = [];
  countriesMap = new Map();
  regionesMap = new Map();



  performanceArr = performanceArr;
  wineryGrapeList = [];
  wineryVineyardList = [];
  grapeMap = new Map();

  // languageArr = languagesInterface;

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

  ngAfterViewInit(): void {

    this.showOptions = this.activatedroute.snapshot.data.showOptions ;

  }

  ngOnInit() {


    const getCountries = this.service.getCountries();
    const getRegions = this.service.getRegiones();


    forkJoin([getCountries, getRegions]).subscribe(
      results => {
// @ts-ignore
        this.countries = results[0];
        this.countries.forEach(x => {
          this.countriesMap.set(x.id, x.name);
        });

// @ts-ignore
        this.regiones = results[1];
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });

      });


    const req = {business_type: 'winery'};
    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {
      this.additional.structure = data;

      this.additionalService.transformAdditional(data, this.structure, null);

      this.additionalTabs.next(this.additionalService.getTabs(data));

      this.additionalStructure.next(data);
    });

    this.additionalTabs.subscribe(tabs => {

// @ts-ignore
      this.tabs = tabs;

    });

    this.downloadedData.subscribe(data => {
// @ts-ignore
      this.additional.menu = JSON.parse(data.menu);
    });


    if(this.data) {
      // @ts-ignore
      this.id = this.data.id;
    } else {

      this.id = this.activatedroute.snapshot.params.id;
    }

    let getWinery;
    if(this.wineryDataInput) {
      getWinery = this.wineryDataInput;
    } else {



      getWinery = this.service.getWinery(this.id);
    }

    getWinery.subscribe(data => {



      console.log(data);
      let title = '';
      // @ts-ignore
      if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
        // @ts-ignore
        title = data.commoninfo.name_national + ' winery - bonvino.com';
      } else {
        // @ts-ignore
        title = data.commoninfo.name_international + ' winery - bonvino.com';
      }
      this.titleService.setTitle(title);

// @ts-ignore
      this.wineryDeleted = data.deleted;
// @ts-ignore
      this.userId = data.user;

      if (this.wineryDeleted) {
        return;
      }


      if(data) {

        const visitinData = {
          page: 'winery',
          id: this.id
        };
        this.service.visiting(visitinData).subscribe(x => {
          console.log(x);
        });
      }

// @ts-ignore
      this.wineryGrapeList = data.grapesFull;
// @ts-ignore
      data.grapesFull.forEach(g => {
        this.grapeMap.set(g.id * 1, g.name);
      });
// @ts-ignore
      if (data.grapeSynonims) {
        const wineryGrapeList = [];
// @ts-ignore
        const synonims = JSON.parse(data.grapeSynonims);
// @ts-ignore
        const grapelist = JSON.parse(data.grapelist);

        for (let i = 0; i < synonims.length; i++) {
          this.wineryGrapeList.forEach(x => {
            // console.log(x);
            if (grapelist[i] && synonims[i]) {
              if (x.id == grapelist[i]) {
                const grape = {id: x.id, name: x.name, synonim: synonims[i]};
                // x.synonim = synonims[i];
                wineryGrapeList.push(grape);
              }
            } else if (grapelist[i]) {

              if (x.id == grapelist[i]) {
                const grape = {id: x.id, name: x.name};
                // x.synonim = synonims[i];
                wineryGrapeList.push(grape);
              }
            }
          });
        }
        this.wineryGrapeList = wineryGrapeList;
      }
// @ts-ignore
      this.wineryVineyardList = data.vineyardsFull;

// @ts-ignore
      if (data.visittime) {
// @ts-ignore
        const timeData = JSON.parse(data.visittime);
        data.visittimeParsed = timeData;
//         console.log(timeData);
//         Object.keys(timeData).forEach(key => {
//           if (timeData[key] !== '') {
//             const day = key[2];
//             const type = key[0];
//             // this.times(day).push(new FormControl(timeData[key]));
//             if (type == 't') {
// // @ts-ignore
//               this.visitTime[day * 1].text += ' - ';
//             }
// // @ts-ignore
//             this.visitTime[day * 1].text += timeData[key];
//           }
//         });
      }

// @ts-ignore
      if (data.image) {
// @ts-ignore
        this.image = `url(${environment.wineryImageStore + this.id + '_' + data.image + '.png'}) no-repeat center center /cover`;
      } else {
        this.image = this.noImage;
      }


      this.wineryData = data;
      const geolacationData = {
        lat: data.commoninfo.lat,
        lng: data.commoninfo.lng,
        language: 'en'
      };
      this.wineryData.geolocation = geolacationData;

      this.langService.languagesLoaded.subscribe(() => {

        geolacationData.language = this.langService.getLanguageCode();

        this.service.addressByCoordinates(geolacationData).subscribe(x => {

          this.wineryData.locationAddress = x;
        });

      });



      this.langService.languageChangedManually.subscribe((l) => {

        // console.log(l)

        geolacationData.language = this.langService.getLanguageCode();

        this.service.addressByCoordinates(geolacationData).subscribe(x => {

          this.wineryData.locationAddress = x;
        });
      });

      this.downloadedData.next(data);
    });

  }


  getImage() {
    if (this.wineryData && this.wineryData.image) {
      return environment.wineryImageStore + `${this.id + '_' + this.wineryData.image}.png`;

    }
  }
  getEmblem() {
    if (this.wineryData && this.wineryData.emblem) {
      return environment.wineryEmblemImageStore + `${this.id + '_' + this.wineryData.emblem}.png`;

    }
  }

  getRegion(regions) {
    // console.log(regions);
    let res = '';
    regions.forEach(x => {
      if (x) {
        // console.log(x);
        res += x;
        res += ', ';
      }
    });
    if (res) {
      res = res.slice(0, -2);
    }
    return res;
  }
  getAddress(data) {
    let res = '';
    if (data.country) {
      res += data.country;
      res += ', ';
    }
    if (data.city) {
      res += data.city;
      res += ', ';
    }
    if (data.address) {
      res += data.address;
      res += ', ';
    }
    if (res) {
      res = res.slice(0, -2);
    }
    return res;
  }
  showInformation() {

    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(WineryInformationSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      // width: '864px',
      // height: '480px',
      autoFocus: false,
      data: this.downloadedData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  showContacts() {

    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(WineryContactsSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      // width: '800px',
      // height: '400px',
      autoFocus: false,
      data: this.downloadedData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  showAdditional(tab) {

    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(AdditionalViewSchemaComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      // width: '80%',
      // height: '80%',
      panelClass: 'test-panel-class',
      autoFocus: false,
      data: {
        content: this.downloadedData,
        tab,
        additionalStructure: this.additionalStructure
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  wineList() {

    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/wine-list'],
      {queryParams: {winery: this.id}});
    // this.router.navigate(['/event/' + this.id],
    //   {queryParams: {tab: this.activatedroute.snapshot.queryParamMap.get('tab')}});
  }

  wineListParams() {
    return {winery: this.id};
  }
  edit() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/winery-edit/' + this.id]);
  }

  editLink() {
    return '/winery-edit/' + this.id;
  }

  isEditable() {
    return !this.accountService.isNoUser() && (!this.wineryData.user || this.accountService.isSameUser(this.wineryData.user) || this.accountService.isAdmin());
  }

  isTabExist(tab) {

    const res = this.additional.structure.filter(x => {
      return (x.tab == tab && this.additional.menu[x.block_name]);
    });
    return res.length;
  }
  close() {
    if(this.listerner) {
      this.listerner.next('close');
    }
  }
  editWineryLink() {
    return '/winery-edit/' + this.id;
  }
  test(value) {
    return JSON.stringify(value);
  }

  hasVisittime() {

    // console.log(this.wineryData.visittimeParsed);
    // return false;
    if(!this.wineryData.visittimeParsed) {
      return false;
    }
    let res = false;


// @ts-ignore
    Object.keys(this.wineryData.visittimeParsed).forEach(key => {
// @ts-ignore
      if(this.wineryData.visittimeParsed[key]) {
        res = true;
      }
    });
    return res;
  }

  hasGeoData() {
    return this.wineryData.commoninfo.lat && this.wineryData.commoninfo.lat && this.wineryData.commoninfo.lat * 1 && this.wineryData.commoninfo.lat * 1;
  }
  isMobileScreen() {
    return window.innerWidth < 768
  }

  routeToVineyard(id) {
    this.listerner.next(
      'close'
    );
  }
  vineyardLink(vineyard) {

    return '/vineyard/' + vineyard;
  }
}
