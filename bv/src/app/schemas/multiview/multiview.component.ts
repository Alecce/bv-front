import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {PlaceholderServiceService} from "../../services/placeholder-service.service";
import {variables} from "../../../environments/variables";
import {WinesVoteSubscreenComponent} from "../../wines-designed/wines-vote-subscreen/wines-vote-subscreen.component";
import {
  boxMaterialList,
  boxPositionList, filtrationArr,
  finingArr, wrappingTypeList
} from "../../wines-designed/wines-advanced-designed/wines-advanced-designed.component";
import {AccountServiceService} from "../../services/account-service.service";
import {FindWineComponent} from "../find-wine/find-wine.component";
import {CloseSubscreenSecviceService} from "../../services/close-subscreen-secvice.service";
import {WineDescriptionSubscreenComponent} from "../../wines-designed/wine-description-subscreen/wine-description-subscreen.component";
import {RequestsService} from "../../services/api/requests.service";
import {LanguageServiceService} from "../../services/language-service.service";
import {of, ReplaySubject, Subject} from "rxjs/index";
import {ListsService} from "../../services/api/lists.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Overlay} from "@angular/cdk/overlay";
import {ResolutionService} from "../../services/resolution.service";
import {WineOneSubscreenComponent} from "../../wines-designed/wine-one-subscreen/wine-one-subscreen.component";
import {WinesStoreSubscreenComponent} from "../../wines-designed/wines-store-subscreen/wines-store-subscreen.component";
import {WinesShortDesignedComponent} from "../../wines-designed/wines-short-designed/wines-short-designed.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WineOneUniversalSubscreenComponent} from "../../wines-designed/wine-one-universal-subscreen/wine-one-universal-subscreen.component";
import {WineOneUniversalComponent} from "../../wines-designed/wine-one-universal/wine-one-universal.component";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Meta} from "@angular/platform-browser";
import {IconBonvinoComponent} from "../icon-bonvino/icon-bonvino.component";

@Component({
  selector: 'app-multiview',
  templateUrl: './multiview.component.html',
  styleUrls: ['./multiview.component.css']
})
export class MultiviewComponent implements OnInit, AfterViewInit {
  tabs = {
    wine: 'wine',
    back: 'back',
    winery: 'winery',
    test3: 'test3',
  };
  startingTab = this.tabs.wine;

  wineryId = 0;
  vineyardsId = null;


  wineryData = null;
  vineyardsData = null;

  public form = new FormGroup({
    tab: new FormControl(this.startingTab),
  });

  wineryVineyardIdSubscriber = new ReplaySubject(10);

// @ts-ignore
  @ViewChild('iconArrow') public icon: IconBonvinoComponent;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              public imagePlaceholder: PlaceholderServiceService,
              public  resolutionService: ResolutionService,
              public closeSubscreenService: CloseSubscreenSecviceService,
              private metaTagService: Meta,
              private listService: ListsService) { }


  ngAfterViewInit(): void {



  }

  ngOnInit() {

    this.wineryVineyardIdSubscriber.subscribe(x => {
      // @ts-ignore
      if(x.winery) {
        // @ts-ignore
        this.wineryId = x.winery;
      }
    })

  }

  get tab() {
    return this.form.get('tab');
  }
  chooseTab(tab) {
    if (this.langService.editable) {
      return;
    }

    console.log(this.accountService.properties);

    this.tab.setValue(tab);
  }
  getTabColor(tab) {
    if (this.tab.value == tab) {
      return 'btn-menu-selected menu-4-active';
    } else {
      return '';
    }
  }
  isMobileScreen() {
    return window.innerWidth < 768;
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }

  paintArrow(color) {
    this.icon.paintSpecial(color);
  }
  wineListLink() {
    return '/';
  }
}
