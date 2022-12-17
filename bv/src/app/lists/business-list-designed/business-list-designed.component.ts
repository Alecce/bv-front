import {Component, OnInit} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {ListsService} from '../../services/api/lists.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {LoadingServiceService} from '../../services/loading-service.service';
import {MatDialog} from '@angular/material/dialog';
import {SpecialistSubscreenComponent} from './specialist-subscreen/specialist-subscreen.component';
import {BusinessSubscreenComponent} from './business-subscreen/business-subscreen.component';
import {BusinessDescriptionSubscreenComponent} from './business-description-subscreen/business-description-subscreen.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-business-list-designed',
  templateUrl: './business-list-designed.component.html',
  styleUrls: ['./business-list-designed.component.css']
})
export class BusinessListDesignedComponent implements OnInit {

  id = this.activatedroute.snapshot.params.id;
  specialistList = [];
  shopList = [];
  wineryList = [];
  vineyardList = [];
  competitionList = [];
  businessList = [];

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private cookieObserver: CookieObserverService,
              public loadingService: LoadingServiceService,
              public dialog: MatDialog,
              private titleService: Title,
              public overlay: Overlay) { }

  ngOnInit() {

    let title = 'My business - bonvino.com';
    this.titleService.setTitle(title);



    this.service.myBusiness(this.id).subscribe((data) => {
      console.log(data);
// @ts-ignore
      this.specialistList = data.specialistData;
// @ts-ignore
      this.shopList = data.shopData;
// @ts-ignore
      this.wineryList = data.wineryData;
// @ts-ignore
      this.vineyardList = data.vineyardData;
// @ts-ignore
      this.competitionList = data.competitionData;
// @ts-ignore
      this.businessList = data.businessData;
//       if (data.specialistData.length) {
// // @ts-ignore
//         data.specialistData.forEach(x => {
//           this.roleList.push({type: 'specialist', name: x.name});
//         });
//       }
//
//
// // @ts-ignore
//       if (data.shopData.length) {
// // @ts-ignore
//         data.shopData.forEach(x => {
//           this.roleList.push({type: 'shop', name: x.name});
//         });
//       }
    });
  }
  openSpecialist(i, type) {
    const data = {type, specialist: null};
    if (i != -1) {
      data.specialist = this.specialistList[i];
    } else {
      data.specialist = null;
    }
    data.type = type;
    const dialogRef = this.dialog.open(SpecialistSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '800px',
      height: '300px',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.service.setSpecialist(result).subscribe(res => {
          this.specialistList.push(res);
        });
      }
    });
  }
  deleteSpecialist(i, type) {
    const req = {id: this.specialistList[i].id, type}
    this.service.deleteSpecialist(req).subscribe(() => {
      // @ts-ignore
      this.specialistList.splice(i, 1);
    });
  }

  openBusiness(i) {
    let data = {business: null};
    if (i != -1) {
      data.business = this.businessList[i];
    } else {
      data.business = null;
    }
    // data.type = type;
    const dialogRef = this.dialog.open(BusinessDescriptionSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '800px',
      height: '300px',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.service.setBusiness(result).subscribe(res => {
          this.businessList.push(res);
        });
      }
    });
  }

  deleteBusiness(i) {
    const req = {id: this.businessList[i].id}
    this.service.deleteBusiness(req).subscribe(() => {
      // @ts-ignore
      this.businessList.splice(i, 1);
    });
  }

  openBusinessRelations(i, id, type) {
    const data = {type, id};
    // if (i != -1) {
    //   data.id = this.specialistList[i];
    // } else {
    //   data.id = null;
    // }
    data.type = type;
    const dialogRef = this.dialog.open(BusinessSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getLinkBusiness(i) {
    return '/business/' + this.businessList[i].type + '/' + this.businessList[i].id;
  }
}
