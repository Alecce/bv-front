import {Component, Input, OnInit} from '@angular/core';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-temperature-view-bonvino',
  templateUrl: './temperature-view-bonvino.component.html',
  styleUrls: ['./temperature-view-bonvino.component.css']
})
export class TemperatureViewBonvinoComponent implements OnInit {


  // @ts-ignore
  @Input() type;
  // @ts-ignore
  @Input() schemaData;
  // @ts-ignore
  @Input() downloadedData: FormControl;

  form = new FormGroup({
    temperature: new FormControl(''),
    temperature_f: new FormControl(''),
    is_fahrenheit: new FormControl('0'),


  });

  constructor(
    public langService: LanguageServiceService
  ) { }

  ngOnInit(): void {


    if(this.downloadedData.value) {
      const dd = JSON.parse(this.downloadedData.value);
      console.log(dd);
      this.is_fahrenheit.setValue(dd.is_fahrenheit, {emitEvent: false});
      this.temperature_f.setValue(dd.temperature_f, {emitEvent: false});
      this.temperature.setValue(dd.temperature, {emitEvent: false});
    }

    this.temperature_f.setValue(this.celsiusToFahrenheit(this.temperature.value), {emitEvent: false});


    this.temperature_f.valueChanges.subscribe(x => {
      this.temperature.setValue(this.fahrenheitToCelsius(x), {emitEvent: false});
    });
    this.temperature.valueChanges.subscribe(x => {
      this.temperature_f.setValue(this.celsiusToFahrenheit(x), {emitEvent: false});
    });

  }



  celsiusToFahrenheit(cel) {
    if (cel === '' || cel === null) {
      return '';
    }
    return Math.round((32 + cel * 9 / 5) * 10) / 10;
  }
  fahrenheitToCelsius(fah) {
    if (fah === '' || fah === null) {
      return '';
    }
    return Math.round(((fah - 32) * 5 / 9) * 10) / 10;
  }


  get temperature_f() {
    return this.form.get('temperature_f');
  }
  get temperature() {
    return this.form.get('temperature');
  }
  get is_fahrenheit() {
    return this.form.get('is_fahrenheit');
  }

}
