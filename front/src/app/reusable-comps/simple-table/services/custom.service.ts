import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor() { }
  
  sumByProperty(arr: any[], prop: string) {
    let i, t: any='', val;
    if (arr.length) {
      i = arr.length;
      t = 0;
      while (i--) {
        val = +arr[i][prop];
        if (!isNaN(val)) { t += val;}
      }
    } 
    return t 
  };

  ordinalize(n: number) {
    return ['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th';
  };

  isDate(date: Date){
    const tryDate = new Date(date)
    return (tryDate && tryDate.toString() !== 'NaN')
  }


  simpleGroupings(array: any, groupByField: string) {
    let group_obj, groupedArray: any, i, index, item, k;
    group_obj = <any>{};
    groupedArray = [];
    if (array) {
      i = array.length;
      k = 0;
      while (i--) {
        item = array[i][groupByField] || ""
        if (group_obj[item] === null || group_obj[item] === void(0)) {
          group_obj[item] = {index: k};
          groupedArray[k] = {groupKey: item, groupArray: [] };
          k++;
        }
        index = group_obj[item].index;
        groupedArray[index].groupArray.push(array[i]);
        // groupedArray[index].originalGroupArray = groupedArray[index].groupArray;
      }
      return groupedArray;
    }
  };


 columnsGroupings(array: any, groupByField: string, fields: any) {
  let arrLen, arryObject: any, c, cols_0, cols_1, d, group_obj: any, groupedArray: any, i, index, item, k, other_details;
  group_obj = {};
  groupedArray = [];
  cols_0 = fields[0];
  cols_1 = fields[1];
  if (array && array.length) {
    i = array.length;
    k = 0;
    while (i--) {
      arrLen = array[i].length; 
      c = cols_0.length;
      d = cols_1.length;
      arryObject = {};
      while (c--) {
        arryObject[cols_0[c]] = array[i][c];
      }
      while (d--) {
        other_details = JSON.parse(array[i][arrLen - 1]);
        arryObject[cols_1[d]] = other_details[cols_1[d]];
      }
      item = arryObject[groupByField] || "";
      if (group_obj[item] === null || group_obj[item] === void 0) {
        group_obj[item] = {index: k};
        groupedArray[k] = {groupKey: item, groupArray: []};
        k++;
      }
      index = group_obj[item].index;
      groupedArray[index].groupArray.push(arryObject);
      // groupedArray[index].originalGroupArray = groupedArray[index].groupArray;
    }
  } 
  return groupedArray;
};

searchByProperties(array: any[], props: any){
  const searchedKyes = Object.keys(props)
  let results = []
  if (searchedKyes.length) {
    let t = array.length
    let j = 0  
    let i = 0
    while (i < t) {
      let dt = array[i] 
      let isPart = []
      let s = searchedKyes.length
      while (s--) {
        const k = searchedKyes[s]
        const val = dt[k].toString().toLowerCase();
        const searchText = props[k].toLowerCase();
        isPart.push(val.includes(searchText))
      }
      if (!isPart.includes(false)) {
        results[j] = dt
        j++
      };
      i++
    } 
    return results
  } else {
    return array
  }
  
};

getNewArray(arr: any[], replaceItem: any, i: number){
  return [...arr.slice(0, i), replaceItem, ...arr.slice(i + 1)]
}

intersect(array1: [], array2: []){
  let i = array1.length
  let valid = false
  while (i-- && !valid) {
    valid = array2.indexOf(array1[i]) != -1
  }
  return valid;
}


intersectedArray(array1: [], array2: []){
  return array1.filter((n) => {
    return array2.indexOf(n) !== -1;
  });
}

addRow(model: any[], i: number, defaultData?: any) {
  const item: any = defaultData || {}
  if (model.length <= i + 1) {
    model.splice(i + 1,0,item)
  }
  return model 
}

deleteRow(model: any[], i: number) {
  if (model.length > 1) {
    model.splice(i, 1)
  }
  return model
}

removedArrayData(opts: any): any[] {
  let results = opts.rData
  if (opts.mData.length) {
    const fItem = opts.mData[0]
    if (fItem[opts.attrs]) {
      let mIds = opts.mData.map((m: any) => m[opts.attrs]).flat()
      mIds = [...new Set(mIds)]
      results = results.filter((d: any) => !mIds.includes(d[opts.attrs]))
    }
  } 
  return results
}

}
