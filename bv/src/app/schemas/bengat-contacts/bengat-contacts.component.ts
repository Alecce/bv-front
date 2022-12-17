import {Component, Inject, OnInit} from '@angular/core';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '@src/app/services/api/requests.service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {ListsService} from '@src/app/services/api/lists.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '@src/environments/environment';
import {Overlay} from '@angular/cdk/overlay';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-bengat-contacts',
  templateUrl: './bengat-contacts.component.html',
  styleUrls: ['./bengat-contacts.component.css']
})
export class BengatContactsComponent implements OnInit {

  id = 114;
  profile;
  noImage = '../../../assets/icons/placeholder-wine.svg';

  countries = [];
  countriesMap = new Map();

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public overlay: Overlay,
              private router: Router,
              public langService: LanguageServiceService,
              private cookieObserver: CookieObserverService,
              private titleService: Title,
              public dialogRef: MatDialogRef<BengatContactsComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public loadingService: LoadingServiceService) { }

  ngOnInit() {

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      // this.filterRegiones();
    });

    const idData = this.getCookieData();
    this.service.getProfile(this.id, idData).subscribe(response => {

      let title = '';
      // @ts-ignore
      if(response.username) {
        // @ts-ignore
        title = response.username + ' person - bonvino.com';
      } else {
        // @ts-ignore
        title = ' person - bonvino.com';
      }
      this.titleService.setTitle(title);


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
  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }
}
