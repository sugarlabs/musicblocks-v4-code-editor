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

/**
 * Defines methods to assign and change the colour configurations
 * for syntax highlighting.
 * @exports syntaxColorConfig
 */
export default class syntaxColorConfig{

  /**
   * @description assigns the default color config for syntax highlighting. 
   */
  constructor(){
    /**
     * @type {Object}
     */
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

  /**
   * 
   * @returns {Object} - returns the current color config.
   */
  getConfig(){
    return this.colorConfig;
  }

  /**
   * 
   * @param {Object} newColorConfig - the new color config that will reset the current config. 
   * @returns {Object} - returns the new color config whcih will be the object passed in the params.
   */
  resetConfig(newColorConfig){
    this.colorConfig = newColorConfig;
    return this.colorConfig;
  }

  /**
   * 
   * @param {Object} newColorConfig - the new color config that will be used to update the old config.
   * @returns {Object} - returns the new updated color config along with all other default values. 
   */
  setConfig(newColorConfig){
    return updateJSON(this.colorConfig, newColorConfig);
  }
}