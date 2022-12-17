import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {LanguageServiceService} from '../../services/language-service.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {CookieService} from 'ngx-cookie-service';
import {AccountServiceService} from '../../services/account-service.service';
import {MatDialog} from '@angular/material/dialog';
import {PlaceOfOriginComponent} from '@src/app/schemas/place-of-origin/place-of-origin.component';
import {LanguageListComponent} from '@src/app/language/language-list/language-list.component';
import {ListsService} from '@src/app/services/api/lists.service';
import {RequestsService} from '@src/app/services/api/requests.service';

@Component({
  selector: 'app-language-panel',
  templateUrl: './language-panel.component.html',
  styleUrls: ['./language-panel.component.css']
})
export class LanguagePanelComponent implements OnInit {
// @ts-ignore
  cookies: Observable;
  cssMainNames = {
    font: '40px'
  };
  roleList = [];
  roleLoading = true;
  me = {type: 'person', name: ''};

  form = new FormGroup({
    role: new FormControl(0),
    file: new FormControl(''),
  });

  languageArr = [];


  url = null;
  imageLink;
  fileToUpload: File = null;
  noImage = '../../../assets/icons/placeholder-wine.svg';
  isImageChanged = false;

  isCurrentOpen = false;

// @ts-ignore
  @ViewChild('navigation') private navigationRef: ElementRef;

  @HostListener('document:keydown.control.f2', ['$event'])
  langHandlerQ(event: KeyboardEvent) {
    this.switchEdition();
  }

  @HostListener('document:keydown.meta.f2', ['$event'])
  langHandlerMacQ(event: KeyboardEvent) {
    this.switchEdition();
  }



  @HostListener('document:keydown.control.f1', ['$event'])
  langHandlerX(event: KeyboardEvent) {
    this.openCurrentPageMap();
  }

  @HostListener('document:keydown.meta.f1', ['$event'])
  langHandlerMacX(event: KeyboardEvent) {
    this.openCurrentPageMap();
  }



  @HostListener('document:keydown.control.f3', ['$event'])
  langHandlerF3(event: KeyboardEvent) {
    this.switchEditionUniversal();
  }

  @HostListener('document:keydown.meta.f3', ['$event'])
  langHandlerMacF3(event: KeyboardEvent) {
    this.switchEditionUniversal();
  }


  constructor(public langService: LanguageServiceService,
              private listService: ListsService,
              private cookieObserver: CookieObserverService,
              public cookieService: CookieService,
              private accountService: AccountServiceService,
              private service: RequestsService,
              public dialog: MatDialog,
              ) { }

  ngOnInit() {



    this.listService.getAutodescriptionsList().subscribe(data => {
      // @ts-ignore
      const schemas = data.rows;

      const langArr = [];
      schemas.forEach(row => {
        // this.schemasMap.set(row.id, row);
        // this.form.addControl('description_' + row.id, new FormControl());

        langArr.push({value: 'schema_' + row.id, name: row.code});
      });
      // this.schemasArr = Array.from(this.schemasMap.values());
      this.langService.schemasLanguagesArrSubject.next(langArr);
      this.languageArr = langArr;
    });

    // this.language.valueChanges.subscribe(v => {
    //   this.langService.schemaLanguage = v;
    // });


    // console.log(this.router.url)
    // $('#icn-wines').attr('stroke', '#009900');
    // $( "mat-icon" ).on( "click", function() {
    //   console.log( '!!!!!' );
    //
    //   $('#icn-wines').attr('stroke', '#009900');
    // });
    this.cookies = this.cookieObserver.observeCookie();
    this.cookieObserver.cookieObserver.subscribe(q => {
      this.me.name = q.login;
      const idData = {
        myId: this.cookieService.get('myId'),
        passwordHash: this.cookieService.get('hash')
      };
      if (q.id && this.roleLoading) {
        this.roleLoading = false;
      }
    });

    this.cookieObserver.cookieChanged();

    this.accountService.roles.subscribe(x => {
// @ts-ignore
      this.roleList = x;
      this.form.get('role').valueChanges.subscribe(idOption => {
        const chosenRole = this.roleList.filter(role => {
          return role.idOption == idOption;
        })[0];
        this.accountService.currentRole.next(chosenRole);
      });
    });

  }
  changeLanguage(language) {
    this.langService.setLanguage(language);
  }
  switchEdition() {
    this.langService.switchEdition();
  }
  switchEditionUniversal() {
    this.langService.switchEditionUniversal();
  }
  switchHistory() {
    this.langService.forcedLanguageArrayLoadingForLanguage(this.langService.language).subscribe();
    this.langService.switchHistory();
  }
  sendDataColor() {
    return this.langService.isChanged ? 'btn-warning' : 'btn-primary';
  }
  sendTranslationDataColor() {
    return this.langService.isNewTranslationPlace ? 'btn-warning' : 'btn-primary';
  }

  get language() {
    return this.langService.form.get('language');
  }
  getHeight() {
    console.log(this.navigationRef);
    if(this.navigationRef && this.navigationRef.nativeElement && this.navigationRef.nativeElement.offsetHeight) {
// @ts-ignore
      return this.navigationRef.nativeElement.offsetHeight;
    } else {
      return 0;
    }
  }

  // openCurrentPageMap() {
  //   console.log(this.langService.getCurrentPageMap());
  // }



  openCurrentPageMap(): void {
    if (this.langService.editable) {
      return;
    }

    if(this.isCurrentOpen) {
      this.isCurrentOpen = false;
      return;
    }

    this.isCurrentOpen = true;
    const dialogRef = this.dialog.open(LanguageListComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.isCurrentOpen = false;

    });
  }


  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
      }
      this.fileToUpload = event.target.files.item(0);

      this.isImageChanged = true;

      this.service.setLanguageTable(this.fileToUpload).subscribe();
    }
  }
  deleteImage() {
    if (this.langService.editable) {
      return;
    }
    this.imageLink = null;
    this.fileToUpload = null;
    this.isImageChanged = true;
  }

}
