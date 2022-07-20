function updateJSON(oldJSON,newJSON){
  let tempData = {};
  for(x in oldJSON){
    if(newJSON[x]){
      if(typeof(newJSON[x]) === 'object'){
        tempData[x] = updateJSON(oldJSON[x],newJSON[x]);
      } else{
        tempData[x] = newJSON[x];
      }
    } else {
        tempData[x] = oldJSON[x]
    }
  }
  return tempData;
}

export default class syntaxColorConfig{
  constructor(){
    this.colorConfig = {
      "block":{
        "categories":{
          "loop":{
            "color":"#CD2BD5"
          },
          "repeat":{
            "args":{
              "name":"#473FDF",
              "value":"#00A6FF"
            },
            "color":"#CD2BD5"
          }
        },
        "args":{
          "name":"00CDFF",
          "value":"#474747"
        },
        "color":"#D5FF04"
      }, 
      "statements":{
        "categories":{},
        "args":{
          "name":"00CDFF",
          "value":"#474747"
        },
        "color":"#0097FF"
      },
      "data":{
        "categories":{},
        "name":"#0441FF",
        "value":"#474747"
      },
      "expresson":{
        "categories":{},
        "args":{
          "name":"00CDFF",
          "value":"#474747"
        },
        "color":"#0441FF"
      }
    }; 
  }

  getConfig(){
    return this.colorConfig;
  }

  resetConfig(newColorConfig){
    this.colorConfig = newColorConfig;
    return this.colorConfig;
  }

  setConfig(newColorConfig){
    return updateJSON(this.colorConfig, newColorConfig);
  }
}