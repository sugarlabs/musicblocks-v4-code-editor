import deselectText from "./deselectText";
import focusOnCursor from "./focusOnCursor";
import { codeEditorCont, dataVariables, conditionalVariables } from "../store";

/**
 * This methods runs when the events for making the cursor go up is triggered and makes
 * the cursor go up and move left or right automatically depending on the scenario.
 * @function cursorNavigationUp
 */
export default function cursorNavigationUp(){
  const TextDeselectEvent = new Event("TextDeselect");
  deselectText(codeEditorCont);
  conditionalVariables.setDrag(false);
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();

  if(lineNumber != 1){
      let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
      cursor.style.top = (lineNumber - 2)*lineHeight +"px";
      lineNumber = dataVariables.setLineNumber(lineNumber - 1);
      if(charNumber > codeLines[lineNumber-1].innerText.length ){
          // if innerText is ZeroWidthSpace then cursor should be at the beginning
          if(codeLines[lineNumber-1].innerText == "\u200B"){
              charNumber = dataVariables.setCharNumber(0);
              cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
          } else {
              charNumber = dataVariables.setCharNumber(codeLines[lineNumber-1].innerText.length) ;
              cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
          }
         
      }
  }
  codeEditorCont.dispatchEvent(TextDeselectEvent);
  textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(false);
  focusOnCursor();
}