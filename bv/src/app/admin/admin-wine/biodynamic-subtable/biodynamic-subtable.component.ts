import {AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguageServiceService} from '../../../services/language-service.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-biodynamic-subtable',
  templateUrl: './biodynamic-subtable.component.html',
  styleUrls: ['./biodynamic-subtable.component.css']
})
export class BiodynamicSubtableComponent implements OnInit, AfterViewInit {

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

  tableColsBiodynamic = [
    {variable: 'id', name: '#', link: true, href: 'biodinamic/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.biodynamicImageStore}
  ];
  apiBiodynamic = 'getBiodinamicList';


  @ViewChildren(SuperlistComponent) lists: QueryList<SuperlistComponent>;

  kashrutList = [];
  qualityList = [];
  biodynamicList = [];
  organicList = [];
  veganList = [];

  // // @ts-ignore
  // @Input() downloadedData: Subject;

  form = new FormGroup({
    biodynamics: new FormGroup({}),
    biodynamicWine: new FormGroup({}),
  });

  constructor(
    public langService: LanguageServiceService,
    public dialogRef: MatDialogRef<BiodynamicSubtableComponent>,
    @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {
  }
  get biodynamics(): FormGroup {
    return this.form.get('biodynamics') as FormGroup;
  }


  get biodynamicWine(): FormGroup {
    return this.form.get('biodynamicWine') as FormGroup;
  }

  ngAfterViewInit(): void {


    // this.listQualities = this.lists.first;
    this.lists.forEach(list => {
      console.log(list.api);
      if (list.api == this.apiBiodynamic) {
        this.listBiodynamic = list;
      }
    });

    this.subBiodynamic = this.listBiodynamic.checkboxes.valueChanges.subscribe(() => {
      this.biodynamicList = Object.values(this.listBiodynamic.checkboxSelect);
      this.biodynamicList.forEach(v => {
        this.biodynamics.addControl(v.id + '', new FormControl(true));
        this.biodynamicWine.addControl(v.id + '', new FormControl(false));
      });

    });

    this.downloadedData.subscribe(fatherData => {
      console.log(fatherData);
      if (fatherData.biodynamics) {
        this.listBiodynamic.setData(fatherData.biodynamics);
      }
      if (fatherData.biodynamicWine) {
        fatherData.biodynamicWine.forEach(x => {
          try {
            this.biodynamicWine.get(x.id + '').setValue(true);
          } catch (e) {}
        });
      }
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
    this.biodynamics.removeControl(id);
    this.biodynamicWine.removeControl(id);
  }

  getBiodynamicWine() {

    const res = [];
    for (const key in this.biodynamicWine.value) {
      if (this.biodynamicWine.value[key]) {
        res.push(key);
      }
    }
    return JSON.stringify(res);
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    const wineryData = this.biodynamicList;
    const wineData = this.biodynamicList.filter(x => {
      // return true;
      return this.biodynamicWine.value[x.id + ''];
    });
    return {biodynamics: wineryData, biodynamicWine: wineData};
  }
}
