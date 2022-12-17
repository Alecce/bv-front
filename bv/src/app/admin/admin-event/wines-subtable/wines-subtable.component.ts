import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../../services/language-service.service';
import {RequestsService} from '../../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-wines-subtable',
  templateUrl: './wines-subtable.component.html',
  styleUrls: ['./wines-subtable.component.css']
})
export class WinesSubtableComponent implements OnInit, AfterViewInit {
  public tab = 'grapes';

  sub;
  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'international_wn', name: 'Name', link: true, href: 'wine/', hrefId: 'id', searchFormControlName: 'searchInternationalName'},
    {variable: 'vintage_year', name: 'Year', link: false, href: '', hrefId: '', searchFormControlName: 'searchYear'},
    {variable: 'wine_color', name: 'Color', link: false, href: '', hrefId: '', searchFormControlName: 'searchColor'},
    {variable: 'type', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'searchType'},
    {variable: 'name', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry'},
    {variable: 'international_name', name: 'Winery', link: false, href: '', hrefId: '', searchFormControlName: 'searchWinery'}
    ];
  api = 'getWineList';


  // @ts-ignore
  @ViewChild(SuperlistComponent) list: SuperlistComponent;
  routeData = {editable: true};
  editable = false;
  wineList = [];


  form = new FormGroup({
    search: new FormControl(''),
    wines: new FormGroup({}),
  });

  constructor(private activatedroute: ActivatedRoute,
              private service: RequestsService,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<WinesSubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {


  }

  get wines(): FormGroup {
    return this.form.get('wines') as FormGroup;
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
      this.wineList = Object.values(this.list.checkboxSelect);
      this.wineList.forEach(wine => {
        this.wines.addControl(wine.id + '', new FormControl(true));
      });
    });

    this.downloadedData.subscribe(downloadData => {
      console.log(downloadData);
      if (downloadData) {
        downloadData.forEach(row => {
          console.log(row);
          this.list.checkboxes.addControl(row.id + '', new FormControl(false));
          this.list.clickCheckbox(row);
        });
      }
    });
  }

  uncheck(id) {
    if (this.langService.editable) {
      return;
    }
    this.list.unsetCheckboxes(id);
    this.wineList = this.wineList.filter(g => {
      return g.id != id;
    });
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    return this.wineList;
  }
}
