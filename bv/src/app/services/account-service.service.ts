import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CookieObserverService} from './cookieObserver/cookie-observer.service';
import {RequestsService} from './api/requests.service';
import {Observable, ReplaySubject} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {


  me = {idOption: 0, type: 'person', name: ''};
  public currentRole = new ReplaySubject(1);
  public roles = new ReplaySubject(1);
  public getProfile = new ReplaySubject(1);
  public isAdminSubj = new ReplaySubject(1);

  properties = {
    type: null
  };
  roleList = [];
  roleLoading = true;
  cookies: Observable<any>;

  specialistId = 0;

  constructor(
    private cookieObserver: CookieObserverService,
    public cookieService: CookieService,
    private service: RequestsService,
  ) {


    this.getProfile.pipe(first()).subscribe(x => {

      if(x) {

// @ts-ignore
        this.isAdminSubj.next(x.type == 4);
      }
    });
    this.cookieObserver.cookieObserver.subscribe(q => {
      this.me.name = q.login;
      this.currentRole.next(this.me);
      // console.log(q);
      const idData = {
        myId: this.cookieService.get('myId'),
        passwordHash: this.cookieService.get('hash')
      };
      if (q.id && this.roleLoading) {
        this.roleLoading = false;
        this.service.myBusiness(q.id).subscribe(response => {
          // console.log(response);
          let idOption = 1;
          this.roleList = [];
// @ts-ignore
          this.roleList.push(this.me);

// @ts-ignore
          if (response.collectorData.collector) {
            this.roleList.push({type: 'collector', name: q.login, idOption: idOption++});
          }

// @ts-ignore
          if (response.specialistData.length) {
// @ts-ignore
            response.specialistData.forEach(x => {
              this.roleList.push({type: 'specialist', name: x.name, idBisness: x.id, idOption: idOption++});

              this.specialistId = x.id;
            });
          }

// @ts-ignore
          if (response.shopData.length) {
// @ts-ignore
            response.shopData.forEach(x => {
              this.roleList.push({type: 'shop', name: x.name, idBisness: x.id, idOption: idOption++});
            });
          }

// @ts-ignore
          if (response.wineryData.length) {
// @ts-ignore
            response.wineryData.forEach(x => {
              this.roleList.push({type: 'winery', name: x.name, idBisness: x.id, idOption: idOption++});
            });
          }

          this.roles.next(this.roleList);
          // console.log(this.roleList);
          // console.log(this.properties);
        });
      }
    });


    this.cookies = this.cookieObserver.observeCookie();
    this.cookieObserver.cookieChanged();
    this.cookies.subscribe(x => {
      // console.log(x);

      const idData = this.getCookieData();
      if(idData.myId) {
        this.service.getProfile(idData.myId, idData).subscribe(response => {
          // console.log(response);
// @ts-ignore
          this.getProfile.next(response);
// // @ts-ignore
//         this.profile.id = idData.myId;
// @ts-ignore
          this.properties = response;
        });
      } else {
// @ts-ignore
        this.getProfile.next(null);
      }
    });
  }


  public ifCollector() {

    // console.log(this.properties);
// @ts-ignore
    return this.properties.type >= 2 && this.properties.collector;
  }

  public ifSpecialist() {
// @ts-ignore
    return this.properties.type >= 2 && this.properties.specialist;
  }
  public getSpecialistId() {
// @ts-ignore
    return this.specialistId;
  }

  public getCookieData() {
    return {
      myId: this.cookieService.get('myId'),
      passwordHash: this.cookieService.get('hash')
    };
  }
  public isSameUser(userId) {
// @ts-ignore
    return this.properties.id == userId;
  }

  public isAdmin() {
    return this.properties.type == 4;
  }

  public isBusiness() {
    // console.log(this.properties)
    return this.properties.type >= 2;
  }

  public isTranslator() {
    // console.log(this.properties)
    return this.properties.type >= 3;
  }

  public isAvaliable(userId) {
    return this.isAdmin() || (this.isSameUser(userId) && this.isBusiness());
  }



  public isNoUser() {
    // console.log(this.properties)
    return !this.properties.type;
  }



  public specialBengatCondition() {
// @ts-ignore
    return this.isAdmin() || this.properties.id == 114;
  }
}
