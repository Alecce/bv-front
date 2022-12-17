import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {InputData} from '../../business-designed/business-designed.component';
import {LanguageServiceService} from '../../services/language-service.service';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '../../services/loading-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdditionalSchemaComponent} from '@src/app/schemas/additional-schema/additional-schema.component';

@Component({
  selector: 'app-event-designed-additional',
  templateUrl: './event-designed-additional.component.html',
  styleUrls: ['./event-designed-additional.component.css']
})
export class EventDesignedAdditionalComponent implements OnInit {
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

  request = {business_type: 'event'};

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
