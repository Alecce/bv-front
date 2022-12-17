import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MenuSchemaComponent} from '@src/app/schemas/menu-schema/menu-schema.component';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Subject} from 'rxjs';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '@src/app/services/loading-service.service';

@Component({
  selector: 'app-vineyard-menu-designed',
  templateUrl: './vineyard-menu-designed.component.html',
  styleUrls: ['./vineyard-menu-designed.component.css']
})
export class VineyardMenuDesignedComponent implements OnInit {
  tab = 'menu';

  // @ts-ignore
  @Input() structureData: Subject;
  // @ts-ignore
  @Input() downloadedData: Subject;

  // @ts-ignore
  @ViewChild(MenuSchemaComponent) menu: MenuSchemaComponent;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService) { }

  ngOnInit() {


  }

  getMenuData() {

    return this.menu.form.value;

  }

  getMenuForm() {

    return this.menu.form;

  }

  getFormValue(control) {
    return this.menu.form.get(control) && this.menu.form.get(control).value;
  }
}
