import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {
  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'int_name', name: 'International Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'national_name', name: 'National name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'kind', name: 'Kind', link: false, href: '', hrefId: '', searchFormControlName: 'searchKind'}
  ];
  api = 'getCompetitionList';
  constructor(
    private titleService: Title,
    ) {
  }

  ngOnInit() {

    let title = 'Competitions - bonvino.com';
    this.titleService.setTitle(title);
  }

}
