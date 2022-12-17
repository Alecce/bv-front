import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ListsService} from '@src/app/services/api/lists.service';
import {CookieService} from 'ngx-cookie-service';
import {Overlay} from '@angular/cdk/overlay';
import {of, ReplaySubject} from 'rxjs';
import {WinesVoteSubscreenComponent} from '@src/app/wines-designed/wines-vote-subscreen/wines-vote-subscreen.component';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResolutionService} from '@src/app/services/resolution.service';
import {WinesStoreSubscreenComponent} from '@src/app/wines-designed/wines-store-subscreen/wines-store-subscreen.component';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {WineOneUniversalComponent} from '@src/app/wines-designed/wine-one-universal/wine-one-universal.component';
import {WinesShortDesignedComponent} from '@src/app/wines-designed/wines-short-designed/wines-short-designed.component';
import {WineDescriptionSubscreenComponent} from '@src/app/wines-designed/wine-description-subscreen/wine-description-subscreen.component';
import {FindWineComponent} from '@src/app/schemas/find-wine/find-wine.component';
import {variables} from '@src/environments/variables';
import {CloseSubscreenSecviceService} from '@src/app/services/close-subscreen-secvice.service';

@Component({
  selector: 'app-wine-one-universal-subscreen',
  templateUrl: './wine-one-universal-subscreen.component.html',
  styleUrls: ['./wine-one-universal-subscreen.component.css']
})
export class WineOneUniversalSubscreenComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild(WinesShortDesignedComponent) public wineShort: WinesShortDesignedComponent;
  // @ts-ignore
  @ViewChild(WineOneUniversalComponent) public wineOneUniversal: WineOneUniversalComponent;


  bengat = variables.bengat;
  short = true;

  eventListerner = new ReplaySubject(10);

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              public dialogRef: MatDialogRef<WineOneUniversalSubscreenComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public imagePlaceholder: PlaceholderServiceService,
              public  resolutionService: ResolutionService,
              public closeSubscreenService: CloseSubscreenSecviceService,
              private listService: ListsService) { }


  ngAfterViewInit(): void {



  }

  ngOnInit() {
    this.eventListerner.subscribe(eventt => {
      // @ts-ignore
      if (eventt && eventt.type == 'winery') {
        this.dialogRef.close('no query change');
      }
      // @ts-ignore
      if (eventt && eventt.type == 'vineyard') {
        this.dialogRef.close('no query change');
      }
    });



    // this.closeSubscreenService.startClosing();
    this.closeSubscreenService.getListerner().subscribe(() => {
      this.close();
    })
  }

  get wine() {
    return this.short ? this.wineShort : this.wineOneUniversal;
  }

  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }

  rateWine() {
    if (this.langService.editable) {
      return;
    }
    const dialogRef = this.dialog.open(WinesVoteSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height: 'auto',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: this.wine.downloadedData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  describeWine() {
    if (this.langService.editable) {
      return;
    }
    // const height = this.isMobileScreen() ? '100%' : '472px';

    const dialogRef = this.dialog.open(WineDescriptionSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height,
      height: 'auto',
      maxHeight: '90vh',
      autoFocus: false,
      panelClass: ['mat-dialog-bonvino', 'mat-dialog-bonvino-noscrolling'],
      data: this.wine.downloadedData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  editWine() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/wine-edit/' + this.wine.id]);
  }
  editWineLink() {
    return '/wine-edit/' + this.wine.id;
  }
  viewWineLink() {
    if(this.short) {
      return '/wine-translate/' + this.wine.id;
    } else {
      return '/wine-translate-full/' + this.wine.id;
    }
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

  getWine(wine) {
    this.service.getToPersonStorage({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.storage = 1;
      }
    });
  }

  removeWine(wine) {
    this.service.removeFromPersonStorage({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.storage = null;
      }
    });
  }

  isEditable() {
    return !this.wine.wineData.user || this.accountService.isSameUser(this.wine.wineData.user) || this.accountService.isAdmin();
  }

  isTranslatable() {
    return this.accountService.isTranslator();
  }

  isAdmin() {
    return this.accountService.isAdmin();
  }


  isSpecialist() {
    return this.accountService.ifSpecialist();
  }

  storeWine() {
    if (this.langService.editable) {
      return;
    }
    // console.log(this.downloadedData);
    const id = this.wine.id;
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


  findWine(id) {
    const wineData = of({id})
    const dialogRef = this.dialog.open(FindWineComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height: 'auto',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  setShort() {
    if (this.langService.editable) {
      return;
    }
    this.short = true;
  }
  setFull() {
    if (this.langService.editable) {
      return;
    }
    this.short = false;
  }

  isMobileScreen() {
    return window.innerWidth < 768
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }
}
