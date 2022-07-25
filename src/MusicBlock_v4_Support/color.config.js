function updateJSON(oldJSON,newJSON){
  let tempData = {};
  for(let x in oldJSON){
    if(newJSON[x]){
      if(typeof(newJSON[x]) === 'object'){
        tempData[x] = updateJSON(oldJSON[x],newJSON[x]);
      } else{
        tempData[x] = newJSON[x];
      }
    } else {
        tempData[x] = oldJSON[x];
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
          "program":{
            "args":{
              "name":"#473FDF",
              "value":"#00A6FF"
            },
            "color":"#473FDF"
          }
        },
        "args":{
          "name":"#00CDFF",
          "value":"#474747"
        },
        "color":"#D5FF04"
      },
      "statement":{
        "categories":{
          "pen":{
            "color": "red",
            "args":{
              "name":"green",
              "value":"blue"
            }
          }
        },
        "args":{
          "name":"#00CDFF",
          "value":"#474747"
        },
        "color":"#0097FF"
      },
      "data":{
        "categories":{
          "boxidentifier":{
            "name":"#0441FF",
            "value":"#474747"
          }
        },
        "name":"#0441FF",
        "value":"#474747"
      },
      "expression":{
        "categories":{},
        "args":{
          "name":"#00CDFF",
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