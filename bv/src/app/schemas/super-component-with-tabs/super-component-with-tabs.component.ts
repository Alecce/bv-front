import {Component, OnInit} from '@angular/core';
import {LanguageServiceService} from '../../services/language-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-super-component-with-tabs',
  templateUrl: './super-component-with-tabs.component.html',
  styleUrls: ['./super-component-with-tabs.component.css']
})
export class SuperComponentWithTabsComponent implements OnInit {
  chosenTab;
  childMap;

  switchListerner = new ReplaySubject(10);

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  choseStartingTab(childMap, commoninfo) {

    if (this.activatedroute.snapshot.queryParamMap.get('tab') && childMap.get(this.activatedroute.snapshot.queryParamMap.get('tab'))) {
      this.chosenTab = childMap.get(this.activatedroute.snapshot.queryParamMap.get('tab')).tab;
    } else {
      this.chosenTab = commoninfo.tab;
    }
    this.chose(this.chosenTab);
  }
  getButtonColor(child) {
    if(child) {
      const form = child.form;
      if (this.chosenTab === child.tab) {
        return 'btn-primary';
      }
      if (form && form.invalid && form.touched) {
        return 'btn-danger';
      }
    }
    return 'btn-secondary';
  }
  chose(tab) {
    if (this.langService.editable) {
      return;
    }
    this.chosenTab = tab;
    // @ts-ignore
    this.router.navigate([], {queryParams: {tab: tab}});
    // @ts-ignore
    if (this.childMap.get(this.chosenTab).getData) {
      this.childMap.get(this.chosenTab).getData();
    }
    if (this.childMap.get(this.chosenTab).downloadAdditionalData) {
      this.childMap.get(this.chosenTab).downloadAdditionalData();
    }

    this.switchListerner.next(Math.random());
  }
}


export class TabData {
  page: any;
  place?: any;
  default: any;
  tab: any;
  onlyBusiness?: any;
  disabledForYou?: any;
  onlyAdmin?: any;
  specialCondition?: any;
}

// page: 'wines',
// default: 'Menu',
//   tab: this.tabs.menu,
//   onlyBusiness: false,
//   disabledForYou: false,
//   onlyAdmin: false,
