import {AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '../../../services/api/requests.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../../services/language-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vegan-winery-subtable',
  templateUrl: './vegan-winery-subtable.component.html',
  styleUrls: ['./vegan-winery-subtable.component.css']
})
export class VeganWinerySubtableComponent implements OnInit, AfterViewInit {
  public tab = 'specification';

  routeData = {editable: true};

  listKashruts;
  listQualities;
  listBiodynamic;
  listOrganic;
  listVegan;

  subKashruts;
  subQualities;
  subBiodynamic;
  subOrganic;
  subVegan;

  tableColsKashruts = [
    {variable: 'id', name: '#', link: true, href: 'kashrut/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'int_name', name: 'International Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'hebrew_name', name: 'National name', link: false, href: '', hrefId: '', searchFormControlName: 'searchHebrewName'}
  ];
  apiKashruts = 'getKashrutList';



  tableColsQualities = [
    {variable: 'id', name: '#', link: true, href: 'quality/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Quality', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'year', name: 'Year', link: false, href: '', hrefId: '', searchFormControlName: 'searchYear'},
    {variable: 'region', name: 'Region', link: false, href: '', hrefId: '', searchFormControlName: 'searchRegiones'},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry'}
  ];
  apiQualities = 'getQualityList';

  tableColsBiodynamic = [
    {variable: 'id', name: '#', link: true, href: 'biodinamic/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true, imagePath: 'biodinamic/'}
  ];
  apiBiodynamic = 'getBiodinamicList';

  tableColsOrganic = [
    {variable: 'id', name: '#', link: true, href: 'organic/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true, imagePath: 'organic/'}
  ];
  apiOrganic = 'getOrganicList'

  tableColsVegan = [
    {variable: 'id', name: '#', link: true, href: 'vegan/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true, imagePath: 'vegan/'}
  ];
  apiVegan = 'getVeganList';


  @ViewChildren(SuperlistComponent) lists: QueryList<SuperlistComponent>;

  editable = false;
  kashrutList = [];
  qualityList = [];
  biodynamicList = [];
  organicList = [];
  veganList = [];

  // @Input() parentData: WineryCommoninfoComponent;
  // // @ts-ignore
  // @Input() downloadedData: ReplaySubject;

  form = new FormGroup({
    kashruts: new FormGroup({}),
    qualities: new FormGroup({}),
    biodynamics: new FormGroup({}),
    organics: new FormGroup({}),
    vegans: new FormGroup({}),
  });

  constructor(private activatedroute: ActivatedRoute,
              private service: RequestsService,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<VeganWinerySubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {


  }

  get kashruts(): FormGroup {
    return this.form.get('kashruts') as FormGroup;
  }
  get qualities(): FormGroup {
    return this.form.get('qualities') as FormGroup;
  }
  get biodynamics(): FormGroup {
    return this.form.get('biodynamics') as FormGroup;
  }
  get organics(): FormGroup {
    return this.form.get('organics') as FormGroup;
  }
  get vegans(): FormGroup {
    return this.form.get('vegans') as FormGroup;
  }

  ngAfterViewInit(): void {
    this.lists.forEach(list => {

      if (list.api == this.apiVegan) {
        this.listVegan = list;
      }
    });


    this.subVegan = this.listVegan.checkboxes.valueChanges.subscribe(() => {
      this.veganList = Object.values(this.listVegan.checkboxSelect);
      this.veganList.forEach(v => {
        this.vegans.addControl(v.id + '', new FormControl(true));
      });
    });

    this.downloadedData.subscribe(fatherData => {


      if (fatherData) {
        this.listVegan.setData(fatherData);
      }
    });
  }


  uncheckKashrut(id) {
    if (this.langService.editable) {
      return;
    }
    this.listKashruts.unsetCheckboxes(id);
    this.kashrutList = this.kashrutList.filter(g => {
      return g.id != id;
    });
  }
  uncheckQuality(id) {
    if (this.langService.editable) {
      return;
    }
    this.listQualities.unsetCheckboxes(id);
    this.qualityList = this.qualityList.filter(v => {
      return v.id != id;
    });
  }
  uncheckBiodynamic(id) {
    if (this.langService.editable) {
      return;
    }
    this.listBiodynamic.unsetCheckboxes(id);
    this.biodynamicList = this.biodynamicList.filter(v => {
      return v.id != id;
    });
  }
  uncheckOrganic(id) {
    if (this.langService.editable) {
      return;
    }
    this.listOrganic.unsetCheckboxes(id);
    this.organicList = this.organicList.filter(v => {
      return v.id != id;
    });
  }
  uncheckVegan(id) {
    if (this.langService.editable) {
      return;
    }
    this.listVegan.unsetCheckboxes(id);
    this.veganList = this.veganList.filter(v => {
      return v.id != id;
    });
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    return this.veganList;
  }

}
