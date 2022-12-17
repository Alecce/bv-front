import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '../../services/api/requests.service';
import {ReplaySubject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {WineryInformationSubscreenComponent} from '../winery-information-subscreen/winery-information-subscreen.component';
import {WineryContactsSubscreenComponent} from '../winery-contacts-subscreen/winery-contacts-subscreen.component';
import {environment} from '../../../environments/environment';
import {AccountServiceService} from '../../services/account-service.service';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {AdditionalViewSchemaComponent} from '@src/app/schemas/additional-view-schema/additional-view-schema.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-winery-one-designed',
  templateUrl: './winery-one-designed.component.html',
  styleUrls: ['./winery-one-designed.component.css']
})
export class WineryOneDesignedComponent implements OnInit {


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

  ngOnInit() {
    const id = this.activatedroute.snapshot.params.id;


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

    if (this.activatedroute.snapshot.data.download) {

      let getWinery;
      if(this.wineryDataInput) {
        getWinery = this.wineryDataInput;
      } else {
        getWinery = this.service.getWinery(id);
      }

      getWinery.subscribe(data => {

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

        this.downloadedData.next(data);
        this.wineryData = data;
// // @ts-ignore
//         if (data.user && !this.accountService.isSameUser(data.user)) {
//           this.routeData.available = false;
//         }

// @ts-ignore
        if (data.visittime) {
// @ts-ignore
          const timeData = JSON.parse(data.visittime);
          console.log(timeData);
          Object.keys(timeData).forEach(key => {
            if (timeData[key] !== '') {
              const day = key[2];
              const type = key[0];
              // this.times(day).push(new FormControl(timeData[key]));
              if (type == 't') {
// @ts-ignore
                this.visitTime[day * 1].text += ' - ';
              }
// @ts-ignore
              this.visitTime[day * 1].text += timeData[key];
            }
          });
        }

// @ts-ignore
        if (data.image) {
// @ts-ignore
          this.image = `url(${environment.wineryImageStore + id + '_' + data.image + '.png'}) no-repeat center center /cover`;
        } else {
          this.image = this.noImage;
        }
      });
    }

  }
  getImage() {
    return null;
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
      width: '864px',
      height: '480px',
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
      width: '800px',
      height: '400px',
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
      width: '80%',
      height: '80%',
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
      {queryParams: {winery: this.activatedroute.snapshot.params.id}});
    // this.router.navigate(['/event/' + this.activatedroute.snapshot.params.id],
    //   {queryParams: {tab: this.activatedroute.snapshot.queryParamMap.get('tab')}});
  }

  wineListParams() {
    return {winery: this.activatedroute.snapshot.params.id};
  }
  edit() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/winery-edit/' + this.activatedroute.snapshot.params.id]);
  }

  editLink() {
    return '/winery-edit/' + this.activatedroute.snapshot.params.id;
  }

  isEditable() {
    return !this.accountService.isNoUser() && !this.wineryData.user || this.accountService.isSameUser(this.wineryData.user) || this.accountService.isAdmin();
  }

  isTabExist(tab) {

    const res = this.additional.structure.filter(x => {
      return (x.tab == tab && this.additional.menu[x.block_name]);
    });
    return res.length;
  }
}
