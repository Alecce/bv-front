import {Component, Inject, OnInit} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {
  shopArea,
  shopPurchase,
  shopQuality,
  shopRefrigerator,
  shopTypes,
  shopUniqueBottles
} from '../shop-designed-basic/shop-designed-basic.component';


@Component({
  selector: 'app-shop-information-subscreen',
  templateUrl: './shop-information-subscreen.component.html',
  styleUrls: ['./shop-information-subscreen.component.css']
})
export class ShopInformationSubscreenComponent implements OnInit {
  shopData = null;

  countries = [];
  regiones = [];
  countriesMap = new Map();
  regionesMap = new Map();


  shopTypesMap = new Map();
  shopUniqueBottlesMap = new Map();
  shopRefrigeratorMap = new Map();
  shopAreaMap = new Map();
  shopQualityMap = new Map();
  shopPurchaseMap = new Map();

  shopTypes = shopTypes;
  shopUniqueBottles = shopUniqueBottles;
  shopRefrigerator = shopRefrigerator;
  shopArea = shopArea;
  shopQuality = shopQuality;
  shopPurchase = shopPurchase;



  constructor(
    public dialogRef: MatDialogRef<ShopInformationSubscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private route: Router) { }

  ngOnInit() {

    shopTypes.forEach(x => {
      this.shopTypesMap.set(x.value, x);
    });
    shopUniqueBottles.forEach(x => {
      this.shopUniqueBottlesMap.set(x.value, x);
    });
    shopRefrigerator.forEach(x => {
      this.shopRefrigeratorMap.set(x.value, x);
    });
    shopArea.forEach(x => {
      this.shopAreaMap.set(x.value, x);
    });
    shopQuality.forEach(x => {
      this.shopQualityMap.set(x.value, x);
    });
    shopPurchase.forEach(x => {
      this.shopPurchaseMap.set(x.value, x);
    });

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      this.service.getRegiones().subscribe(data => {
// @ts-ignore
        this.regiones = data;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });

        this.data.subscribe(x => {
          console.log(x);
          this.shopData = x;
        });
      });
    });
  }
  getCountry(country) {
    // console.log(regions);
    // let res = '';
    // regions.forEach(x => {
    //   if (x) {
    //     // console.log(x);
    //     res += this.regionesMap.get(x);
    //     res += ', ';
    //   }
    // });
    // if (res) {
    //   res = res.slice(0, -2);
    // }
    // return res;
  }
  getRegion(regions) {
    // console.log(regions);
    let res = '';
    regions.forEach(x => {
      if (x) {
        // console.log(x);
        // this.langService.getText('country_names', x);
        res += this.langService.getText('country_names', '', x) || this.langService.getTextInEnglish('country_names', '', x) || this.regionesMap.get(x);
        res += ', ';
      }
    });
    if (res) {
      res = res.slice(0, -2);
    }
    return res;
  }

  getKashrutName(kashrut) {
    if (kashrut) {
      if (!kashrut.hebrew || !kashrut.hebrew.length) {
        return `${kashrut.international}`;
      }
      return `${kashrut.hebrew} (${kashrut.international})`;
    }
  }
  getAddress(data) {
    let res = '';
    if (data.country) {
      res += data.country;
      res += ', ';
    }
    if (data.city) {
      res += data.city;
      res += ', ';
    }
    if (data.address) {
      res += data.address;
      res += ', ';
    }
    if (res) {
      res = res.slice(0, -2);
    }
    return res;
  }
  close(): void {
    this.dialogRef.close();
  }
}
