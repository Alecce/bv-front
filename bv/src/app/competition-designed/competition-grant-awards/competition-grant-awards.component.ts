import {Component, OnInit, ViewChild} from '@angular/core';
import {CompetitionSelectComponent} from '@src/app/schemas/competition-select/competition-select.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {Title} from '@angular/platform-browser';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {WineListDesignedBComponent} from "@src/app/lists/wine-list-designed-b/wine-list-designed-b.component";
// import {WineListDesignedBComponent} from '@src/app/lists/wine-list-designed/wine-list-designed.component';

@Component({
  selector: 'app-competition-grant-awards',
  templateUrl: './competition-grant-awards.component.html',
  styleUrls: ['./competition-grant-awards.component.css']
})
export class CompetitionGrantAwardsComponent implements OnInit {

  id;
  form = new FormGroup({
// @ts-ignore
    competition: new FormControl(0),
    award: new FormControl(0),

  });


  // @ts-ignore
  @ViewChild(WineListDesignedBComponent) winelist: WineListDesignedBComponent;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              private titleService: Title,
              private additionalService: AdditionalServiceService) { }

  ngOnInit(): void {


    this.id = this.activatedroute.snapshot.params.id;
    this.competition.setValue(this.id);

    this.award.valueChanges.subscribe((award) => {
      this.winelist.setAward(award)
    });
  }
  get competition() {
    return this.form.get('competition');
  }
  get award() {
    return this.form.get('award');
  }
  openAwardSelect(): void {
    if (this.langService.editable) {
      return;
    }

    const id = this.activatedroute.snapshot.params.id;
    // const form = new FormGroup({
    //     competition: new FormControl(this.eventData.commoninfo.competition),
    //     award: new FormControl(wine.award),
    //     event: new FormControl(id),
    //   });

    const data = {
      form: this.form,
      options: {
        hasCompetitionOption: false,
        savable: false,
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

    });
  }


  backToEditLink() {
    return '/competition-edit/' + this.activatedroute.snapshot.params.id;
  }

  backToViewLink() {
    return '/competition/' + this.activatedroute.snapshot.params.id;
  }
}
