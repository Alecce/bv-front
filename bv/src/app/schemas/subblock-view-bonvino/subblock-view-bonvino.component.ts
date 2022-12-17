import {Component, Input, OnInit} from '@angular/core';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InputData} from '@src/app/business-designed/business-designed.component';

@Component({
  selector: 'app-subblock-view-bonvino',
  templateUrl: './subblock-view-bonvino.component.html',
  styleUrls: ['./subblock-view-bonvino.component.css']
})
export class SubblockViewBonvinoComponent implements OnInit {


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
    public langService: LanguageServiceService,
    private snackBar: MatSnackBar,
    public loadingService: LoadingServiceService,
    private additionalService: AdditionalServiceService

  ) { }

  ngOnInit(): void {
    // console.log(this.type);
    // console.log(this.schemaData);
    // console.log(this.downloadedData);



    this.subTabSubject.subscribe(subTab => {
      this.subTab = subTab;
    });
    this.transformAdditionalData(this.schemaData.children);

    // console.log(this.form.value);



    if(this.downloadedData.value) {
      try {

        const dd = JSON.parse(this.downloadedData.value);

        dd.forEach((v, i) => {

          this.addGroup(null);

          Object.keys((this.formArr.at(i) as FormGroup).controls).forEach(key => {
// @ts-ignore
            if (this.formArr.at(i).get(key) instanceof FormControl && v[key]) {
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

      } catch (e) {

      }


    }

    this.formArr.valueChanges.subscribe(value => {
      console.log(value);
      this.downloadedData.setValue(JSON.stringify(value));
    })
  }

  private transformAdditionalData(data: InputData[]) {
    this.additionalService.transformAdditional(data, this.structure, this.formSchema);

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
  hasCheckboxTrue(arr) {
    let res = false;
    arr.forEach(row => {
      if(row) {
        res = true;
      }
    });
    return res;
  }
}
