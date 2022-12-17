import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {forkJoin, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {ListsService} from '../../services/api/lists.service';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-wines-serving-designed',
  templateUrl: './wines-serving-designed.component.html',
  styleUrls: ['./wines-serving-designed.component.css']
})
export class WinesServingDesignedComponent implements OnInit {
  tab = 'serving';
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  isWineryOwner = false;

  glasses = glassesData;

  servingTemperaturesList = [];

  form = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    needDecanter: new FormControl(false),
    servingTemperature: new FormControl(0),
    glass: new FormControl(''),
    drinkingTime: new FormControl(''),

  });

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              public accountService: AccountServiceService,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public overlay: Overlay) { }

  ngOnInit() {

    const getServingTemperatures = this.service.getServingTemperatures();

    forkJoin([getServingTemperatures]).subscribe(results => {

      // @ts-ignore
      this.servingTemperaturesList = results[0];

      this.activatedroute.data.subscribe(data => {
        if (data.download) {
          this.downloadedData.subscribe(downloadData => {
            Object.keys(this.form.controls).forEach(key => {
              console.log(downloadData.serving_designed[key])
              if (this.form.get(key) instanceof FormControl && downloadData.serving_designed[key]) {
                this.form.get(key).setValue(downloadData.serving_designed[key]);
              }
            });

          });
        }
      });
    });

    // this.form.valueChanges.subscribe(() => {
    //   console.log(this.descriptionData);
    // })
  }
  get needDecanter() {
    return this.form.get('needDecanter');
  }

  get drinkingTime() {
    return this.form.get('drinkingTime');
  }
  get servingTemperature() {
    return this.form.get('servingTemperature');
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }

  // get descriptionData() {
  //   return this.description.getFormData();
  // }
}

export const glassesData = [
  {id: 1, width: '110px', op: '-15px',  icon: 'icn-glass-1', iconDisabled: 'icn-glass-1-disable', iconClass: 'icon-glass-1'},
  {id: 2, width: '110px', op: '-125px', icon: 'icn-glass-2', iconDisabled: 'icn-glass-2-disable', iconClass: 'icon-glass-2'},
  {id: 3, width: '110px', op: '-235px', icon: 'icn-glass-3', iconDisabled: 'icn-glass-3-disable', iconClass: 'icon-glass-3'},
  {id: 4, width: '110px', op: '-345px', icon: 'icn-glass-4', iconDisabled: 'icn-glass-4-disable', iconClass: 'icon-glass-4'},
  {id: 5, width: '110px', op: '-455px', icon: 'icn-glass-5', iconDisabled: 'icn-glass-5-disable', iconClass: 'icon-glass-5'},
  {id: 6, width: '110px', op: '-565px', icon: 'icn-glass-6', iconDisabled: 'icn-glass-6-disable', iconClass: 'icon-glass-6'},
  {id: 7, width: '110px', op: '-675px', icon: 'icn-glass-7', iconDisabled: 'icn-glass-7-disable', iconClass: 'icon-glass-7'},
];
