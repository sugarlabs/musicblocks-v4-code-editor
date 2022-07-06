import focusOnCursor from "./focusOnCursor";
import SelectTextByMouse from "./selectTextByMouse";

export default function cursorNavigationSelectUp(codeEditorCont,dataVariables,conditionalVariables){
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let drag = conditionalVariables.getDrag();
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let lineEnd = dataVariables.getLineEnd();
  let lineStart = dataVariables.getLineStart();
  
  if(lineNumber != 1){
      let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
      cursor.style.top = (lineNumber - 2)*lineHeight +"px";
      if(textSelectionInProgress){
        lineEnd.line = lineEnd.line - 1
        dataVariables.setLineEnd(lineEnd);
      } else {
        lineStart=dataVariables.setLineStart({
          line : lineNumber,
          char:charNumber 
        });
        lineEnd=dataVariables.setLineEnd({
          line : lineNumber - 1,
          char:charNumber 
        });
        textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(true);
      }
      lineNumber = dataVariables.setLineNumber(lineNumber - 1);
      if(charNumber > codeLines[lineNumber-1].innerText.length ){
        // if innerText is ZeroWidthSpace then cursor should be at the beginning
        if(codeLines[lineNumber-1].innerText == "\u200B"){
          charNumber = dataVariables.setCharNumber(0);
          lineEnd.char = 0;
          dataVariables.setLineEnd(lineEnd);
          cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
        } else {
          charNumber = dataVariables.setCharNumber(codeLines[lineNumber-1].innerText.length);
          lineEnd.char = codeLines[lineNumber-1].innerText.length ;
          dataVariables.setLineEnd(lineEnd);
          cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
        }
      }
      drag = conditionalVariables.setDrag(true);
      focusOnCursor(codeEditorCont,dataVariables);
      SelectTextByMouse(codeEditorCont,dataVariables,conditionalVariables);
  }
  
}