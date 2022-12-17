import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {Overlay} from '@angular/cdk/overlay';
import {ReplaySubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {LanguageServiceService} from '../../services/language-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WineryContactsSubscreenComponent} from '../../wineries-designed/winery-contacts-subscreen/winery-contacts-subscreen.component';
import {MatDialog} from '@angular/material/dialog';
import {ShopInformationSubscreenComponent} from '../shop-information-subscreen/shop-information-subscreen.component';
import {AccountServiceService} from '../../services/account-service.service';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {AdditionalViewSchemaComponent} from '@src/app/schemas/additional-view-schema/additional-view-schema.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-shop-designed-one',
  templateUrl: './shop-designed-one.component.html',
  styleUrls: ['./shop-designed-one.component.css']
})
export class ShopDesignedOneComponent implements OnInit {
  downloadedData = new ReplaySubject(10);
  shopData = null;
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

  tabs = [];
  additionalTabs = new ReplaySubject(10);
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
              private accountService: AccountServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              private titleService: Title,
              private additionalService: AdditionalServiceService) { }

  ngOnInit() {


    const req = {business_type: 'shop'};
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

    const id = this.activatedroute.snapshot.params.id;
    if (this.activatedroute.snapshot.data.download) {
      this.service.getShop(id).subscribe(data => {


        let title = '';
        // @ts-ignore
        if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
          // @ts-ignore
          title = data.commoninfo.name_national + ' shop - bonvino.com';
        } else {
          // @ts-ignore
          title = data.commoninfo.name_international + ' shop - bonvino.com';
        }
        this.titleService.setTitle(title);


        this.downloadedData.next(data);
        this.shopData = data;
// @ts-ignore
        if (data.user !== 0 && this.cookieService.get('myId') * 1 !== data.user * 1 && this.cookieService.get('sequrity') != '4') {
          this.routeData.available = false;
        }

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
        if (data.emblem) {
// @ts-ignore
          this.image = `url(${environment.shopEmblemImageStore + id + '_' + data.emblem + '.png'}) no-repeat center center /cover`;
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

    const dialogRef = this.dialog.open(ShopInformationSubscreenComponent, {
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
    return {shop: this.activatedroute.snapshot.params.id};
  }
  edit() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/winery-edit/' + this.activatedroute.snapshot.params.id]);
  }

  editLink() {
    return '/shop-edit/' + this.activatedroute.snapshot.params.id;
  }

  isEditable() {
    return !this.shopData.user || this.accountService.isSameUser(this.shopData.user) || this.accountService.isAdmin();
  }

  isTabExist(tab) {

    const res = this.additional.structure.filter(x => {
      return (x.tab == tab && this.additional.menu[x.block_name]);
    });
    return res.length;
  }
}
