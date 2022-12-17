import {Component, Inject, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {AccountServiceService} from '../../services/account-service.service';

@Component({
  selector: 'app-wines-store-subscreen',
  templateUrl: './wines-store-subscreen.component.html',
  styleUrls: ['./wines-store-subscreen.component.css']
})
export class WinesStoreSubscreenComponent implements OnInit {

  form = new FormGroup({
    details: new FormArray([]),
    isForSale: new FormControl(false),
    price: new FormControl(''),
  });

  collector = 'collector';
  wineId;
  myRole;
  wineData;

  constructor(
    public dialogRef: MatDialogRef<WinesStoreSubscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    // @Inject(MAT_DIALOG_DATA) public type,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    private accountService: AccountServiceService,
    public langService: LanguageServiceService,
    private route: Router) { }

  ngOnInit() {

    console.log(this.data);
    this.wineId = this.data.wine.id;
    this.wineData = this.data.wine;


    this.accountService.currentRole.subscribe(role => {
      this.myRole = role;
      this.getStorage();
    });





  }



  getStorage() {



    this.service.getWineStorage({wine: this.wineId, role: {type: this.collector}}, this.collector).subscribe(storageData => {

      let storage;
      // @ts-ignore
      if (storageData && storageData.details) {
        // @ts-ignore
        storage = JSON.parse(storageData.details);
      } else {
        storage = [];
      }
      // @ts-ignore
      storage.forEach(s => {
        this.addDetail(s);
      });


      // 'user_collection.price',
      //   'user_collection.is_for_sale as isForSale',



      // @ts-ignore
      if (storageData && storageData.price) {
        // @ts-ignore
        this.price.setValue(storageData.price);
      }
      // @ts-ignore
      if (storageData && storageData.isForSale) {
        // @ts-ignore
        this.isForSale.setValue(storageData.isForSale);
      }
    });
  }

  get details(): FormArray {
    return this.form.get('details') as FormArray;
  }
  get isForSale(): FormControl  {
    return this.form.get('isForSale') as FormControl;
  }
  get price(): FormControl {
    return this.form.get('price') as FormControl;
  }


  removeDetail(detail) {
    if (this.langService.editable) {
      return;
    }
    (this.details as FormArray).removeAt(detail);
  }


  getFormDetailBlank() {
    return new FormGroup({

      source: new FormControl('0'),
      lost: new FormControl('0'),
      // isCollection: new FormControl(false),
      amount: new FormControl(''),
      fridge: new FormControl(''),
      building: new FormControl(''),
      room: new FormControl(''),
      sheilf: new FormControl(''),
      row: new FormControl(''),
      serial: new FormControl(''),
    });
  }
  getFormDetail(detail) {
    return new FormGroup({
      source: new FormControl(detail.source),
      lost: new FormControl(detail.lost),
      // isCollection: new FormControl(detail.isCollection),
      amount: new FormControl(detail.amount),
      fridge: new FormControl(detail.fridge),
      building: new FormControl(detail.building),
      room: new FormControl(detail.room),
      sheilf: new FormControl(detail.sheilf),
      row: new FormControl(detail.row),
      serial: new FormControl(detail.serial),
    });
  }

  addDetail(detail) {
    if (this.langService.editable) {
      return;
    }
    if (detail) {
      (this.details as FormArray).push(this.getFormDetail(detail));
    } else {
      (this.details as FormArray).push(this.getFormDetailBlank());
    }
  }
  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }

  submit() {
    if (this.langService.editable) {
      return;
    }
    let counter = 0;
    this.details.value.forEach(detail => {
      if (detail.lost == 0) {
        counter += detail.amount;
      }
    });
    const storageData = {
      wine: this.data.id,
      details: JSON.stringify(this.details.value),
      count: counter,
      collectioner: true,
      storage: this.details.length,
      price: this.price.value,
      isForSale: this.isForSale.value,
      role: {type: this.collector}
    };

    this.service.setWineStorage(storageData, this.collector).subscribe(() => {
      this.close();
      // this.getPreviousVotes();
    });
  }

  getTotal() {
    let total = 0;
    this.details.controls.forEach(x => {
      // console.log(x);
      if (x.value.lost == '0') {
        total += x.value.amount;
      } else {
        total -= x.value.amount;

      }
    });
    return total;
  }

  isMobileScreen() {
    return window.innerWidth < 768;
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }
}
