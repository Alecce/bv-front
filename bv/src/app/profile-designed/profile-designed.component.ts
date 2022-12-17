import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsService} from '../services/api/lists.service';
import {LanguageServiceService} from '../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {Overlay} from '@angular/cdk/overlay';
import {RequestsService} from '../services/api/requests.service';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from '../password-validator/confirm-password-validator';
import {environment} from '../../environments/environment';
import {LoadingServiceService} from '../services/loading-service.service';
import {CookieObserverService} from '../services/cookieObserver/cookie-observer.service';
import {Observable} from 'rxjs';
import {AccountServiceService} from '../services/account-service.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-designed',
  templateUrl: './profile-designed.component.html',
  styleUrls: ['./profile-designed.component.css']
})
export class ProfileDesignedComponent implements OnInit {
// @ts-ignore
  cookies: Observable;
  routeData = {editable: false, download: false, available: true};
  passwordPatternValidator = Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
  id = this.activatedroute.snapshot.params.id;
  profile = null;

  url;
  fileToUpload: File = null;
  isFileToUpload = null;
  noImage = '../../../assets/images/no-image.png';
  isImageChanged = false;
  imageLink;

  showNoValidation = false;

  form = new FormGroup({
    type: new FormControl('1'),
    business_name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    passwords: new FormGroup({

      password: new FormControl(''),

      password_confirmation: new FormControl(''),

      password_current: new FormControl(''),
    }, [], ConfirmPasswordValidator.match),
    // language: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    name_invisible: new FormControl(''),
    username: new FormControl('', Validators.required),
    birthday: new FormControl(),
    sex: new FormControl(1),
    country: new FormControl(0),
    city: new FormControl(''),
    address: new FormControl(''),
    address_invisible: new FormControl(0),
    image: new FormControl(''),
    // rolesSpecialist: new FormArray([]),
    // rolesShop: new FormArray([]),
    // rolesWinery: new FormArray([]),
    specialist: new FormControl(0),
    specialistName: new FormControl(''),
    specialistSystem: new FormControl(''),
    collector: new FormControl(0),
  }, [], SpesialistValidator.match);

  countries = [];

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              public accountService: AccountServiceService,
              private cookieService: CookieService,
              public overlay: Overlay,
              private router: Router,
              public langService: LanguageServiceService,
              private cookieObserver: CookieObserverService,
              private titleService: Title,
              public loadingService: LoadingServiceService) { }


  ngOnInit() {
    this.cookies = this.cookieObserver.observeCookie();
    this.routeData.download = this.activatedroute.snapshot.data.download;
    this.routeData.editable = this.activatedroute.snapshot.data.editable;

    this.service.getCountries().subscribe(data => {
      data = this.langService.sortByTranslate('country_names', '', 'name', data, 'name');
      this.langService.languageChanged.subscribe(() => {
        this.countries = this.langService.sortByTranslate('country_names', '', 'name', this.countries, 'name');
      });
// @ts-ignore
      this.countries = data;
    });
    this.activatedroute.data.subscribe(data => {


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

          let title = '';
          // @ts-ignore
          if(response.username) {
            // @ts-ignore
            title = response.username + ' person edit - bonvino.com';
          } else {
            // @ts-ignore
            title = ' person edit - bonvino.com';
          }
          this.titleService.setTitle(title);


          this.profile = response;
          Object.keys(this.form.controls).forEach(key => {
            if (response.hasOwnProperty(key)) {

              if (key != 'image' && response[key]) {
                this.form.get(key).setValue(response[key]);
              }

              if (key == 'image') {
// @ts-ignore
                if (response.image * 1) {
// @ts-ignore
                  this.profile.image = response.image;
                }
              }




            }

          });

        });

      }
    });
    this.address_invisible.setValue(this.address_invisible.value ? 1 : 0);
    this.name_invisible.setValue(this.name_invisible.value ? 1 : 0);
    this.specialist.setValue(this.specialist.value ? 1 : 0);
    this.collector.setValue(this.collector.value ? 1 : 0);
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
  get specialistSystem() {
    return this.form.get('specialistSystem');
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
  get specialist() {
    return this.form.get('specialist');
  }
  get specialistName() {
    return this.form.get('specialistName');
  }
  get collector() {
    return this.form.get('collector');
  }
  submit() {
    if (this.langService.editable) {
      return;
    }

    if(this.form.invalid) {
      this.showNoValidation = true;
      return;
    }


    console.log(this.fileToUpload);
    this.loadingService.loading = true;
    if (this.activatedroute.snapshot.data.download) {
      this.service.editProfile(this.id, this.form.value).subscribe(data => {
        this.renewCookies(data);
        if (this.isImageChanged) {
          this.service.setImage('user', this.id, this.fileToUpload).subscribe(() => {
            this.loadingService.loading = false;
          });
        } else {
          this.loadingService.loading = false;
        }
      });
    } else {
      this.service.registration(this.form.value).subscribe(data => {
        // console.log(data);
        this.loadingService.loading = false;
      });
    }

  }


  renewCookies(data) {

    console.log('1111111111')
// @ts-ignore
    this.cookieService.set('myId', data.id, 7, '/');
// @ts-ignore
    this.cookieService.set('hash', data.passwordHash, 7, '/');
// @ts-ignore
    this.cookieService.set('sequrity', data.sequrity, 7, '/');
// @ts-ignore
    this.cookieService.set('sequrityForSend', data.sequrity, 7, '/');
// @ts-ignore
    this.cookieService.set('interface', data.interface, 7, '/');
// @ts-ignore
    this.cookieService.set('login', data.login, 7, '/');
    this.cookieService.delete('logout', '/');
    this.cookieObserver.cookieChanged();
  }

  back() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/profile/' + this.activatedroute.snapshot.params.id],
      {queryParams: {tab: this.activatedroute.snapshot.queryParamMap.get('tab')}});
  }

  getCookieData() {
    return {
      myId: this.cookieService.get('myId'),
      passwordHash: this.cookieService.get('hash')
    };
  }
  checkValidation(input: AbstractControl) {
    if (input.untouched) {
      return 'border-secondary';
    } else if (input.valid) {
      return 'border-info';
    } else {
      return 'border-danger';
    }
  }

  getImage() {
    if (this.profile && this.profile.image) {
      return environment.userImageStore + `${this.id + '_' + this.profile.image}.png`;
    } else {
      return this.noImage;
    }
  }


  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
      }
      this.fileToUpload = event.target.files.item(0);
      this.isFileToUpload = true;
      this.isImageChanged = true;
    }
  }
  deleteImage() {
    if (this.langService.editable) {
      return;
    }
    this.profile.image = null;
    this.fileToUpload = null;
    this.isFileToUpload = false;
    this.isImageChanged = true;
  }





  addSpecialist(x) {
    if (this.langService.editable) {
      return;
    }
    if (x) {
      this.rolesSpecialist.push(this.newSpecialistGroup(x));
    } else {
      this.rolesSpecialist.push(this.newBlancSpecialistGroup());
    }
  }
  get rolesSpecialist(): FormArray {
    return this.form.get('rolesSpecialist') as FormArray;
  }
  removeSpecialist(i) {
    if (this.langService.editable) {
      return;
    }
    this.rolesSpecialist.removeAt(i);
  }

  newBlancSpecialistGroup() {
    return new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),
      pointsystem: new FormControl('select'),
    });
  }
  newSpecialistGroup(x) {
    return new FormGroup({
      id: new FormControl(x.id),
      name: new FormControl(x.name),
      pointsystem: new FormControl(x.pointsystem),
    });
  }




  addShop(x) {
    if (this.langService.editable) {
      return;
    }
    if (x) {
      this.rolesShop.push(this.newShopGroup(x));
    } else {
      this.rolesShop.push(this.newBlancShopGroup());
    }
  }
  get rolesShop(): FormArray {
    return this.form.get('rolesShop') as FormArray;
  }
  removeShop(i) {
    if (this.langService.editable) {
      return;
    }
    this.rolesShop.removeAt(i);
  }

  newBlancShopGroup() {
    return new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),
      nameInt: new FormControl(''),
    });
  }
  newShopGroup(x) {
    return new FormGroup({
      id: new FormControl(x.id),
      name: new FormControl(x.name),
      nameInt: new FormControl(x.pointsystem),
    });
  }


  get rolesWinery() {
    return this.form.get('rolesWinery');
  }

  isInvalid(field) {
    return this.showNoValidation && field.invalid;
  }
}

export class SpesialistValidator {
  static match(control: AbstractControl): Promise<ValidationErrors|null> {
    // const id = control.value as number;
    const specialist = control.get('specialist');
    const specialistName = control.get('specialistName');
    const specialistSystem = control.get('specialistSystem');
    return new Promise(resolve => {
      if (specialist.value && (!specialistName.value || !specialistSystem.value)) {
        resolve({matchPassword: true});
      } else {
        resolve(null);
      }
    });
  }
}
