import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {PlaceOfOriginComponent} from '@src/app/schemas/place-of-origin/place-of-origin.component';
import {MatDialog} from '@angular/material/dialog';
import {RequestsService} from '@src/app/services/api/requests.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';

@Component({
  selector: 'app-origin-input-bonvino',
  templateUrl: './origin-input-bonvino.component.html',
  styleUrls: ['./origin-input-bonvino.component.css']
})
export class OriginInputBonvinoComponent implements OnInit {


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
  countries = [];
  regiones = [];

  constructor(
    public langService: LanguageServiceService,
    public dialog: MatDialog,
    public service: RequestsService,
    public downloadingService: DownloadDataServiceService,
  ) { }

  ngOnInit(): void {


    this.downloadingService.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      this.downloadingService.getRegiones().subscribe(dataR => {
// @ts-ignore
        this.regiones = dataR;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });
      });
    });




    this.refresh();

    this.downloadedData.valueChanges.subscribe(change => {
      this.refresh();
    });



    this.form.valueChanges.subscribe(value => {
      // console.log(value);
      this.downloadedData.setValue(JSON.stringify(value));
    })
  }

  refresh() {
    // console.log('refresh origin');

    if(this.downloadedData.value) {
      try {

        const dd = JSON.parse(this.downloadedData.value);
        this.country.setValue(dd.country, {emitEvent: false});
        dd.regionsForm.forEach((v, i) => {

// @ts-ignore
          (this.regionsForm).at(i).setValue(v, {emitEvent: false});
        });
      } catch (e) {

      }
    } else {

      this.country.setValue(0, {emitEvent: false});
      this.regionsForm.controls.forEach((v, i) => {

// @ts-ignore
        (this.regionsForm).at(i).setValue(0, {emitEvent: false});
      });
    }
  }

  openPlaceOfOrigin(): void {
    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(PlaceOfOriginComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '800px',
      height: '450px',
      autoFocus: false,
      data: this.form.value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {

        this.country.setValue(result.country * 1);
        if (result.regionsForm) {
          // this.regionsForm.setValue(downloadData.geolocation.regions);
          for (let i = 0; i < 6; i++) {
            this.regionsForm.controls[i].setValue(result.regionsForm[i] * 1);

            console.log(this.regionesMap);
            console.log(this.regionesMap.get(result.regionsForm[i] * 1));
          }
        }
      }

    });
  }
  get country() {
    return this.form.get('country');
  }
  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
  }
}
