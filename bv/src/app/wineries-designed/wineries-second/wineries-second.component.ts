import {Component, Input, OnInit} from '@angular/core';
import {forkJoin, Subject} from 'rxjs';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsService} from '@src/app/services/api/lists.service';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {Overlay} from '@angular/cdk/overlay';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {languagesInterface} from '@src/environments/languages';

@Component({
  selector: 'app-wineries-second',
  templateUrl: './wineries-second.component.html',
  styleUrls: ['./wineries-second.component.css']
})
export class WineriesSecondComponent implements OnInit {
  tab = 'second';

  languageArr = languagesInterface;

  // @ts-ignore
  @Input() structureData: Subject;
  // @ts-ignore
  @Input() downloadedData: Subject;


  form = new FormGroup({


    series: new FormArray([]),
  });

  brandAmountTypes = brandAmountTypes;
  priceList = [];

  constructor(
              private cookieObserver: CookieObserverService,
              private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              private router: Router,
              public loadingService: LoadingServiceService,
              public downloadingService: DownloadDataServiceService,
              private additionalService: AdditionalServiceService
  ) { }

  ngOnInit(): void {


    const getPriceList = this.service.getPriceList();


    forkJoin([getPriceList]).subscribe(results => {

      // @ts-ignore
      this.priceList = results[0];
    });

    const id = this.activatedroute.snapshot.params.id;
    if (this.activatedroute.snapshot.data.download) {
      // this.routeData.download = true;

      this.downloadedData.subscribe(data => {
        // this.service.getWinery(id).subscribe(data => {

        // console.log(data);
        Object.keys(this.form.controls).forEach(key => {

          if (key == 'series') {
// @ts-ignore
            if (data.series) {

              console.log(data.series);

              try {

                let seriesData = data.series;

                if(typeof seriesData == 'string'){
                  seriesData = JSON.parse(seriesData);
                }
                console.log(seriesData);

                seriesData.forEach(seria => {
                  this.addSeria(seria);
                });

              } catch (e) {

              }

            }
          }
        });
      });
    }
  }


  get series(): FormArray {
    return (this.form.get('series') as FormArray);
  }

  addSeria(seria) {
    this.series.push(this.getSeriaGroup(seria));
  }

  getSeriaGroup(seria) {

    const res = new FormGroup({});

    if(seria && seria.name){
      res.addControl('name', new FormControl(seria.name));
    } else {
      res.addControl('name', new FormControl(''));
    }
    if(seria && seria.international){
      res.addControl('international', new FormControl(seria.international));
    } else {
      res.addControl('international', new FormControl(''));
    }
    if(seria && seria.timestamp){
      res.addControl('timestamp', new FormControl(seria.timestamp));
    } else {
      res.addControl('timestamp', new FormControl(Date.now()));
    }
    if(seria && seria.timestamp){
      res.addControl('int_description', new FormControl(seria.int_description));
    } else {
      res.addControl('int_description', new FormControl(''));
    }
    if(seria && seria.timestamp){
      res.addControl('description', new FormControl(seria.description));
    } else {
      res.addControl('description', new FormControl(''));
    }
    if(seria && seria.timestamp){
      res.addControl('amount', new FormControl(seria.amount));
    } else {
      res.addControl('amount', new FormControl(''));
    }
    if(seria && seria.timestamp){
      res.addControl('amount_type', new FormControl(seria.amount_type));
    } else {
      res.addControl('amount_type', new FormControl(''));
    }
    if(seria && seria.timestamp){
      res.addControl('bottle_price', new FormControl(seria.bottle_price));
    } else {
      res.addControl('bottle_price', new FormControl(''));
    }


    if(seria && seria.timestamp){
      res.addControl('alterNames', new FormArray([]));
    } else {
      res.addControl('alterNames', new FormArray([]));
    }

    return res;
  }

  removeSeria(i) {
    this.series.removeAt(i);
  }

  public getSeriesData() {
    return this.series.value;
  }


  alterNames(i): FormArray {
    return this.series.at(i).get('alterNames') as FormArray;
  }
  addAlterNames(i, point) {
    if (this.langService.editable) {
      return;
    }
    if (point) {
      (this.alterNames(i) as FormArray).push(this.getFormAlterNames(point));
    } else {
      (this.alterNames(i) as FormArray).push(this.getBlancFormAlterNames());
    }
  }


  removeAlterNames(i, point) {
    if (this.langService.editable) {
      return;
    }
    (this.alterNames(i) as FormArray).removeAt(point);
  }

  getBlancFormAlterNames() {
    return new FormGroup({
      language: new FormControl('not chosen'),
      name: new FormControl(''),
    });
  }
  getFormAlterNames(point) {
    return new FormGroup({
      language: new FormControl(point.language),
      name: new FormControl(point.name),
    });
  }
}

export const brandAmountTypes = [
  {value: 'Cases', defaultText: 'Cases'},
  {value: 'Bottles', defaultText: 'Bottles'},
];
