import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {Title} from '@angular/platform-browser';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-map-subscreen',
  templateUrl: './map-subscreen.component.html',
  styleUrls: ['./map-subscreen.component.css']
})
export class MapSubscreenComponent implements OnInit {
  downloadedData;
  constructor(
    public overlay: Overlay,
    public dialogRef: MatDialogRef<MapSubscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    public langService: LanguageServiceService,
    public dialog: MatDialog,
    private accountService: AccountServiceService,
    private titleService: Title,
    private additionalService: AdditionalServiceService
    ) { }

  ngOnInit(): void {
    this.downloadedData = this.data;
  }

}
