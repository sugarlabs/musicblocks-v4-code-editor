import { codeEditorCont } from "../store";

/**
 * This methods loops through all the lines inside code editor which are seleced makes a proper string and
 * adds it to the users clipboard.
 * @param {HTMLDivElement} codeEditorCont - the codeEditor div which contains all the code Editor Elements
 * @function copySelectedText
 */
export default async function copySelectedText(){
  let selectedLines = codeEditorCont.getElementsByClassName("background_selected_text");
  let textToBeCopied = "";
  for(let i =0; i<selectedLines.length;i++){
    // because we added zero width spaces while create a new line , to make selection of text
    // on an empty line have some way of knowing that there exists and empty line, which just means we
    // need to add "/n" and as soon as we type something on an empty line the zeroWidth space gets removed.
    // so if ZeroWidthSpace exists that means it's definetly a empty line.
    if(selectedLines[i].innerText == "\u200B"){
      textToBeCopied +=  "\n" ;
    } else{
      textToBeCopied +=  selectedLines[i].innerText + "\n" ;
    }
  }
  //console.log(textToBeCopied);
  await navigator.clipboard.writeText(textToBeCopied);
}


