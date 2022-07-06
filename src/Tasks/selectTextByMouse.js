import deselectText from "./deselectText";
import focusOnCursor from "./focusOnCursor";

export default function SelectTextByMouse(codeEditorCont,dataVariables,conditionalVariables){
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let lineStart = dataVariables.getLineStart();
  let lineEnd = dataVariables.getLineEnd();

  //console.log("selecting",lineStart,lineEnd)
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  // remove selected text if any
  deselectText(codeEditorCont);

  // user dragging or moving cursor from bottom to top
  if(lineStart.line > lineEnd.line){

      if(lineStart.line <= 0){
          lineStart.line = 1;
      } 
      if(lineStart.char > codeLines[lineStart.line - 1].innerText.length){
          lineStart.char = codeLines[lineStart.line - 1].innerText.length;
      }
      //console.log(lineEnd,lineStart)
      // add the span tag around the text being selected.
      if(lineEnd.char < 0){
          lineEnd.char = 0;
      }
      if(codeLines[lineEnd.line - 1].innerText.length >= lineEnd.char && lineEnd.char >= 0){
          
          codeLines[lineEnd.line - 1].childNodes[0].innerHTML = "<pre>" + codeLines[lineEnd.line - 1].innerText.slice(0,lineEnd.char) +
                   "<span class='background_selected_text'>" + codeLines[lineEnd.line - 1].innerText.slice(lineEnd.char,codeLines[lineEnd.line - 1].innerText.length) 
                   +"</span>"  + "</pre>"
      }
     
      if(codeLines[lineStart.line - 1].innerText.length >= lineStart.char){
          codeLines[lineStart.line - 1].childNodes[0].innerHTML = "<pre>" + "<span class='background_selected_text'>" + codeLines[lineStart.line - 1].innerText.slice(0,lineStart.char) 
          + "</span>" + codeLines[lineStart.line - 1].innerText.slice(lineStart.char,codeLines[lineStart.line - 1].innerText.length) + "</pre>";
      } else{
          codeLines[lineStart.line - 1].childNodes[0].innerHTML = "<pre>" + "<span class='background_selected_text'>" + codeLines[lineStart.line - 1].innerText + "</span>" + "</pre>";
      }

      for(let i = lineEnd.line + 1; i< lineStart.line; i++){
          codeLines[i-1].childNodes[0].childNodes[0].classList.add("background_selected_text");
      }
  
      
      lineNumber = lineEnd.line > codeLines.length ? codeLines.length : lineEnd.line;
      charNumber = lineEnd.char > codeLines[lineNumber - 1].innerText.length ? codeLines[lineNumber - 1].innerText.length : lineEnd.char ;
      dataVariables.setLineNumber(lineNumber);
      dataVariables.setCharNumber(charNumber);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      cursor.style.top = (lineNumber-1)*lineHeight  + "px";
  }
  else if(lineStart.line < lineEnd.line) {
      // add the span tag around the text being selected.
      if(lineEnd.line > codeLines.length){
          lineEnd.line = codeLines.length;
      }
      if(lineEnd.char > codeLines[lineEnd.line - 1].innerText.length){
          lineEnd.char = codeLines[lineEnd.line - 1].innerText.length;
      }
      if(lineStart.char < 0){
          lineStart.char = 0;
      }
      
      if(codeLines[lineStart.line - 1].innerText.length >= lineStart.char && lineStart.char >= 0){
          
          codeLines[lineStart.line - 1].childNodes[0].innerHTML = "<pre>" + codeLines[lineStart.line - 1].innerText.slice(0,lineStart.char) +
                   "<span class='background_selected_text'>" + codeLines[lineStart.line - 1].innerText.slice(lineStart.char,codeLines[lineStart.line - 1].innerText.length) 
                   +"</span>"  + "</pre>";
      }

      if(codeLines[lineEnd.line - 1].innerText.length >= lineEnd.char){
          codeLines[lineEnd.line - 1].childNodes[0].innerHTML = "<pre>" + "<span class='background_selected_text'>" + codeLines[lineEnd.line - 1].innerText.slice(0,lineEnd.char) 
          + "</span>" + codeLines[lineEnd.line - 1].innerText.slice(lineEnd.char,codeLines[lineEnd.line - 1].innerText.length) + "</pre>";
      } else{
          codeLines[lineEnd.line - 1].childNodes[0].innerHTML = "<pre>" + "<span class='background_selected_text'>" + codeLines[lineEnd.line - 1].innerText + "</span>" + "</pre>";
      }

      for(let i = lineStart.line + 1; i< lineEnd.line; i++){
          codeLines[i-1].childNodes[0].childNodes[0].classList.add("background_selected_text");
      }
      lineNumber = lineEnd.line > codeLines.length ? codeLines.length : lineEnd.line; 
      charNumber = lineEnd.char > codeLines[lineNumber - 1].innerText.length ? codeLines[lineNumber - 1].innerText.length : lineEnd.char;
      dataVariables.setLineNumber(lineNumber);
      dataVariables.setCharNumber(charNumber);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      cursor.style.top = (lineNumber-1)*lineHeight  + "px";
  } 
  else if(lineStart.line == lineEnd.line){
      if(lineStart.line > codeLines.length){
          lineStart.line = codeLines.length;
          lineEnd.line = codeLines.length;
      }

      if(lineEnd.char < 0 ){
          lineEnd.char = 0;
      } 
      if(lineStart.char < 0){
          lineStart.char = 0;
      }
      let frontCharNum = lineEnd.char > lineStart.char ? lineStart.char : lineEnd.char;
      let endCharNum = lineEnd.char > lineStart.char ? lineEnd.char : lineStart.char;

      let frontNonSpanText = codeLines[lineEnd.line - 1].childNodes[0].innerText.slice(0,frontCharNum);
      let insideSpanText = codeLines[lineEnd.line - 1].childNodes[0].innerText.slice(frontCharNum,endCharNum);
      let endNonSpanText = codeLines[lineEnd.line - 1].childNodes[0].innerText.slice(endCharNum,codeLines[lineEnd.line - 1].childNodes[0].innerText.length);
      codeLines[lineEnd.line - 1].childNodes[0].innerHTML = "<pre>" + frontNonSpanText +"<span class='background_selected_text'>" + insideSpanText + "</span>" + endNonSpanText + "</pre>" ;

      lineNumber = lineEnd.line > codeLines.length ? codeLines.length : lineEnd.line; 
      charNumber = lineEnd.char > codeLines[lineNumber - 1].innerText.length ? codeLines[lineNumber - 1].innerText.length : lineEnd.char ;
      dataVariables.setLineNumber(lineNumber);
      dataVariables.setCharNumber(charNumber);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      cursor.style.top = (lineNumber-1)*lineHeight  + "px";
  }

  dataVariables.setLineEnd(lineEnd);
  dataVariables.setLineStart(lineStart);
  let input = codeEditorCont.querySelector('#code-editor-cursor-input');
  input.focus();
  focusOnCursor(codeEditorCont, dataVariables);
  conditionalVariables.setTextSelectionInProgress(true);
}