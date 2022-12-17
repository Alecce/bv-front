import {ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {CookieObserverService} from '../services/cookieObserver/cookie-observer.service';
import {ResolutionService} from '@src/app/services/resolution.service';
import {NavigationDesignedComponent} from '@src/app/navigation/navigation-designed/navigation-designed.component';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {variables} from '@src/environments/variables';
import {filter} from 'rxjs/operators';
import {RequestsService} from "@src/app/services/api/requests.service";
import {CloseSubscreenSecviceService} from "@src/app/services/close-subscreen-secvice.service";
import {WineListSearchbarServiceService} from "@src/app/lists/wine-list-designed/wine-list-searchbar-service.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {
// @ts-ignorev
  cookies: Observable;

  variables = variables;

// @ts-ignore
  @ViewChild('navigation') private navigationRef_: ElementRef;
// @ts-ignore
  @ViewChild(NavigationDesignedComponent) private navigationRef: NavigationDesignedComponent;


  constructor(private cookieObserver: CookieObserverService,
              public  resolutionService: ResolutionService,
              private titleService: Title,
              private router: Router,
              private service: RequestsService,
              public activatedRoute: ActivatedRoute,
              private changeDetector: ChangeDetectorRef,
              public langService: LanguageServiceService,
              public closeSubscreenService: CloseSubscreenSecviceService,
              public wineListSearchbarService: WineListSearchbarServiceService
  ) { }

  ngOnInit() {




    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {


      // console.log(event)

      // this.closeSubscreenService.close();

      this.langService.addLanguageParam();

    });

    // this.langService.download.subscribe(() => {
    //   this.changeDetector.detectChanges();
    // });

    let title = 'bonvino.com';
    this.titleService.setTitle(title);


    this.cookies = this.cookieObserver.observeCookie();
    this.cookieObserver.cookieObserver.subscribe(q => {
      // console.log(q);
    });

    this.cookieObserver.cookieChanged();
    // console.log(this.navigationRef);


    // // @ts-ignore
    // this.langService.pageLanguageLoaderSubj.pipe(
    //   debounceTime(1000)
    // ).subscribe(pl => {
    //   this.langService.forcedLanguageLoadingForArrayPages().subscribe();
    // })
  }

  @HostListener('window:resize', ['$event'])
  setWidth(event) {

    this.resolutionService.setWidth(window.innerWidth);
    // console.log(window.innerWidth);
  }

  getBodyMargin() {
    if(this.navigationRef_ && this.navigationRef_.nativeElement && this.navigationRef_.nativeElement.offsetHeight && this.resolutionService.isSmall()) {
// @ts-ignore
      return { 'margin-top': this.navigationRef_.nativeElement.offsetHeight + 'px' };
    } else {
      return 0;
    }
  }

  isRtl() {
    // console.log(this.langService.isRtl())
    return this.langService.isRtl();
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }
}
