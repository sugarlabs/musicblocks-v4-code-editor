import { codeEditorCont } from "../store";

/**
 * This method loops through the code Lines and generates a String of all the code Lines
 * and returns it.
 * @returns {String} - returns the code written inside code Editor as String
 * @function getWrittenCode
 */
export default function getWrittenCode(){

  let allLines = codeEditorCont.getElementsByClassName("line");
  let codeTosend = "";
  for(let i =0; i<allLines.length;i++){
    if(allLines[i].innerText == "\u200B"){
      codeTosend +=  "\n" ;
    } else{
      codeTosend +=  allLines[i].innerText + "\n" ;
    }
  }
  
  return codeTosend;
}