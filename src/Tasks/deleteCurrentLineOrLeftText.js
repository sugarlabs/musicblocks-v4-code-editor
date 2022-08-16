import focusOnCursor from "./focusOnCursor";
import removeLine from "./removeLine";
import removeSelected from "./removeSelected";
import storeCurrentState from "./storeCurrentState";
import { codeEditorCont, conditionalVariables, dataVariables } from "../store";

/**
 * This methods runs when backspace key is triggered intending to remove the text left to it, this method
 * also removes the line if the cursor reached the beginning of the line.
 * @returns {undefined} - nothing
 * @function cursorNavigationUp
 */
export default function deleteCurrentLineOrLeftText(){
  let drag = conditionalVariables.getDrag();
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();

  textSelectionInProgress = false;
  conditionalVariables.setTextSelectionInProgress(false);

  let codeLines = codeEditorCont.getElementsByClassName("line");
  if(lineNumber > codeLines.length){
    lineNumber = dataVariables.setLineNumber(codeLines.length);
  }

  let activeline = codeEditorCont.getElementsByClassName("text")[lineNumber - 1];
  let textVal = activeline.innerText;
  // drag true means there is some text selected and we need to remove those selected
  // text when backspace is triggered.
  if(drag){
    removeSelected("");
    lineNumber = dataVariables.getLineNumber();
    charNumber = dataVariables.getCharNumber();
    textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
    drag = false;
    conditionalVariables.setDrag(false);
  } else {
    // Removing the number line number and line along with text
    if(charNumber == 0 && lineNumber != 1){
      storeCurrentState();
      removeLine(lineNumber);
      lineNumber = dataVariables.getLineNumber();
      charNumber = dataVariables.getCharNumber();
      textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
      // moving the cursor up  and left
      lineNumber = lineNumber - 1;
      dataVariables.setLineNumber(lineNumber);
      let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
      activeline = codeEditorCont.getElementsByClassName("text")[lineNumber-1];
      cursor.style.top = (lineNumber-1)*lineHeight  + "px";
      cursor.style.left = (activeline.innerText.length)*charSize + numberLineWidth  + "px";
      charNumber = activeline.innerText.length;
      dataVariables.setCharNumber(charNumber);

      //adding any text the deleted line had into current active line

      let preTag = document.createElement('pre');
      preTag.innerText = activeline.innerText.slice(0,activeline.innerText.length) + textVal;
      activeline.innerHTML = "";
      activeline.appendChild(preTag);

    }
    else {
      if(charNumber ==0){
          return;
      }
      // removing text from left side
      let preTag = document.createElement('pre');
      preTag.innerText = textVal.slice(0,charNumber-1) + textVal.slice(charNumber);
      activeline.innerHTML = "";
      activeline.appendChild(preTag);
      // moving the cursor left
      let cursor = document.getElementsByClassName('code_editor_cursor')[0];
      cursor.style.left = (charNumber-1)*charSize + numberLineWidth  + "px";
      charNumber = charNumber-1;
      dataVariables.setCharNumber(charNumber);
    }
  }
  focusOnCursor();
  
}