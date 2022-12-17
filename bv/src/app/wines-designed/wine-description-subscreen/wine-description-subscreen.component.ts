import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {Overlay} from '@angular/cdk/overlay';
import {RequestsService} from '@src/app/services/api/requests.service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsService} from '@src/app/services/api/lists.service';
import {SuperComponentWithTabsComponent} from '@src/app/schemas/super-component-with-tabs/super-component-with-tabs.component';
import {WineAutodecriptionComponent} from '@src/app/wines-designed/wine-autodecription/wine-autodecription.component';
import {WineDescriptionComponent} from '@src/app/wines-designed/wine-description/wine-description.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-wine-description-subscreen',
  templateUrl: './wine-description-subscreen.component.html',
  styleUrls: ['./wine-description-subscreen.component.css']
})
// @ts-ignore
export class WineDescriptionSubscreenComponent extends SuperComponentWithTabsComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild(WineDescriptionComponent) textDescriptionTab: WineDescriptionComponent;
  // @ts-ignore
  @ViewChild(WineAutodecriptionComponent) autodescriptionTab: WineAutodecriptionComponent;

  tabs = {
    autodescription: 'autodescription',
    descriptionSelect: 'descriptionSelect',
  };
  tab = this.tabs.descriptionSelect;
  childMap = new Map();

  tabsData = [
    {
      page: 'wines',
      default: 'Text description select',
      tab: this.tabs.descriptionSelect,
      onlyBusiness: false,
      disabledForYou: false,
    },
    {
      page: 'wines',
      default: 'Text description generator',
      tab: this.tabs.autodescription,
      onlyBusiness: false,
      disabledForYou: false,
    },
  ];
  tabSubject = new ReplaySubject(10);

  descriptionsSubject = new ReplaySubject(10);
  generatedDescriptionSubject = new ReplaySubject(10);
  downloadedData = new ReplaySubject(10);


  idSpecialist = 0;

  roleList = [];
  roleLoading = true;


  wineId = 0;


  form = new FormGroup({

    role: new FormControl(0),
  });

  constructor(
    private cookieObserver: CookieObserverService,
    public dialogRef: MatDialogRef<WineDescriptionSubscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    public listService: ListsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    public langService: LanguageServiceService,
    public overlay: Overlay,
    private router: Router,
    private snackBar: MatSnackBar,
    public accountService: AccountServiceService,
    ) {
    super(service,
      activatedroute,
      cookieService,
      router,
      langService,
      snackBar);


    dialogRef.disableClose = true;
  }

  ngOnInit(): void {

    this.getPreviousDescription();

    this.tabSubject.subscribe(tab => {
      this.chosenTab = tab;
    });


    this.data.subscribe(x => {
      console.log(x);
      this.wineId = x.id;
    });

    this.accountService.currentRole.subscribe(role => {
      // @ts-ignore
      if (true || role.type == 'specialist') {
        // @ts-ignore
        this.idSpecialist = role.idBisness;

        this.getPreviousDescription();
      }
    });



    this.accountService.roles.subscribe(x => {
      console.log(x);
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

  getTabColor(tab) {


    if (this.chosenTab == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
    // if (this.chosenTab == tab) {
    //   return 'btn-secondary';
    // } else {
    //   return 'btn-info';
    // }
  }

  ngAfterViewInit(): void {

    this.childMap.set(this.tabs.autodescription, this.autodescriptionTab);
    this.childMap.set(this.tabs.descriptionSelect, this.textDescriptionTab);


    // this.choseStartingTab(this.childMap, this.textDescriptionTab);

    this.tabSubject.next(this.tabs.descriptionSelect);
  }

  showTab(tab) {
    return this.chosenTab == tab;
  }


  submit() {
    if (this.langService.editable) {
      return;
    }
    const descriptionData = {
      idUser: this.cookieService.get('myId'),
      idSpecialist: this.accountService.getSpecialistId(),
      idWine: this.wineId,
      descriptions: this.textDescriptionTab.getFormValue(),
      generator_data: this.autodescriptionTab.getFormValue(),
    };

    console.log(this.accountService.getSpecialistId());


    this.service.descriptionForWine(descriptionData).subscribe(() => {
      // this.getPreviousVotes();
    });
  }

  getPreviousDescription() {
    this.service.getMyDescription({idWine: this.wineId}).subscribe(description => {
      console.log(description);

      let autodescription = null;

      // @ts-ignore
      if(description.generations && description.generations.generator_data) {
        // @ts-ignore
        autodescription = description.generations.generator_data;
      }


      // @ts-ignore
      const subj = {
        autodescription,
        // @ts-ignore
        textDescriptionDB: JSON.stringify(description.descriptions),
      };
      // this.previousVotes = votes;
      this.downloadedData.next(subj);
    });
  }
  get role() {
    return this.form.get('role');
  }

  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }
}
