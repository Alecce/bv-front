import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '@src/app/services/api/requests.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '@src/app/services/loading-service.service';

@Component({
  selector: 'app-menu-schema',
  templateUrl: './menu-schema.component.html',
  styleUrls: ['./menu-schema.component.css']
})
export class MenuSchemaComponent implements OnInit {

  // @ts-ignore
  @Input() structureData: Subject;
  // @ts-ignore
  @Input() downloadedData: Subject;


  structure: InputData[][] = [];

  checkboxes = [];


  type = '';
  id = '';
  businessName = '';
  businessType = '';

  form = new FormGroup({


  });
  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService) { }

  ngOnInit(): void {


    this.structureData.subscribe((data: InputData[]) => {

      console.log(data);
      const set = new Set();

      data.forEach((x: InputData) => {
        if(x.block_name && !x.parent) {
          set.add(x.block_name);
        }
      });

      const checkboxes = Array.from(set);

      checkboxes.forEach((cb: string) => {
        this.form.addControl(cb, new FormControl(false));
      });



      this.checkboxes = checkboxes;


      this.downloadedData.subscribe(fullData => {
// @ts-ignore
        if (fullData.menu) {
// @ts-ignore
          const full = JSON.parse(fullData.menu);


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
      });

    });
  }

}
