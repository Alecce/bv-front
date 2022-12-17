import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ListsService} from '@src/app/services/api/lists.service';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {ReplaySubject} from 'rxjs';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ResolutionService} from '@src/app/services/resolution.service';
import {EventShortDesignedComponent} from '@src/app/event-designed/event-short-designed/event-short-designed.component';

@Component({
  selector: 'app-event-short-subscreen',
  templateUrl: './event-short-subscreen.component.html',
  styleUrls: ['./event-short-subscreen.component.css']
})
export class EventShortSubscreenComponent implements OnInit {

  // @ts-ignore
  @ViewChild(EventShortDesignedComponent) public eventShortDesignedComponent: EventShortDesignedComponent;

  listerner = new ReplaySubject(10);

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              public dialogRef: MatDialogRef<EventShortSubscreenComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public imagePlaceholder: PlaceholderServiceService,
              public  resolutionService: ResolutionService,
              private listService: ListsService) { }

  ngOnInit(): void {

    console.log(this.data);

    this.listerner.subscribe((v) => {
      if(v == 'close') {
        this.close();
      }
    })
  }

  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }
  editWinery() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/event-edit/' + this.eventShortDesignedComponent.id]);
  }
  editEventLink() {
    return '/event-edit/' + this.eventShortDesignedComponent.id;
  }
  viewEventLink() {
    return '/event-translate/' + this.eventShortDesignedComponent.id;
  }

  isEditable() {
    return !this.eventShortDesignedComponent.eventData.user || this.accountService.isSameUser(this.eventShortDesignedComponent.eventData.user) || this.accountService.isAdmin();
  }

  isTranslatable() {
    return this.accountService.isTranslator();
  }

}
