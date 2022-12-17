import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ListsService} from '@src/app/services/api/lists.service';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ResolutionService} from '@src/app/services/resolution.service';
import {WineryShortComponent} from '@src/app/wineries-designed/winery-short/winery-short.component';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-winery-short-subscreen',
  templateUrl: './winery-short-subscreen.component.html',
  styleUrls: ['./winery-short-subscreen.component.css']
})
export class WineryShortSubscreenComponent implements OnInit {

  // @ts-ignore
  @ViewChild(WineryShortComponent) public wineryShortComponent: WineryShortComponent;

  listerner = new ReplaySubject(10);

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              public dialogRef: MatDialogRef<WineryShortSubscreenComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public imagePlaceholder: PlaceholderServiceService,
              public  resolutionService: ResolutionService,
              private listService: ListsService) { }

  ngOnInit(): void {

    console.log(this.data);

    this.listerner.subscribe((v) => {
      if(v == 'close') {
        this.close('');
      }
    })
  }
  

  close(message): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close(message);
  }
  editWinery() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/winery-edit/' + this.wineryShortComponent.id]);
  }
  editWineryLink() {
    return '/winery-edit/' + this.wineryShortComponent.id;
  }
  viewWineryLink() {
    return '/winery-translate/' + this.wineryShortComponent.id;
  }
  addWineToWinery() {
    return '/wines-add/' + this.wineryShortComponent.id;
  }

  isEditable() {
    return !this.accountService.isNoUser() && !this.wineryShortComponent.wineryData.user || this.accountService.isSameUser(this.wineryShortComponent.wineryData.user) ||
      this.accountService.isAdmin();
  }

  isTranslatable() {
    return this.accountService.isTranslator();
  }
  wineListParams() {
    return {winery: this.wineryShortComponent.id};
  }
  routeToWinelist() {
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['wine-list'], { queryParams: this.wineListParams() })
    );
    this.close('no query change');
    // console.log(this.router.url)
  }

  isMobileScreen() {
    return window.innerWidth < 768
  }
}
