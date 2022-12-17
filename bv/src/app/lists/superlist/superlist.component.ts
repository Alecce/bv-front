import {Component, Input, OnInit} from '@angular/core';
import {ListsService} from '../../services/api/lists.service';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, filter} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LanguageServiceService} from '../../services/language-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-superlist',
  templateUrl: './superlist.component.html',
  styleUrls: ['./superlist.component.css']
})
export class SuperlistComponent implements OnInit {

  checkedList = [];



  @Input() listId;
  @Input() tableCols;
  @Input() api;
  @Input() apiParam;
  @Input() addRadio;
  @Input() radioSelect;
  @Input() addCheckbox;
  @Input() checkboxSelect;

  total = 0;
  noImage = '../../../assets/images/no-image.png';

  form = new FormGroup({
    radio: new FormControl(),
    checkboxes: new FormGroup({})
  });
  order = {
    name: 'id',
    direction: true,
    page: 1,
    search: this.form.value
  };
  list = [];

  host = environment.storage;

  constructor(private service: ListsService,
              public langService: LanguageServiceService,
              public activatedroute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.tableCols);
    this.listId = this.listId ? this.listId : this.api;

    if (this.radioSelect) {
      this.radio.setValue(this.radioSelect.id);
    } else {
      this.unsetRadio();
    }
    if (this.checkboxSelect) {
      // this.radio.setValue(this.radioSelect.id);
    } else {
      this.checkboxSelect = {};
    }
    this.tableCols.forEach(col => {
      this.form.addControl(col.searchFormControlName, new FormControl(''));
      this.form.get(col.searchFormControlName).valueChanges.pipe(
        debounceTime(1000),
        filter(form => !form.invalid),
      ).subscribe(() => {
        this.getData();
      });
    });
    this.getData();
  }
  getData() {

    const id = this.activatedroute.snapshot.params.id;
    this.order.search = this.form.value;
    this.service[this.api](this.order, this.apiParam).subscribe(data => {
    // this.api(this.order).subscribe(data => {
      if (this.addCheckbox) {
        data.rows.forEach(row => {
          if (!this.checkboxes.get(row.id + '')) {
            this.checkboxes.addControl(row.id + '', new FormControl(false));
          }
        });
      }
// @ts-ignore
      this.list = data.rows;


      this.total = data.total;
// @ts-ignore
      this.currentPage = this.order.page;
    });
  }

  changeOrder(name) {
    if (this.langService.editable) {
      return;
    }
    if (this.order.name !== name) {
      this.order.name = name;
      this.order.direction = true;
    } else {
      this.order.direction = !this.order.direction;
    }
    this.getData();
  }

  setPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.order.page = page;
    this.getData();
    return page;
  }
  clickRadio(row) {
    if (this.langService.editable) {
      return;
    }
    if (this.radio.value == row.id) {
      this.unsetRadio();
    } else {
      this.radioSelect = row;
      // this.radio.setValue(row.id);
      // console.log(this.form.value);
    }
  }
  unsetRadio() {
    if (this.langService.editable) {
      return;
    }
    this.radioSelect = {id: '0'};
    this.radio.setValue('');
  }

  get radio() {
    return this.form.get('radio');
  }

  clickCheckbox(row) {
    if (this.langService.editable) {
      return;
    }
    if (this.checkboxes.get(row.id + '').value) {
      this.unsetCheckboxes(row.id);
    } else {
      this.checkboxSelect[row.id + ''] = row;
      this.checkboxes.get(row.id + '').setValue(true);
    }
  }
  unsetCheckboxes(id) {
    if (this.langService.editable) {
      return;
    }
    delete this.checkboxSelect[id + ''];
    this.checkboxes.get(id + '').setValue(false);
  }

  get checkboxes(): FormGroup {
    return this.form.get('checkboxes') as FormGroup;
  }

  setData(data) {
    data.forEach(row => {
      // console.log(row);
      this.checkboxes.addControl(row.id + '', new FormControl(false));
      this.clickCheckbox(row);
    });
  }
  getImagePath(check, path) {
    return check * 1 ? path : this.noImage;
  }

  addSorting(searchFormControlName, text) {
    this.form.get(searchFormControlName).setValue(text);
  }
}
