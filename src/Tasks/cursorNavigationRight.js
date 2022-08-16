import deselectText from "./deselectText";
import focusOnCursor from "./focusOnCursor";
import { codeEditorCont, dataVariables, conditionalVariables } from "../store";
/**
 * This methods runs when the events for making the cursor go right is triggered and makes
 * the cursor go right and move down if the cursor reached the end of text.
 * @function cursorNavigationLeft
 */
export default function cursorNavigationRight(){
  const TextDeselectEvent = new Event("TextDeselect");
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  console.log(charNumber);
  deselectText();
  conditionalVariables.setDrag(false);
  textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(false);
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  if(charNumber < codeLines[lineNumber-1].innerText.length){
      if(codeLines[lineNumber-1].innerText == "\u200B" && lineNumber != codeLines.length) {
          charNumber = dataVariables.setCharNumber(0);
          lineNumber = dataVariables.setLineNumber(lineNumber + 1);
          cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
          cursor.style.top = (lineNumber)*lineHeight +"px";
      } else {
          charNumber = dataVariables.setCharNumber(charNumber + 1);
          cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      }
     
  } else if(charNumber == codeLines[lineNumber-1].innerText.length &&
     lineNumber != codeLines.length){
    charNumber = dataVariables.setCharNumber(0);
    lineNumber = dataVariables.setLineNumber(lineNumber + 1);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      cursor.style.top = (lineNumber-1)*lineHeight +"px";
  }
  codeEditorCont.dispatchEvent(TextDeselectEvent);
  focusOnCursor(codeEditorCont,dataVariables);
}