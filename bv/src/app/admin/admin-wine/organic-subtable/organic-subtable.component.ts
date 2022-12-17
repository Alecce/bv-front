import {AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {LanguageServiceService} from '../../../services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-organic-subtable',
  templateUrl: './organic-subtable.component.html',
  styleUrls: ['./organic-subtable.component.css']
})
export class OrganicSubtableComponent implements OnInit, AfterViewInit {

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

  tableColsOrganic = [
    {variable: 'id', name: '#', link: true, href: 'organic/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.organicImageStore}
  ];
  apiOrganic = 'getOrganicList'


  @ViewChildren(SuperlistComponent) lists: QueryList<SuperlistComponent>;

  kashrutList = [];
  qualityList = [];
  biodynamicList = [];
  organicList = [];
  veganList = [];

  // // @ts-ignore
  // @Input() downloadedData: Subject;

  form = new FormGroup({
    organics: new FormGroup({}),
    organicWine: new FormGroup({}),
  });

  constructor(
    public langService: LanguageServiceService,
    public dialogRef: MatDialogRef<OrganicSubtableComponent>,
    @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {
  }
  get organics(): FormGroup {
    return this.form.get('organics') as FormGroup;
  }


  get organicWine(): FormGroup {
    return this.form.get('organicWine') as FormGroup;
  }

  ngAfterViewInit(): void {


    // this.listQualities = this.lists.first;
    this.lists.forEach(list => {
      console.log(list.api);
      if (list.api == this.apiOrganic) {
        this.listOrganic = list;
      }
    });

    this.subOrganic = this.listOrganic.checkboxes.valueChanges.subscribe(() => {
      this.organicList = Object.values(this.listOrganic.checkboxSelect);
      this.organicList.forEach(v => {
        this.organics.addControl(v.id + '', new FormControl(true));
        this.organicWine.addControl(v.id + '', new FormControl(false));
      });

    });

    this.downloadedData.subscribe(fatherData => {
      console.log(fatherData);
      if (fatherData.organics) {
        this.listOrganic.setData(fatherData.organics);
      }
      if (fatherData.organicWine) {
        fatherData.organicWine.forEach(x => {
          try {
            this.organicWine.get(x.id + '').setValue(true);
          } catch (e) {}
        });
      }
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
    this.organics.removeControl(id);
    this.organicWine.removeControl(id);
  }

  getOrganicWine() {

    const res = [];
    for (const key in this.organicWine.value) {
      if (this.organicWine.value[key]) {
        res.push(key);
      }
    }
    return JSON.stringify(res);
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    const wineryData = this.organicList;
    const wineData = this.organicList.filter(x => {
      // return true;
      return this.organicWine.value[x.id + ''];
    });
    return {organics: wineryData, organicWine: wineData};
  }
}
