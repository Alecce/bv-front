import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingServiceService} from '../services/loading-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RequestsService} from '../services/api/requests.service';
import {LanguageServiceService} from '../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ReplaySubject} from 'rxjs';
import {AdditionalSchemaComponent} from '@src/app/schemas/additional-schema/additional-schema.component';

@Component({
  selector: 'app-business-designed',
  templateUrl: './business-designed.component.html',
  styleUrls: ['./business-designed.component.css']
})
export class BusinessDesignedComponent implements OnInit {

  // structure: InputData[][] = [];


  chosenTab = '';
  chosenSubTab = '';
  subTabs = [];

  type = '';
  id = '';
  businessName = '';
  businessType = '';

  structure: InputData[] = [];
  form = new FormGroup({


  });


  // @ts-ignore
  downloadedData = new ReplaySubject(10);
  // @ts-ignore
  structureData = new ReplaySubject(10);
  // @ts-ignore
  additionalTabs = new ReplaySubject(10);
  // @ts-ignore
  menuData = null;
  // @ts-ignore
  currentSubTab = new ReplaySubject(10);

  request = {business_type: 'winery'};

  // @ts-ignore
  @ViewChild(AdditionalSchemaComponent) schema: AdditionalSchemaComponent;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              private titleService: Title,
              public loadingService: LoadingServiceService) { }

  ngOnInit() {

    let title = 'Business - bonvino.com';
    this.titleService.setTitle(title);

    const id = this.activatedroute.snapshot.params.id;
    this.id = id;
    const type = this.activatedroute.snapshot.params.type;
    this.type = type;
    const req = {business_type: type};



    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {

      this.structure = data;
      this.structureData.next(this.structure);

      this.chose('');
      this.choseSubtab('');


      this.service.getAdditional({id: this.id}).subscribe(data => {
// @ts-ignore
        this.businessName = data.name;
// @ts-ignore
        this.businessType = data.type;

        this.downloadedData.next(data);

        this.chose('');
        this.choseSubtab('');
      });
    });

    console.log(id);
    console.log(type);



    this.additionalTabs.subscribe(tabs => {
// @ts-ignore
      this.subTabs = tabs;
    });

    this.chose('');
    this.choseSubtab('');
//     this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {
//
//       data.forEach((x: InputData) => {
//         while (this.structure.length <= x.col_edit - 1) {
//           this.structure.push([]);
//         }
//         console.log(this.structure);
//         console.log(x);
//
//         const controlName = x.block_id + '_' + x.option_id;
//         x.controlName = controlName;
//
//         const hideControlName = x.block_id + '_' + x.option_id + '_hide';
// // @ts-ignore
//         x.hideControlName = hideControlName;
//
//         if (x.input_type == 3 || x.input_type == 5 || x.input_type == 7) {
//           const options = x.select_data + '';
//           x.select_options = [];
//           options.split(',').forEach(opt => {
// // @ts-ignore
//             x.select_options.push({id: opt});
//           });
//           // x.select_options = options.split(',');
//         }
//
//         this.form.addControl(hideControlName, new FormControl());
//
//         if (x.input_type == 7) {
//
//           const formArr = new FormArray([]);
//           x.select_options.forEach(opt => {
//             formArr.push(new FormControl(false));
//           });
//
//
//           this.form.addControl(controlName, formArr);
//         } else {
//           this.form.addControl(controlName, new FormControl());
//         }
//
//         this.structure[x.col_edit - 1].push(x);
//       });
//
//       this.structure.forEach(col => {
//         col.sort((a, b) => {
//           if (a.row_edit != b.row_edit) {
//             return a.row_edit - b.row_edit;
//           } else {
//             return a.order_edit - b.order_edit;
//           }
//         });
//       });
//
//       this.service.getAdditional({id: this.id}).subscribe(fullData => {
// // @ts-ignore
//         this.businessName = fullData.name;
// // @ts-ignore
//         this.businessType = fullData.type;
// // @ts-ignore
//         if (fullData.additional) {
// // @ts-ignore
//           const full = JSON.parse(fullData.additional);
//
//
//           Object.keys(this.form.controls).forEach(key => {
// // @ts-ignore
//             if (this.form.get(key) instanceof FormControl && full[key]) {
// // @ts-ignore
//               this.form.get(key).setValue(full[key]);
//             }
// // @ts-ignore
//             if (this.form.get(key) instanceof FormArray && full[key]) {
//
//               full[key].forEach((optionValue, index) => {
//                 if ((this.form.get(key) as FormArray).length > index) {
// // @ts-ignore
//                   (this.form.get(key) as FormArray).at(index).setValue(optionValue);
//                 }
//               });
//             }
//           });
//         }
//       });
//     });

  }


  chose(tab) {
    if (this.langService.editable) {
      return;
    }
    this.chosenTab = tab;
  }


  getSubTabColor(subTab) {


    if (this.chosenTab == '' && this.chosenSubTab == subTab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }


  // isTabExist(tab) {
  //   const res = this.structure.filter(x => {
  //     return (x.tab == tab);
  //   });
  //   return res.length;
  // }
  // isSubTabExist(subTab) {
  //
  //
  //   return this.additionalService.getStructureForTab(this.structure, this.subTab);
  // }

  choseSubtab(subTab) {
    this.chosenSubTab = subTab;
    this.currentSubTab.next(subTab);
  }

  saveChanges() {

    const formsData = this.getFormData();

    const requestData = {
      additional: formsData,
      id: this.id
    };
    console.log(requestData);

    this.service.setAdditional(requestData).subscribe(res => {
      console.log(res);
    });

  }

  getFormData() {

    return this.schema.getAdditionalData();
  }

  getLink() {
    return '/business/' + this.type + '/' + this.id;
  }

}

export interface InputData {
  block_name: string;
  block_id: number;
  col_edit: number;
  col_view: number;
  input_type: number;
  order_edit: number;
  order_view: number;
  page_edit: number;
  row_edit: number;
  row_view: number;
  select_data: string;
  select_options?: string[];
  title_name: string;
  option_id: number;
  tab?: any;
  controlName?: string;
  hideControlName?: string;
  parent?: string;
  children?: any[];
}
