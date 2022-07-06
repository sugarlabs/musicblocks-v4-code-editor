import deselectText from "./deselectText";
import focusOnCursor from "./focusOnCursor";

export default function cursorNavigationRight(codeEditorCont,dataVariables,conditionalVariables){
 
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();

  deselectText(codeEditorCont);
  conditionalVariables.setDrag(false);
  textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(false)
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
     
  } else if(charNumber == codeLines[lineNumber-1].innerText.length && lineNumber != codeLines.length){
    charNumber = dataVariables.setCharNumber(0);
    lineNumber = dataVariables.setLineNumber(lineNumber + 1);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      cursor.style.top = (lineNumber-1)*lineHeight +"px";
  }
  focusOnCursor(codeEditorCont,dataVariables);
}