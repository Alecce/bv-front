import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsService} from '../../services/api/lists.service';
import {RequestsService} from '../../services/api/requests.service';
import {LoadingServiceService} from '../../services/loading-service.service';
import {Overlay} from '@angular/cdk/overlay';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  id = this.activatedroute.snapshot.params.id;
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
}
