import { codeEditorCont, dataVariables, conditionalVariables } from '../store';

let syntaxColorConfig;
let SyntaxDetails = "";
let LineNumber = 0;
let tempCodeEditorCont;
let TempConditionalVariables;
let TempDataVariable;
let TextData = [];
let TextDataI = 0;

/**
 * This method is takes up a keyword and returns information of that keyword from specification snapshot
 * if the information exists. 
 * @param {String} text - the keyword after splitting the code line text with " "
 * @param {Number} currentLineNumber - the current active line number whose text is being processed
 * @param {Object} _specificationSnapshot - MusicBLocksv4 specification snapshot for getting syntax names.
 * @returns {Object} - returns syntax details of the keyword passed from specificatio snapshot.
 */
function getSyntaxDetails(text,currentLineNumber,_specificationSnapshot){

  let codeLines = tempCodeEditorCont.getElementsByClassName("line");
  let lineText = codeLines[currentLineNumber - 1].innerText.replaceAll(" ","");
  if(lineText[0] == "-"){
    lineText = lineText.slice(1,lineText.length);
  }
  let lineTextArr = lineText.split(":");
  if(_specificationSnapshot[lineTextArr[0]]){
    if(_specificationSnapshot[lineTextArr[0]]["type"].toLowerCase() == "data"){
      let activeLineText = codeLines[LineNumber-1].innerText;
      let loopingLineText = codeLines[currentLineNumber - 1].innerText;
      let activeLineTextSpaces = 0;
      let loopingLineTextSpaces = 0;
      let i = activeLineText.length;
      while (i--) {
        activeLineTextSpaces++;
      }
      i = loopingLineText.length;
      while (i--) {
        loopingLineTextSpaces++;
      }
      if(lineTextArr <= 1 && loopingLineTextSpaces < activeLineTextSpaces){
        SyntaxDetails = _specificationSnapshot[lineTextArr[0]];
      } else if(currentLineNumber > 1) {
        getSyntaxDetails(text,currentLineNumber-1,_specificationSnapshot);
      }
    } else {
      SyntaxDetails = _specificationSnapshot[lineTextArr[0]];
    }
    
  } else if(currentLineNumber > 1) {
    getSyntaxDetails(text,currentLineNumber-1,_specificationSnapshot);
  } else {
    SyntaxDetails = undefined;
  }
  return SyntaxDetails;
}

/**
 * This methods takes in the keyword and returns what color the needs to displayed in.
 * @param {String} text - the keyword after splitting the code line text with " "
 * @param {Object} _specificationSnapshot - MusicBLocksv4 specification snapshot for getting syntax names.
 * @returns {String} - returns colour for the keyword in Hex code. this color is assigned to the text.
 */
function getColorForText(text,_specificationSnapshot){
  let color = "";
  if(_specificationSnapshot[text]){
    SyntaxDetails = _specificationSnapshot[text];
    
    SyntaxDetails.type = SyntaxDetails.type.toLowerCase();
    SyntaxDetails.category = SyntaxDetails.category.toLowerCase();
    if(syntaxColorConfig[SyntaxDetails.type]){
      let syntaxType = syntaxColorConfig[SyntaxDetails.type];
      if(SyntaxDetails.type == "data"){
        color = syntaxType["name"];
      } else {
        color = syntaxType["color"];
      }

      if(syntaxType["categories"][SyntaxDetails.category]){
        let syntaxCategory = syntaxType["categories"][SyntaxDetails.category];
        if(SyntaxDetails.type == "data"){
          color = syntaxCategory["name"];
        } else {
          color = syntaxCategory["color"];
        }
      }
      
    }
  } else if(SyntaxDetails){
    SyntaxDetails.type = SyntaxDetails.type.toLowerCase();
    SyntaxDetails.category = SyntaxDetails.category.toLowerCase();
    if(syntaxColorConfig[SyntaxDetails.type]){
      let syntaxType = syntaxColorConfig[SyntaxDetails.type];
      if(SyntaxDetails.type == "data"){
        color = syntaxType["value"];
      } else {
        color = syntaxType["args"] ? syntaxType["args"]["value"] : color;
      }

      if(syntaxType["categories"][SyntaxDetails.category]){
        let syntaxCategory = syntaxType["categories"][SyntaxDetails.category];
        if(SyntaxDetails.type == "data"){
          color = syntaxCategory["value"];
        } else {
          color = syntaxCategory["args"] ? syntaxCategory["args"]["value"] : color;
        }
      }
      
    }
  } else {
    SyntaxDetails = getSyntaxDetails(text,LineNumber,_specificationSnapshot);
    if(SyntaxDetails){
      let codeLines = tempCodeEditorCont.getElementsByClassName("line");
      let lineText = codeLines[LineNumber - 1].innerText.replaceAll(" ","");
      if(lineText[0] == "-"){
        lineText = lineText.slice(1,lineText.length);
      }
      let lineTextArr = lineText.split(":");
      if(lineTextArr.length == 1){
        SyntaxDetails.type = SyntaxDetails.type.toLowerCase();
        SyntaxDetails.category = SyntaxDetails.category.toLowerCase();
        if(syntaxColorConfig[SyntaxDetails.type]){
          let syntaxType = syntaxColorConfig[SyntaxDetails.type];
          if(SyntaxDetails.type == "data"){
            color = syntaxType["value"];
          } else {
            color = syntaxType["args"] ? syntaxType["args"]["value"] : color;
          }
          if(syntaxType["categories"][SyntaxDetails.category]){
            let syntaxCategory = syntaxType["categories"][SyntaxDetails.category];
            if(SyntaxDetails.type == "data"){
              color = syntaxCategory["value"];
            } else {
              color = syntaxCategory["args"] ? syntaxCategory["args"]["value"] : color;
            }
          }
          
        }
      } else {
        if(text == lineTextArr[0]){
          SyntaxDetails.type = SyntaxDetails.type.toLowerCase();
          SyntaxDetails.category = SyntaxDetails.category.toLowerCase();
          if(syntaxColorConfig[SyntaxDetails.type]){
            let syntaxType = syntaxColorConfig[SyntaxDetails.type];
            if(SyntaxDetails.type == "data"){
              color = syntaxType["name"];
            } else {
              color = syntaxType["args"] ? syntaxType["args"]["name"] : color;
            }

            if(syntaxType["categories"][SyntaxDetails.category]){
              let syntaxCategory = syntaxType["categories"][SyntaxDetails.category];
              if(SyntaxDetails.type == "data"){
                color = syntaxCategory["name"];
              } else {
                color = syntaxCategory["args"] ? syntaxCategory["args"]["name"] : color;
              }
            }
            
          }
        } else {
          SyntaxDetails.type = SyntaxDetails.type.toLowerCase();
          SyntaxDetails.category = SyntaxDetails.category.toLowerCase();
          if(syntaxColorConfig[SyntaxDetails.type]){
            let syntaxType = syntaxColorConfig[SyntaxDetails.type];
            if(SyntaxDetails.type == "data"){
              color = syntaxType["value"];
            } else {
              color = syntaxType["args"] ? syntaxType["args"]["value"] : color;
            }
  
            if(syntaxType["categories"][SyntaxDetails.category]){
              let syntaxCategory = syntaxType["categories"][SyntaxDetails.category];
              if(SyntaxDetails.type == "data"){
                color = syntaxCategory["value"];
              } else {
                color = syntaxCategory["args"] ? syntaxCategory["args"]["value"] : color;
              }
            }
            
          }
        }
      }
    }
  }

  if(!color){
    return "#000000";
  } else {
    return color;
  }
}

/**
 * This method adds all the needed data of the param "t" keyword passed into the "TextData" array which at the time
 * of appending into the DOM can be used to get the data of evey keyword and append them into DOM accordingly.
 * @param {String} t  the keyword after splitting the code line text with " "
 * @param {Object} _specificationSnapshot - MusicBLocksv4 specification snapshot for getting syntax names.
 * @param {Boolean} toAddColon - this tells the future method whether or not to add the colon at the end of text
 * @param {Boolean} toAddSpace - this tells the future methods whether or not to add a " "(space) after the text.
 * @returns {String} - returns an span tag string with color inside style for the specified text, this is just for reference 
 *      and will not be appended to DOM because using innerHTML is not wise. 
 */
function  HighLightText(t,_specificationSnapshot,toAddColon,toAddSpace){
  if(!t){
    if(toAddColon){
      TextDataI = TextData[TextDataI] ? TextDataI + 1 : TextDataI;
      TextData[TextDataI] = {
        text: ":",
        addColon:false,
        span:true,
        color:"#000000",
        addSpace:toAddSpace
      };
    } else {
      TextDataI = TextData[TextDataI] ? TextDataI + 1 : TextDataI;
      
      TextData[TextDataI] = {
        text: "",
        addColon:false,
        span:true,
        color:"#000000",
        addSpace:toAddSpace
      };
    }
    return toAddColon ? ":" : "";
  }
  if(t[0] == "-"){
    t= t.slice(1,t.length);
    TextDataI = TextData[TextDataI] ? TextDataI + 1 : TextDataI;
    TextData[TextDataI] = {
      text: "-",
      addColon:false,
      span:true,
      color:"#000000",
      addSpace:false
    };
    t = "-" + HighLightText(t,_specificationSnapshot,false,true);
  } else {
    let TempTextArr = t.split(':');
    t="";
    if(TempTextArr[1] || TempTextArr.length > 2){
      let tempTextArrCounter = 0;
      while(tempTextArrCounter < TempTextArr.length -1 ){
        t += HighLightText(TempTextArr[tempTextArrCounter],_specificationSnapshot,true,false);
        tempTextArrCounter += 1;
      }
      t += HighLightText(TempTextArr[TempTextArr.length -1],_specificationSnapshot,false,true);
    } else {
      let textColor = getColorForText(TempTextArr[0],_specificationSnapshot);
      TextDataI = TextData[TextDataI] ? TextDataI + 1 : TextDataI;
      if(TempTextArr.length > 1){
        TextData[TextDataI] = {
          text: TempTextArr[0],
          addColon:true,
          span:true,
          color:textColor,
          addSpace:toAddSpace
        };
        t= `<span style="color:${textColor} ;">${TempTextArr[0]}</span>:`;
      } else if(toAddColon){
        TextData[TextDataI] = {
          text: TempTextArr[0],
          addColon:true,
          span:true,
          color:textColor,
          addSpace:toAddSpace
        };
        t= `<span style="color:${textColor} ;">${TempTextArr[0]}</span>:`;
      } else {
        TextData[TextDataI] = {
          text: TempTextArr[0],
          addColon:false,
          span:true,
          color:textColor,
          addSpace:toAddSpace
        };
        t= `<span style="color:${textColor} ;">${TempTextArr[0]}</span>`;
      }
    }
  }

  return t;
}

/**
 * This method generates all the needed data on every single keyword inside the active Text,
 * adds all the data into TextData array, and finally using the TextData appends the span tags into the DOM
 * achieving the syntax Highlighting. 
 * @param {HTMLCollection} codeLines - an array of codelines DIv in DOM.
 * @param {Object} _specificationSnapshot - MusicBLocksv4 specification snapshot for getting syntax names.
 * 
 * @Description - This basic concept is we split the line Text by " "(space) then treat every element as a keyword, then
 * further process every keyword to remove "-" and ":" and then when we get the actual keyword we search it in 
 * Specification snapshot of musicBlocksV4 and assign a color if the keyword is not found we go to previous line and keep
 * following the above procedure recursively until we find the color for every keyword. After assigning colors to every keyword 
 * we move on to Appending them all at once. 
 */
function highLightLineText(codeLines,_specificationSnapshot){
  let codeLineText = codeLines[LineNumber-1].innerText;
  let codeTextArray = codeLineText.split(" ");
  let HTMLText = "";
  TextData = [];
  TextDataI = 0;
  for(let i=0;i<codeTextArray.length;i++) {
    let t= codeTextArray[i];
    if(t && t != '-' && t != ':'){
      HTMLText += HighLightText(t,_specificationSnapshot,false,true) + " ";
    } else if(t == '-') {
      if(TextData[TextDataI] && TextData[TextDataI].span){
        TextDataI = TextDataI + 1;
      }
      if(TextData[TextDataI] && TextData[TextDataI].addSpace){
        TextData[TextDataI].text += " ";
      }
      TextData[TextDataI] = {
        text: TextData[TextDataI] && TextData[TextDataI].text ? TextData[TextDataI].text +"-"  : "-",
        addColon:false,
        span:false,
        color:"#000000",
        addSpace:true
      };
      HTMLText += "-" + " ";
    } else if(t == ':') {
      if(TextData[TextDataI] && TextData[TextDataI].span){
        TextDataI = TextDataI + 1;
      }
      if(TextData[TextDataI] && TextData[TextDataI].addSpace){
        TextData[TextDataI].text += " ";
      }
      TextData[TextDataI] = {
        text: TextData[TextDataI] && TextData[TextDataI].text ? TextData[TextDataI].text + ":"   : ":" ,
        addColon:false,
        span:false,
        color:"#000000",
        addSpace:true
      };
      HTMLText += ":" + " ";
    } else {
      if(TextData[TextDataI] && TextData[TextDataI].span){
        TextDataI = TextDataI + 1;
        
        // if the execution is in this else that means the text is null which means there is a space
        // after the previous text and because we are adding that space here we need to make addspace to
        //  false for previous textData to aviod duplicate spaces.
        if(TextData[TextDataI-1] && codeTextArray.length-1 == i ){
          TextData[TextDataI-1].addSpace = false ;
        }
      }
      
      
      TextData[TextDataI] = {
        text: TextData[TextDataI] && TextData[TextDataI].text ? TextData[TextDataI].text + " " : " ",
        addColon:false,
        span:false,
        color:"#000000",
        addSpace:false
      };
      HTMLText += " ";
    }
  }
  HTMLText = HTMLText.slice(0,HTMLText.length-1);
  TextData[TextData.length-1].addSpace = false;
  codeLines[LineNumber-1].getElementsByTagName('pre')[0].innerHTML = "";
  for(let i=0;i<TextData.length;i++){
    let t = TextData[i];
    if(t.span){
      if(t.addColon){
        let spanTag = document.createElement('span');
        spanTag.style = `color:${t.color} ;`;
        spanTag.innerText = t.text;
        codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag);
        if(i == TextData.length - 1){
          let spanTag1 = document.createElement('span');
          spanTag1.innerText = ":";
          codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag1);
        } else {
          if(t.addSpace){
            let spanTag1 = document.createElement('span');
            spanTag1.innerText = ": ";
            codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag1);
          } else {
            let spanTag1 = document.createElement('span');
            spanTag1.innerText = ":";
            codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag1);
          }
        }
        
      } else {
        let spanTag = document.createElement('span');
        spanTag.style = `color:${t.color} ;`;
        spanTag.innerText = t.text;
        codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag);
        if(t.addSpace){
          let spanTag1 = document.createElement('span');
          spanTag1.innerText = " ";
          codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag1);
        }
      }
    } else {
      if(!(i == TextData.length - 1)){
        if(t.addSpace){
          let spanTag1 = document.createElement('span');
          spanTag1.innerText = t.text + " ";
          codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag1);
        } else {
          let spanTag1 = document.createElement('span');
          spanTag1.innerText = t.text;
          codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag1);
        }
      } else {
        if(t.addSpace){
          let spanTag = document.createElement('span');
          spanTag.style = `color:${t.color} ;`;
          spanTag.innerText = t.text + " ";
          codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag);
        } else {
          let spanTag = document.createElement('span');
          spanTag.style = `color:${t.color} ;`;
          spanTag.innerText = t.text;
          codeLines[LineNumber-1].getElementsByTagName('pre')[0].appendChild(spanTag);
        }
        
      }
      
    }
  }

  
}

/**
 * This method runs everytime a custom event is triggered which changes the text of single line in code Editor,
 * this methods highlights the Text of the line that changed. 
 * @param {String} eventKey - the event Key name that has triggered this function.
 * @param {Object} _specificationSnapshot - MusicBLocksv4 specification snapshot for getting syntax names.
 * @param {*} syntaxColorConfigObj - the configuration file containing what colors to adds to keywords.
 */
export default function runSyntaxHighlighter(
  eventKey,
  _specificationSnapshot,
  syntaxColorConfigObj,
  ){
  syntaxColorConfig = syntaxColorConfigObj["colorConfig"];
  SyntaxDetails = "";
  tempCodeEditorCont = codeEditorCont;
  LineNumber = dataVariables.getLineNumber();
  TempConditionalVariables = conditionalVariables ? conditionalVariables : undefined;
  TempDataVariable = dataVariables;
  let codeLines = codeEditorCont.getElementsByClassName("line");
  if(eventKey == "Space" || eventKey == "BackSpace" || eventKey == "Delete" || eventKey == "Input" || eventKey == "TextSelection"){
    
    highLightLineText(codeLines,_specificationSnapshot);

    if(TempConditionalVariables && TempConditionalVariables.getDrag()){
      let lineEnd = TempDataVariable.getLineEnd();
      let selectedText = lineEnd.line && codeLines[lineEnd.line-1]
            .innerText.slice(lineEnd.char,codeLines[lineEnd.line-1].innerText.length);
    }
    // codeLines[dataVariables.getLineNumber()-1].getElementsByTagName('pre')[0].innerHTML = HTMLText;
  } else if(eventKey == "Enter"){
    // highlight previous line
    LineNumber = LineNumber - 1;

    highLightLineText(codeLines, _specificationSnapshot);
    // highlight current line
    LineNumber = LineNumber + 1;

    highLightLineText(codeLines, _specificationSnapshot);
  }

}

/**
 * This method runs everytime a custom event is triggered which changes the text of multiple line in code Editor,
 * this methods highlights the Text of all the lines. 
 * @param {String} eventKey - the event Key name that has triggered this function.
 * @param {Object} _specificationSnapshot - MusicBLocksv4 specification snapshot for getting syntax names.
 * @param {*} syntaxColorConfigObj - the configuration file containing what colors to adds to keywords.
 */
export function runSyntaxHighlighterOnAllLines(
    _specificationSnapshot,syntaxColorConfigObj
  ){
  syntaxColorConfig = syntaxColorConfigObj["colorConfig"];
  tempCodeEditorCont = codeEditorCont;
  LineNumber = 1;
  let codeLines = codeEditorCont.getElementsByClassName("line");
  while(codeLines.length >= LineNumber){
    SyntaxDetails = "";
    highLightLineText(codeLines,_specificationSnapshot);
    LineNumber = LineNumber + 1;
  }
  
}