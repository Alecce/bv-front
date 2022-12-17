import {Component, Inject, OnInit} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsService} from '@src/app/services/api/lists.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-existed-schema-form',
  templateUrl: './existed-schema-form.component.html',
  styleUrls: ['./existed-schema-form.component.css']
})
export class ExistedSchemaFormComponent implements OnInit {


  form = new FormGroup({

    schemas: new FormArray([]),

  });

  schemaTypes = [];

  constructor(
    public downloadService: DownloadDataServiceService,
    public dialogRef: MatDialogRef<ExistedSchemaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    public imagePlaceholder: PlaceholderServiceService,
    public listService: ListsService,
    private route: Router
  ) { }

  ngOnInit(): void {

    console.log(this.data);

    if(this.data.avaliableScemas[this.data.block]) {

      // id: 19
      // name: "One more test Facility"
      // type: "Indoor Facility - schema"

      this.data.avaliableScemas[this.data.block].forEach(v => {

        this.addSchema(v);

      })
    }


    const req = {block: this.data.block};
    this.service.getSchemaTypes(req).subscribe(data => {

// @ts-ignore
      this.schemaTypes = data;
    });


  }





  addSchema(p) {
    if (this.langService.editable) {
      return;
    }
    if (p) {
      this.schemas.push(this.newSchemaGroup(p));
    } else {
      this.schemas.push(this.newBlancSchemaGroup());
    }
  }
  get schemas(): FormArray {
    return this.form.get('schemas') as FormArray;
  }

  newBlancSchemaGroup() {
    return new FormGroup({
      name: new FormControl(''),
      type: new FormControl(0),
      id: new FormControl(0),
    });
  }


  newSchemaGroup(p) {
    return new FormGroup({
      name: new FormControl(p.name),
      type: new FormControl(p.type),
      id: new FormControl(p.id),
    });
  }
  removeSchema(i) {
    if (this.langService.editable) {
      return;
    }
    if(!this.schemas.at(i).value.id) {
      this.schemas.removeAt(i);
    } else {


      const req2 = {
        id: this.schemas.at(i).value.id,
      };

      this.service.deleteSchemasForBlock(req2).subscribe(data => {
        this.schemas.removeAt(i);
      })
    }
  }
  saveSchema(i) {
    if (this.langService.editable) {
      return;
    }


    const req2 = {
      id: this.schemas.at(i).value.id,
      name: this.schemas.at(i).value.name,
      type: this.schemas.at(i).value.type,
      additional: {}
    };

    Object.keys(this.data.form.controls).forEach(key => {

      // const isNotType = key.search('type') == -1;
// @ts-ignore
      if(key.search(this.data.block + '_') == 0) {
// @ts-ignore
        if (this.data.form.get(key) instanceof FormControl) {
// @ts-ignore
          req2.additional[key] = this.data.form.get(key).value;
        }
      }
    });
    // this.schemas.removeAt(i);
    this.service.setSchemasForBlock(req2).subscribe(data => {

// @ts-ignore
      if(data.id) {
// @ts-ignore
        this.schemas.at(i).get('id').setValue(data.id);
      }
    })
  }
  // loadSchema(i) {
  //   if (this.langService.editable) {
  //     return;
  //   }
  //   this.schemas.removeAt(i);
  // }

}
