import deselectText from "./deselectText";
import focusOnCursor from "./focusOnCursor";
import { codeEditorCont, dataVariables, conditionalVariables } from "../store";

/**
 * This methods runs when the events for making the cursor go left is triggered and makes
 * the cursor go left and move up if the cursor reached the beginning of text.
 * @function cursorNavigationLeft
 */
export default function cursorNavigationLeft(){
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
  
  if(charNumber > 0){
      charNumber = dataVariables.setCharNumber(charNumber - 1);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
  } else if(charNumber == 0 && lineNumber != 1){
      if(codeLines[lineNumber-2].innerText == "\u200B"){
          charNumber = dataVariables.setCharNumber(0);

      } else {
          charNumber = dataVariables.setCharNumber(codeLines[lineNumber-2].innerText.length);
      }
      lineNumber = dataVariables.setLineNumber(lineNumber - 1);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      cursor.style.top = (lineNumber-1)*lineHeight +"px";
  }
  codeEditorCont.dispatchEvent(TextDeselectEvent);
  focusOnCursor(codeEditorCont,dataVariables);
  
  
}