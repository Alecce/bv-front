import {Component, Inject, OnInit} from '@angular/core';
import {CookieObserverService} from '../cookieObserver/cookie-observer.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '../api/requests.service';
import {LanguageServiceService} from '../language-service.service';
import {DownloadDataServiceService} from '../download-data-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.css']
})
export class AreYouSureComponent implements OnInit {

  countriesMap = new Map();
  regionesMap = new Map();

  counterData = null;

  countries = [];
  regiones = [];
  allRegiones = [];



  form = new FormGroup({
    country: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),
  });

  constructor(
    public downloadService: DownloadDataServiceService,
    public dialogRef: MatDialogRef<AreYouSureComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private route: Router) { }

  ngOnInit() {


  }
  close(): void {
    if (this.langService.editable) {
      return;
    }
    this.dialogRef.close();
  }
}
