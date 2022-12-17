import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {WinesVoteSubscreenComponent} from '@src/app/wines-designed/wines-vote-subscreen/wines-vote-subscreen.component';
import {CookieService} from 'ngx-cookie-service';
import {of, ReplaySubject, Subject} from 'rxjs';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Title} from '@angular/platform-browser';
import {WinesStoreSubscreenComponent} from '@src/app/wines-designed/wines-store-subscreen/wines-store-subscreen.component';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AdditionalViewSchemaComponent} from '@src/app/schemas/additional-view-schema/additional-view-schema.component';
import {environment} from '@src/environments/environment';
import {CompetitionSelectComponent} from '@src/app/schemas/competition-select/competition-select.component';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {InputData} from '@src/app/business-designed/business-designed.component';

@Component({
  selector: 'app-event-short-designed',
  templateUrl: './event-short-designed.component.html',
  styleUrls: ['./event-short-designed.component.css']
})
export class EventShortDesignedComponent implements OnInit {

  eventData = null;
  noImage = 'url(\'../../../assets/icons/placeholder-page.svg\') no-repeat center center /cover';
  image = '';
  downloadedData = new ReplaySubject(1);

  countries = [];
  countriesMap = new Map();

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

  id;
  // @ts-ignore
  @Input() data;
  // @ts-ignore
  @Input() listerner: Subject;

  @Input() wineryDataInput;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public dialog: MatDialog,
              private accountService: AccountServiceService,
              public overlay: Overlay,
              private titleService: Title,
              private additionalService: AdditionalServiceService) { }

  ngOnInit() {

    const req = {business_type: 'event'};
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


    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      // this.filterRegiones();
    });


    if(this.data) {
      // @ts-ignore
      this.id = this.data.id;
    } else {

      this.id = this.activatedroute.snapshot.params.id;
    }


    this.service.getEvent(this.id).subscribe(data => {

      let title = '';
      // @ts-ignore
      if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
        // @ts-ignore
        title = data.commoninfo.name_national + ' event - bonvino.com';
      } else {
        // @ts-ignore
        title = data.commoninfo.name_international + ' event - bonvino.com';
      }
      this.titleService.setTitle(title);

      this.downloadedData.next(data);



// @ts-ignore
      data.winelist.wine_list.forEach(w => {

        w.form = new FormGroup({
// @ts-ignore
          competition: new FormControl(data.commoninfo.competition),
          award: new FormControl(w.award),
          event: new FormControl(this.id),
        });
        console.log(w);
      });


      this.eventData = data;
// @ts-ignore
      if (data.user !== 0 && this.cookieService.get('myId') * 1 !== data.user * 1 && this.cookieService.get('sequrity') != '4') {
        this.routeData.available = false;
      }

// @ts-ignore
      if (data.commoninfo.image) {
// @ts-ignore
        this.image = `url(${environment.eventImageStore + this.id + '_' + data.commoninfo.image + '.png'}) no-repeat center center /cover`;
      } else {
        this.image = this.noImage;
      }


    }, err => {

    });
  }

  getImage() {
    if (this.eventData && this.eventData.image) {
      return environment.wineImageStore + `${this.eventData.id + '_' + this.eventData.image}.png`;

    } else {
      return this.noImage;
    }
  }

  getTime(time) {
    return new Date('01 Jan 1970 ' + time + ':00');
  }
  edit() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/event-edit/' + this.id]);
  }
  editLink() {

    return '/event-edit/' + this.id;
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

  isEditable() {
    return !this.eventData.user || this.accountService.isSameUser(this.eventData.user) || this.accountService.isAdmin();
  }


  rateWine(id) {
    const wineData = of({id})
    const dialogRef = this.dialog.open(WinesVoteSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height: 'auto',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: wineData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  getToPersonStorage(wine) {
    this.service.getToPersonStorage({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.storage = 1;
      }
    });
  }

  removeFromPersonStorage(wine) {
    this.service.removeFromPersonStorage({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.storage = null;
      }
    });
  }

  storeWine(id) {

    const dialogRef = this.dialog.open(WinesStoreSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  wishToBuy(wine) {
    this.service.wishToBuy({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.wish = 'buy';
      }


    });
  }

  wishToTaste(wine) {
    this.service.wishToTaste({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.wish = 'taste';
      }
    });
  }

  unwish(wine) {
    this.service.unwish({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.wish = null;
      }
    });
  }

  isTabExist(tab) {

    const res = this.additional.structure.filter(x => {
      return (x.tab == tab && this.additional.menu && this.additional.menu[x.block_name]);
    });
    return res.length;
  }




  openAwardSelect(wine): void {
    if (this.langService.editable) {
      return;
    }

    const id = this.id;
    // const form = new FormGroup({
    //     competition: new FormControl(this.eventData.commoninfo.competition),
    //     award: new FormControl(wine.award),
    //     event: new FormControl(id),
    //   });

    const data = {
      form: wine.form,
      options: {
        hasCompetitionOption: false,
        savable: true,
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
      console.log(wine.form.get('award').value);
      if(result) {
        wine.award = wine.form.get('award').value;
        // id, wine, competition, award, is_confirmed, year, event
        const form = {
          wine: wine.id,
          award: wine.award,
          competition: this.eventData.commoninfo.competition,
          event: id,
        };
        this.service.setAwardForEvent(form).subscribe();
      }

      console.log(wine);
    });
  }

}
