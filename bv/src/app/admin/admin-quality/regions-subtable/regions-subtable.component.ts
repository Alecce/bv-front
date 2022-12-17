import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '../../../services/language-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RequestsService} from '../../../services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-regions-subtable',
  templateUrl: './regions-subtable.component.html',
  styleUrls: ['./regions-subtable.component.css']
})
export class RegionsSubtableComponent implements OnInit, AfterViewInit {
  public tab = 'grapes';
  routeData = {editable: true};


  editable = false;

  countries = [];
  regiones = [];
  allRegiones = [];

  form = new FormGroup({
    country_id: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),
  });

  constructor(private service: RequestsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<RegionsSubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {
    this.service.getCountries().subscribe(countryData => {
// @ts-ignore
      this.countries = countryData;
      // console.log(data);
      this.country_id.valueChanges.subscribe(() => {
        this.clearNext(0);
        this.filterRegiones();
      });
      for (let i = 0; i < 6; i++) {
        this.regionsForm.controls[i].valueChanges.subscribe(() => {

          this.clearNext(i + 1);
          this.filterRegiones();
        });
      }

      this.service.getRegiones().subscribe(regionsData => {
// @ts-ignore
        this.regiones = regionsData;
        this.filterRegiones();

        this.downloadedData.subscribe(response => {
          console.log(response);
          // Object.keys(this.form.controls).forEach(key => {
          //   if (response.hasOwnProperty(key) && this.form.get(key) instanceof FormControl) {
          //     this.form.get(key).setValue(response[key]);
          //   }
          // });
          this.country_id.setValue(response.country);
// @ts-ignore
          if (response.regions) {
            for (let i = 0; i < 6; i++) {
// @ts-ignore
              this.regionsForm.controls[i].setValue(response.regions[i]);
            }
          }

        });
      });
    });
  }
  get country_id() {
    return this.form.get('country_id');
  }
  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
  }

  existIn(arr, el) {
    let res = false;
    arr.forEach(x => {
      if (x.id == el.id) {
        res = true;
      }
    });
    return res;
  }
  ngAfterViewInit(): void {

  }

  filterRegiones() {
    console.log((this.regionsForm as FormArray).value);
    this.allRegiones[0] = [];
    this.allRegiones[0] = this.regiones.filter(region => {
      return region.parent == this.country_id.value;
    });
    for (let i = 1; i < 6; i++) {
      this.allRegiones[i] = [];
      this.allRegiones[i] = this.regiones.filter(region => {
        return region.parent == (this.regionsForm as FormArray).at(i - 1).value;
      });
    }
  }
  clearNext(level) {
    if (level < 6) {
      this.regionsForm.at(level).setValue(0);
    }
  }


  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    return {
      country: this.country_id.value,
      regions: this.regionsForm.value,
    };
  }
}
