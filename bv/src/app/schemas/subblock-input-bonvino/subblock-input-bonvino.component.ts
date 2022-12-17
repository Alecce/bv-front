import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {Subject} from 'rxjs';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {PersonSearchComponent} from '@src/app/schemas/person-search/person-search.component';

@Component({
  selector: 'app-subblock-input-bonvino',
  templateUrl: './subblock-input-bonvino.component.html',
  styleUrls: ['./subblock-input-bonvino.component.css']
})
export class SubblockInputBonvinoComponent implements OnInit {


  countries = [];
  subTab = '';
  structure: InputData[][] = [];
  // @ts-ignore
  @Input() type;
  // @ts-ignore
  @Input() schemaData;
  // @ts-ignore
  @Input() downloadedData: FormControl;
  // @ts-ignore
  @Input() subTabSubject: Subject;
  // @ts-ignore
  @Input() title: Subject;

  formSchema = new FormGroup({

  });

  form = new FormGroup({
    formArr: new FormArray([]),
  });

  constructor(
    private service: RequestsService,
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    public dialog: MatDialog,
    public langService: LanguageServiceService,
    private snackBar: MatSnackBar,
    public loadingService: LoadingServiceService,
    public downloadingService: DownloadDataServiceService,
    private additionalService: AdditionalServiceService

  ) { }

  ngOnInit(): void {
    // console.log(this.type);
    // console.log(this.schemaData);
    // console.log(this.downloadedData);


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

    this.subTabSubject.subscribe(subTab => {
      this.subTab = subTab;
    });
    this.transformAdditionalData(this.schemaData.children);

    // console.log(this.form.value);

    this.refresh();
    this.downloadedData.valueChanges.subscribe((v) => {

      console.log(v);
      this.refresh();
    });



    this.formArr.valueChanges.subscribe(value => {
      console.log(value);
      this.downloadedData.setValue(JSON.stringify(value), {emitEvent: false});
    })
  }

  refresh() {

    if(this.downloadedData.value) {
      try {

        const dd = JSON.parse(this.downloadedData.value);

        dd.forEach((v, i) => {

          this.addGroup(null);

          Object.keys((this.formArr.at(i) as FormGroup).controls).forEach(key => {



            const isNotType = key.search('type') == -1;
// @ts-ignore
            if (this.formArr.at(i).get(key) instanceof FormControl && v[key] && isNotType) {
// @ts-ignore
              this.formArr.at(i).get(key).setValue(v[key]);
            }
// @ts-ignore
            if (this.formArr.at(i).get(key) instanceof FormArray && v[key]) {

              v[key].forEach((optionValue, index) => {
                if ((this.formArr.at(i).get(key) as FormArray).length > index) {
// @ts-ignore
                  (this.formArr.at(i).get(key) as FormArray).at(index).setValue(optionValue);
                }
              });
            }
          });

        });


        this.downloadedData.setValue(JSON.stringify(this.formArr.value), {emitEvent: false});

      } catch (e) {

      }


    } else {

      while (this.formArr.length !== 0) {
        this.formArr.removeAt(0)
      }
    }
  }

  private transformAdditionalData(data: InputData[]) {
    this.additionalService.transformAdditional(data, this.structure, this.formSchema);
    // console.log(this.formSchema);
  }

  // getStructureForTab() {
  //   console.log(this.structure);
  //   return this.structure;
  // }

  getStructureForTab() {
    return this.additionalService.getStructureForTab(this.structure, this.subTab);
  }

  addGroup(wrap) {
    if (this.langService.editable) {
      return;
    }
    console.log(this.additionalService.getStructureForTab(this.structure, this.subTab));
    if (wrap) {
// @ts-ignore
      this.formArr.push(this.newGroup(wrap));
    } else {
      this.formArr.push(this.newBlancGroup());
    }
  }
  removeGroup(i) {
    if (this.langService.editable) {
      return;
    }
    this.formArr.removeAt(i);
  }
  get formArr(): FormArray {
    return this.form.get('formArr') as FormArray;
  }

  newBlancGroup() {
    // return JSON.parse(JSON.stringify(this.formSchema));
    return this.copyFormControl(this.formSchema);
  }
  newGroup(obj) {
    // return new FormGroup({
    //   total_bottles: new FormControl(pallet.total_bottles),
    //   total_boxes: new FormControl(pallet.total_boxes),
    //   barcode: new FormControl(pallet.barcode),
    //   weight: new FormControl(pallet.weight),
    //   lengths: new FormControl(pallet.lengths),
    //
    // });
  }

  copyFormControl(control: AbstractControl) {
    if (control instanceof FormControl) {
      return new FormControl(control.value);
    } else if (control instanceof FormGroup) {
      const copy = new FormGroup({});
      Object.keys(control.controls).forEach(key => {
        copy.addControl(key, this.copyFormControl(control.controls[key]));
      });
      return copy;
    } else if (control instanceof FormArray) {
      const copy = new FormArray([]);
      control.controls.forEach(control => {
        copy.push(this.copyFormControl(control));
      });
      return copy;
    }
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
}
