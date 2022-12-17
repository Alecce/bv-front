import {Component, Input, OnInit} from '@angular/core';
import {TabData} from '@src/app/schemas/super-component-with-tabs/super-component-with-tabs.component';
import {Subject} from 'rxjs';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-tabs-bar',
  templateUrl: './tabs-bar.component.html',
  styleUrls: ['./tabs-bar.component.css']
})
export class TabsBarComponent implements OnInit {

  @Input() tabSubject: Subject<any>;
  @Input() chosenTab;
  @Input() tabsData: TabData[];

  constructor(
    private accountService: AccountServiceService,
    ) { }

  ngOnInit(): void {

  }

  getSpecialClasses(tab, i) {
    let res = this.getTabColor(tab);
    if(res) {
      res = res + ' ';
    }
    res = res + this.isLast(i);
    return res;
  }

  isLast(i) {
    if(this.tabsData.length == i + 1) {
      return 'mr-0';
    } else {
      return 'ml-0';
    }
  }

  getTabColor(tab) {
    if (this.chosenTab == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }

  chose(tab) {
    this.tabSubject.next(tab);
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }
  isChosenTab(tab) {
    return this.chosenTab == tab;
  }

  isDisabledForNonBusiness(onlyBusiness) {
    // console.log(onlyBusiness);
    // console.log(this.accountService.isBusiness());
    return onlyBusiness && !this.accountService.isBusiness();

    // this.tabSubject.next(tab);
    // return true;
  }

  isDisabledForYou(disabledForYou) {
    // console.log(onlyBusiness);
    // console.log(this.accountService.isBusiness());
    return disabledForYou;

    // this.tabSubject.next(tab);
    // return true;
  }


  isHiddenForYou(adminOnly, specialCondition) {
    if(specialCondition) {
      return adminOnly && !this.accountService.isAdmin() && !this.accountService.specialBengatCondition();
    }
    return adminOnly && !this.accountService.isAdmin();
  }

  isDisabled(onlyBusiness, disabledForYou, specialCondition) {
    if(specialCondition) {
      return this.isDisabledForNonBusiness(onlyBusiness) || this.isDisabledForYou(disabledForYou) && !this.accountService.specialBengatCondition()
    }
    return this.isDisabledForNonBusiness(onlyBusiness) || this.isDisabledForYou(disabledForYou);
  }
}
