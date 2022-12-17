import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from '../../password-validator/confirm-password-validator';
import {CookieService} from 'ngx-cookie-service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';

@Component({
  selector: 'app-registration-subtable',
  templateUrl: './registration-subtable.component.html',
  styleUrls: ['./registration-subtable.component.css']
})
export class RegistrationSubtableComponent implements OnInit {


  imageLink;
  fileToUpload: File = null;
  noImage = '../../../assets/icons/placeholder-wine.svg';
  isImageChanged = false;

  countries = [];

  passwordPatternValidator = Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
  form = new FormGroup({
    type: new FormControl('1'),
    business_name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required,
        this.passwordPatternValidator]),

      password_confirmation: new FormControl('', [Validators.required])
    }, [], ConfirmPasswordValidator.match),
    language: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    name_invisible: new FormControl(0),
    username: new FormControl('', Validators.required),
    birthday: new FormControl(),
    sex: new FormControl(1),
    country: new FormControl(0),
    city: new FormControl(''),
    address: new FormControl(''),
    address_invisible: new FormControl(0),


    image: new FormControl(''),
  });

  constructor(public service: RequestsService,
              public langService: LanguageServiceService,
              public cookieService: CookieService,
              private cookieObserver: CookieObserverService,
              public activatedroute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              public overlay: Overlay,
              public dialogRef: MatDialogRef<RegistrationSubtableComponent>) { }

  ngOnInit() {
    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
    });
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

//     Object.values(this.form.controls).forEach(c => {
//       if (c instanceof FormControl) {
//         c.markAsTouched();
//       } else {
// // @ts-ignore
//         Object.values(c.controls).forEach(cc => {
// // @ts-ignore
//           cc.markAsTouched();
//       });
//       }
//     });
    this.service.registration(this.form.value).subscribe(res => {
// @ts-ignore
      if(res.id) {
        this.login().subscribe(data => {


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
          this.cookieObserver.cookieChanged();
// @ts-ignore
          if (data) {

            if (this.isImageChanged) {
// @ts-ignore
              this.service.setImage('user', data.id, this.fileToUpload).subscribe(() => {
                this.close();
              });
            } else {
              this.close();
            }
          }
        })
      }
    });
  }

  login() {

    const formData = {
      email: this.email.value,
      password: this.password.value,
    };
    return this.service.login(formData);
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
  close(): void {
    this.dialogRef.close();
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

      this.isImageChanged = true;
      console.log(this.isImageChanged);
    }
  }
  deleteImage() {
    if (this.langService.editable) {
      return;
    }
    this.imageLink = null;
    this.fileToUpload = null;
    this.isImageChanged = true;
  }
}
