import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {CookieService} from 'ngx-cookie-service';
import {Overlay} from '@angular/cdk/overlay';
import {ListsService} from '@src/app/services/api/lists.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {ActivatedRoute} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';

@Component({
  selector: 'app-description-grades-add',
  templateUrl: './description-grades-add.component.html',
  styleUrls: ['./description-grades-add.component.css']
})
export class DescriptionGradesAddComponent implements OnInit {
  tab = 'description';


  systemChosen = new ReplaySubject(10);
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  isWineryOwner = false;

  wineId = 0;
  LOCAL_STORAGE_MAXIMUM_IN_VOTING = 'bonvine_maximum_in_vote';
  currentRateStars = 2;
  currentRateHearts = 2;
  threeCols = ['1', '2', '3'];

  systemToShow;

  systems = [
    {
      name: 'Quality', value: 'system5_2',
    },
    {
      name: '100 grades', value: 'system100',
    },
    {
      name: '20 grades', value: 'system20',
    },
    {
      name: 'Enter result', value: 'systemAny',
    },
  ];

  system100 = [
    {
      part: '',
      selects: [
        {
          criteria: 'Body',
          options: [
            {name: 'High', cost: 5},
            {name: '', cost: 4},
            {name: '', cost: 3},
            {name: '', cost: 2},
            {name: 'Low', cost: 1},
          ]
        },
        {
          criteria: 'Alcohol',
          options: [
            {name: 'High', cost: 5},
            {name: '', cost: 4},
            {name: '', cost: 3},
            {name: '', cost: 2},
            {name: 'Low', cost: 1},
          ]
        },
        {
          criteria: 'Tannins',
          options: [
            {name: 'High', cost: 5},
            {name: '', cost: 4},
            {name: '', cost: 3},
            {name: '', cost: 2},
            {name: 'Low', cost: 1},
          ]
        },
        {
          criteria: 'Acidity',
          options: [
            {name: 'High', cost: 5},
            {name: '', cost: 4},
            {name: '', cost: 3},
            {name: '', cost: 2},
            {name: 'Low', cost: 1},
          ]
        },
        {
          criteria: 'Sugar',
          options: [
            {name: 'High', cost: 5},
            {name: '', cost: 4},
            {name: '', cost: 3},
            {name: '', cost: 2},
            {name: 'Low', cost: 1},
          ]
        },
      ]
    },
  ];
  systemsFull = {
    system100: this.system100,
  };


  form = new FormGroup({
    system: new FormControl(this.systems[0].value),
    score: new FormControl(''),
    full: new FormGroup({}),


    role: new FormControl(0),
  });

  cookies;
  idSpecialist = 0;
  previousVotes = [];

  roleList = [];
  roleLoading = true;
  me = {type: 'person', name: ''};

  constructor(
    private cookieObserver: CookieObserverService,
    private service: RequestsService,
    public listService: ListsService,
    private activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    public langService: LanguageServiceService,
    public overlay: Overlay,
    public accountService: AccountServiceService) {
  }


  ngOnInit() {
    this.isWineryOwnerSubject.subscribe(v => {
      this.isWineryOwner = v;
    });

    this.cookies = this.cookieObserver.observeCookie();
    this.choseSystem(this.systems[1].value);

    this.accountService.currentRole.subscribe(role => {
      // @ts-ignore
      if (role.type == 'specialist') {
        // @ts-ignore
        this.idSpecialist = role.idBisness;
      }
    });



    this.accountService.roles.subscribe(x => {
// @ts-ignore
      this.roleList = x;
      this.form.get('role').valueChanges.subscribe(idOption => {
        const chosenRole = this.roleList.filter(role => {
          return role.idOption == idOption;
        })[0];
        this.accountService.currentRole.next(chosenRole);
      });
    });

    this.systemChosen.subscribe(() => {
      this.downloadedData.subscribe((data) => {

        if(data.descriptionDB) {

          const description = JSON.parse(data.descriptionDB);

          // @ts-ignore
          Object.keys(this.fullData.controls).forEach(key => {
            if (this.fullData.get(key) instanceof FormControl && description[key]) {
              this.fullData.get(key).setValue(description[key]);
            }
          });
        }
        console.log(data.descriptionDB);
      })
    })
  }

  getPreviousVotes() {
    this.service.getMyVote({idWine: this.wineId}).subscribe(votes => {
      console.log(votes);
      // @ts-ignore
      this.previousVotes = votes;
    });
  }
  get system() {
    return this.form.get('system');
  }

  get fullData() : FormGroup {
    return this.form.get('full') as FormGroup;
  }
  get role() {
    return this.form.get('role');
  }

  get score() {
    return this.form.get('score');
  }
  getFormGroup(system) {
    // console.log(system);
    const newForm = new FormGroup({}, [Validators.required]);
    console.log(system);
    system.forEach(part => {
      part.selects.forEach(criteria => {
        newForm.addControl(part.part + '_' + criteria.criteria, new FormControl('', [Validators.required]));
      });
    });
    return newForm;
  }

  get result() {
    // console.log(this.form.valid);

    let res = 0;
    for (const v in this.fullData.value) {
      res += this.fullData.value[v] * 1;
    }
    // console.log(res);
    this.score.setValue(res);
    return res;
  }

  refreshResult() {
    let res = 0;
    for (const v in this.fullData.value) {
      res += this.fullData.value[v] * 1;
    }
    // console.log(res);
    this.score.setValue(res);
  }

  starRate(rate) {
    if (this.langService.editable) {
      return;
    }

    if (this.system.value === 'system5') {
      // @ts-ignore
      // this.score.setValue(this.currentRateStars);
      this.fullData.get('_hearts').setValue(rate);
    }
    if (this.system.value === 'system5_2') {
      // @ts-ignore
      // this.score.setValue(this.currentRateHearts);
      this.score.setValue(rate);
    }
  }

  rateChange(value) {
    console.log(value);
  }

  submit() {
    if (this.langService.editable) {
      return;
    }

    console.log(this.currentRateHearts);
    console.log(this.currentRateStars);

    let maxScore = 0;
    let score = 0;
    if (this.system.value === 'system0') {

    }
    if (this.system.value === 'system5') {
      maxScore = 5;
    }
    if (this.system.value === 'system5_2') {
      score = this.score.value;
      maxScore = 5;
    }
    if (this.system.value === 'systemAny') {
      // @ts-ignore
      this.score.setValue(this.form.get('full').get('_result').value);
      score = this.form.get('full').get('_result').value;
      maxScore = this.form.get('full').get('_maximum').value;
    }
    if (this.system.value === 'system100') {
      score = this.score.value;
      maxScore = 100;
    }
    if (this.system.value === 'system20') {
      score = this.score.value;
      maxScore = 20;
    }


    const voteData = {
      idUser: this.cookieService.get('myId'),
      score,
      idSpecialist: this.idSpecialist,
      idWine: this.wineId,
      maxScore
    };

    console.log(voteData);


    this.service.voteForWine(voteData).subscribe(() => {
      this.getPreviousVotes();
    });
  }

  getPreviousOpinion() {
    const myId = this.cookieService.get('myId');
    const hash = this.cookieService.get('hash');
    const formsData = {
      wine: this.activatedroute.snapshot.params.id,
      confirmation: {myId, hash}
    };
  }

  getTabColor(tab) {
    if (this.system.value == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }
  getMarginleft(i) {
    if (i == 0) {
      return 'ml-0';
    } else {
      return 'margin-left-32';
    }
  }

  choseSystem(x) {
    if (this.langService.editable) {
      return;
    }
    // console.log(s);
    this.system.setValue('');
    this.form.removeControl('full');
    this.form.addControl('full', this.getFormGroup(this.systemsFull[x]));
    this.system.setValue(x);
    // console.log(this.form.value);
    this.systemToShow = this.systemsFull[x];

    if (x == 'systemAny') {
      this.form.get('full').get('_maximum').setValue(localStorage.getItem(this.LOCAL_STORAGE_MAXIMUM_IN_VOTING));
      this.form.get('full').get('_maximum').valueChanges.subscribe(maximum => {
        localStorage.setItem(this.LOCAL_STORAGE_MAXIMUM_IN_VOTING, maximum + '');
      });
    }

    this.systemChosen.next(true);
  }

  public getFormData() {
    return this.fullData.value;
  }
}
