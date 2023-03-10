import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {

    let title = '404 - bonvino.com';
    this.titleService.setTitle(title);
  }

}
