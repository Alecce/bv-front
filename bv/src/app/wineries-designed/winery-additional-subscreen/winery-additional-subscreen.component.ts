import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {InputData} from '../../business-designed/business-designed.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';

@Component({
  selector: 'app-winery-additional-subscreen',
  templateUrl: './winery-additional-subscreen.component.html',
  styleUrls: ['./winery-additional-subscreen.component.css']
})
export class WineryAdditionalSubscreenComponent implements OnInit {

  structure: InputData[][] = [];
  checkboxes = [];

  type = '';
  id = '';

  form = new FormGroup({


  });

  formMenu = new FormGroup({


  });

  wineryData = null;

  countries = [];
  regiones = [];
  countriesMap = new Map();
  regionesMap = new Map();

  tab;

  constructor(
    public dialogRef: MatDialogRef<WineryAdditionalSubscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private route: Router,
    private additionalService: AdditionalServiceService) { }

  ngOnInit() {


    this.tab = this.data.tab;

    this.data.additionalStructure.subscribe((data: InputData[]) => {


      this.additionalService.transformAdditional(data, this.structure, this.form);

      // this.additionalStructure.next(data);
      data.forEach((x: InputData) => {
        while (this.structure.length <= x.col_view - 1) {
          this.structure.push([]);
        }
        console.log(this.structure);
        console.log(x);

        const controlName = x.block_id + '_' + x.option_id;
        x.controlName = controlName;

        if (x.input_type == 3 || x.input_type == 5) {
          const options = x.select_data + '';
          x.select_options = [];
          options.split(',').forEach(opt => {
// @ts-ignore
            x.select_options.push({id: opt});
          });
          // x.select_options = options.split(',');
        }
        this.form.addControl(controlName, new FormControl());

        this.structure[x.col_view - 1].push(x);
      });

      this.structure.forEach(col => {
        col.sort((a, b) => {
          if (a.row_view != b.row_view) {
            return a.row_view - b.row_view;
          } else {
            return a.order_view - b.order_view;
          }
        });
      });

      const set = new Set();

      data.forEach((x: InputData) => {

        set.add(x.block_name);
      });

      const checkboxes = Array.from(set);

      checkboxes.forEach((cb: string) => {
        this.formMenu.addControl(cb, new FormControl(false));
      });


      console.log(checkboxes);
      console.log(this.form);

      this.checkboxes = checkboxes;

      this.data.content.subscribe(fullData => {
        console.log(fullData);
// @ts-ignore
        if (fullData.additional) {
// @ts-ignore
          const full = JSON.parse(fullData.additional);


          Object.keys(this.form.controls).forEach(key => {
// @ts-ignore
            if (this.form.get(key) instanceof FormControl && full[key]) {
// @ts-ignore
              this.form.get(key).setValue(full[key]);
            }
          });

          console.log(this.form.value);
        }

        if (fullData.menu) {
// @ts-ignore
          const full = JSON.parse(fullData.menu);


          Object.keys(this.formMenu.controls).forEach(key => {
// @ts-ignore
            if (this.formMenu.get(key) instanceof FormControl && full[key]) {
// @ts-ignore
              this.formMenu.get(key).setValue(full[key]);
            }
// @ts-ignore
            if (this.formMenu.get(key) instanceof FormArray && full[key]) {

              full[key].forEach((optionValue, index) => {
                if ((this.formMenu.get(key) as FormArray).length > index) {
// @ts-ignore
                  (this.formMenu.get(key) as FormArray).at(index).setValue(optionValue);
                }
              });
            }
          });
        }

      });
    });


  }
  getRegion(regions) {
    // console.log(regions);
    let res = '';
    regions.forEach(x => {
      if (x) {
        // console.log(x);
        res += this.regionesMap.get(x);
        res += ', ';
      }
    });
    if (res) {
      res = res.slice(0, -2);
    }
    return res;
  }

  getKashrutName(kashrut) {
    if (kashrut) {
      if (!kashrut.hebrew || !kashrut.hebrew.length) {
        return `${kashrut.international}`;
      }
      return `${kashrut.hebrew} (${kashrut.international})`;
    }
  }
  getAddress(data) {
    let res = '';
    if (data.country) {
      res += data.country;
      res += ', ';
    }
    if (data.city) {
      res += data.city;
      res += ', ';
    }
    if (data.address) {
      res += data.address;
      res += ', ';
    }
    if (res) {
      res = res.slice(0, -2);
    }
    return res;
  }
  close(): void {
    this.dialogRef.close();
  }

  getStructureForTab(structure, tab) {
    return this.structure.filter(col => {
      return col.filter(inp => {
        return inp.tab == tab;
      }).length;
    })
  }
}
