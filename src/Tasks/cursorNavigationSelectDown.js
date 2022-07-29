import focusOnCursor from "./focusOnCursor";
import SelectTextByMouse from "./selectTextByMouse";
import { codeEditorCont, dataVariables, conditionalVariables } from "../store";

/**
 * This methods runs when the events for making the cursor go down along with Shift key is triggered and makes
 * the cursor go down selecting the text upwards of it and move left or right automatically depending on few 
 * scenarios.
 * @function cursorNavigationSelectDown
 */
export default function cursorNavigationSelectDown(){
    
  let drag = conditionalVariables.getDrag();
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let lineEnd = dataVariables.getLineEnd();
  let lineStart = dataVariables.getLineStart();

  let codeLines = codeEditorCont.getElementsByClassName("line");
  let numberLines = codeEditorCont.getElementsByClassName('number_line');

  if(lineNumber < numberLines.length -1){
      
      let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
      cursor.style.top = (lineNumber)*lineHeight +"px";
      if(textSelectionInProgress){
          lineEnd.line = lineEnd.line + 1;
          dataVariables.setLineEnd(lineEnd);
      } else {
          lineStart=dataVariables.setLineStart({
              line : lineNumber,
              char:charNumber
          });
          lineEnd=dataVariables.setLineEnd({
              line : lineNumber + 1,
              char:charNumber
          });
          textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(true);
      }
      if(lineNumber < codeLines.length && charNumber > codeLines[lineNumber].innerText.length ){
          // if innerText is ZeroWidthSpace then cursor should be at the beginning
          if(codeLines[lineNumber].innerText == "\u200B"){
              charNumber = dataVariables.setCharNumber(0);
              lineEnd.char = 0;
              dataVariables.setLineEnd(lineEnd);
              cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
          } else {
              charNumber = dataVariables.setCharNumber(codeLines[lineNumber].innerText.length);
              lineEnd.char = codeLines[lineNumber].innerText.length;
              dataVariables.setLineEnd(lineEnd);
              cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
          }
      }
      lineNumber = dataVariables.setLineNumber(lineNumber + 1);
      drag = conditionalVariables.setDrag(true);
      focusOnCursor();
      SelectTextByMouse();
  }
  
}