import focusOnCursor from "./focusOnCursor";
import removeSelected from "./removeSelected";
import { codeEditorCont, dataVariables, conditionalVariables, arrayVariables } from "../store";

/**
 * This method runs when an input is triggered inside codeEditor, it Checks the input data and
 * and adds that into DOM in position specified by line NUmber and Char number.
 * @param {Event} e - keyDOwn event data for input in codeEditor.
 * @function handleInputChange
 */
export default function handleInputChange(e){
  e.preventDefault();
  const InputEvent = new CustomEvent("InputTriggered",{detail:{data:e.data}});
  let textInputBox = codeEditorCont.querySelector('#code-editor-cursor-input');
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let drag = conditionalVariables.getDrag();
  let charNumber = dataVariables.getCharNumber();
  let lineNumber = dataVariables.getLineNumber();
  let charSize = dataVariables.getCharSize();
  let numberLineWidth = dataVariables.getNumberLineWidth();

  textSelectionInProgress = false;
  conditionalVariables.setTextSelectionInProgress(false);
  // //console.log(drag,e.data);
  // if drag is true that means user has selected some text so we need to replace the 
  // selected text with the input Character.
  if(drag){
      if(e.data.length){
        removeSelected(e.data);
        lineNumber = dataVariables.getLineNumber();
        charNumber = dataVariables.getCharNumber();
        textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
        textInputBox.dispatchEvent(InputEvent);
      } else {
        removeSelected("");
        lineNumber = dataVariables.getLineNumber();
        charNumber = dataVariables.getCharNumber();
        textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
      }
      drag = false;
      conditionalVariables.setDrag(false);
      e.target.value = "";
  } else {
      let activeline = codeEditorCont.getElementsByClassName("text")[lineNumber - 1];
      let textVal = activeline.innerText;
      if((e.data.length)){
        // remove ZeroWhiteSpace and add the text.
        if(textVal == "\u200B"){
            let preTag = document.createElement('pre');
            preTag.innerText = e.data;
            activeline.innerHTML = "";
            activeline.appendChild(preTag);
        } else{
            let preTag = document.createElement('pre');
            preTag.innerText = `${textVal.slice(0,charNumber)}${e.data}${textVal.slice(charNumber)}`;
            console.log(preTag);
            activeline.innerHTML = "";
            activeline.appendChild(preTag);
        }
        
        charNumber = charNumber + 1;
        dataVariables.setCharNumber(charNumber);
        textInputBox.dispatchEvent(InputEvent);
      }
      
      let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
      if(charNumber > activeline.innerText.length){
          cursor.style.left = (activeline.innerText.length)*charSize + numberLineWidth  + "px";
      } else {
          cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      }
      e.target.value = "";
  }
  focusOnCursor();
  
}