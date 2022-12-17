import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {SuccessService} from '@src/app/services/success.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-winery-deleted',
  templateUrl: './winery-deleted.component.html',
  styleUrls: ['./winery-deleted.component.css']
})
export class WineryDeletedComponent implements OnInit {


  @Input() userId;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              private successService: SuccessService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService) { }

  ngOnInit(): void {

  }



  publicHistoryLink() {
    return '/winery-history/' + this.activatedroute.snapshot.params.id;
  }

  historyLink() {
    return '/winery-changelog/' + this.activatedroute.snapshot.params.id;
  }

  restoreWinery() {
    this.service.restoreWinery({wineryId: this.activatedroute.snapshot.params.id}).subscribe(() => {
      location.reload();
    });
  }
}
