import {Component, OnInit, Renderer2} from '@angular/core';
import {BengatContactsComponent} from '@src/app/schemas/bengat-contacts/bengat-contacts.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {Overlay} from '@angular/cdk/overlay';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {ResolutionService} from '@src/app/services/resolution.service';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '@src/environments/environment';

@Component({
  selector: 'app-wine-list-navigation',
  templateUrl: './wine-list-navigation.component.html',
  styleUrls: ['./wine-list-navigation.component.css']
})
export class WineListNavigationComponent implements OnInit {

  id = 114;
  profile;
  noImage = '../../../assets/icons/placeholder-wine.svg';


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
              ) { }

  ngOnInit(): void {


    const idData = this.getCookieData();
    this.service.getProfile(this.id, idData).subscribe(response => {

      // let title = '';
      // // @ts-ignore
      // if(response.username) {
      //   // @ts-ignore
      //   title = response.username + ' person - bonvino.com';
      // } else {
      //   // @ts-ignore
      //   title = ' person - bonvino.com';
      // }
      // this.titleService.setTitle(title);


      this.profile = response;

    });


  }


  getCookieData() {
    return {
      myId: this.cookieService.get('myId'),
      passwordHash: this.cookieService.get('hash')
    };
  }
  getImage() {
    if (this.profile && this.profile.image) {
      return environment.userImageStore + `${this.id + '_' + this.profile.image}.png`;

    } else {
      return this.noImage;
    }
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

  isBigScreen() {
    return window.innerWidth > 1080
  }
  isMobileScreen() {
    return window.innerWidth < 768
  }

}
