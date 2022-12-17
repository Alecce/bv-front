import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {AccountServiceService} from '../../services/account-service.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {RequestsService} from '../../services/api/requests.service';

@Component({
  selector: 'app-wines-simplestore-subscreen',
  templateUrl: './wines-simplestore-subscreen.component.html',
  styleUrls: ['./wines-simplestore-subscreen.component.css']
})
export class WinesSimplestoreSubscreenComponent implements OnInit {

  form = new FormGroup({
    simpleCounter: new FormControl(''),
    details: new FormArray([]),
  });

  wineId;
  myRole;

  constructor(
    public dialogRef: MatDialogRef<WinesSimplestoreSubscreenComponent>,
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
    this.wineId = this.data.id;
    this.accountService.currentRole.subscribe(role => {
      this.myRole = role;
      this.getStorage();
    });





  }



  getStorage() {
    this.service.getWineStorage({wine: this.wineId, role: this.myRole}, this.myRole.type).subscribe(storageData => {
      let storage;
      // @ts-ignore
      if (storageData && storageData.simpleCounter) {
        // @ts-ignore
        this.simpleCounter.setValue(storageData.simpleCounter);
      }
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

      if (this.details.length == 0) {
        this.addDetail(null);
      }
    });
  }

  get details(): FormArray {
    return this.form.get('details') as FormArray;
  }
  get simpleCounter(): FormControl {
    return this.form.get('simpleCounter') as FormControl;
  }


  removeDetail(detail) {
    if (this.langService.editable) {
      return;
    }
    (this.details as FormArray).removeAt(detail);
  }


  getFormDetailBlank() {
    return new FormGroup({

      // source: new FormControl('0'),
      // lost: new FormControl('0'),
      // isCollection: new FormControl(false),
      amount: new FormControl(''),
      // fridge: new FormControl(''),
      // room: new FormControl(''),
      // sheilf: new FormControl(''),
      // row: new FormControl(''),
      // serial: new FormControl(''),
    });
  }
  getFormDetail(detail) {
    return new FormGroup({
      // source: new FormControl(detail.source),
      // lost: new FormControl(detail.lost),
      // isCollection: new FormControl(detail.isCollection),
      amount: new FormControl(detail.amount),
      // fridge: new FormControl(detail.fridge),
      // room: new FormControl(detail.room),
      // sheilf: new FormControl(detail.sheilf),
      // row: new FormControl(detail.row),
      // serial: new FormControl(detail.serial),
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
      simpleCounter: this.simpleCounter.value,
      storage: this.details.length,
      role: this.myRole
    };

    this.service.setWineStorage(storageData, this.myRole.type).subscribe(() => {
      this.close();
      // this.getPreviousVotes();
    });
  }
}
