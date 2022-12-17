import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {CookieObserverService} from '../services/cookieObserver/cookie-observer.service';
import {LanguageServiceService} from '../services/language-service.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  countries = [{id: 0, name: 'Israel'}, {id: 1, name: 'Russia'}];
  constructor(private service: RequestsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private cookieObserver: CookieObserverService,
              public langService: LanguageServiceService,
              private titleService: Title,
              private route: Router) { }

  ngOnInit() {

    let title = 'Login - bonvino.com';
    this.titleService.setTitle(title);

    // this.cookieService.set('myId', 111, 7, 'http://localhost:80/api/');
    // this.activatedroute.data.subscribe(data => {
    //   console.log(data);
    //
    //
    //   // console.log(this.activatedroute.snapshot.params.id);
    //   const id = this.activatedroute.snapshot.params.id;
    //   // this.routeData.editable = data.editable;
    //   if (id !== localStorage.getItem('myId') && !data.editable) {
    //     this.routeData.editable = false;
    //     this.form.disable();
    //   }
    //   // if (!data.editable) {
    //   //   console.log(this);
    //   //   this.form.disable();
    //   // }
    //   if (data.download) {
    //     // const a = this.activatedroute.snapshot.params;
    //     const idData = {id};
    //     this.service.getProfile(idData).subscribe(response => {
    //       console.log(response);
    //       Object.keys(this.form.controls).forEach(key => {
    //         console.log(key);
    //         if (response.hasOwnProperty(key)) {
    //           this.form.get(key).setValue(response[key]);
    //         }
    //       });
    //     });
    //
    //   }
    // });
    //
    // this.email.setValue('al.bogorad22@gmail.com');
    // this.password.setValue('qQ1!111111');
    // this.password_confirmation.setValue('qQ1!111111');
    // this.first_name.setValue('1');
    // this.last_name.setValue('2');
    // this.name_invisible.setValue(true);
    // this.username.setValue('3');
    // this.birthday.setValue('1963-03-29');
    // this.sex.setValue('1');
    // this.country.setValue(1);
    // this.city.setValue('4');
    // this.address.setValue('5');
    // this.address_invisible.setValue(true);
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  submit() {
    if (this.langService.editable) {
      return;
    }
    this.service.login(this.form.value).subscribe(data => {
      console.log(data);
// @ts-ignore
      this.cookieService.delete('logout', '/');
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
      // this.route.navigate(['']);
    });
  }
}
