import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {CookieService} from 'ngx-cookie-service';
import {ExistedSchemaFormComponent} from '@src/app/schemas/existed-schema-form/existed-schema-form.component';
import {SubblockInputBonvinoComponent} from '@src/app/schemas/subblock-input-bonvino/subblock-input-bonvino.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AdditionalSchemaComponent} from '@src/app/schemas/additional-schema/additional-schema.component';
import {PersonSearchComponent} from '@src/app/schemas/person-search/person-search.component';
import {InputData} from '@src/app/business-designed/business-designed.component';

@Component({
  selector: 'app-additional-search-schema',
  templateUrl: './additional-search-schema.component.html',
  styleUrls: ['./additional-search-schema.component.css']
})
export class AdditionalSearchSchemaComponent implements OnInit {

  type = '';
  id = '';
  businessName = '';
  businessType = '';

  countries = [];

  structure: InputData[][] = [];
  form = new FormGroup({


  });

  avaliableScemas = {};
  schemaCounter = {};

  formLoadingFromShema = new FormGroup({


  });

  currentTabStructure = [];

  subTab = '';
  // // @ts-ignore
  // @Input() currentSubTab: Subject;
  // // @ts-ignore
  // @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() structureData: Subject;
  // // @ts-ignore
  // @Input() menuData: FormGroup;
  // // @ts-ignore
  // @Input() noMenuData = false;
  // // @ts-ignore
  // @Input() additionalTabs: Subject;
  // // @ts-ignore
  // @Input() request;

  schemaSelectListerner = new ReplaySubject(10);

  // @ts-ignore
  @ViewChild(AdditionalSchemaComponent) additionalTab: AdditionalSchemaComponent;


  @ViewChildren(SubblockInputBonvinoComponent) subblocks!: QueryList<SubblockInputBonvinoComponent>;

  triggers = {};
  checkTriggers = {};

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public dialog: MatDialog,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService,
              public downloadingService: DownloadDataServiceService,
              public additionalService: AdditionalServiceService) { }

  ngOnInit() {



    // console.log(this.menuData);

    this.downloadingService.getCountries().subscribe(data => {
      data = this.langService.sortByTranslate('country_names', '', 'name', data, 'name');
      this.langService.languageChanged.subscribe(() => {
        this.countries = this.langService.sortByTranslate('country_names', '', 'name', this.countries, 'name');
      });
// @ts-ignore
      this.countries = data;
    });

    this.form.valueChanges.subscribe(v => {
      this.additionalService.setChange(this.form.value);
    });


    this.structureData.subscribe((data: InputData[]) => {

      // console.log(data);
      // data = this.sortSubBlocks(data);

      console.log(data);
      this.transformAdditionalData(data);


      // this.getTabs(data);

      this.additionalService.setStructure(data);

      console.log(this.form.value);


    });


    // console.log(this.subblocks);

  }

  private transformAdditionalData(data: InputData[]) {
    this.additionalService.transformAdditionalForSearch(data, this.structure, this.form);
    this.createTriggers(data);
    this.currentTabStructure = this.structure;

    console.log(this.currentTabStructure);
    // this.additionalService.getExistedSchemas(this.formLoadingFromShema, this.structure, this.avaliableScemas, this.schemaSelectListerner, this.schemaCounter);
  }



  private sortSubBlocks(data: InputData[]) {

    return this.additionalService.sortSubBlocks(data, this.structure, this.form);

  }
  getAdditionalData() {

    return this.form.value;
  }


  getTabs(data) {
    // this.additionalTabs.next(this.additionalService.getTabs(data));
  }

  getStructureForTab() {
    return this.additionalService.getStructureForTab(this.structure, this.subTab);
  }



  jsonStrigify(data) {
    return JSON.stringify(data);
  }

  openUserSelect(place): void {
    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(PersonSearchComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: this.form.value
    });

    dialogRef.afterClosed().subscribe(result => {

      place.setValue(result);

    });
  }


  openExistedSchemaPanel(block): void {
    if (this.langService.editable) {
      return;
    }

    const data = {
      formLoadingFromShema: this.formLoadingFromShema,
      structure: this.structure,
      avaliableScemas: this.avaliableScemas,
      schemaSelectListerner: this.schemaSelectListerner,
      form: this.form,
      block
    };

    const dialogRef = this.dialog.open(ExistedSchemaFormComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);

      this.formLoadingFromShema.get(block + '').setValue(result.id);
    });
  }

  public getData() {
    return this.form.value;
  }

  createTriggers(data) {
    data.forEach(x => {
      const trigger = new ReplaySubject(10);

      this.checkTriggers[x.block_id + ''] = false;

      trigger.subscribe(t => {
        this.checkTriggers[x.block_id + ''] = t;
      });
      this.triggers[x.block_id] = trigger;


    })
  }
}
