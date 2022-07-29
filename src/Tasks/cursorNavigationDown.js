import deselectText from "./deselectText";
import focusOnCursor from "./focusOnCursor";
import { codeEditorCont, dataVariables, conditionalVariables } from "../store";
/**
 * This methods runs when the events for making the cursor go down is triggered and makes
 * the cursor go down and move left or right automatically as per requirement.
 * @function cursorNavigationDown
 */
export default function cursorNavigationDown(){
  const TextDeselectEvent = new Event("TextDeselect");
  deselectText();
  conditionalVariables.setDrag(false);
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();

  textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(false);
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let numberLines = codeEditorCont.getElementsByClassName('number_line');
  if(lineNumber < numberLines.length -1){
      let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
      cursor.style.top = (lineNumber)*lineHeight +"px";
      
      if(lineNumber < codeLines.length && charNumber > codeLines[lineNumber].innerText.length ){
          // if innerText is ZeroWidthSpace then cursor should be at the beginning
          if(codeLines[lineNumber-1].innerText == "\u200B"){
              charNumber = dataVariables.setCharNumber(0);
              cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
          } else {
              charNumber = dataVariables.setCharNumber(codeLines[lineNumber].innerText.length);
              cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
          }
      }
      lineNumber = dataVariables.setLineNumber(lineNumber + 1);
  }
  codeEditorCont.dispatchEvent(TextDeselectEvent);
  focusOnCursor();
}