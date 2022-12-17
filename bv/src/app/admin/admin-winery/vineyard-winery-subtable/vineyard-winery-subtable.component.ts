import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {LanguageServiceService} from '../../../services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '../../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-vineyard-winery-subtable',
  templateUrl: './vineyard-winery-subtable.component.html',
  styleUrls: ['./vineyard-winery-subtable.component.css']
})
export class VineyardWinerySubtableComponent implements OnInit, AfterViewInit {
  public tab = 'vineyard';

  sub;
  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'National name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'int_name', name: 'International name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'region', name: 'Region', link: false, href: '', hrefId: '', searchFormControlName: 'searchRegion'}
  ];
  api = 'getVineyardList';


  // @ts-ignore
  @ViewChild(SuperlistComponent) list: SuperlistComponent;
  routeData = {editable: true};
  editable = false;
  vineyardList = [];

// @ts-ignore
  @Input() parentData: string;
// // @ts-ignore
//   @Input() downloadedData: ReplaySubject;

  form = new FormGroup({
    search: new FormControl(''),
    vineyards: new FormGroup({}),
  });

  constructor(private activatedroute: ActivatedRoute,
              private service: RequestsService,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<VineyardWinerySubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) {
  }

  ngOnInit() {
  }

  get vineyards(): FormGroup {
    return this.form.get('vineyards') as FormGroup;
  }

  get search() {
    return this.form.get('search');
  }

  submit() {
    if (this.langService.editable) {
      return;
    }
    console.log(this.form);
  }

  ngAfterViewInit(): void {
    this.sub = this.list.checkboxes.valueChanges.subscribe(() => {
      this.vineyardList = Object.values(this.list.checkboxSelect);
      this.vineyardList.forEach(grape => {
        this.vineyards.addControl(grape.id + '', new FormControl(true));
      });
    });
    this.downloadedData.subscribe(downloadData => {
      // console.log(downloadData);
      if (downloadData) {
        this.list.setData(downloadData);
      }
    });
  }

  uncheck(id) {
    if (this.langService.editable) {
      return;
    }
    this.list.unsetCheckboxes(id);
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    return this.vineyardList;
  }

}
