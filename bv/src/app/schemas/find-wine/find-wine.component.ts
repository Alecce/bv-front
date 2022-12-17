import {Component, Inject, OnInit} from '@angular/core';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {ListsService} from '@src/app/services/api/lists.service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-find-wine',
  templateUrl: './find-wine.component.html',
  styleUrls: ['./find-wine.component.css']
})
export class FindWineComponent implements OnInit {

  LANGUAGE_CURRENT_PAGE = 'wines_find';
  wineId;

  collectorArr = [];
  shopArr = [];
  eventArr = [];


  form = new FormGroup({

    orderCollector: new FormControl('user'),
    orderShop: new FormControl('name'),
    orderEvent: new FormControl('checkbox'),
  });

  constructor(
    public downloadService: DownloadDataServiceService,
    public dialogRef: MatDialogRef<FindWineComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    public imagePlaceholder: PlaceholderServiceService,
    public listService: ListsService,
    private route: Router) { }

  ngOnInit(): void {
    this.wineId = this.data.id;
    this.getStorage();
  }

  getStorage() {



    this.service.findWine({wine: this.wineId}).subscribe(storageData => {

      // @ts-ignore
      if(storageData.collectorArr) {
        // @ts-ignore
        this.collectorArr = storageData.collectorArr;
      }
      // @ts-ignore
      if(storageData.shopArr) {
        // @ts-ignore
        this.shopArr = storageData.shopArr;
      }
      // let storage;
      // @ts-ignore
      // if (storageData && storageData.details) {
      //   // @ts-ignore
      //   storage = JSON.parse(storageData.details);
      // } else {
      //   storage = [];
      // }
      // // @ts-ignore
      // storage.forEach(s => {
      //   this.addDetail(s);
      // });
      //
      //
      // // 'user_collection.price',
      // //   'user_collection.is_for_sale as isForSale',
      //
      //
      //
      // // @ts-ignore
      // if (storageData && storageData.price) {
      //   // @ts-ignore
      //   this.price.setValue(storageData.price);
      // }
      // // @ts-ignore
      // if (storageData && storageData.isForSale) {
      //   // @ts-ignore
      //   this.isForSale.setValue(storageData.isForSale);
      // }
    });
  }


  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }

  orderTableByShopName(order) {
    let direction = 1;
    if(order == 'name') {
      direction = -1;
    }
    this.shopArr.sort((a, b) => {
      if(a.name > b.name) {
        return 1 * direction;
      } else {
        return -1 * direction;
      }
    });
    this.orderShop.setValue(order);
  }
  orderTableByShopIntName(order) {
    let direction = 1;
    if(order == 'int_name') {
      direction = -1;
    }
    this.shopArr.sort((a, b) => {
      if(a.int_name > b.int_name) {
        return 1 * direction;
      } else {
        return -1 * direction;
      }
    });
    this.orderShop.setValue(order);
  }
  orderTableByShopPrice(order) {
    let direction = 1;
    if(order == 'price') {
      direction = -1;
    }
    this.shopArr.sort((a, b) => {
      if(a.price > b.price) {
        return 1 * direction;
      } else {
        return -1 * direction;
      }
    });
    this.orderShop.setValue(order);
  }

  orderTableByUsername(order) {
    let direction = 1;
    if(order == 'user') {
      direction = -1;
    }
    this.collectorArr.sort((a, b) => {
      if(a.login > b.login) {
        return 1 * direction;
      } else {
        return -1 * direction;
      }
    });
    this.orderCollector.setValue(order);
  }
  orderTableByCost(order) {
    let direction = 1;
    if(order == 'cost') {
      direction = -1;
    }
    this.collectorArr.sort((a, b) => {
      if(a.cost > b.cost) {
        return 1 * direction;
      } else {
        return -1 * direction;
      }
    });
    this.orderCollector.setValue(order);
  }
  get orderCollector() {
    return this.form.get('orderCollector');
  }
  get orderShop() {
    return this.form.get('orderShop');
  }
  get orderEvent() {
    return this.form.get('orderEvent');
  }
  getSortingClassCollectors(sortarr) {
    let isOrdered = false;
    sortarr.forEach(sort => {
      if (this.orderCollector.value == sort) {
        isOrdered = true;
      }
    });
    if (isOrdered) {
      return 'sorting-col';
    } else {
      return '';
    }
  }
  getSortingClassShops(sortarr) {
    let isOrdered = false;
    sortarr.forEach(sort => {
      if (this.orderShop.value == sort) {
        isOrdered = true;
      }
    });
    if (isOrdered) {
      return 'sorting-col';
    } else {
      return '';
    }
  }
  getSortingClassEvents(sortarr) {
    let isOrdered = false;
    sortarr.forEach(sort => {
      if (this.orderEvent.value == sort) {
        isOrdered = true;
      }
    });
    if (isOrdered) {
      return 'sorting-col';
    } else {
      return '';
    }
  }
}
