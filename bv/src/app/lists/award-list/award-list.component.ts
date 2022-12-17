import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.css']
})
export class AwardListComponent implements OnInit {
  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'int_name', name: 'int_name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'national_name', name: 'national_name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'competition', name: 'competition', link: false, href: '', hrefId: '', searchFormControlName: 'searchCompetition'}
  ];
  api = 'getAwardList';
  constructor(
    private titleService: Title,
    ) {
  }

  ngOnInit() {

    let title = 'Awardlist - bonvino.com';
    this.titleService.setTitle(title);
  }

}
