import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '@src/app/services/language-service.service';

@Component({
  selector: 'app-temperature-input-bonvino',
  templateUrl: './temperature-input-bonvino.component.html',
  styleUrls: ['./temperature-input-bonvino.component.css']
})
export class TemperatureInputBonvinoComponent implements OnInit {


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

  refresh() {

    if(this.downloadedData.value) {
      const dd = JSON.parse(this.downloadedData.value);
      this.is_fahrenheit.setValue(dd.is_fahrenheit, {emitEvent: false});
      this.temperature_f.setValue(dd.temperature_f, {emitEvent: false});
      this.temperature.setValue(dd.temperature, {emitEvent: false});
    } else {

      this.is_fahrenheit.setValue('0', {emitEvent: false});
      this.temperature_f.setValue('', {emitEvent: false});
      this.temperature.setValue('', {emitEvent: false});
    }
  }

  ngOnInit(): void {

    this.refresh();

    this.downloadedData.valueChanges.subscribe(change => {
      this.refresh();
    });

    this.temperature_f.setValue(this.celsiusToFahrenheit(this.temperature.value));


    this.temperature_f.valueChanges.subscribe(x => {
      this.temperature.setValue(this.fahrenheitToCelsius(x));
    });
    this.temperature.valueChanges.subscribe(x => {
      this.temperature_f.setValue(this.celsiusToFahrenheit(x));
    });

    this.form.valueChanges.subscribe(value => {
      console.log(value);
      if(this.temperature.value !== '' || this.temperature.value !== null) {
        this.downloadedData.setValue(JSON.stringify(value));
      } else {
        this.downloadedData.setValue('');
      }
    })
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
