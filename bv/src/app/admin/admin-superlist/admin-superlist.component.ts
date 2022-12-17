import {Component, Input, OnInit} from '@angular/core';
import {LanguageServiceService} from '../../services/language-service.service';
import {debounceTime, filter} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/api/admin.service';
import {MatDialog} from '@angular/material/dialog';
import {SubtableComponent} from './subtable/subtable.component';
import {Overlay} from '@angular/cdk/overlay';
// import {BlockScrollStrategy} from '@angular/cdk/typings/overlay';
import {forkJoin, of} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {MultiselectSubtableComponent} from '../multiselect-subtable/multiselect-subtable.component';

@Component({
  selector: 'app-admin-superlist',
  templateUrl: './admin-superlist.component.html',
  styleUrls: ['./admin-superlist.component.css']
})
export class AdminSuperlistComponent implements OnInit {


  newLineAsRow = {
    id: 'newRow',
    imageData: {
      old: false,
      id: 0
    },
    emblemData: {
      old: false,
      id: 0
    }
  };
  checkedList = [];
  isOptionsChanged = false;
  @Input() listId;
  @Input() tableCols = [];
  @Input() api;
  @Input() apiParam;
  @Input() addRadio;
  @Input() radioSelect;
  @Input() addCheckbox;
  @Input() checkboxSelect;
  @Input() lists;
  @Input() disabledRows;
  @Input() apiSend;
  @Input() apiDelete;
  @Input() storage;
  @Input() storageEmblem;
  @Input() afterChange;

  total = 0;
  noImage = '../../../assets/images/no-image.png';

  form = new FormGroup({
    newRow: new FormGroup({})
  });

  chosenOptionForm = new FormGroup({

  });
  order = {
    name: 'id',
    direction: true,
    page: 1,
    search: this.form.value
  };
  list = [];

  host = environment.storage;

  constructor(private reqService: RequestsService,
              public service: AdminService,
              public langService: LanguageServiceService,
              public activatedroute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              public overlay: Overlay
  ) {
  }

  ngOnInit() {
    this.listId = this.listId ? this.listId : this.api;


    this.tableCols.forEach(col => {

      (this.form.get('newRow') as FormGroup).addControl(col.variable + '', new FormControl(col.default));
      if (col.type == 'special') {
        this.newLineAsRow[col.variable] = col.default;
      }
      if (this.disabledRows[col.variable]) {
        (this.form.get('newRow') as FormGroup).get(col.variable + '').disable();
      }

      // this.chosenOptionForm.addControl(col.searchFormControlName, new FormControl(true));
      this.choseStartingOptions(col);
      this.service.adminOptions.subscribe(options => {
        if (options[this.api]) {
          // console.log(options[this.api]);
          // console.log(this.chosenOptionForm.controls);
          for (const control in this.chosenOptionForm.controls) {
            if (this.chosenOptionForm.controls[control] instanceof FormControl) {
              (this.chosenOptionForm.controls[control] as FormControl).setValue(options[this.api][control]);
            }
          }
          // this.chosenOptionForm.controls
        }
      })
      this.form.addControl(col.searchFormControlName, new FormControl(''));
      this.form.get(col.searchFormControlName).valueChanges.pipe(
        debounceTime(1000),
        filter(form => !form.invalid),
      ).subscribe(() => {
        this.getData();
      });
    });
    if (this.api == 'getWinelist') {
      ((this.form.get('newRow') as FormGroup).get('winery_id') as FormControl).valueChanges.pipe(
        debounceTime(1000),
      ).subscribe(winery => {
        this.reqService.getWinery(winery).subscribe(wineryData => {
          console.log(wineryData);
          // this.newLineAsRow.
// @ts-ignore
          this.newLineAsRow.kashrutData.kashruts = wineryData.kashruts;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('kashrutData') as FormControl).value.kashruts = wineryData.kashruts;


// @ts-ignore
          this.newLineAsRow.qualityData.qualities = wineryData.qualities;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('qualityData') as FormControl).value.qualities = wineryData.qualities;


// @ts-ignore
          this.newLineAsRow.biodynamicData.biodynamics = wineryData.biodynamics;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('biodynamicData') as FormControl).value.biodynamics = wineryData.biodynamics;


// @ts-ignore
          this.newLineAsRow.organicData.organics = wineryData.organics;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('organicData') as FormControl).value.organics = wineryData.organics;


// @ts-ignore
          this.newLineAsRow.veganData.vegans = wineryData.vegans;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('veganData') as FormControl).value.vegans = wineryData.vegans;


// @ts-ignore
          this.newLineAsRow.grapeData.additionalGrapes = wineryData.grapesFull;
// @ts-ignore
          this.newLineAsRow.grapeData.additionalVineyards = wineryData.vineyardsFull;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('grapeData') as FormControl).value.additionalGrapes = wineryData.grapesFull;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('grapeData') as FormControl).value.additionalVineyards = wineryData.vineyardsFull;


// @ts-ignore
          this.newLineAsRow.kashrutData.kashruts = wineryData.kashruts;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('kashrutData') as FormControl).value.kashruts = wineryData.kashruts;


// @ts-ignore
          this.newLineAsRow.kashrutData.kashruts = wineryData.kashruts;
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('kashrutData') as FormControl).value.kashruts = wineryData.kashruts;


// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('country') as FormControl).setValue(wineryData.commoninfo.country);
// @ts-ignore
          ((this.form.get('newRow') as FormGroup).get('winery') as FormControl).setValue(wineryData.commoninfo.name_international);
// @ts-ignore
          this.newLineAsRow.winery = wineryData.commoninfo.name_international;
        });
      });
    }
    // this.getData();
  }
  getData() {

    const id = this.activatedroute.snapshot.params.id;
    this.order.search = this.form.value;
    this.service[this.api](this.order, this.apiParam).subscribe(data => {
// @ts-ignore
      this.list = data.rows;
      this.total = data.total;
// @ts-ignore
      this.currentPage = this.order.page;
      this.list.forEach(row => {
        this.form.removeControl(row.id + '');
        this.form.addControl(row.id + '', new FormGroup({}));
        for (const colName in row) {
          (this.form.get(row.id + '') as FormGroup).addControl(colName + '', new FormControl(row[colName]));
          if (this.disabledRows[colName]) {
            (this.form.get(row.id + '') as FormGroup).get(colName + '').disable();
          }
        }
      });
      console.log(this.form.value);
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

  addSorting(searchFormControlName, text) {
    this.form.get(searchFormControlName).setValue(text);
  }

  sendRow(service, id) {
    console.log(this.form.get(id + '').value);
    const req = this.form.get(id + '').value;
    this.service[this.apiSend](req).subscribe((result) => {

      // if (req.imageData && req.imageData.isChanged) {
      //   this.reqService.setImage(this.storage, req.id, req.imageData.new).subscribe();
      // }
      // if (req.emblemData && req.emblemData.isChanged) {
      //   this.reqService.setImage(this.storageEmblem, req.id, req.emblemData.new).subscribe();
      // }
      // return this.form.get(id + '').markAsUntouched();

      let setImage;
      let setEmblem;

      if (req.imageData && req.imageData.isChanged) {
        setImage = this.reqService.setImage(this.storage, req.id, req.imageData.new);
      } else {
        setImage = of(null);
      }

      if (req.emblemData && req.emblemData.isChanged) {
        setEmblem = this.reqService.setImage(this.storageEmblem, req.id, req.emblemData.new);
      } else {
        setEmblem = of(null);
      }
      forkJoin([setImage, setEmblem]).subscribe(results => {
        this.form.get(id + '').markAsUntouched();
        if (this.afterChange) {
          this.afterChange(this.form.get(id + ''), result);
        }
      });
    });

  }
  addRow(service, id) {
    console.log(this.form.get(id + '').value);
    const req = this.form.get(id + '').value;
    this.service[this.apiSend](req).subscribe(res => {

      let setImage;
      let setEmblem;


      if (req.imageData && req.imageData.isChanged) {
        setImage = this.reqService.setImage(this.storage, res, req.imageData.new);
      } else {
        setImage = of(null);
      }

      if (req.emblemData && req.emblemData.isChanged) {
        setEmblem = this.reqService.setImage(this.storageEmblem, res, req.emblemData.new);
      } else {
        setEmblem = of(null);
      }
      forkJoin([setImage, setEmblem]).subscribe(results => {

        this.resetNewRow();
        this.getData();
      });

      // if (req.imageData && req.imageData.isChanged) {
      //   this.reqService.setImage(this.storage, res, req.imageData.new).subscribe(() => {
      //     this.resetNewRow();
      //     this.getData();
      //   });
      // } else {
      //
      // }
      return this.form.get(id + '').markAsUntouched();
    });
  }
  resetNewRow() {

    this.tableCols.forEach(col => {
      (this.form.get('newRow') as FormGroup).get(col.variable + '').setValue(col.default);
      // addControl(col.variable + '', new FormControl(col.default));
    });
  }

  deleteRow(service, id) {
    this.service[this.apiDelete](this.form.get(id + '').value).subscribe(() => {
      this.list = this.list.filter(x => {
        return x.id != id;
      });
    });
  }

  getButtonColor(rowId) {
    return this.form.get(rowId).touched ? 'btn-success' : 'btn-secondary';
  }

  getSizeOfElement(col) {
    let size = 5;
    // this.form.value
    for (let row in this.form.value) {
      // console.log(this.form.value[row][col]);
      const v = this.form.value[row][col] + '';
      size = Math.max(size, v.length);
    }
    return size;
  }

  isParticipate(col) {
    // console.log(this.order.name === col.variable);
    // console.log(this.form.get(col.searchFormControlName).value);

    return this.order.name === col.variable || this.form.get(col.searchFormControlName).value !== '';
  }

  choseStartingOptions(col) {
    // let check = true;
    // if (this.activatedroute.snapshot.queryParamMap.get(col.variable)) {
    //   check = false;
    // }
    this.chosenOptionForm.addControl(col.searchFormControlName, new FormControl(true));

    this.chosenOptionForm.get(col.searchFormControlName).valueChanges
      .subscribe(() => {
        // console.log(col);
        // this.optionChanged(col);
      });
  }
  // optionChanged(col) {
  //   if (this.langService.editable) {
  //     return;
  //   }
  //   // @ts-ignore
  //   const q = {};
  //   q[col.variable] = !this.chosenOptionForm.get(col.searchFormControlName).value;
  //   // this.router.navigate([], {
  //   //   queryParamsHandling: 'merge',
  //   //   // // preserve the existing query params in the route
  //   //   // skipLocationChange: true,
  //   //   queryParams: q});
  // }
  sendAdminOptions(api) {
    const options = JSON.stringify(this.chosenOptionForm.value);

    const req = {
      tab: api,
      options
    };
    this.service.setAdminOptions(req).subscribe(data => {
      this.chosenOptionForm.markAsUntouched();
    }
    );
  }

  getOptionsButtonColor() {

    return this.chosenOptionForm.touched ? 'btn-success' : 'btn-secondary';
  }

  openDialog(col, row): void {
    const value = this.form.get(row.id + '')
      .get(col.variable).value;

    const dialogRef = this.dialog.open(SubtableComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: {table: col, content: value}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      // console.log(this.form.get(row.id + '')
      //   .get(col.variable));
      if (result !== undefined) {
        this.form.get(row.id + '')
          .get(col.variable).setValue(JSON.stringify(result));
      }
      // this.animal = result;
    });
  }

  openMultiselectDialog(col, row): void {
    const value = this.form.get(row.id + '')
      .get(col.variable).value;
    const list = this.lists[col.variable];
    const options = this.lists[col.variable];

    const dialogRef = this.dialog.open(MultiselectSubtableComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: {list, data: value, options}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      // console.log(this.form.get(row.id + '')
      //   .get(col.variable));
      if (result !== undefined) {
        this.form.get(row.id + '')
          .get(col.variable).setValue(result);
      }
      // this.animal = result;
    });
  }

  openSpecialDialog(col, row): void {
    const value = this.form.get(row.id + '')
      .get(col.variable).value;

    const dialogRef = this.dialog.open(col.component, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: of(value)
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      console.log(result);
      // console.log(this.form.get(row.id + '')
      //   .get(col.variable));
      if (result !== undefined) {
        this.form.get(row.id + '')
          .get(col.variable).setValue(result);
        this.form.markAsTouched();
      }
      // this.animal = result;
    });
  }

  openImageDialog(col, row): void {
    const value = this.form.get(row.id + '')
      .get(col.variable).value;

    value.storage = col.imagePath;

    const dialogRef = this.dialog.open(col.component, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: of(value)
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) {
        this.form.get(row.id + '')
          .get(col.variable).setValue(result);
        row[col.variable] = result;
        this.form.markAsTouched();
        if (result.new) {
          this.showImage(result.new, row, col);
        }
      }
    });
  }
  showImage(file, row, col) {

    const reader = new FileReader();

    reader.readAsDataURL(file); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      // @ts-ignore
      row[col.variable].newImageSrc = event.target.result;
    };

  }

  getImagePath(col, row) {
    const path = col.imagePath + row.id + '_' + row[col.variable].old + '.png';

    // if (row.id == 'newRow') {
    //   console.log(row);
    // }
    if (!row[col.variable].isChanged && row[col.variable].old * 1) {
      // if (row.id == 'newRow') {
      //   console.log('old');
      // }
      return path;
    } else if (row[col.variable].new) {
      // if (row.id == 'newRow') {
      //   console.log('new');
      // }
      // @ts-ignore
      return row[col.variable].newImageSrc;
    } else {
      // if (row.id == 'newRow') {
      //   console.log('no');
      // }
      return this.noImage;
    }
  }
  // get newLineAsRow() {
  //   // return this.form.get('newRow').value;
  //   return
  // }
}

