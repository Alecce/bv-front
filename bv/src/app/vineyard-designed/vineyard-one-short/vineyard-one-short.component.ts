import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {forkJoin, ReplaySubject, Subject} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {AdditionalViewSchemaComponent} from '@src/app/schemas/additional-view-schema/additional-view-schema.component';
import {performanceArr} from '@src/app/wineries-designed/winery-basic/winery-basic.component';
import {environment} from '@src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {MatDialog} from '@angular/material/dialog';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {
  altituteUnits,
  harvestTypes,
  harvestUnits,
  productionUnits,
  squareUnits
} from '@src/app/vineyard-designed/vineyard-basic-designed/vineyard-basic-designed.component';

@Component({
  selector: 'app-vineyard-one-short',
  templateUrl: './vineyard-one-short.component.html',
  styleUrls: ['./vineyard-one-short.component.css']
})
export class VineyardOneShortComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @Input() data;
  // @ts-ignore
  @Input() listerner: Subject;

  @Input() vineyardDataInput;

  vineyardDeleted = false;
  userId = null;
  tabs = [];
  additionalTabs = new ReplaySubject(10);
  downloadedData = new ReplaySubject(10);
  vineyardData = null;
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
  vineyardGrapeList = [];
  wineryVineyardList = [];
  grapeMap = new Map();
  grapeClones = null;
  grapeUses = null;


  squareUnits = squareUnits;
  altituteUnits = altituteUnits;
  harvestUnits = harvestUnits;
  harvestTypes = harvestTypes;
  productionUnits = productionUnits;

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

    this.showOptions = this.activatedroute.snapshot.data.showOptions;

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

      }
    );


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

    let getVineyard;
    if(this.vineyardDataInput) {
      getVineyard = this.vineyardDataInput;
    } else {
      getVineyard = this.service.getVineyard(this.id);
    }

    getVineyard.subscribe(data => {


      if(data) {

        const visitinData = {
          page: 'vineyard',
          id: this.id
        };
        this.service.visiting(visitinData).subscribe(x => {
          console.log(x);
        });
      }

      console.log(data);
      let title = '';
      // @ts-ignore
      if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
        // @ts-ignore
        title = data.commoninfo.name_national + ' vineyard - bonvino.com';
      } else {
        // @ts-ignore
        title = data.commoninfo.name_international + ' vineyard - bonvino.com';
      }
      this.titleService.setTitle(title);

// @ts-ignore
      this.vineyardDeleted = data.deleted;
// @ts-ignore
      this.userId = data.user;

      if (this.vineyardDeleted) {
        return;
      }

// @ts-ignore
      this.vineyardGrapeList = data.grapesFull;
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
          this.vineyardGrapeList.forEach(x => {
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
        this.vineyardGrapeList = wineryGrapeList;
      }
// // @ts-ignore
//       if (data.image) {
// // @ts-ignore
//         this.image = `url(${environment.vineyardImageStore + this.id + '_' + data.image + '.png'}) no-repeat center center /cover`;
//       } else {
//         this.image = this.noImage;
//       }
//
// // @ts-ignore
//       if (data.emblem) {
// // @ts-ignore
//         this.emblem = `url(${environment.vineyardImageStore + this.id + '_' + data.image + '.png'}) no-repeat center center /cover`;
//       } else {
//         this.emblem = this.noImage;
//       }


      this.vineyardData = data;


      if(data.harvests) {
        try{
          this.vineyardData.harvestData = JSON.parse(data.harvests);
        } catch (e) {
        }
      }

      if(data.grapeClones) {
        try{
          this.grapeClones = JSON.parse(data.grapeClones);
        } catch (e) {
        }
      }

      if(data.grapeUses) {
        try{
          this.grapeUses = JSON.parse(data.grapeUses);
        } catch (e) {
        }
      }

      const geolacationData = {
        lat: data.commoninfo.lat,
        lng: data.commoninfo.lng,
        language: 'en'
      };
      this.vineyardData.geolocation = geolacationData;

      this.langService.languagesLoaded.subscribe(() => {

        geolacationData.language = this.langService.getLanguageCode();

        this.service.addressByCoordinates(geolacationData).subscribe(x => {

          this.vineyardData.locationAddress = x;
        });

      });



      this.langService.languageChangedManually.subscribe((l) => {

        // console.log(l)

        geolacationData.language = this.langService.getLanguageCode();

        this.service.addressByCoordinates(geolacationData).subscribe(x => {

          this.vineyardData.locationAddress = x;
        });
      });

      this.downloadedData.next(data);
    });

  }
  getImage() {
    if (this.vineyardData && this.vineyardData.image) {
      return environment.vineyardImageStore + `${this.id + '_' + this.vineyardData.image}.png`;

    }
  }
  getEmblem() {
    if (this.vineyardData && this.vineyardData.emblem) {
      return environment.vineyardEmblemImageStore + `${this.id + '_' + this.vineyardData.emblem}.png`;

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
    return !this.vineyardData.user || this.accountService.isSameUser(this.vineyardData.user) || this.accountService.isAdmin();
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
  editVineyardLink() {
    return '/vineyard-edit/' + this.id;
  }
  test(value) {
    return JSON.stringify(value);
  }

  hasVisittime() {

    // console.log(this.wineryData.visittimeParsed);
    // return false;
    if(!this.vineyardData.visittimeParsed) {
      return false;
    }
    let res = false;


// @ts-ignore
    Object.keys(this.vineyardData.visittimeParsed).forEach(key => {
// @ts-ignore
      if(this.vineyardData.visittimeParsed[key]) {
        res = true;
      }
    });
    return res;
  }

  hasGeoData() {
    return this.vineyardData.commoninfo.lat && this.vineyardData.commoninfo.lat && this.vineyardData.commoninfo.lat * 1 && this.vineyardData.commoninfo.lat * 1;
  }
  isMobileScreen() {
    return window.innerWidth < 768
  }

  getClonesForGrape(id) {

    const res = [];
    try {
      const grapeClones = this.grapeClones[id];
      // @ts-ignore
      Object.keys(grapeClones).forEach(key => {
        if(grapeClones[key]) {
          // res += key;
          // res += ', ';
          res.push(key)
        }
      });
      // @ts-ignore
      // res = res.slice(0, res.length - 2);
    } catch (e) {
    }
    return res;
  }

  getUsesForGrape(id) {

    const res = [];
    try {
      const grapeUses = this.grapeUses[id];
      // @ts-ignore
      Object.keys(grapeUses).forEach(key => {
        if(grapeUses[key]) {
          // res += key;
          // res += ', ';
          res.push(key)
        }
      });
      // @ts-ignore
      // res = res.slice(0, res.length - 2);
    } catch (e) {
    }
    return res;
  }
}
