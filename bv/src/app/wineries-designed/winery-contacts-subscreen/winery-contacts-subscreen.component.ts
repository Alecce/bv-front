import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '../../services/language-service.service';

@Component({
  selector: 'app-winery-contacts-subscreen',
  templateUrl: './winery-contacts-subscreen.component.html',
  styleUrls: ['./winery-contacts-subscreen.component.css']
})
export class WineryContactsSubscreenComponent implements OnInit {
  wineryData = null;
  visitTime = [
    {text: '', day: 'Sunday'},
    {text: '', day: 'Monday'},
    {text: '', day: 'Tuesday'},
    {text: '', day: 'Wednesday'},
    {text: '', day: 'Thursday'},
    {text: '', day: 'Friday'},
    {text: '', day: 'Saturday'},
  ];
  timeData = null;

  countries = [];
  countriesMap = new Map();
  constructor(
    public dialogRef: MatDialogRef<WineryContactsSubscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private route: Router) { }

  ngOnInit() {
    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });

    });

    this.data.subscribe(x => {
      this.wineryData = x;

// @ts-ignore
      if (this.wineryData.visittime) {
// @ts-ignore
        const timeData = JSON.parse(this.wineryData.visittime);
        console.log(timeData);
        this.timeData = timeData;
        Object.keys(timeData).forEach(key => {
          if (timeData[key] !== '') {
            const day = key[2];
            const type = key[0];
// @ts-ignore
            if (this.visitTime[day * 1].text != '' && type == 'f') {
// @ts-ignore
              this.visitTime[day * 1].text += ', ';
            }
            // this.times(day).push(new FormControl(timeData[key]));
            if (type == 't') {
// @ts-ignore
              this.visitTime[day * 1].text += ' - ';
            }
// @ts-ignore
            this.visitTime[day * 1].text += timeData[key];
          }
        });
      }
    });
  }
  getRegion(regions) {
    // console.log(regions);
    let res = '';
    regions.forEach(x => {
      if (x) {
        // console.log(x);
        res += x;
        res += ', ';
      }
    });
    if (res) {
      res = res.slice(0, -2);
    }
    return res;
  }
  getAddress(data) {
    let res = '';
    if (data.country) {
      res += this.countriesMap.get(data.country);
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
