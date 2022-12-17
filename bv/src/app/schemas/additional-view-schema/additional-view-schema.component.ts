import {Component, Inject, OnInit} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-additional-view-schema',
  templateUrl: './additional-view-schema.component.html',
  styleUrls: ['./additional-view-schema.component.css']
})
export class AdditionalViewSchemaComponent implements OnInit {

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
  structureForTab = null;

  currentSubTab = new ReplaySubject(10);

  constructor(
    public dialogRef: MatDialogRef<AdditionalViewSchemaComponent>,
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
    this.currentSubTab.next(this.tab);

    this.data.additionalStructure.subscribe((data: InputData[]) => {


      data = this.sortSubBlocks(data);
      // console.log(this.structure);
      this.additionalService.transformAdditional(data, this.structure, this.form);

      // console.log(this.structure);
//       data.forEach((x: InputData) => {
//         while (this.structure.length <= x.col_view - 1) {
//           this.structure.push([]);
//         }
//
//         const controlName = x.block_id + '_' + x.option_id;
//         x.controlName = controlName;
//
//         if (x.input_type == 3 || x.input_type == 5) {
//           const options = x.select_data + '';
//           x.select_options = [];
//           options.split(',').forEach(opt => {
// // @ts-ignore
//             x.select_options.push({id: opt});
//           });
//           // x.select_options = options.split(',');
//         }
//         this.form.addControl(controlName, new FormControl());
//
//         this.structure[x.col_view - 1].push(x);
//       });
//
//       this.structure.forEach(col => {
//         col.sort((a, b) => {
//           if (a.row_view != b.row_view) {
//             return a.row_view - b.row_view;
//           } else {
//             return a.order_view - b.order_view;
//           }
//         });
//       });

      const set = new Set();

      data.forEach((x: InputData) => {

        set.add(x.block_name);
      });

      const checkboxes = Array.from(set);

      checkboxes.forEach((cb: string) => {
        this.formMenu.addControl(cb, new FormControl(false));
      });


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
    const res = [];

    this.structure.forEach(col => {
      const resCol = col.filter(inp => {
        return inp.tab === tab;
      });

      if(resCol.length) {
        res.push(resCol);
      }
    });

    if(this.structureForTab == null){

      this.structureForTab = [];
      this.structure.forEach(col => {
        const resCol = col.filter(inp => {
          return inp.tab === tab;
        });

        if(resCol.length) {
          this.structureForTab.push(resCol);
        }
      });
    }

    return this.structureForTab;
    // console.log(res);
    // console.log(this.form.value);
    return res;
  }

  hasCheckboxTrue(arr) {
    let res = false;
    arr.forEach(row => {
      if(row) {
        res = true;
      }
    });
    return res;
  }

  private sortSubBlocks(data: InputData[]) {

    return this.additionalService.sortSubBlocks(data, this.structure, this.form);

  }
}
