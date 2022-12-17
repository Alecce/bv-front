import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DownloadDataServiceService} from '../../services/download-data-service.service';

@Component({
  selector: 'app-place-of-origin',
  templateUrl: './place-of-origin.component.html',
  styleUrls: ['./place-of-origin.component.css']
})
export class PlaceOfOriginComponent implements OnInit {

  countriesMap = new Map();
  regionesMap = new Map();

  counterData = null;

  countries = [];
  regiones = [];
  allRegiones = [];
  openEventListerner;


  outForm: FormGroup = null;

  form = new FormGroup({
    country: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),
  });

  constructor(
    public downloadService: DownloadDataServiceService,
    public dialogRef: MatDialogRef<PlaceOfOriginComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private route: Router) { }

  ngOnInit() {

    console.log(this.data);
    if(this.data.form) {
      this.outForm = this.data.form;
    }
    if(this.data.openEventListerner) {

      this.openEventListerner = this.data.openEventListerner;
    }

    this.country.setValue(this.data.country * 1);
    if (this.data.regionsForm) {
      // this.regionsForm.setValue(downloadData.geolocation.regions);
      for (let i = 0; i < 6; i++) {
        this.regionsForm.controls[i].setValue(this.data.regionsForm[i] * 1);

      }
    }

    this.service.getCountries().subscribe(data => {
      data = this.langService.sortByTranslate('country_names', '', 'name', data, 'name');
      this.langService.languageChanged.subscribe(() => {
        this.countries = this.langService.sortByTranslate('country_names', '', 'name', this.countries, 'name');
      });
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x);
      });
      this.filterRegiones();
      this.service.getRegiones().subscribe(data => {
// @ts-ignore
        this.regiones = data;


        this.regiones.forEach(x => {

          this.regionesMap.set(x.id, x);
        });
        this.filterRegiones();



        if(this.data.form) {


          this.recount();


        }
        if(this.data.reloadEventListerner) {

          this.data.reloadEventListerner.subscribe(() => {

            this.recount();
          });


        }

      });
    });

    this.country.valueChanges.subscribe((v) => {
      this.clearNext(0);
      this.filterRegiones();
      if(this.outForm) {
        this.outForm.get('country').setValue(v);
      }
    });
    for (let i = 0; i < 6; i++) {
      this.regionsForm.controls[i].valueChanges.subscribe((v) => {

        this.clearNext(i + 1);
        this.filterRegiones();
        if(this.outForm) {
          (this.outForm.get('regionsForm') as FormArray).at(i).setValue(v);
        }
      });
    }


  }

  recount() {

    const counts = this.downloadService.getWinelistData();

    // console.log(counts);


    if (counts) {
      const counterData = {
        region1: {},
        region2: {},
        region3: {},
        region4: {},
        region5: {},
        region6: {},
        country: {},

      };



      // <span *ngIf="counterData"> ({{counterData.additional_property[wst.id]}})</span>

      this.regiones.forEach(region => {
        counterData.region1[region.id] = 0;
        counterData.region2[region.id] = 0;
        counterData.region3[region.id] = 0;
        counterData.region4[region.id] = 0;
        counterData.region5[region.id] = 0;
        counterData.region6[region.id] = 0;
      });


      this.countries.forEach(country => {
        counterData.country[country.id] = 0;
      });

      counts.forEach(downloadedData => {

        // console.log(downloadedData);
        Object.keys(counterData).forEach(counterDataType => {

          Object.keys(counterData[counterDataType]).forEach(counterDataValue => {


            // console.log(counterData, counterDataType, counterDataValue);
            if (downloadedData[counterDataType] == counterDataValue) {
              counterData[counterDataType][counterDataValue] += downloadedData.counter;
            }
          });
        });

        this.counterData = counterData;
      });
    }
  }
  get country() {
    return this.form.get('country');
  }
  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
  }
  filterRegiones() {
    // console.log((this.regionsForm as FormArray).value);
    this.allRegiones[0] = [];
    this.allRegiones[0] = this.regiones.filter(region => {

      const parent = this.countriesMap.get(this.country.value * 1);
      if (!parent) {
        return false;
      }
      return this.ifChild(region.index, parent.index);

    });
    for (let i = 1; i < 6; i++) {
      this.allRegiones[i] = [];

      const parent = this.regionesMap.get((this.regionsForm as FormArray).at(i - 1).value * 1);

      this.allRegiones[i] = this.regiones.filter(region => {
        if (!parent) {
          return false;
        }


        return this.ifChild(region.index, parent.index);
        // return region.parent == (this.regionsForm as FormArray).at(i - 1).value;
      });
    }
  }

  ifChild(child, parent) {
    const patternForChild = new RegExp('(^\\d*?)(?:(00)*$)');

    const leadingIndexChildArr = child.match(patternForChild);
    let leadingIndexChild = leadingIndexChildArr[1];
    if (leadingIndexChild.length > 3) {
      leadingIndexChild = leadingIndexChild.slice(0, -2);
    }
    const patternForSearchIn = new RegExp('(^' + leadingIndexChild + ')(?=(00)*$)');
    return patternForSearchIn.test(parent);
  }

  clearNext(level) {
    if (level < 6) {
      this.regionsForm.at(level).setValue(0);
    }
  }
  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }


  reloadCountsOnOpeningSelect(select, defaultValue) {

    console.log(select);
    console.log(defaultValue);
    if(this.openEventListerner) {
      const obj = {
        select, defaultValue
      };
      this.openEventListerner.next(obj);
    }
  }
}
