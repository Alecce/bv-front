import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ListsService} from '@src/app/services/api/lists.service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {FormControl, FormGroup} from '@angular/forms';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {

  ORIGINAL = 'original';
  ENGLISH = 'english';
  TEXT = 'text';
  RESULT = 'result';
  IS_CHANGED = 'isChanged';

  list = [];

  languageArr = [];

  form = new FormGroup({
    // newRow: new FormGroup({}),

    file: new FormControl(''),
    english: new FormControl(''),
    editing: new FormControl(''),
    element: new FormControl(''),
    isTranslated: new FormControl('not important'),

  });
  chosenOptionForm = new FormGroup({
    firstLanguage: new FormControl('english'),
    secondLanguage: new FormControl('')
  });
  order = {
    name: this.TEXT,
    direction: true,
    page: 1,
  };



  url = null;
  imageLink;
  fileToUploadLangList: File = null;
  noImage = '../../../assets/icons/placeholder-wine.svg';
  isImageChanged = false;

  @HostListener('document:keydown.control.f1', ['$event'])
  langHandlerX(event: KeyboardEvent) {
    this.close();
  }

  @HostListener('document:keydown.meta.f1', ['$event'])
  langHandlerMacX(event: KeyboardEvent) {
    this.close();
  }


  constructor(
    public downloadService: DownloadDataServiceService,
    public dialogRef: MatDialogRef<LanguageListComponent>,
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

  ngOnInit(): void {
    this.getData();

    this.form.valueChanges.subscribe(() => {
      this.getData();
    });


    this.listService.getAutodescriptionsList().subscribe(data => {
      // @ts-ignore
      const schemas = data.rows;

      const langArr = [];
      schemas.forEach(row => {
        // this.schemasMap.set(row.id, row);
        // this.form.addControl('description_' + row.id, new FormControl());

        langArr.push({value: 'schema_' + row.id, name: row.code, relativeLanguage: row.language});
      });
      // this.schemasArr = Array.from(this.schemasMap.values());
      this.langService.schemasLanguagesArrSubject.next(langArr);
      this.languageArr = langArr;
    });


    console.log(Array.from(this.langService.getCurrentPageMap().values()));
  }

  getTableData(){
    const arr = Array.from(this.langService.getCurrentPageMap().values());

    const setPages = new Set();

    arr.forEach(x => {
      setPages.add(x.page);
    })

    const req = {
      language: this.langService.getLanguage(),

      autodescription: false,
      arr,
      setPages: Array.from(setPages)
    };
    this.service.getLanguageTable(req).subscribe(
      data => {

        const name = 'bonvino ' + this.langService.getLanguage();
// @ts-ignore
        FileSaver.saveAs(data, name);
      }
      )
  }

  getFullTableData(){

    const req = {
      language: this.langService.getLanguage(),
      full: true,
      // arr,
      // setPages: Array.from(setPages)
    };

    this.service.getLanguageTable(req).subscribe(
      data => {

        const name = 'bonvino ' + this.langService.getLanguage();
// @ts-ignore
        FileSaver.saveAs(data, name);
      }
    )
  }

  getGeneratorTableData(){

    const lang = this.langService.schemaLanguage.value;
    // const schemaId = this.langService.schemaLanguage.value ? lang.substr(7) : '';

    console.log(this.languageArr);
    const language = this.languageArr.find(x => {
      return x.value == this.langService.schemaLanguage.value;
    });
    const req = {
      language: lang,
      baseLanguage: this.langService.getLanguage(),
      autodescription: true,
      // arr,
      // setPages: Array.from(setPages)
    };


    const langName = language && language.name ? language.name : 'error';
    this.service.getLanguageTable(req).subscribe(
      data => {

        const name = 'bonvino generator ' + langName;
// @ts-ignore
        FileSaver.saveAs(data, name);
      }
    )
  }

  get english() {
    return this.form.get('english');
  }
  get editing() {
    return this.form.get('editing');
  }
  get element() {
    return this.form.get('element');
  }
  get isTranslated() {
    return this.form.get('isTranslated');
  }
  changeOrder(name) {
    if (this.langService.editable) {
      return;
    }
    if (this.order.name !== name) {
      this.order.name = name;
      this.order.direction = true;
    } else {
      this.order.direction = !this.order.direction;
    }
    this.getData();
  }

  setPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.order.page = page;
    this.getData();
    return page;
  }


  getData() {

    this.list.length = 0;

    const map = this.langService.getCurrentPageMap();
    map.forEach((value, key) => {
      // console.log(key);
      // console.log(value);
      if(value.counter > 0) {
        this.list.push({page: value.page, segment: value.segment, place: value.place, default: value.default, type: value.type});
      }
    });

    // console.log(map);
    // const map = this.langService.getCu();
    // map.forEach((value, key) => {
    //   // console.log(key);
    //   // console.log(value);
    //   if(value.counter > 0) {
    //     this.list.push({page: value.page, segment: value.segment, place: value.place, default: value.default, type: value.type});
    //   }
    // });

    this.sortList();

    // console.log(this.list);
  }
  getValueInEnglish(row) {
    return this.langService.getTextInEnglish(row.page, row.segment, row.place) || row.default;
  }
  getValueInCurrentLanguage(row) {
    return this.langService.getText(row.page, row.segment, row.place) || '';
  }
  getValueAsResult(row) {
    return this.getValueInCurrentLanguage(row) || this.getValueInEnglish(row);
  }
  isChanged(row) {
    return !!this.langService.getText(row.page, row.segment, row.place);
  }
  sortList() {

    if(this.english.value !== '') {
      this.list = this.list.filter(x => {
        if(this.getValueInEnglish(x)) {
          return this.getValueInEnglish(x).toLowerCase().includes(this.english.value.toLowerCase());
        }
      })
    }
    if(this.editing.value !== '') {
      this.list = this.list.filter(x => {
        if(this.getValueInCurrentLanguage(x)) {
          return this.getValueInCurrentLanguage(x).toLowerCase().includes(this.editing.value.toLowerCase());
        }
      })
    }
    if(this.element.value !== '') {
      this.list = this.list.filter(x => {
        if(this.getValueInCurrentLanguage(x)) {
          return this.getValueInCurrentLanguage(x).toLowerCase().includes(this.element.value.toLowerCase());
        }
      })
    }
    if(this.isTranslated.value === 'yes') {
      this.list = this.list.filter(x => {
        return this.isChanged(x);
      })
    }
    if(this.isTranslated.value === 'no') {
      this.list = this.list.filter(x => {
        return !this.isChanged(x);
      })
    }

    if(this.order.name == this.ENGLISH) {
      this.list.sort((a, b) => {
// @ts-ignore
        return (this.getValueInEnglish(a) >= this.getValueInEnglish(b)) - 0.5;
      })
    }

    if(this.order.name == this.TEXT) {
      this.list.sort((a, b) => {
// @ts-ignore
        return (this.getValueInCurrentLanguage(a) >= this.getValueInCurrentLanguage(b)) - 0.5;
      })
    }

    if(this.order.name == this.RESULT) {
      this.list.sort((a, b) => {
// @ts-ignore
        return (this.getValueAsResult(a) >= this.getValueAsResult(b)) - 0.5;
      })
    }

    if(this.order.name == this.IS_CHANGED) {
      this.list.sort((a, b) => {
// @ts-ignore
        return (this.isChanged(a) >= this.isChanged(b)) - 0.5;
      })
    }

    if(!this.order.direction) {
      this.list.reverse();
    }


    // this.list.forEach((value, key) => {
    //   console.log(this.getValueInCurrentLanguage(value));
    // })

    // for(let j = 1; j < this.list.length; j++) {
    //
    //   console.log(this.getValueInCurrentLanguage(this.list[j - 1]));
    //   console.log(this.getValueInCurrentLanguage(this.list[j]));
    //   console.log((this.getValueInCurrentLanguage(this.list[j - 1]) >= this.getValueInCurrentLanguage(this.list[j])) - 0.5);
    // }
  }

  paint(row) {
    this.langService.paint(row.page, row.segment, row.place);
  }
  switchEdition() {
    this.langService.switchEdition();
  }

  close(): void {
    this.dialogRef.close();
  }
  sendDataColor() {
    return this.langService.isChanged ? 'btn-warning' : 'btn-primary';
  }


  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
      }
      this.fileToUploadLangList = event.target.files.item(0);

      this.isImageChanged = true;

    }
  }
  deleteImage() {
    if (this.langService.editable) {
      return;
    }
    this.imageLink = null;
    this.fileToUploadLangList = null;
    this.isImageChanged = true;
  }

  sendTable() {
    if(this.fileToUploadLangList) {
      this.service.setLanguageTable(this.fileToUploadLangList).subscribe();
    }

  }
}
