import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '@src/environments/environment';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {debounceTime} from 'rxjs/operators';
import {ListsService} from '@src/app/services/api/lists.service';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {


  LANGUAGE_CURRENT_PAGE = 'person_search';


  orders = {
    login: {name: 'login', direction: true},
    login_reverse: {name: 'login', direction: false},

    fname: {name: 'fname', direction: true},
    fname_reverse: {name: 'fname', direction: false},

    lname: {name: 'lname', direction: true},
    lname_reverse: {name: 'lname', direction: false},
  };

  pagesNumbers = [];

  chosenId = new FormControl('');

  form = new FormGroup({
    login: new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    pageSearch: new FormControl(1),
    order: new FormControl('login'),
  });

  noImage = '../../../assets/icons/placeholder-wine.svg';

  userList = [];
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
    public dialogRef: MatDialogRef<PersonSearchComponent>,
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

    this.showUsers();
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        // pairwise()
      ).subscribe(() => {

        // if (this.downloadStarted && oldValue.wineryHelper === newValue.wineryHelper) {
          this.showUsers();
        // }


      });


  }

  get login() {
    return this.form.get('login');
  }
  get fname() {
    return this.form.get('fname');
  }
  get lname() {
    return this.form.get('lname');
  }
  get pageSearch() {
    return this.form.get('pageSearch');
  }
  get order() {
    return this.form.get('order');
  }

  downloadUsers() {
    console.log('&&&');
    const request = {
      search: this.savedForm,
      order: this.orders[this.savedForm.order],
      page: this.pageSearch.value,
      language: this.langService.getLanguage()
    };
    const searchNumber = this.searchNumber;
    this.listService.getUserListBySearch(request).subscribe(data => {

      // @ts-ignore
      this.userList = data.rows;

      this.userList.forEach(user => {
        this.downloadService.setPerson(user);
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
  showUsers() {
    if (this.langService.editable) {
      return;
    }



    this.downloadStarted = true;
    this.savedForm = JSON.parse(JSON.stringify(this.form.value));
    this.page = 1;
    // this.wineList = [];
    this.totalResults = null;
    this.downloadUsers();
  }


  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }

  getImage(row) {
    if (row.has_image) {
      return environment.userImageStore + `${row.id + '_' + row.has_image}.png`;

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

  choseUser(user) {
    this.chosenId.setValue(user.id);
  }
}
