import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from '../password-validator/confirm-password-validator';
import {RequestsService} from '../services/api/requests.service';
import {LanguageServiceService} from '../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registration-business',
  templateUrl: './registration-business.component.html',
  styleUrls: ['./registration-business.component.css']
})

export class RegistrationBusinessComponent implements OnInit {
  routeData = {editable: true};
  passwordPatternValidator = Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
  id = this.activatedroute.snapshot.params.id;

  // form = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   passwords: new FormGroup({
  //     password: new FormControl('', [Validators.required,
  //       this.passwordPatternValidator]),
  //
  //     password_confirmation: new FormControl('', Validators.required)
  //   }, [], ConfirmPasswordValidator.match),
  //   language: new FormControl('', Validators.required),
  //   business_name: new FormControl('', Validators.required)
  // });
  form = new FormGroup({
    email: new FormControl('al.bogorad@gmail.com', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('qQ1!111111', [Validators.required,
        this.passwordPatternValidator]),

      password_confirmation: new FormControl('qQ1!111111', Validators.required)
    }, [], ConfirmPasswordValidator.match),
    business_name: new FormControl('TestBusiness', Validators.required)
  });

  countries = [];
  constructor(private service: RequestsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService) { }

  ngOnInit() {
    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
    });
    console.log(this.activatedroute.snapshot.data.download);
    this.activatedroute.data.subscribe(data => {
      if (this.id !== this.cookieService.get('myId') && this.cookieService.get('myId')) {
        this.routeData.editable = false;
        this.form.disable();
      }
      if (data.download) {
        this.password.clearValidators();
        this.password.setValidators(this.passwordPatternValidator);
        this.password_confirmation.clearValidators();
        // const a = this.activatedroute.snapshot.params;
        const idData = this.getCookieData();
        this.service.getBusiness(this.id, idData).subscribe(response => {
          console.log(response);
          Object.keys(this.form.controls).forEach(key => {
            if (response.hasOwnProperty(key)) {
              this.form.get(key).setValue(response[key]);
            }
          });
        });

      }
    });
    // this.address_invisible.setValue(this.address_invisible.value ? 1 : 0);
    // this.name_invisible.setValue(this.name_invisible.value ? 1 : 0);
  }

  get email() {
    return this.form.get('email');
  }
  get passwords() {
    return this.form.get('passwords');
  }
  get password() {
    return this.form.get('passwords').get('password');
  }
  get password_confirmation() {
    return this.form.get('passwords').get('password_confirmation');
  }
  get business_name() {
    return this.form.get('business_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get name_invisible() {
    return this.form.get('name_invisible');
  }
  get username() {
    return this.form.get('username');
  }
  get birthday() {
    return this.form.get('birthday');
  }
  get sex() {
    return this.form.get('sex');
  }
  get country() {
    return this.form.get('country');
  }
  get city() {
    return this.form.get('city');
  }
  get address() {
    return this.form.get('address');
  }
  get address_invisible() {
    return this.form.get('address_invisible');
  }
  submit() {
    if (this.langService.editable) {
      return;
    }
    if (this.activatedroute.snapshot.data.download) {
      this.service.editBusiness(this.id, this.form.value).subscribe(data => {
        // console.log(data);
      });
    } else {
      this.service.addBusiness(this.form.value).subscribe(data => {
        // console.log(data);
      });
    }

  }

  getCookieData() {
    return {
      myId: this.cookieService.get('myId'),
      passwordHash: this.cookieService.get('hash')
    };
  }
}
