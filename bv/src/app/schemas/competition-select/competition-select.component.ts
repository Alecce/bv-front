import {Component, Inject, OnInit} from '@angular/core';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ListsService} from '@src/app/services/api/lists.service';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {environment} from '@src/environments/environment';
import {LanguageServiceService} from '@src/app/services/language-service.service';

@Component({
  selector: 'app-competition-select',
  templateUrl: './competition-select.component.html',
  styleUrls: ['./competition-select.component.css']
})
export class CompetitionSelectComponent implements OnInit {


  LANGUAGE_CURRENT_PAGE = 'competition_search';


  orders = {
    name: {name: 'name_national', direction: true},
    name_reverse: {name: 'name_national', direction: false},

    name_int: {name: 'name_international', direction: true},
    name_int_reverse: {name: 'name_international', direction: false},

  };

  pagesNumbers = [];

  // competitionId = new FormControl('');
  // prizeId = new FormControl('');

  form = new FormGroup({
    name: new FormControl(''),
    name_int: new FormControl(''),
    pageSearch: new FormControl(1),
    order: new FormControl('name'),
  });

  // innerForm = new FormGroup({
  //   name: new FormControl(''),
  //   name_int: new FormControl(''),
  //   pageSearch: new FormControl(1),
  //   order: new FormControl('name'),
  // });

  noImage = '../../../assets/icons/placeholder-wine.svg';

  competitionList = [];
  page = 1;
  maxPage = 1;
  downloadedPages = 1;
  searchNumber = 0;
  savedForm = null;
  downloading = false;
  totalResults = null;

  interval = null;
  downloadStarted = false;


  constructor(
    public downloadService: DownloadDataServiceService,
    public dialogRef: MatDialogRef<CompetitionSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    public imagePlaceholder: PlaceholderServiceService,
    public listService: ListsService,
    private route: Router
  ) { }

  ngOnInit() {

    this.showCompetitions();
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        // pairwise()
      ).subscribe(() => {

      // if (this.downloadStarted && oldValue.wineryHelper === newValue.wineryHelper) {
      this.showCompetitions();
      // }


    });

    console.log(this.data.value);

    // this.competitionId = this.data.get('competition');
    // this.prizeId = this.data.get('award');
     // = new FormControl('');


    // award: 0
    // competition: 6
    // year: ""
  }

  get hasCompetitionOption() {
    return this.data.options.hasCompetitionOption;
  }
  get hasAwardOption() {
    return this.data.options.hasAwardOption;
  }
  get savable() {
    return this.data.options.savable;
  }
  get competitionId() {
    return this.data.form.get('competition');
  }
  get prizeId() {
    return this.data.form.get('award');
  }
  get dataForm() {
    return this.data.form;
  }
  get name() {
    return this.form.get('name');
  }
  get name_int() {
    return this.form.get('name_int');
  }
  get pageSearch() {
    return this.form.get('pageSearch');
  }
  get order() {
    return this.form.get('order');
  }

  downloadCompetitions() {
    console.log('&&&');
    const request = {
      search: this.savedForm,
      order: this.orders[this.savedForm.order],
      page: this.pageSearch.value,
      language: this.langService.getLanguage()
    };
    const searchNumber = this.searchNumber;
    this.listService.getCompetitionListBySearch(request).subscribe(data => {

      // @ts-ignore
      this.competitionList = data.rows;

      this.competitionList.forEach(competition => {
        this.downloadService.setCompetition(competition);
      });

      // @ts-ignore
      this.maxPage = Math.ceil(data.total / 10);

      this.generatePageNumbers();
      if(this.pageSearch.value > this.maxPage) {
        this.pageSearch.setValue(this.maxPage);
      }
      // @ts-ignore
      this.totalResults = data.total;
      // @ts-ignore
      this.downloading = false;
    });

  }
  showCompetitions() {
    if (this.langService.editable) {
      return;
    }



    this.downloadStarted = true;
    this.savedForm = JSON.parse(JSON.stringify(this.form.value));
    this.page = 1;
    // this.wineList = [];
    this.totalResults = null;
    this.downloadCompetitions();
  }


  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }

  getImage(row) {
    if (row.has_image) {
      return environment.awardImageStore + `${row.id + '_' + row.image}.png`;

    } else {
      return this.imagePlaceholder.getImagePlaceholder(row, 'card');
    }
  }

  generatePageNumbers() {
    this.pagesNumbers.length = 0;
    for (let i = 0; i < this.maxPage; i++) {
      this.pagesNumbers.push(
        {
          name: (i * 1 + 1 + ''),
          value: i + 1
        }
      );
    }
  }


  orderTableBy(order) {
    this.order.setValue(order);
  }
  getSortingClass(sortarr) {
    let isOrdered = false;
    sortarr.forEach(sort => {
      if (this.order.value == sort) {
        isOrdered = true;
      }
    });
    if (isOrdered) {
      return 'sorting-col';
    } else {
      return '';
    }
  }

  choseCompetition(c) {
    this.competitionId.setValue(c.id);
  }
  chosePrize(c, p) {
    this.competitionId.setValue(c.id);
    this.prizeId.setValue(p.id);
  }

  getCompetitionName() {

    const competition = this.downloadService.getCompetitionById(this.competitionId.value);

    console.log(competition);

    // if(competition) {
    //   if(competition.commoninfo.language == langService.getLanguage() && competition.commoninfo.name_national)
    // }



  }

  getAwardName() {
    const award = this.downloadService.getAwardById(this.prizeId.value);

    console.log(award);

  }
  clearCompetition() {
    this.competitionId.setValue(0);

  }
  clearAward() {
    this.prizeId.setValue(0);

  }

}
