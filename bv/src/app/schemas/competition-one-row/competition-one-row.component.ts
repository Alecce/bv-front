import {Component, Input, OnInit} from '@angular/core';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {ListsService} from '@src/app/services/api/lists.service';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-competition-one-row',
  templateUrl: './competition-one-row.component.html',
  styleUrls: ['./competition-one-row.component.css']
})
export class CompetitionOneRowComponent implements OnInit {

  competition = null;
  public isCompetitionSet = false;


  @Input() competitionIdFormControl: FormControl;

  @Input() competitionIdValue;

  constructor(
    public downloadService: DownloadDataServiceService,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    public imagePlaceholder: PlaceholderServiceService,
    public listService: ListsService,
    private route: Router
  ) { }

  ngOnInit(): void {

    if(this.competitionIdValue) {
      this.downloadService.getCompetitionById(this.competitionIdValue).subscribe(c => {
        this.competition = c;
        this.isCompetitionSet = true;
        console.log(this.competition);
      });
    }

    if(this.competitionIdFormControl) {

      this.downloadService.getCompetitionById(this.competitionIdFormControl.value).subscribe(c => {
        this.competition = c;
        this.isCompetitionSet = true;
        console.log(this.competition);
      });

      this.competitionIdFormControl.valueChanges.subscribe(v => {

        this.downloadService.getCompetitionById(v).subscribe(c => {
          this.competition = c;
          this.isCompetitionSet = true;
          console.log(this.competition);
        });
      })
    }

  }

  public get prizes() {
    console.log(this.competition);

    if(this.competition) {

      return this.competition.prizes;
    } else {
      return [];
    }
  }
}
