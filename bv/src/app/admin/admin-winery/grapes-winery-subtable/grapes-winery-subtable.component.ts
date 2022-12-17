import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {LanguageServiceService} from '../../../services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '../../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-grapes-winery-subtable',
  templateUrl: './grapes-winery-subtable.component.html',
  styleUrls: ['./grapes-winery-subtable.component.css']
})
export class GrapesWinerySubtableComponent implements OnInit, AfterViewInit {
  public tab = 'grapes';

  sub;
  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'synonyms', name: 'Synonyms', link: false, href: '', hrefId: '', searchFormControlName: 'searchSynonyms'}
  ];
  api = 'getGrapeListForAdmin';



  // @ts-ignore
  @ViewChild(SuperlistComponent) list: SuperlistComponent;
  routeData = {editable: true};
  editable = false;
  grapeList = [];


  form = new FormGroup({
    search: new FormControl(''),
    grapes: new FormGroup({}),
  });

  constructor(private activatedroute: ActivatedRoute,
              private service: RequestsService,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<GrapesWinerySubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {


  }

  get grapes(): FormGroup {
    return this.form.get('grapes') as FormGroup;
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
      this.grapeList = Object.values(this.list.checkboxSelect);
      this.grapeList.forEach(grape => {
        this.grapes.addControl(grape.id + '', new FormControl(true));
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
    this.grapeList = this.grapeList.filter(g => {
      return g.id != id;
    });
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    return this.grapeList;
  }

}
