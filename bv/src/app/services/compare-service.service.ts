import {Injectable} from '@angular/core';
import {environment} from '@src/environments/environment';
import {Difference, GrapeData} from '@src/app/wineries-designed/winery-changelog/winery-changelog.component';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompareServiceService {


  valueNamesConvertor = {

    commoninfo: {
      country: {name: 'Country', type: 'text'},
      regionsForm: {name: 'Regions', type: 'regions'},
      name_national: {name: 'Winery name', type: 'text'},
      name_international: {name: 'Winery name in english', type: 'text'},
      address: {name: 'Address', type: 'text'},
      zip: {name: 'zip', type: 'text'},
      phone: {name: 'Phone', type: 'text'},
      mobile: {name: 'Mobile', type: 'text'},
      fax: {name: 'Fax', type: 'text'},
      email: {name: 'Mail', type: 'text'},
      web: {name: 'Web', type: 'text'},
      owner: {name: 'Owner', type: 'text'},
      establish_year: {name: 'When was it established', type: 'text'},
      winemaker_international: {name: 'Head winemaker in english', type: 'text'},
      winemaker_national: {name: 'Head winemaker', type: 'text'},
      lat: {name: 'Geolocation', type: 'text'},
      lng: {name: 'Geolocation', type: 'text'},
      performance: {name: 'Performance', type: 'text'},
      isKashrut: {name: 'Is kashrut', type: 'boolean'},
      isQuality: {name: 'Is quality', type: 'boolean'},
      isBiodynamic: {name: 'Is biodynamic', type: 'boolean'},
      isOrganic: {name: 'Is organic', type: 'boolean'},
      isVegan: {name: 'Is vegan', type: 'boolean'},
      language: {name: 'Language', type: 'text'},
    },

    deleted: {name: 'Deleted', type: 'boolean'},
    image: {name: 'Image', type: 'image'},
    emblem: {name: 'Emblem', type: 'image'},
    user: {name: 'User', type: 'text'},
    countryName: {name: 'Country', type: 'text'},
    visittime: {name: 'Visiting hours', type: 'visittime'},
    grapelist: {name: 'Grapes', type: 'none'},
    grapesFull: {name: 'Grapes', type: 'grapes'},
    grapeSynonims: {name: 'Grapes', type: 'none'},
    vineyardsFull: {name: 'Vineyards', type: 'list'},
    kashruts: {name: 'Kashrut', type: 'kashruts'},
    qualities: {name: 'Quality', type: 'list'},
    biodynamics: {name: 'Biodynamics', type: 'list'},
    organics: {name: 'Organic', type: 'list'},
    vegans: {name: 'Vegan', type: 'list'},
    country_id: {name: 'Country', type: 'text'},
    region1: {name: 'Region level 1', type: 'text'},
    region2: {name: 'Region level 2', type: 'text'},
    region3: {name: 'Region level 3', type: 'text'},
    region4: {name: 'Region level 4', type: 'text'},
    region5: {name: 'Region level 5', type: 'text'},
    region6: {name: 'Region level 6', type: 'text'},
    winery_name: {name: 'Winery name', type: 'text'},
    international_name: {name: 'Winery name in english', type: 'text'},
    address: {name: 'Address', type: 'text'},
    zip: {name: 'zip', type: 'text'},
    phone: {name: 'Phone', type: 'text'},
    mobile: {name: 'Mobile', type: 'text'},
    fax: {name: 'Fax', type: 'text'},
    mail: {name: 'Mail', type: 'text'},
    web: {name: 'Web', type: 'text'},
    owner: {name: 'Owner', type: 'text'},
    establishyear: {name: 'When was it established', type: 'text'},
    headwinemaker: {name: 'Head winemaker in english', type: 'text'},
    neutralheadwinemaker: {name: 'Head winemaker', type: 'text'},
    latitude: {name: 'Geolocation', type: 'text'},
    longtitude: {name: 'Geolocation', type: 'text'},
    grapes: {name: 'Grapes', type: 'text'},
    grapessinonims: {name: 'Grapes', type: 'text'},
    vineyards: {name: 'Vineyards', type: 'vineyard'},
    performance: {name: 'Performance', type: 'text'},
    iskashrut: {name: 'Is kashrut', type: 'boolean'},
    isquality: {name: 'Is quality', type: 'boolean'},
    isbiodynamic: {name: 'Is biodynamic', type: 'boolean'},
    isorganic: {name: 'Is organic', type: 'boolean'},
    isvegan: {name: 'Is vegan', type: 'boolean'},
    kashrut: {name: 'Kashrut', type: 'text'},
    quality: {name: 'Quality', type: 'text'},
    biodynamic: {name: 'Biodynamics', type: 'text'},
    organic: {name: 'Organic', type: 'text'},
    vegan: {name: 'Vegan', type: 'text'},
    language: {name: 'Language', type: 'text'},
    menu: {

    },
    additional: {

    },
  };


// {id: 0, name: 'select'},
// {id: 1, name: 'text'},
// {id: 12, name: 'link'},
// {id: 2, name: 'number'},
// {id: 3, name: 'pop up'},
// {id: 4, name: 'checkbox'},
// {id: 5, name: 'radio'},
// {id: 6, name: 'textarea'},
// {id: 7, name: 'checkbox group'},
// {id: 8, name: 'checkbox group with textbox'},
// {id: 9, name: 'temperature'},
// {id: 10, name: 'country/region'},
// {id: 13, name: 'country'},
// {id: 11, name: 'list of options'},
// {id: 14, name: 'user'},
  structure: InputData[][] = [];
  form = new FormGroup({


  });

  constructor(private service: RequestsService,
    private additionalService: AdditionalServiceService
  ) {

    const req = {business_type: 'winery'};

    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {
      this.additionalService.transformAdditional(data, this.structure, this.form);
      console.log(this.structure);

      this.structure.forEach(block => {
        block.forEach(row => {
          // {name: 'Language', type: 'text'},
          if(row.input_type == 8) {

            this.valueNamesConvertor.additional[row.controlName] =
              {
                name: row.block_name + ', ' + row.title_name,
                type: 'multiselect',
                select_options: row.select_options
              };
            this.valueNamesConvertor.additional[row.controlName + '_text'] =
              {
                name: row.block_name + ', ' + row.title_name,
                type: 'multiselectText',
                select_options: row.select_options
              };
          } else if(row.input_type == 7) {

            this.valueNamesConvertor.additional[row.controlName] =
              {
                name: row.block_name + ', ' + row.title_name,
                type: 'multiselect',
                select_options: row.select_options
              };
          } else if(row.input_type == 10) {

            this.valueNamesConvertor.additional[row.controlName] =
              {
                name: row.block_name + ', ' + row.title_name,
                type: 'additionalRegions',
                select_options: row.select_options
              };
          } else if(row.input_type == 13) {

            this.valueNamesConvertor.additional[row.controlName] =
              {
                name: row.block_name + ', ' + row.title_name,
                type: 'country',
                select_options: row.select_options
              };
          } else {

            this.valueNamesConvertor.additional[row.controlName] =
              {
                name: row.block_name + ', ' + row.title_name,
                type: 'text'
              };
          }
          this.valueNamesConvertor.menu[row.block_name] =
            {
              name: row.block_name,
              type: 'boolean'
            };
        })
      })
    });

  }



  public getDifferenceName(difference: Difference) {
    if(difference.part == '') {
      return this.valueNamesConvertor[difference.title].name;
    } else {
      if(this.valueNamesConvertor[difference.part][difference.title]) {
        return this.valueNamesConvertor[difference.part][difference.title].name;
      } else {
        return '';
      }
    }
  }
  public getDifferencePointName(difference, i) {
    if(this.valueNamesConvertor[difference.part][difference.title].select_options &&
      this.valueNamesConvertor[difference.part][difference.title].select_options[i]) {
      return this.valueNamesConvertor[difference.part][difference.title].select_options[i].id;
    }
  }
  public getDifferenceType(difference: Difference) {
    if(difference.part == '') {
      return this.valueNamesConvertor[difference.title].type;
    } else {
      if(this.valueNamesConvertor[difference.part][difference.title]) {
        return this.valueNamesConvertor[difference.part][difference.title].type;
      } else {
        return '';
      }
    }
  }

  public getDifferencesListHistory(beforeVersion, afterVersion, id) {


    console.log(beforeVersion);
    console.log(afterVersion);
    // console.log(change);
    // console.log(address);

    const arrDifferences: Difference[] = [];

    Object.keys(beforeVersion).forEach(key => {

      if(key == 'commoninfo') {

        Object.keys(beforeVersion.commoninfo).forEach(keyInner => {

          if(!this.isEqual(beforeVersion[key][keyInner], afterVersion[key][keyInner])) {

            arrDifferences.push({
              part: key,
              title: keyInner,
              before: beforeVersion[key][keyInner],
              after: afterVersion[key][keyInner],
            });
          }
        });
      } else if (key == 'menu' || key == 'additional') {
        const parsedAfter = JSON.parse(afterVersion[key]);
        const parsedBefore = JSON.parse(beforeVersion[key]);


        Object.keys(parsedBefore).forEach(keyInner => {

          let subparsedAfter = [];
          let subparsedBefore = [];

          try{
            if(typeof parsedAfter[keyInner] == 'string'){
              subparsedAfter = JSON.parse(parsedAfter[keyInner]);
            }
          } catch {

          }

          try{
            if(typeof parsedBefore[keyInner] == 'string'){
              subparsedBefore = JSON.parse(parsedBefore[keyInner]);
            }
          } catch {

          }


          // console.log(afterVersion);
          // console.log(beforeVersion);
          // console.log(keyInner);
          // console.log(subparsedAfter);
          // console.log(subparsedBefore);
          // console.log(parsedAfter[keyInner]);
          // console.log(parsedBefore[keyInner]);
          if(!subparsedAfter.length && !subparsedBefore.length) {
            if(keyInner.search('_type') == -1) {



              if(!this.isEqual(parsedBefore[keyInner], parsedAfter[keyInner])) {

                arrDifferences.push({
                  part: key,
                  title: keyInner,
                  before: parsedBefore[keyInner],
                  after: parsedAfter[keyInner],
                });
              }
            }

          } else {

            let longestArr;
            if(subparsedAfter.length >= subparsedBefore.length) {
              longestArr = subparsedAfter;
            } else {
              longestArr = subparsedBefore;
            }
            longestArr.forEach((b, i) => {
              if(subparsedBefore[i] != subparsedAfter[i]) {

                Object.keys(longestArr[i]).forEach(keyInner2 => {
                  let beforeValue;


                  if(!subparsedBefore.length || subparsedBefore.length <= i) {
                    beforeValue = null;
                  } else {
                    beforeValue = subparsedBefore[i][keyInner2];
                  }

                  let afterValue;
                  if(!subparsedAfter.length || subparsedAfter.length <= i) {
                    afterValue = null;
                  } else {
                    afterValue = subparsedAfter[i][keyInner2];
                  }

                  if(beforeValue != afterValue && keyInner2.search('_type') == -1) {



                    if(!this.isEqual(beforeValue, afterValue)) {

                      arrDifferences.push({
                        part: key,
                        title: keyInner2,
                        before: beforeValue,
                        after: afterValue,
                      });
                    }
                  }

                });

              }
            });

          }

          delete parsedAfter[keyInner];

        });


        Object.keys(parsedAfter).forEach(keyInner => {

          let subparsedAfter = [];
          let subparsedBefore = [];

          try{
            if(typeof parsedAfter[keyInner] == 'string'){
              subparsedAfter = JSON.parse(parsedAfter[keyInner]);
            }
          } catch {

          }

          try{
            if(typeof parsedBefore[keyInner] == 'string'){
              subparsedBefore = JSON.parse(parsedBefore[keyInner]);
            }
          } catch {

          }

          if(!subparsedAfter.length && !subparsedBefore.length) {
            if(keyInner.search('_type') == -1) {

              if(!this.isEqual(parsedBefore[keyInner], parsedAfter[keyInner])) {

                arrDifferences.push({
                  part: key,
                  title: keyInner,
                  before: parsedBefore[keyInner],
                  after: parsedAfter[keyInner],
                });
              }
            }

          } else {

            let longestArr;
            if(subparsedAfter.length >= subparsedBefore.length) {
              longestArr = subparsedAfter;
            } else {
              longestArr = subparsedBefore;
            }
            longestArr.forEach((b, i) => {
              if(subparsedBefore[i] != subparsedAfter[i]) {

                Object.keys(longestArr[i]).forEach(keyInner2 => {
                  let beforeValue;


                  if(!subparsedBefore.length || subparsedBefore.length <= i) {
                    beforeValue = null;
                  } else {
                    beforeValue = subparsedBefore[i][keyInner2];
                  }

                  let afterValue;
                  if(!subparsedAfter.length || subparsedAfter.length <= i) {
                    afterValue = null;
                  } else {
                    afterValue = subparsedAfter[i][keyInner2];
                  }

                  if(beforeValue != afterValue && keyInner2.search('_type') == -1) {


                    if(!this.isEqual(beforeValue, afterValue)) {

                      arrDifferences.push({
                        part: key,
                        title: keyInner2,
                        before: beforeValue,
                        after: afterValue,
                      });
                    }
                  }

                });

              }
            });

          }


        });



      } else if (key == 'grapelist' || key == 'grapesFull' || key == 'grapeSynonims') {

        // actually triggering for 'grapesFull' only

        if(key == 'grapesFull') {
          const beforeData: GrapeData = {
            grapelist: JSON.parse(beforeVersion.grapelist),
            grapesFull: beforeVersion.grapesFull,
            grapeSynonims: JSON.parse(beforeVersion.grapeSynonims),
          };

          const afterData: GrapeData = {
            grapelist: JSON.parse(afterVersion.grapelist),
            grapesFull: afterVersion.grapesFull,
            grapeSynonims: JSON.parse(afterVersion.grapeSynonims),
          };

          if(!this.isEqual(beforeData, afterData)) {

            arrDifferences.push({
              part: '',
              title: key,
              before: beforeData,
              after: afterData,
            });
          }
        }
      } else if (key == 'visittime') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = JSON.parse(beforeVersion[key]);
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = JSON.parse(afterVersion[key]);
        } else {
          after = null;
        }

        if(!this.isEqual(before, after)) {

          arrDifferences.push({
            part: '',
            title: key,
            before,
            after,
          });
        }
      } else if (key == 'image') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = environment.wineryImageStore + `${id + '_' + beforeVersion[key]}.png`;
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = environment.wineryImageStore + `${id + '_' + afterVersion[key]}.png`;
        } else {
          after = null;
        }
        if(!this.isEqual(before, after)) {

          arrDifferences.push({
            part: '',
            title: key,
            before,
            after,
          });
        }
      } else if (key == 'emblem') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = environment.wineryEmblemImageStore + `${id + '_' + beforeVersion[key]}.png`;
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = environment.wineryEmblemImageStore + `${id + '_' + afterVersion[key]}.png`;
        } else {
          after = null;
        }
        if(!this.isEqual(before, after)) {

          arrDifferences.push({
            part: '',
            title: key,
            before,
            after,
          });
        }
      } else {
        if(!this.isEqual(beforeVersion[key], afterVersion[key])) {

          arrDifferences.push({
            part: '',
            title: key,
            before: beforeVersion[key],
            after: afterVersion[key],
          });
        }
      }
    });

    return arrDifferences;
  }

  public getDifferencesList(beforeVersion, afterVersion, id) {


    console.log(beforeVersion);
    console.log(afterVersion);
    // console.log(change);
    // console.log(address);

    const arrDifferences: Difference[] = [];

    Object.keys(beforeVersion).forEach(key => {

      if(key == 'commoninfo') {

        Object.keys(beforeVersion.commoninfo).forEach(keyInner => {
          arrDifferences.push({
            part: key,
            title: keyInner,
            before: beforeVersion[key][keyInner],
            after: afterVersion[key][keyInner],
          });
        });
      } else if (key == 'menu' || key == 'additional') {
        const parsed = JSON.parse(afterVersion[key]);

        // console.log(parsed);
        // console.log(change.difference[key]);

        Object.keys(beforeVersion[key]).forEach(keyInner => {


          try {
            const subparsedAfter = JSON.parse(parsed[keyInner]);
            const subparsedBefore = JSON.parse(beforeVersion[key][keyInner]);
            let longestArr;
            if(subparsedAfter.length >= subparsedBefore.length) {
              longestArr = subparsedAfter;
            } else {
              longestArr = subparsedBefore;
            }
            longestArr.forEach((b, i) => {
              if(subparsedBefore[i] != subparsedAfter[i]) {

                Object.keys(longestArr[i]).forEach(keyInner2 => {
                  let beforeValue;

                  // console.log(keyInner2.search('_type') == -1);
                  // console.log(subparsedAfter);
                  // console.log(i);
                  // console.log(subparsedAfter.length);
                  // console.log(subparsedAfter.length >= i);

                  if(!subparsedBefore.length || subparsedBefore.length <= i) {
                    beforeValue = null;
                  } else {
                    beforeValue = subparsedBefore[i][keyInner2];
                  }

                  let afterValue;
                  if(!subparsedAfter.length || subparsedAfter.length <= i) {
                    afterValue = null;
                  } else {
                    afterValue = subparsedAfter[i][keyInner2];
                  }

                  if(beforeValue != afterValue && keyInner2.search('_type') == -1) {

                    // console.log(beforeValue);
                    // console.log(afterValue);


                    arrDifferences.push({
                      part: key,
                      title: keyInner,
                      before: beforeValue,
                      after: afterValue,
                    });
                  }

                });

              }
            });
          } catch (e){
            // console.log(e);
            arrDifferences.push({
              part: key,
              title: keyInner,
              before: beforeVersion[key][keyInner],
              after: parsed[keyInner],
            });
          }

        });


      } else if (key == 'grapelist' || key == 'grapesFull' || key == 'grapeSynonims') {

        // actually triggering for 'grapesFull' only

        if(key == 'grapesFull') {
          const beforeData: GrapeData = {
            grapelist: JSON.parse(beforeVersion.grapelist),
            grapesFull: beforeVersion.grapesFull,
            grapeSynonims: JSON.parse(beforeVersion.grapeSynonims),
          };

          const afterData: GrapeData = {
            grapelist: JSON.parse(afterVersion.grapelist),
            grapesFull: afterVersion.grapesFull,
            grapeSynonims: JSON.parse(afterVersion.grapeSynonims),
          };

          arrDifferences.push({
            part: '',
            title: key,
            before: beforeData,
            after: afterData,
          });
        }
      } else if (key == 'visittime') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = JSON.parse(beforeVersion[key]);
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = JSON.parse(afterVersion[key]);
        } else {
          after = null;
        }
        arrDifferences.push({
          part: '',
          title: key,
          before,
          after,
        });
      } else if (key == 'image') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = environment.wineryImageStore + `${id + '_' + beforeVersion[key]}.png`;
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = environment.wineryImageStore + `${id + '_' + afterVersion[key]}.png`;
        } else {
          after = null;
        }
        arrDifferences.push({
          part: '',
          title: key,
          before,
          after,
        });
      } else if (key == 'emblem') {
        let before;
        let after;
        if(beforeVersion[key]) {
          before = environment.wineryEmblemImageStore + `${id + '_' + beforeVersion[key]}.png`;
        } else {
          before = null;
        }
        if(beforeVersion[key]) {
          after = environment.wineryEmblemImageStore + `${id + '_' + afterVersion[key]}.png`;
        } else {
          after = null;
        }
        arrDifferences.push({
          part: '',
          title: key,
          before,
          after,
        });
      } else {
        arrDifferences.push({
          part: '',
          title: key,
          before: beforeVersion[key],
          after: afterVersion[key],
        });
      }
    });

    return arrDifferences;
  }


  isEqual(a, b) {
    console.log([a,b])
    if(Array.isArray(a) && Array.isArray(b)) {
      const longest = a.length >= b.length ? a : b;

      const shortest = a.length >= b.length ? b : a;

      let isEqual = true;
      longest.forEach((x, i) => {
        if((!longest[i] && !shortest[i]) || JSON.stringify(longest[i]) == JSON.stringify(shortest[i])) {
          // isEqual = true;
        } else {
          isEqual = false;
        }
      });
      return isEqual;
    }
    if(a && b && typeof a == 'object' && typeof b == 'object') {

      let isEqual = true;
      Object.keys(a).forEach(key => {
        if((!a[key] && !b[key]) || JSON.stringify(a[key]) == JSON.stringify(b[key])) {

        } else {
          isEqual = false;
        }
      });
      Object.keys(b).forEach(key => {
        if((!a[key] && !b[key]) || JSON.stringify(a[key]) == JSON.stringify(b[key])) {

        } else {
          isEqual = false;
        }
      });

      return isEqual;
    }
    if((!a && !b) || JSON.stringify(a) == JSON.stringify(b)) {
      return true;
    }
    return false;


  }
}
