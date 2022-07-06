import focusOnCursor from "./focusOnCursor";
import SelectTextByMouse from "./selectTextByMouse";

export default function cursorNavigationSelectLeft(codeEditorCont,dataVariables,conditionalVariables){

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
  let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  if(!textSelectionInProgress){
      lineStart=dataVariables.setLineStart({
          line : lineNumber,
          char:charNumber
      })
      lineEnd=dataVariables.setLineEnd({
          line : lineNumber,
          char:charNumber
      })
      textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(true);
  }
  
  if(charNumber > 0){
      charNumber = dataVariables.setCharNumber(charNumber - 1);
      lineEnd.char = charNumber ;
      dataVariables.setLineEnd(lineEnd);
      cursor.style.left = (charNumber-1)*charSize + numberLineWidth  + "px";
  } else if(charNumber == 0 && lineNumber != 1){
      if(codeLines[lineNumber-2].innerText == "\u200B"){
          charNumber = dataVariables.setCharNumber(0);
          lineEnd.char = 1;
          dataVariables.setLineEnd(lineEnd);
      } else {
          charNumber = dataVariables.setCharNumber(codeLines[lineNumber-2].innerText.length) ;
          lineEnd.char = codeLines[lineNumber-2].innerText.length;
          dataVariables.setLineEnd(lineEnd);
      }        
      lineNumber = dataVariables.setLineNumber(lineNumber - 1);
      lineEnd.line = lineEnd.line - 1;
      dataVariables.setLineEnd(lineEnd);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      cursor.style.top = (lineNumber)*lineHeight +"px";
  }
  drag = conditionalVariables.setDrag(true);
  focusOnCursor(conditionalVariables,dataVariables);
  SelectTextByMouse(codeEditorCont,dataVariables,conditionalVariables);
}