import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {ReplaySubject, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {CookieService} from 'ngx-cookie-service';
import {SubblockInputBonvinoComponent} from '@src/app/schemas/subblock-input-bonvino/subblock-input-bonvino.component';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {PersonSearchComponent} from '@src/app/schemas/person-search/person-search.component';
import {ExistedSchemaFormComponent} from '@src/app/schemas/existed-schema-form/existed-schema-form.component';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-additional-schema',
  templateUrl: './additional-schema.component.html',
  styleUrls: ['./additional-schema.component.css']
})
export class AdditionalSchemaComponent implements OnInit {

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
  // @ts-ignore
  @Input() currentSubTab: Subject;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() structureData: Subject;
  // @ts-ignore
  @Input() menuData: FormGroup;
  // @ts-ignore
  @Input() noMenuData = false;
  // @ts-ignore
  @Input() additionalTabs: Subject;
  // @ts-ignore
  @Input() request;

  schemaSelectListerner = new ReplaySubject(10);

  // @ts-ignore
  @ViewChild(AdditionalSchemaComponent) additionalTab: AdditionalSchemaComponent;


  @ViewChildren(SubblockInputBonvinoComponent) subblocks!: QueryList<SubblockInputBonvinoComponent>;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private accountService: AccountServiceService,
              private router: Router,
              public dialog: MatDialog,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService,
              public downloadingService: DownloadDataServiceService,
              private additionalService: AdditionalServiceService) { }

  ngOnInit() {

    // setInterval(() => { console.log(this.form.value) }, 3000);



    this.schemaSelectListerner.subscribe(req => {
      // console.log(data);
      this.service.getSchemaBlock(req).subscribe((res: any[]) => {

// @ts-ignore
        const full = res;


//         Object.keys(this.form.controls).forEach(key => {
//
//           if(key)
//
//           const isNotType = key.search('type') == -1;
// // @ts-ignore
//           if (this.form.get(key) instanceof FormControl && isNotType) {
// // @ts-ignore
//             this.form.get(key).setValue(full[key]);
//           }
// // @ts-ignore
//           if (this.form.get(key) instanceof FormArray) {
//
//             full[key].forEach((optionValue, index) => {
//               if ((this.form.get(key) as FormArray).length > index) {
// // @ts-ignore
//                 (this.form.get(key) as FormArray).at(index).setValue(optionValue);
//               }
//             });
//           }
//         })

        Object.keys(this.form.controls).forEach(key => {

          const isNotType = key.search('type') == -1;
// @ts-ignore
          if(key.search(req.block + '_') == 0 && isNotType) {
            if (this.form.get(key) instanceof FormControl) {
// @ts-ignore
              this.form.get(key).setValue('');
            }
// @ts-ignore
            if (this.form.get(key) instanceof FormArray) {

// @ts-ignore
              this.form.get(key).controls.forEach((optionValue, index) => {

// @ts-ignore
                (this.form.get(key) as FormArray).at(index).setValue('');
              });
            }

          }
          // console.log(key);
          // console.log(key.search('type') != -1);


// @ts-ignore
          if (this.form.get(key) instanceof FormControl && full[key] && isNotType) {
// @ts-ignore
            this.form.get(key).setValue(full[key]);
          }
// @ts-ignore
          if (this.form.get(key) instanceof FormArray && full[key]) {

            full[key].forEach((optionValue, index) => {
              if ((this.form.get(key) as FormArray).length > index) {
// @ts-ignore
                (this.form.get(key) as FormArray).at(index).setValue(optionValue);
              }
            });
          }
        });
      });


    });


    // console.log(this.menuData);

    this.downloadingService.getCountries().subscribe(data => {
      data = this.langService.sortByTranslate('country_names', '', 'name', data, 'name');
      this.langService.languageChanged.subscribe(() => {
        this.countries = this.langService.sortByTranslate('country_names', '', 'name', this.countries, 'name');
      });
// @ts-ignore
      this.countries = data;
      // this.countries.forEach(x => {
      //   this.countriesMap.set(x.id, x);
      // });
    });

    this.form.valueChanges.subscribe(v => {
      this.additionalService.setChange(this.form.value);
    });

    this.currentSubTab.subscribe(subTab => {
      // console.log(subTab);
      this.subTab = subTab;
      this.currentTabStructure = this.getStructureForTab();
    });

    const req = this.request;

    this.structureData.subscribe((data: InputData[]) => {

      // console.log(data);
      data = this.sortSubBlocks(data);

      // console.log(data);
      this.transformAdditionalData(data);


      this.getTabs(data);

      this.additionalService.setStructure(data);


      this.downloadedData.subscribe(fullData => {

        console.log(fullData);
// @ts-ignore
        if (fullData.additional) {
// @ts-ignore
          const full = JSON.parse(fullData.additional);


          Object.keys(this.form.controls).forEach(key => {
            // console.log(key);
            // console.log(key.search('type') != -1);

            const isNotType = key.search('type') == -1;

// @ts-ignore
            if (this.form.get(key) instanceof FormControl && full[key] && isNotType) {
// @ts-ignore
              this.form.get(key).setValue(full[key]);
            }
// @ts-ignore
            if (this.form.get(key) instanceof FormArray && full[key] && Array.isArray(full[key])) {

              console.log(full[key]);
              full[key].forEach((optionValue, index) => {
                if ((this.form.get(key) as FormArray).length > index) {
// @ts-ignore
                  (this.form.get(key) as FormArray).at(index).setValue(optionValue);
                }
              });
            }
          });
        }
      });
    });


    console.log(this.subblocks);

  }

  private transformAdditionalData(data: InputData[]) {
    this.additionalService.transformAdditional(data, this.structure, this.form);

    this.additionalService.getExistedSchemas(this.formLoadingFromShema, this.structure, this.avaliableScemas, this.schemaSelectListerner, this.schemaCounter);
  }



  private sortSubBlocks(data: InputData[]) {

    return this.additionalService.sortSubBlocks(data, this.structure, this.form);

  }
  getAdditionalData() {

    return this.form.value;
  }


  getTabs(data) {
    this.additionalTabs.next(this.additionalService.getTabs(data));
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
}
