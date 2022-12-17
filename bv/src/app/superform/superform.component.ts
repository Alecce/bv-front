import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RequestsService} from '../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {LanguageServiceService} from '../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {SuperlistComponent} from '../lists/superlist/superlist.component';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-superform',
  templateUrl: './superform.component.html',
  styleUrls: ['./superform.component.css']
})
export class SuperformComponent implements OnInit, AfterViewInit {

  @Input() formData;
  @Input() page;
  // @ts-ignore
  @Input() downloadData: ReplaySubject;
  // @ts-ignore
  @Input() downloadSector;
  disableSubject = new ReplaySubject(1);

  @ViewChildren(SuperlistComponent) superlists: QueryList<SuperlistComponent>;

  mapLists = {};
  checkboxes = {};
  routeData = {editable: true};
  form = new FormGroup({
  });

  constructor(private service: RequestsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService) { }

  ngOnInit() {
    this.formData.forEach(point => {
      if (point.type === 'text' || point.type === 'select' || point.type === 'checkbox') {
        this.form.addControl(point.controlName, new FormControl(point.start));
      } else if (point.type === 'table') {
        this.form.addControl(point.controlName, new FormArray([]));
      } else if (point.type === 'listCheckboxes') {
        this.form.addControl(point.controlName, new FormControl());
      }
    });
  }


  removeRowFromTable(i, j) {
    if (this.langService.editable) {
      return;
    }
    (this.form.get(this.formData[j].controlName) as FormArray).removeAt(i);
  }

  addRowToTable(j, data) {
    if (this.langService.editable) {
      return;
    }
    (this.form.get(this.formData[j].controlName) as FormArray).push(this.createGroup(this.formData[j], data));
  }

  createGroup(point, data: any) {
    const form = new FormGroup({});

    point.table.forEach(th => {
      if (data) {
        form.addControl(th.controlName, new FormControl(data[th.controlName]));
      } else {
        form.addControl(th.controlName, new FormControl(th.start));
      }
    });
    return form;
  }
  ngAfterViewInit(): void {

    this.superlists.forEach(superlist => {
      this.mapLists[superlist.listId] = superlist;
      this.mapLists[superlist.listId].checkboxes.valueChanges.subscribe(() => {
        this.checkboxes[superlist.listId] = Object.values(this.mapLists[superlist.listId].checkboxSelect);
        const arr = [];
        this.checkboxes[superlist.listId].forEach(x => {
          arr.push(x.id + '');
          // (this.form.get(superlist.listId) as FormGroup).addControl(x.id + '', new FormControl(true));
        });
        (this.form.get(superlist.listId) as FormControl).setValue(JSON.stringify(arr));
      });
    });

    this.downloadData.subscribe(fatherData => {
      this.formData.forEach(point => {
        if (point.type === 'text' || point.type === 'select' || point.type === 'checkbox') {
          this.form.get(point.controlName).setValue(fatherData[this.downloadSector][point.controlName]);
        } else if (point.type === 'table') {
          fatherData[this.downloadSector][point.controlName].forEach(row => {
            (this.form.get(point.controlName) as FormArray).push(this.createGroup(point, row));
          });
        } else if (point.type === 'listCheckboxes') {
          console.log(fatherData);
          console.log(this.downloadSector);
          if (fatherData[this.downloadSector][point.controlName]) {
            this.mapLists[point.controlName].setData(fatherData[this.downloadSector][point.controlName]);
          }
          // this.form.addControl(point.controlName, new FormControl());
        }
      });

      this.disableSubject.subscribe(x => {
        if (x) {
          this.disableForm();
        } else {
          this.enableForm();
        }
        }
      );
    });
  }
  uncheck(controlName, id) {
    if (this.form.disabled) {
      return;
    }
    this.mapLists[controlName].unsetCheckboxes(id);
    this.checkboxes[controlName] = this.checkboxes[controlName].filter(g => {
      return g.id != id;
    });
  }
  disableForm() {
    this.form.disable();
  }
  enableForm() {
    this.form.enable();
  }
}
