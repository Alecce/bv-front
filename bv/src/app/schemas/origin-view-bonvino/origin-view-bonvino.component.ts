import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';

@Component({
  selector: 'app-origin-view-bonvino',
  templateUrl: './origin-view-bonvino.component.html',
  styleUrls: ['./origin-view-bonvino.component.css']
})
export class OriginViewBonvinoComponent implements OnInit {



  // @ts-ignore
  @Input() type;
  // @ts-ignore
  @Input() schemaData;
  // @ts-ignore
  @Input() downloadedData: FormControl;


  form = new FormGroup({

    country: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),

  });

  countriesMap = new Map();
  regionesMap = new Map();
  // countries = [];
  // regiones = [];


  constructor(
    public langService: LanguageServiceService,
    public loadingService: DownloadDataServiceService,
    ) { }

  ngOnInit(): void {

    this.countriesMap = this.loadingService.getCountriesMap();
    this.regionesMap = this.loadingService.getRegionesMap();
//     this.service.getCountries().subscribe(data => {
// // @ts-ignore
//       this.countries = data;
//       this.countries.forEach(x => {
//         this.countriesMap.set(x.id, x.name);
//       });
//     });
//
//     this.service.getRegiones().subscribe(dataR => {
// // @ts-ignore
//       this.regiones = dataR;
//       this.regiones.forEach(x => {
//         this.regionesMap.set(x.id, x.name);
//       });
//     });


    if(this.downloadedData.value) {
      const dd = JSON.parse(this.downloadedData.value);
      // console.log(dd);
      this.country.setValue(dd.country);
      dd.regionsForm.forEach((v, i) => {

// @ts-ignore
        (this.regionsForm).at(i).setValue(v);
      });
    }
  }

  get country() {
    return this.form.get('country');
  }
  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
  }
}
