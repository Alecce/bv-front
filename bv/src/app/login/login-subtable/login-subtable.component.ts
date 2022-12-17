import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-subtable',
  templateUrl: './login-subtable.component.html',
  styleUrls: ['./login-subtable.component.css']
})
export class LoginSubtableComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  constructor(
    public dialogRef: MatDialogRef<LoginSubtableComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private route: Router) { }

  ngOnInit() {
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  close(): void {
    this.dialogRef.close();
  }
  submit() {
    if (this.langService.editable) {
      return;
    }
    this.service.login(this.form.value).subscribe(data => {
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
      this.close();
      // this.route.navigate(['']);
    });
  }
}
