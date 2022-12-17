import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';
import {of, ReplaySubject, Subscribable} from 'rxjs';
import {CookieObserverService} from './cookieObserver/cookie-observer.service';
import {debounceTime, first, map} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {languagesInterface} from '@src/environments/languages';
import {ActivatedRoute, Router} from '@angular/router';
import {CloseSubscreenSecviceService} from '@src/app/services/close-subscreen-secvice.service';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {
  // data for requests
  host = environment.host;
  urls = {
    getLanguage: 'data/language',
    getLanguageForPage: 'data/page_language',
    getLanguageForMultiplePages: 'data/multipage_language',
    setLanguage: 'data/set_language',
    getFullLanguage: 'data/full_language',


    getTranslationList: 'data/get_translation_list',
    setTranslationList: 'data/set_translation_list',
  };

  // set of pages for language loading
  multipages = new Set();

  // 2-level obj for page-language loading
  multipagesLoadedObj = {};

  // trigger when new pages sheduled
  pageLanguageLoaderSubj = new ReplaySubject(10);


  // 3-level obj for holding all data for translationList
  translationListData = {};
  translationListDataLoadedSubj = new ReplaySubject(10);
  sheduleTranslationListToSend = new ReplaySubject(10);
  isNewTranslationPlace = false;
  namesRegex = new RegExp('names', 'gi');

  // 4-level obj for holding all data for translation
  languageData = {};

  // 4-level obj for holding all data for translation in select mode
  languageArrayData = {};

  // all data for sending new translations
  languageDataForSend = {};

  // deprecated
  dataLoading = false;

  // current language
  language = 'english';

  // CONST
  public english = 'english';

  // boolean. true in translator mode
  public editable = false;

  // trigger when editable changes
  public editableSubject = new ReplaySubject(10);

  // boolean. true if it is translation mode and universal type
  public universal = false;

  // boolean. Select mode for translator
  public history = false;

  // triggen when new data loaded for array of pages
  public downloadNewText = new ReplaySubject(10);

  // triiger on most of loadings
  download = new ReplaySubject(10);

  // trigger on language change
  languageChanged = new ReplaySubject(10);
  // trigger on users language change
  languageChangedManually = new ReplaySubject(10);

  // trigger on language list loading
  public languagesLoaded = new ReplaySubject(10);

  // trigger and holds map of language replaces.
  // language replace - language that uses as alternative when current language lack of translation
  // system loads all chain languages for every page
  // example: english is replace for most of languages
  public mapReplacesSubject = new ReplaySubject(1);

  // trigger and holds map of same languages
  // same languages - languages that are same for several checks.
  // system do not loads all same languages
  // example: hebrew and idish are same languages and if description is in hebrew, so idish user will see it anyway
  mapSameLanguagesSubject = new ReplaySubject(1);

  // arrays for holding current values of replaces and same languages
  chainLanguage = [];
  sameLanguagesArr = [];

  // true if translator did any changes
  isChanged = false;

  // language and his replaces for loading new data
  languageSet = new Set();
  // pages for loading new data. Uses on loading description generator data
  pageSet = new Set();

  // map of words on cuurent page. Renew counter on init and destroy
  currentPageMap = new Map();
  currentComplicatedListsMap = new Map();


  // // map of all viewed translation places.
  // translationListMap = new Map();

  // Painting options for finding words on page
  currentPaintMap = new Map();
  isAnyPainted = false;

  // trigger on schema list loading and holds schemas languages array
  schemasLanguagesArrSubject = new ReplaySubject(10);

  languageArr = languagesInterface;

  form = new FormGroup({
    language: new FormControl('schema_1'),
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public router: Router,
    public closeSubscreenService: CloseSubscreenSecviceService,
    public activatedRoute: ActivatedRoute,
    public accountService: AccountServiceService,
  ) {

    this.download.subscribe((v) => {
      console.log(v);
    });

    this.pageLanguageLoaderSubj.next(Math.random());

    this.accountService.isAdminSubj.pipe(first()).subscribe(x => {

      this.forcedTranslationListLoading().subscribe( data => {

        this.sheduleTranslationListToSend
          .pipe(
            debounceTime(5000)
          )
          .subscribe(() => {
            this.sendDataTranslationList();

          });

        data.forEach(x => {

          const segmentNonNull = x.segment == null ? '' : x.segment;

          this.createTranslationListPath(this.translationListData, x.page, segmentNonNull, x.place);

          this.translationListData[x.page][segmentNonNull][x.place].sent = true;
          this.translationListData[x.page][segmentNonNull][x.place].defaultValue = x.defaultValue;

        });

        this.translationListDataLoadedSubj.next(1);

      });

    })
    this.forcedLanguageLoadingForLanguage(this.schemaLanguage.value).subscribe(() => {

        this.download.next(Math.random());
    });

    this.schemaLanguage.valueChanges.subscribe((v) => {
      // console.log(v);
      this.forcedLanguageLoadingForLanguage(v).subscribe(() => {
        this.download.next(Math.random());
        this.languageChanged.next(v);
      });


      this.pageLanguageLoaderSubj.next(Math.random());
    });



    // @ts-ignore
    this.pageLanguageLoaderSubj.pipe(
      debounceTime(1000)
    ).subscribe(pl => {
      this.forcedLanguageLoadingForArrayPages().subscribe();
    })



  }

  // paint and set flag to true
  paint(page, segment, place) {

    const key = this.getKey(page, segment, place);
    this.isAnyPainted = true;
    this.currentPaintMap.set(key, true);
    this.editableSubject.next(Math.random());

  }


  isPainted(page, segment, place) {
    return this.isAnyPainted && this.currentPaintMap.get(this.getKey(page, segment, place));
  }

  // add phrase to current page map and/or increase its counter.
  // Act on text component init
  addToCurrentPageMap(page, segment, place, defaultValue, type, innercontent) {
    const key = this.getKey(page, segment, place);
    if(this.currentPageMap.has(key)) {
      this.currentPageMap.get(key).counter++;
    } else {
      const value = {counter: 1, page, segment, place, default: defaultValue, type, innercontent};
      this.currentPageMap.set(key, value);
    }
  }
  addToTranslationListMap(page, segment, place, defaultValue) {

    this.accountService.isAdminSubj.pipe(first()).subscribe(x => {

      // console.log(page.search(this.namesRegex) < 0);
      if(x && place && page){

        this.translationListDataLoadedSubj.subscribe(x =>{

          this.createTranslationListPath(this.translationListData, page, segment, place);

          if(!this.translationListData[page][segment][place].sent) {
            this.isNewTranslationPlace = true;
            this.sheduleTranslationListToSend.next(Math.random());
          }
          this.translationListData[page][segment][place].viewed = true;
          this.translationListData[page][segment][place].defaultValue = defaultValue;
        });
      }
    })



  }

  // add phrase to current complicated page map and/or increase its counter.
  // Act on complicated text component init
  addToCurrentComplicatedListsMap(page, segment, place, defaultValue, type, parent) {
    const key = parent;

    let innerMap;
    if(this.currentComplicatedListsMap.has(key)) {

      innerMap = this.currentComplicatedListsMap.get(key);


      const innerKey = this.getKey(page, segment, place);
      if(innerMap.has(innerKey)) {
        innerMap.get(innerKey).counter++;
      } else {
        const value = {counter: 1, page, segment, place, default: defaultValue, type};
        innerMap.set(innerKey, value);
      }
    } else {

      innerMap = new Map();

      const innerKey = this.getKey(page, segment, place);
      const value = {counter: 1, page, segment, place, default: defaultValue, type};
      this.currentComplicatedListsMap.set(key, innerMap);
      innerMap.set(innerKey, value);
    }

  }


  public getKey(page, segment, place) {
    return page + '_delimeter_' + segment + '_delimeter_' + place;
  }

  // Reduce counter in page map
  // Act on text component destroy
  removeFromCurrentPageMap(page, segment, place) {
    const key = this.getKey(page, segment, place);

    if(this.currentPageMap.has(key)) {
      this.currentPageMap.get(key).counter--;
    }
  }

  //
  getCurrentPageMap() {
    return this.currentPageMap;
  }

  getCurrentComplicatedListsMap() {
    return this.currentComplicatedListsMap;
  }

  // deprecated
  // return translate in current language
  public getText(page, segment, place) {

    try {
      return this.languageData[this.language][page][segment][place];
    }
    catch (e) {
      return '';
    }
  }

  // return translate for whole language chain. Return default value if it find nothing.
  public getTextFromEverySource(page, segment, place, defaultValue) {

    let res = '';

    // if(this.language) {
    //   return this.getTextLanguage(this.language, this.page, this.segment, this.place)
    //     || this.getTextLanguage(this.language, '', '', this.default)
    //     || this.default;
    // }
    //
    const chain = this.getChainLanguage();

    chain.forEach(language => {

      if(!res) {
        res = this.getTextLanguage(language, page, segment, place)
          || this.getTextLanguage(language, '', '', defaultValue);
      }
    });
    return res || defaultValue;
  }

  // Return array of old translations for translator in select mode
  public getArrayText(page, segment, place) {

    // this.downloadData();
    // this.language = this.cookieService.get('language');
    try {
      return this.languageArrayData[this.language][page][segment][place];
    }
    catch (e) {
      return [];
    }
  }

  // Load array of translations for current language. Act on mode on
  public forcedLanguageArrayLoadingForLanguage(language) : Subscribable<any> {
    const url = this.host + this.urls.getFullLanguage;
    const req = {language};

    // console.log('forced load')
    return this.http.post(url, req)
      .pipe(
        map(data => {

          this.languageArrayData = {};
          // @ts-ignore
          data.forEach(x => {
            this.createPath(this.languageArrayData, x.language, x.page, x.segment);
            if(!this.languageArrayData[x.language][x.page][x.segment][x.place]) {
              this.languageArrayData[x.language][x.page][x.segment][x.place] = [];
            }
            this.languageArrayData[x.language][x.page][x.segment][x.place].push(x.text);
          });

          console.log(this.languageArrayData);
          // this.download.next(true);
        })
      );
  }

  // deprecated
  // return text for language
  public getTextLanguage(language, page, segment, place) {

    // this.language = this.cookieService.get('language');
    try {
      return this.languageData[language][page][segment][place];
    }
    catch (e) {
      return '';
    }
  }

  // deprecated
  // return text for english
  public getTextInEnglish(page, segment, place) {

    // this.downloadData();
    // this.language = this.cookieService.get('language');
    try {
      return this.languageData[this.english][page][segment][place];
    }
    catch (e) {
      return '';
    }
  }

  // deprecated
  public getPlaceholder(page, segment, place, preset) {

    // this.downloadData();
    // this.language = this.cookieService.get('language');

    const placeWithPreset = place || this.morphStr(preset);
    let res = '';
    try {
      res = this.languageData[this.language][page][segment][placeWithPreset];
    }
    catch (e) {
      res = '';
    }
    return res || preset;
  }

  // downloadData() {
  //   if (!this.dataLoading) {
  //     this.dataLoading = true;
  //     const url = this.host + this.urls.getLanguage;
  //     const req = {language: this.language};
  //     return this.http.post(url, req).subscribe(data => {
  //       // @ts-ignore
  //       data.forEach(x => {
  //         this.createPath(this.languageData, x.language, x.page);
  //         this.languageData[x.language][x.page][x.place] = x.text;
  //       });
  //       this.download.next(true);
  //     });
  //   }
  // }

  // deprecated
  forcedLanguageLoading() {
    if(!this.languageSet.has(this.language)){
      this.languageSet.add(this.language);

      const url = this.host + this.urls.getLanguage;
      const req = {language: this.language};

      this.http.post(url, req).subscribe(data => {
        // @ts-ignore
        data.forEach(x => {
          this.createPath(this.languageData, x.language, x.page, x.segment);
          this.languageData[x.language][x.page][x.segment][x.place] = x.text;
        });
        this.download.next(true);
      });
    }
  }


  // deprecated
  forcedChainLanguageLoadingForLanguage(language) {
    if(!this.languageSet.has(language)){
      this.languageSet.add(language);

      const url = this.host + this.urls.getLanguage;
      const req = {language};

      this.http.post(url, req).subscribe(data => {
        // @ts-ignore
        data.forEach(x => {
          this.createPath(this.languageData, x.language, x.page, x.segment);
          this.languageData[x.language][x.page][x.segment][x.place] = x.text;
        });
        this.download.next(true);
      });
    }
  }

  // loads everything for language. Uses only by translator for schema words
  public forcedLanguageLoadingForLanguage(language) : Subscribable<any> {
    if(!this.languageSet.has(language)){
      this.languageSet.add(language);

      const url = this.host + this.urls.getLanguage;
      const req = {language};

      return this.http.post(url, req)
      .pipe(
        map(data => {

          console.log('pipe')
          // @ts-ignore
          data.forEach(x => {
            this.createPath(this.languageData, x.language, x.page, x.segment);
            this.languageData[x.language][x.page][x.segment][x.place] = x.text;
          });
          // this.download.next(true);
        })
      );
    } else {
      return of(true);
    }
  }

  // loads everything for page. Uses for schema words loading
  public forcedLanguageLoadingForPage(page) : Subscribable<any> {
    if(!this.pageSet.has(page)){
      this.pageSet.add(page);

      const url = this.host + this.urls.getLanguageForPage;
      const req = {page};

      return this.http.post(url, req)
        .pipe(
          map(data => {
            // @ts-ignore
            data.forEach(x => {
              this.createPath(this.languageData, x.language, x.page, x.segment);
              this.languageData[x.language][x.page][x.segment][x.place] = x.text;
            });
            this.download.next(true);
          })
        );
    } else {
      return of(true);
    }
  }


  // add page in loading array
  public shedulePagesForLanguages(page) {

    if(!this.multipagesLoadedObj[page]) {
      this.multipagesLoadedObj[page] = {};
    }



    const languages = this.sameLanguagesArr.concat(this.chainLanguage);


    if(!languages.length) {

      this.multipages.add(page);

    }

    // this.pageLanguageLoaderSubj.next(Math.random());

    languages.forEach(l => {

      if(!this.multipagesLoadedObj[page][l]) {

        this.multipages.add(page);

        this.pageLanguageLoaderSubj.next(Math.random());

        this.multipagesLoadedObj[page][l] = true;
      }
      // this.multipagesLoadedObj[page][l] = false;
    });

  }

  // loads all translations for current language chain and for current page array
  public forcedLanguageLoadingForArrayPages() : Subscribable<any> {

    // if(!this.multipagesLoadedObj[page]) {
    //   this.multipages.push(page);
    // }



    if(this.multipages.size && this.sameLanguagesArr.length && this.chainLanguage.length){

      const url = this.host + this.urls.getLanguageForMultiplePages;


      const languages = this.sameLanguagesArr.concat(this.chainLanguage);

      const req = {
        pages: Array.from(this.multipages),
        languages
      };

      const multipages = Array.from(this.multipages);
      return this.http.post(url, req)
        .pipe(
          map(data => {
            languages.forEach(l => {
              multipages.forEach(p => {
                // @ts-ignore
                if(!this.multipagesLoadedObj[p]) {
                  // @ts-ignore
                  this.multipagesLoadedObj[p] = {};
                }

                // @ts-ignore
                this.multipagesLoadedObj[p][l] = true;
                this.multipages.delete(p);
              });
            });
            // this.multipages = [];

            // @ts-ignore
            data.forEach(x => {
              this.createPath(this.languageData, x.language, x.page, x.segment);
              this.languageData[x.language][x.page][x.segment][x.place] = x.text;
            });
            this.downloadNewText.next(Math.random());
            this.download.next(Math.random());
          })
        );
    } else {
      return of(true);
    }
  }

  public forcedTranslationListLoading() : Subscribable<any> {

    const url = this.host + this.urls.getTranslationList;

    return this.http.post(url, {})
      ;
  }

  // create path in languageData obj
  createPath(obj, language, page, segment) {
    if (typeof obj[language] === 'undefined') {
      obj[language] = {};
    }
    if (typeof obj[language][page] === 'undefined') {
      obj[language][page] = {};
    }
    if (typeof obj[language][page][segment] === 'undefined') {
      obj[language][page][segment] = {};
    }
  }
  createTranslationListPath(obj, page, segment, place) {
    if (typeof obj[page] === 'undefined') {
      obj[page] = {};
    }
    if (typeof obj[page][segment] === 'undefined') {
      obj[page][segment] = {};
    }
    if (typeof obj[page][segment][place] === 'undefined') {
      obj[page][segment][place] = {};
    }
  }

  public setText(page, segment, place, text) {
    // console.log()
    this.createPath(this.languageData, this.language, page, segment);
    this.languageData[this.language][page][segment][place] = text;
    this.createPath(this.languageDataForSend, this.language, page, segment);
    this.languageDataForSend[this.language][page][segment][place] = text;
    this.isChanged = true;
  }

  public setTextLanguage(language, page, segment, place, text) {
    // console.log()
    this.createPath(this.languageData, language, page, segment);
    this.languageData[language][page][segment][place] = text;
    this.createPath(this.languageDataForSend, language, page, segment);
    this.languageDataForSend[language][page][segment][place] = text;
    this.isChanged = true;
  }

  public setLanguageReplaces(mapReplaces) {
    this.mapReplacesSubject.next(mapReplaces);
    this.mapReplacesSubject.complete();
  }

  public setSameLanguages(mapSameLanguages) {
    this.mapSameLanguagesSubject.next(mapSameLanguages);
    this.mapSameLanguagesSubject.complete();
  }

  // Renew replace chain and same language chain according their subjects
  getReplacesChain() {
    this.mapReplacesSubject.subscribe(mapReplaces => {

      console.log(mapReplaces);


      // const isChanged = this.isChanged;
      const chain = [];
      let chainElement = this.language;
      while(chainElement && !chain.includes(chainElement)) {
        chain.push(chainElement);
// @ts-ignore
        chainElement = mapReplaces.get(chainElement);
      }
      // console.log(chain);
      this.chainLanguage = chain;

      chain.forEach(l => {

        // this.forcedChainLanguageLoadingForLanguage(l);

        Object.keys(this.multipagesLoadedObj).forEach(page => {

          if(!this.pageLanguageLoaderSubj[page] || this.pageLanguageLoaderSubj[page][l]) {
            this.multipages.add(page);
          }
        });
      });


      this.pageLanguageLoaderSubj.next(Math.random());
      // this.isChanged = isChanged;
    });

    this.mapSameLanguagesSubject.subscribe(map => {

      // console.log(map);


      // const isChanged = this.isChanged;
      const chain = [];
      let chainElement = this.language;
      while(chainElement && !chain.includes(chainElement)) {
        chain.push(chainElement);
// @ts-ignore
        chainElement = map.get(chainElement);
      }
      // console.log(chain);
      this.sameLanguagesArr = chain;

      chain.forEach(l => {
        // this.forcedChainLanguageLoadingForLanguage(l);
        Object.keys(this.multipagesLoadedObj).forEach(page => {

          if(!this.pageLanguageLoaderSubj[page] || this.pageLanguageLoaderSubj[page][l]) {
            this.multipages.add(page);
          }
        });
      });

      this.pageLanguageLoaderSubj.next(Math.random());

      // this.isChanged = isChanged;
    })
  }

  public setLanguage(language) {
    const isChanged = this.isChanged;
    this.language = language;
    this.getReplacesChain();
    // this.forcedLanguageLoading();
    this.languageChanged.next(true);
    this.languageChangedManually.next(true);

    this.pageLanguageLoaderSubj.next(Math.random());
    // this.forcedLanguageArrayLoadingForLanguage(this.language).subscribe(() => {
    //
    // });

    this.isChanged = isChanged;


    if(this.history) {
      // this.pageLanguageLoaderSubj.next(true);

      // this.forcedLanguageArrayLoadingForLanguage(this.language).subscribe();
    }
  }
  public getLanguage() {
    return this.language;
  }

  private async testAsync() {

    // @ts-ignore
    return await this.languagesLoaded.toPromise();
  }
  public getLanguageCode() {
    let res = 'en';
    // console.log(languagesInterface);
    // console.log(this.language);
    //
    // await this.testAsync();
    languagesInterface.forEach(x => {
      if(x.value == this.language) {
        res = x.code;
      }
    });
    return res;
  }


  public switchEdition() {

    // console.log(this.languageData);
    if(this.universal) {
      this.universal = !this.universal;
    } else {
      this.editable = !this.editable;
    }
    this.editableSubject.next(Math.random());
  }
  public switchEditionUniversal() {

    // console.log(this.languageData);
    if(this.universal) {
      this.editable = false;
    } else {
      this.editable = true;
    }
    this.universal = !this.universal;
    this.editableSubject.next(Math.random());
  }
  public switchHistory() {

    console.log(this.languageData);
    this.history = !this.history;
    if(this.history) {

      this.forcedLanguageArrayLoadingForLanguage(this.language).subscribe();
    }

    this.editableSubject.next(Math.random());
  }

  // send data that translator added
  public sendData() {
    const url = this.host + this.urls.setLanguage;
    const body = {
      id: this.cookieService.get('myId'),
      hash: this.cookieService.get('hash'),
      language: this.language,
      // full: JSON.stringify(this.languageData[this.language]),
      data: this.languageDataForSend
    };
    this.http.post(url, body).subscribe(() => {
      this.isChanged = false;
      this.languageDataForSend = {};
    });
  }


  // send data that translation list
  public sendDataTranslationList() {
    const url = this.host + this.urls.setTranslationList;
    const body = {
      id: this.cookieService.get('myId'),
      hash: this.cookieService.get('hash'),
      // language: this.language,
      // full: JSON.stringify(this.languageData[this.language]),
      data: this.getDiffereceInTranslationList()
    };


    this.http.post(url, body).subscribe(() => {


      this.isNewTranslationPlace = false;

      Object.keys(this.translationListData).forEach(page => {

        Object.keys(this.translationListData[page]).forEach(segment => {

          Object.keys(this.translationListData[page][segment]).forEach(place => {
            if(this.translationListData[page][segment][place].viewed && !this.translationListData[page][segment][place].sent) {

              this.translationListData[page][segment][place].sent = true;

            }
          });
        });
      });
    });
  }

  getDiffereceInTranslationList() {

    const res = [];
    console.log(this.translationListData);

    Object.keys(this.translationListData).forEach(page => {

      Object.keys(this.translationListData[page]).forEach(segment => {

        Object.keys(this.translationListData[page][segment]).forEach(place => {
          if(this.translationListData[page][segment][place].viewed && !this.translationListData[page][segment][place].sent) {
            res.push({
              page,
              segment,
              place,
              defaultValue: this.translationListData[page][segment][place].defaultValue
            })
          }
        });
      });
    });
    console.log(res);

    return res;

  }

  // uses to generate place from defaultValue.
  morphStr(str) {
    if (str) {
      return str.replace(/[^a-zA-Z0-9_À-ÿ]+/g, '_').toLowerCase();
    } else {
      return str;
    }
  }

  // sort set data according by shown text
  public sortByTranslate(page, segment, placeName, data, defaultName) {
    data.sort((a, b) => {
      const aa = (this.getTextFromEverySource(page, segment, a[placeName], a[defaultName])).toLowerCase();
      const bb = (this.getTextFromEverySource(page, segment, b[placeName], b[defaultName])).toLowerCase();
      if (aa > bb) {
        return 1;
      } else
      if (aa < bb) {
        return -1;
      } else
      if (aa == bb) {
        return 0;
      }
    })
    return data;
  }

  public isRtl() {
    return this.language == 'hebrew' || this.language == 'yiddish';
  }

  getChainLanguage() {
    return this.chainLanguage;
  }

  isSameLanguage(language) {
    // console.log(this.sameLanguagesArr);
    // console.log(language);
    // console.log(this.sameLanguagesArr.includes(language));

    return this.sameLanguagesArr.includes(language);
  }
  get schemaLanguage() {
    return this.form.get('language');
  }

  // add 'lang=en' at the end of params
  public addLanguageParam() {



    const currentLanguage = this.getLanguageByValue(this.language);

    if(currentLanguage && currentLanguage.code != this.activatedRoute.snapshot.queryParams.lang) {

      this.router.navigate([], { queryParams: { lang: currentLanguage.code }, queryParamsHandling: 'merge', replaceUrl: true});

    }
  }

  getLanguageByValue(value) {

    return languagesInterface.find(lang => {
      return lang.value == value;
    });
  }
}
