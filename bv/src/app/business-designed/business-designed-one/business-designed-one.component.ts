import {Component, OnInit} from '@angular/core';
import {LoadingServiceService} from '../../services/loading-service.service';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-business-designed-one',
  templateUrl: './business-designed-one.component.html',
  styleUrls: ['./business-designed-one.component.css']
})
export class BusinessDesignedOneComponent implements OnInit {

  structure: InputData[][] = [];

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

      this.service.getAdditional({id: this.id}).subscribe(fullData => {
// @ts-ignore
        this.businessName = fullData.name;
// @ts-ignore
        this.businessType = fullData.type;
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
        }
      });
    });

    console.log(id);
    console.log(type);
  }


  saveChanges() {
    const requestData = {
      additional: this.form.value,
      id: this.id
    };
    console.log(requestData);

    this.service.setAdditional(requestData).subscribe(res => {
      console.log(res);
    });

  }

  getLink() {
    return '/business-edit/' + this.type + '/' + this.id;
  }

}
interface InputData {
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
  controlName?: string;
}
