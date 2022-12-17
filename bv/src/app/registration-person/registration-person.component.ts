import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from '../password-validator/confirm-password-validator';
import {RequestsService} from '../services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../services/language-service.service';

@Component({
  selector: 'app-registration-person',
  templateUrl: './registration-person.component.html',
  styleUrls: ['./registration-person.component.css']
})
export class RegistrationPersonComponent implements OnInit {
  routeData = {editable: false, download: false, available: true};
  passwordPatternValidator = Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
  id = this.activatedroute.snapshot.params.id;

  form = new FormGroup({
    type: new FormControl('1'),
    business_name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required,
        this.passwordPatternValidator]),

      password_confirmation: new FormControl('', Validators.required)
    }, [], ConfirmPasswordValidator.match),
    language: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    name_invisible: new FormControl('1'),
    username: new FormControl('', Validators.required),
    birthday: new FormControl(),
    sex: new FormControl(1),
    country: new FormControl(0),
    city: new FormControl(''),
    address: new FormControl(''),
    address_invisible: new FormControl(0)
  });

  countries = [];
  constructor(private service: RequestsService,
              private activatedroute: ActivatedRoute,
              public cookieService: CookieService,
              public langService: LanguageServiceService,
              private router: Router) { }

  ngOnInit() {
    this.routeData.download = this.activatedroute.snapshot.data.download;
    this.routeData.editable = this.activatedroute.snapshot.data.editable;

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
    });
    console.log(this.activatedroute.snapshot.data.download);
    this.activatedroute.data.subscribe(data => {
      // console.log(this.id);
      // console.log(this.cookieService.get('myId'));
      // console.log(!data.editable);
      // console.log(this.cookieService.get('myId'));



// @ts-ignore
      if (this.id !== this.cookieService.get('myId') && this.cookieService.get('myId') && this.cookieService.get('sequrity') != 4) {
        this.routeData.available = false;
      }
      if (!this.routeData.editable) {
        this.form.disable();
      }
      if (data.download) {
        this.password.clearValidators();
        this.password.setValidators(this.passwordPatternValidator);
        this.password_confirmation.clearValidators();
        // const a = this.activatedroute.snapshot.params;
        const idData = this.getCookieData();
        this.service.getProfile(this.id, idData).subscribe(response => {
          console.log(response);
          Object.keys(this.form.controls).forEach(key => {
            if (response.hasOwnProperty(key)) {
              this.form.get(key).setValue(response[key]);
            }
          });
        });

      }
    });
    this.address_invisible.setValue(this.address_invisible.value ? 1 : 0);
    this.name_invisible.setValue(this.name_invisible.value ? 1 : 0);
  }
  get type() {
    return this.form.get('type');
  }
  get business_name() {
    return this.form.get('business_name');
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
  get first_name() {
    return this.form.get('first_name');
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
      this.service.editProfile(this.id, this.form.value).subscribe(data => {
        // console.log(data);
      });
    } else {
      this.service.registration(this.form.value).subscribe(data => {
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

  edit() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/profile-edit/' + this.activatedroute.snapshot.params.id],
      {queryParams: {tab: this.activatedroute.snapshot.queryParamMap.get('tab')}});
  }
  delete() {
    if (this.langService.editable) {
      return;
    }
    const data = {
      // confirmation: this.getConfirmation(),
      user: this.activatedroute.snapshot.params.id
    };
// @ts-ignore
    this.service.deleteUser(data).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  returnBack() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/profile/' + this.activatedroute.snapshot.params.id],
      {queryParams: {tab: this.activatedroute.snapshot.queryParamMap.get('tab')}});
  }
}
