import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '@src/app/services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';

@Component({
  selector: 'app-wines-shop-add-subscreen',
  templateUrl: './wines-shop-add-subscreen.component.html',
  styleUrls: ['./wines-shop-add-subscreen.component.css']
})
export class WinesShopAddSubscreenComponent implements OnInit {

  form = new FormGroup({
    // details: new FormArray([]),
    isInShop: new FormControl(true),
    price: new FormControl(''),
  });

  wineId;
  shopId;

  constructor(
    public dialogRef: MatDialogRef<WinesShopAddSubscreenComponent>,
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
    this.wineId = this.data.wine;
    this.shopId = this.data.shop;
    this.getStorage();





  }



  getStorage() {
    this.service.getWineShopData({wineId: this.wineId, shopId: this.shopId}).subscribe(storageData => {

      // @ts-ignore
      if (storageData && storageData.price) {
        // @ts-ignore
        this.price.setValue(storageData.price);
      }
      // @ts-ignore
      if (storageData && storageData.price) {
        // @ts-ignore
        this.isInShop.setValue(storageData.price);
      }
    });
  }
  get price(): FormControl {
    return this.form.get('price') as FormControl;
  }
  get isInShop(): FormControl {
    return this.form.get('isInShop') as FormControl;
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
    const storageData = {wineId: this.wineId, shopId: this.shopId, price: this.price.value, isInShop: this.isInShop.value};

    this.service.setWineShopData(storageData).subscribe(() => {
      this.close();
      // this.getPreviousVotes();
    });
  }
  delete() {
    if (this.langService.editable) {
      return;
    }
    const storageData = {wineId: this.wineId, shopId: this.shopId, delete: true};

    this.service.setWineShopData(storageData).subscribe(() => {
      this.close();
      // this.getPreviousVotes();
    });
  }

}
