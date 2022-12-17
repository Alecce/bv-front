import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgbDropdown, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountServiceService} from '../../services/account-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ResolutionService} from '@src/app/services/resolution.service';
import {variables} from '@src/environments/variables';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {BengatContactsComponent} from '@src/app/schemas/bengat-contacts/bengat-contacts.component';

@Component({
  selector: 'app-navigation-designed',
  templateUrl: './navigation-designed.component.html',
  styleUrls: ['./navigation-designed.component.css']
})
export class NavigationDesignedComponent implements OnInit, AfterViewInit {
  @ViewChild(NgbDropdown) private dropdown: NgbDropdown;


  bengat = variables.bengat;

// @ts-ignore
  cookies: Observable;
  cssMainNames = {
    font: '40px'
  };
  roleList = [];
  roleLoading = true;
  me = {type: 'person', name: ''};

  form = new FormGroup({
    role: new FormControl(0),
  });


  page = new FormControl('initialValue');
  navigationPages = [
    {
      label: 'Wines',
      place: 'wines_list',
      query: '/wine-list',
      icon: 'icn-wines',
      params: {},
      clickFunction: this.routeToWinelist,
      onlyLogged: false,
    },
    {
      label: 'Wine collection',
      place: 'wines_collection',
      query: '/wine-list',
      icon: 'icn-wines',
      params: {tab: 'collection'},
      clickFunction: this.routeToWinelistCollection,
      onlyLogged: true,
    },
    {
      label: 'Wine tasting notes',
      place: 'wines_tasting',
      query: '/wine-list',
      icon: 'icn-wines',
      params: {tab: 'myRates'},
      clickFunction: this.routeToWinelistRates,
      onlyLogged: true,
    },
    {
      label: 'Wineries',
      place: 'wineries',
      query: '/winery-list',
      icon: 'icn-wines',
      params: {},
      clickFunction: this.routeToWinerylist,
      onlyLogged: false,
    },
    {
      label: 'Events',
      place: 'event_list',
      query: '/event-list',
      icon: 'icn-events',
      params: {},
      clickFunction: this.routeToEventlist,
      onlyLogged: false,
    }
  ];

  navigationPagesBengat = [
    {
      label: 'Wines',
      place: 'wines_list',
      query: '/wine-list',
      icon: 'icn-wines',
      params: {},
      clickFunction: this.routeToWinelist,
      onlyLogged: false,
    }
  ];

// @ts-ignore
  @ViewChild('iconwine') public iconwine: HTMLElement;
// @ts-ignore
  @ViewChild('navigation') private navigationRef: ElementRef;

  variables = variables;


  constructor(private renderer: Renderer2,
              private cookieObserver: CookieObserverService,
              public cookieService: CookieService,
              public langService: LanguageServiceService,
              private service: RequestsService,
              private router: Router,
              public dialog: MatDialog,
              public overlay: Overlay,
              private route: ActivatedRoute,
              private accountService: AccountServiceService,
              public  resolutionService: ResolutionService,
              public activatedroute: ActivatedRoute,
              config: NgbDropdownConfig) {
    config.autoClose = 'outside';

    config.placement = 'right-bottom';
  }

  ngOnInit() {

    // this.service.getLanguageTable(null).subscribe();

    this.page.setValue('initialValue');
    this.router.events.subscribe(event => {

//       console.log(this.page.value)
// // @ts-ignore
//         console.log(event.url.split('?'))
// @ts-ignore
      if(event.url) {
// @ts-ignore
        this.page.setValue(event.url.split('?')[0]);

      }
    });
    // this.page.setValue(this.router.url);
    // $('#icn-wines').attr('stroke', '#009900');
    // $( "mat-icon" ).on( "click", function() {
    //   console.log( '!!!!!' );
    //
    //   $('#icn-wines').attr('stroke', '#009900');
    // });
    this.cookies = this.cookieObserver.observeCookie();
    this.cookieObserver.cookieObserver.subscribe(q => {
      this.me.name = q.login;
      const idData = {
        myId: this.cookieService.get('myId'),
        passwordHash: this.cookieService.get('hash')
      };
      if (q.id && this.roleLoading) {
        this.roleLoading = false;
//         this.service.myBusiness(q.id).subscribe(response => {
//           this.roleList = [];
// // @ts-ignore
//           this.roleList.push(this.me);
// // @ts-ignore
//           if (response.specialistData.length) {
// // @ts-ignore
//             response.specialistData.forEach(x => {
//               this.roleList.push({type: 'specialist', name: x.name});
//             });
//           }
//
// // @ts-ignore
//           if (response.shopData.length) {
// // @ts-ignore
//             response.shopData.forEach(x => {
//               this.roleList.push({type: 'shop', name: x.name});
//             });
//           }
//
// // @ts-ignore
//           if (response.wineryData.length) {
// // @ts-ignore
//             response.wineryData.forEach(x => {
//               this.roleList.push({type: 'winery', name: x.name});
//             });
//           }
//         });
      }
    });

    this.cookieObserver.cookieChanged();

    // if()
    this.accountService.roles.subscribe(x => {
// @ts-ignore
      this.roleList = x;
      this.form.get('role').valueChanges.subscribe(idOption => {
        const chosenRole = this.roleList.filter(role => {
          return role.idOption == idOption;
        })[0];
        this.accountService.currentRole.next(chosenRole);
      });
    });

  }

  routeToHome() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/'])
    );
    console.log(this.router.url)
  }

  routeToWinerylist() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['winery-list'])
    );
    console.log(this.router.url)
  }

  routeToWinelist() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['wine-list'])
    );
    console.log(this.router.url)
  }

  routeToWinelistRates() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['wine-list'], { queryParams: { tab: 'myRates' } })
    );
    console.log(this.router.url)
  }

  routeToWinelistCollection() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['wine-list' ], { queryParams: { tab: 'collection' } })
    );
    console.log(this.router.url)
  }

  routeToEventlist() {
    if(this.langService.editable) {
      return;
    }
    this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
      this.router.navigate(['event-list'])
    );
  }

  ngAfterViewInit(): void {
    console.log(this.iconwine);
    // $('#icn-wines').attr('stroke', '#009900');
  }

  iconClick(element: HTMLElement) {
    // const icon = element['_elementRef'].nativeElement.getElementsByClassName('iconWineClass')[0];
    // this.renderer.setAttribute(icon, 'stroke', 'red');
    // console.log(this.iconwine);
  }

  get routerUrl() {
    // console.log(this.route.snapshot);
    // console.log(this.router.url.split('?')[0]);
    return this.router.url.split('?')[0];
  }


  classForRouteButtons(route, tab) {
    // console.log(this.route.snapshot);
    // console.log(this.router.url.split('?')[0]);
    // return this.router.url.split('?')[0];

    const url = this.router.url.split('?')[0];
    const query = this.route.snapshot.queryParams.tab || '';

    const res = url == route && query == tab ? 'nav-item-list-current' : '';
    // console.log(url);
    // console.log(route);
    // console.log(url == route);
    // console.log(query);
    // console.log(tab);
    // console.log(query == tab);
    // console.log(res);
    return res;
  }
  get role() {
    return this.form.get('role');
  }

  getHeight() {
    console.log(this.navigationRef);
    if(this.navigationRef && this.navigationRef.nativeElement && this.navigationRef.nativeElement.offsetHeight) {
// @ts-ignore
      return this.navigationRef.nativeElement.offsetHeight;
    } else {
      return 0;
    }
  }
  getCurrentPageName() {
    const page = this.navigationPages.find(nav => {
      return nav.query === this.page.value;
    });
    if (page) {
      return page;
    }
    return {
      label: 'Navigate',
      place: 'navigate'
    };
  }
  setPage(query) {
    this.page.setValue(query);
  }

  isBigScreen() {
    return window.innerWidth > 1080
  }

  logoLink(){
    let link = '';

    // this.activatedroute.snapshot.params.profile;
    // if (this.variables.bengat) {
    //   link = 'bengat/profile/114';
    // }

    return this.langService.editable ? null : link;
  }

  openBengatContacts(): void {
    if (this.langService.editable) {
      return;
    }
    const dialogRef = this.dialog.open(BengatContactsComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // width: '800px',
      // height: '450px',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
