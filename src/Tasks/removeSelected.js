import removeLine from "./removeLine";
import storeCurrentState from "./storeCurrentState";

export default function removeSelected(ReplaceChar,dataVariables,conditionalVariables,codeEditorCont,arrayVariables){
  //console.log(lineStart,lineEnd)let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let lineStart = dataVariables.getLineStart();
  let lineEnd = dataVariables.getLineEnd();
  let lineNumber = dataVariables.getLineNumber();

  storeCurrentState(codeEditorCont,dataVariables,arrayVariables);
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let topLineInSelected = lineStart.line > lineEnd.line ?
       lineEnd : (lineStart.line == lineEnd.line ? (lineStart.char > lineEnd.char ? lineEnd : lineStart) : lineStart);
  let bottomLineInSelected =  lineStart.line > lineEnd.line ? 
       lineStart :(lineStart.line == lineEnd.line ? (lineStart.char > lineEnd.char ? lineStart : lineEnd) : lineEnd)  ;

  if(bottomLineInSelected.line > codeLines.length){
      bottomLineInSelected.line = codeLines.length;
  }
  if(topLineInSelected.line <= 0){
      topLineInSelected.line = 1;
  }
  if(topLineInSelected.char < 0){
      topLineInSelected.char = 0;
  }
  if(bottomLineInSelected.char > codeLines[bottomLineInSelected.line-1].innerText.length+1){
      bottomLineInSelected.char = codeLines[bottomLineInSelected.line-1].innerText.length+1;
  }
  //console.log("removing",bottomLineInSelected,topLineInSelected)

  if(codeLines[bottomLineInSelected.line - 1].innerText.length < bottomLineInSelected.char){
      bottomLineInSelected.char = codeLines[bottomLineInSelected.line - 1].innerText.length;
  } else if(topLineInSelected.char < 0){
      topLineInSelected.char = 0;
  }

  let bottomLineUnSelectedText = codeLines[bottomLineInSelected.line - 1].innerText.slice(bottomLineInSelected.char, codeLines[bottomLineInSelected.line - 1].innerText.length);
  let topLineUnselectedText = codeLines[topLineInSelected.line - 1].innerText.slice(0,topLineInSelected.char);
  // //console.log(bottomLineUnSelectedText,topLineUnselectedText)
  codeLines[topLineInSelected.line -1].childNodes[0].innerHTML = "<pre>" + topLineUnselectedText + ReplaceChar + bottomLineUnSelectedText + "</pre>";

  let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  
  charNumber = topLineInSelected.char > codeLines[topLineInSelected.line -1].childNodes[0].innerText.length
      ? codeLines[topLineInSelected.line -1].childNodes[0].innerText.length + 1 : topLineInSelected.char  + ReplaceChar.length;
  lineNumber = topLineInSelected.line;
  dataVariables.setCharNumber(charNumber);
  dataVariables.setLineNumber(lineNumber);
  cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
  cursor.style.top = (lineNumber-1)*lineHeight  + "px";

  // for(let i = topLineInSelected.line + 1; i<= bottomLineInSelected.line; i++){
  //     // //console.log(i);
  //     removeLine(i);
  // }
  let numberOfLines = bottomLineInSelected.line - topLineInSelected.line;
  while(numberOfLines > 0){
      removeLine(topLineInSelected.line+1,codeEditorCont);
      numberOfLines = numberOfLines -1 ;
  }
  let input = codeEditorCont.querySelector('#code-editor-cursor-input');
  input.focus();
  conditionalVariables.setTextSelectionInProgress(false);
}