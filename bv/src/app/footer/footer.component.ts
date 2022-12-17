import {Component, OnInit} from '@angular/core';
import {LanguageServiceService} from '../services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public langService: LanguageServiceService,
    private service: RequestsService,
    ) { }

  ngOnInit() {
    // console.log('xxx');

    // this.service.visiting().subscribe(x => {
    //   console.log(x);
    // });
  }

}
