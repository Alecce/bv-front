import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {FormGroup} from '@angular/forms';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {AdditionalSchemaComponent} from '@src/app/schemas/additional-schema/additional-schema.component';
import {RequestsService} from '@src/app/services/api/requests.service';
import {Subject} from 'rxjs';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-competition-additional',
  templateUrl: './competition-additional.component.html',
  styleUrls: ['./competition-additional.component.css']
})
export class CompetitionAdditionalComponent implements OnInit {
  tab = 'additional';

  structure: InputData[][] = [];

  type = '';
  id = '';
  businessName = '';
  businessType = '';

  form = new FormGroup({


  });



  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() structureData: Subject;
  // @ts-ignore
  @Input() additionalTabs: Subject;
  // @ts-ignore
  @Input() menuData: FormGroup;
  // @ts-ignore
  @Input() currentSubTab: Subject;

  request = {business_type: 'competition'};

  // @ts-ignore
  @ViewChild(AdditionalSchemaComponent) schema: AdditionalSchemaComponent;


  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService) { }

  ngOnInit() {

  }

  getAdditionalData() {

    return this.schema.getAdditionalData();
  }
}
