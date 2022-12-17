import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {Title} from '@angular/platform-browser';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {Overlay} from '@angular/cdk/overlay';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MapSubscreenComponent} from '@src/app/schemas/map-subscreen/map-subscreen.component';

@Component({
  selector: 'app-map-hidden',
  templateUrl: './map-hidden.component.html',
  styleUrls: ['./map-hidden.component.css']
})
export class MapHiddenComponent implements OnInit {

  geolocation;
// @ts-ignore
  @Input() downloadedData: Subject;
  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public dialog: MatDialog,
              private accountService: AccountServiceService,
              public overlay: Overlay,
              private titleService: Title,
              private additionalService: AdditionalServiceService) { }

  ngOnInit(): void {

    this.downloadedData.subscribe(v => {
      this.geolocation = v.geolocation;
      console.log(v);
    })
  }

  openMap() {

    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(MapSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      // width: '800px',
      // height: '600px',
      autoFocus: false,
      data: this.downloadedData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  getLink() {
    return 'https://www.google.com/maps/search/?api=1&query=' + this.geolocation.lat + ',' + this.geolocation.lng;
  }
}
