import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {



  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'profile/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'login', name: 'Login', link: false, href: '', hrefId: '', searchFormControlName: 'searchLogin'},
    {variable: 'mail', name: 'Email', link: false, href: '', hrefId: '', searchFormControlName: 'searchMail'},
    {variable: 'fname', name: 'First name', link: false, href: '', hrefId: '', searchFormControlName: 'searchFirstName'},
    {variable: 'lname', name: 'Last name', link: false, href: '', hrefId: '', searchFormControlName: 'searchLastName'},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry'},
    {variable: 'interface', name: 'Interface', link: false, href: '', hrefId: '', searchFormControlName: 'searchInterface'},
    {variable: 'security', name: 'Security', link: false, href: '', hrefId: '', searchFormControlName: 'searchSecurity'}
  ];
  api = 'getUserList';
  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {

    let title = 'UserList - bonvino.com';
    this.titleService.setTitle(title);
  }

}
