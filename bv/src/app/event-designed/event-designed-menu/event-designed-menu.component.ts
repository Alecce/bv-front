import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '../../services/loading-service.service';
import {MenuSchemaComponent} from '@src/app/schemas/menu-schema/menu-schema.component';

@Component({
  selector: 'app-event-designed-menu',
  templateUrl: './event-designed-menu.component.html',
  styleUrls: ['./event-designed-menu.component.css']
})
export class EventDesignedMenuComponent implements OnInit {
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
