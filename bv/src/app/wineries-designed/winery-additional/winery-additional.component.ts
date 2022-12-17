import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {InputData} from '../../business-designed/business-designed.component';
import {FormGroup} from '@angular/forms';
import {RequestsService} from '../../services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '../../services/loading-service.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {AdditionalSchemaComponent} from '@src/app/schemas/additional-schema/additional-schema.component';

@Component({
  selector: 'app-winery-additional',
  templateUrl: './winery-additional.component.html',
  styleUrls: ['./winery-additional.component.css']
})
export class WineryAdditionalComponent implements OnInit {
  tab = 'additional';


  type = '';
  id = '';
  businessName = '';
  businessType = '';

  structure: InputData[][] = [];
  form = new FormGroup({


  });


  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() structureData: Subject;
  // @ts-ignore
  @Input() additionalTabs: Subject;
  // @ts-ignore
  @Input() menuData: FormGroup;
  // @ts-ignore
  @Input() currentSubTab: Subject;

  request = {business_type: 'winery'};

  // @ts-ignore
  @ViewChild(AdditionalSchemaComponent) schema: AdditionalSchemaComponent;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService,
              private additionalService: AdditionalServiceService) { }

  ngOnInit() {
    // console.log('123456');

    // const type = this.activatedroute.snapshot.params.type;
    // this.type = type;
    // const req = {business_type: 'winery'};

//     this.structureData.subscribe((data: InputData[]) => {
//
//       this.transformAdditionalData(data);
//
//
//       this.downloadedData.subscribe(fullData => {
//       // this.service.getAdditional({id: this.id}).subscribe(fullData => {
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

    // console.log(type);
  }

  // private transformAdditionalData(data: InputData[]) {
  //   this.additionalService.transformAdditional(data, this.structure, this.form);
  // }

  getAdditionalData() {

    return this.schema.getAdditionalData();
  }
}
