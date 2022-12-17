import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ListsService} from '../../services/api/lists.service';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-wines-menu-designed',
  templateUrl: './wines-menu-designed.component.html',
  styleUrls: ['./wines-menu-designed.component.css']
})
export class WinesMenuDesignedComponent implements OnInit {

  tab = 'serving';
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  isWineryOwner = false;



  form = new FormGroup({
    description: new FormControl(true),
    certification: new FormControl(false),
    awards: new FormControl(true),
    analysis: new FormControl(true),

    crushing: new FormControl(true),
    maceration_fermentation: new FormControl(true),
    grape: new FormControl(true),
    ageing: new FormControl(true),

    pressing: new FormControl(true),
    professional_points: new FormControl(true),
    bottle: new FormControl(true),
    pallet: new FormControl(true),
    serving: new FormControl(true),

    full_description: new FormControl(true),
    rating_description: new FormControl(true),
    series: new FormControl(true),

  });

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public overlay: Overlay) { }

  ngOnInit() {
    this.isWineryOwnerSubject.subscribe(v => {
      this.isWineryOwner = v;
    });



    this.downloadedData.subscribe(downloadData => {

      if (downloadData.menu) {
        const menuData = JSON.parse(downloadData.menu);
        Object.keys(this.form.controls).forEach(key => {


          if (this.form.get(key) instanceof FormControl) {

            console.log(menuData[key]);
            if(typeof menuData[key] === 'undefined') {
              this.form.get(key).setValue(true);
            } else {
              this.form.get(key).setValue(menuData[key]);
            }

          } else {
            this.form.get(key).setValue(false);
          }

        });
      }

    });

  }

  get description() {
    return this.form.get('description');
  }
  isBusiness() {
    return !this.accountService.isBusiness();
  }
}
