import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {LoginSubtableComponent} from '../login-subtable/login-subtable.component';
import {RegistrationSubtableComponent} from '../registration-subtable/registration-subtable.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {variables} from '@src/environments/variables';

@Component({
  selector: 'app-login-designed',
  templateUrl: './login-designed.component.html',
  styleUrls: ['./login-designed.component.css']
})
export class LoginDesignedComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  variables = variables;

  constructor(private reqService: RequestsService,
              private service: RequestsService,
              private cookieService: CookieService,
              private cookieObserver: CookieObserverService,
              public langService: LanguageServiceService,
              public activatedroute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              public overlay: Overlay) { }

  ngOnInit() {

  }
  openLoginDialog(): void {

    const dialogRef = this.dialog.open(LoginSubtableComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '600px',
      height: '250px',
      autoFocus: false,
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'registration') {
        this.openRegistrationDialog();
      }
    });
  }
  openRegistrationDialog(): void {

    const dialogRef = this.dialog.open(RegistrationSubtableComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '864px',
      // height: '90%',
      autoFocus: false,
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'login') {
        this.openLoginDialog();
      }
    });
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
      // this.route.navigate(['']);
    });
  }
}
