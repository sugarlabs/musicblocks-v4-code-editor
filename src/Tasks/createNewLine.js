import focusOnCursor from "./focusOnCursor";
import removeSelected from "./removeSelected";
import storeCurrentState from "./storeCurrentState";
import { codeEditorCont,conditionalVariables, dataVariables, arrayVariables } from "../store";

/**
 * This methods creates a new line when Enter is triggered on input.
 * @function createNewLine
 */
export default function createNewLine(){
  let drag = conditionalVariables.getDrag();
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let lineStart = dataVariables.getLineStart();
  let lineEnd = dataVariables.getLineEnd();

  // stroe the current code Editor state to make undo and redo possible.
  storeCurrentState();
  textSelectionInProgress = false;
  conditionalVariables.setTextSelectionInProgress(false);
  // if drag is true that means the user has selected some text, so when enter is triggered we need to 
  // remove the selected text and then create a new line.
  if(drag){
    let codeLines = codeEditorCont.getElementsByClassName("line");

    let topLineInSelected = lineStart.line > lineEnd.line ?
      lineEnd : (lineStart.line == lineEnd.line ?
        (lineStart.char > lineEnd.char ? lineEnd : lineStart) : lineStart);
    let bottomLineInSelected =  lineStart.line > lineEnd.line ?
        lineStart :(lineStart.line == lineEnd.line ?
          (lineStart.char > lineEnd.char ? lineStart : lineEnd) : lineEnd)  ;

    if(bottomLineInSelected.line > codeLines.length){
        bottomLineInSelected.line = codeLines.length;
    }
    if(topLineInSelected.line < 1){
        topLineInSelected.line = 1;
    }
    
    let activeline = codeEditorCont.getElementsByClassName("text")[topLineInSelected.line - 1];
    let textVal = activeline.innerText;
    
    

    // create a new number in number line
    let numberLineCont = codeEditorCont.getElementsByClassName('number_line_cont')[0];
    let numberLines = codeEditorCont.getElementsByClassName('number_line');
    let numberLine = document.createElement('div');
    numberLine.classList.add("number_line");
    let numberLineP = document.createElement('pre');
    // because the number in HTML starts from 0. we just make the next line value to length
    numberLineP.innerText = numberLines.length;
    numberLine.append(numberLineP);
    numberLineCont.appendChild(numberLine);
    
    removeSelected("");
    lineNumber = dataVariables.getLineNumber();
    charNumber = dataVariables.getCharNumber();
    textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();

    // creating new text line
    let codeLineDiv = document.createElement('div');
    codeLineDiv.classList.add('line');
    let codeTextDiv = document.createElement('div');
    codeTextDiv.classList.add("text");
    let codeTextP = document.createElement('pre');
    console.log(codeLines[lineNumber - 1],lineNumber);
    codeTextP.innerText =  codeLines[lineNumber - 1].innerText.slice(charNumber);

    codeTextDiv.append(codeTextP);
    codeLineDiv.append(codeTextDiv);

    let codeLinesCont = codeEditorCont.getElementsByClassName('code_editor_lines_container')[0];

    codeLinesCont.insertBefore(codeLineDiv,codeLines[lineNumber]);
    
    lineNumber = lineNumber + 1;
    dataVariables.setLineNumber(lineNumber);
    // change cursor position
    let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
    //console.log(lineNumber,(lineNumber-1)*lineHeight)
    cursor.style.top = (lineNumber-1)*lineHeight  + "px";
    cursor.style.left = numberLineWidth  + "px";
    charNumber = 0;
    dataVariables.setCharNumber(charNumber);

    if(textVal.slice(0,topLineInSelected.char)){
        //console.log(textVal.slice(0,topLineInSelected.char))
        let preTag = document.createElement('pre');
        preTag.innerText = textVal.slice(0,topLineInSelected.char);
        activeline.innerHTML = "";
        activeline.appendChild(preTag);
    } else {
      let preTag = document.createElement('pre');
      preTag.innerHTML = "&#8203;";
      activeline.innerHTML = "";
      activeline.appendChild(preTag);
    }
    focusOnCursor();

    drag=false;
    conditionalVariables.setDrag(false);
  } else {
    // removing any text that was to the right of cursor after enter was pressed.
    let activeline = codeEditorCont.getElementsByClassName("text")[lineNumber - 1];
    let textVal = activeline.innerText;
    if(textVal.slice(0,charNumber)){
      let preTag = document.createElement('pre');
      preTag.innerText = textVal.slice(0,charNumber);
      activeline.innerHTML = "";
      activeline.appendChild(preTag);
    } else {
      let preTag = document.createElement('pre');
      preTag.innerHTML = "&#8203;";
      activeline.innerHTML = "";
      activeline.appendChild(preTag);
    }
    // create a new number in number line
    let numberLineCont = codeEditorCont.getElementsByClassName('number_line_cont')[0];
    let numberLines = codeEditorCont.getElementsByClassName('number_line');
    let numberLine = document.createElement('div');
    numberLine.classList.add("number_line");
    let numberLineP = document.createElement('pre');
    // because the number in HTML starts from 0. we just make the next line value to length
    numberLineP.innerText = numberLines.length;
    numberLine.append(numberLineP);
    numberLineCont.appendChild(numberLine);

    // creating new text line

    let codeLines = codeEditorCont.getElementsByClassName("line");

    let codeLineDiv = document.createElement('div');
    codeLineDiv.classList.add('line');
    let codeTextDiv = document.createElement('div');
    codeTextDiv.classList.add("text");
    let codeTextP = document.createElement('pre');
    codeTextP.innerText =  (charNumber > textVal.length) ? "" : textVal.slice(charNumber);

    codeTextDiv.append(codeTextP);
    codeLineDiv.append(codeTextDiv);

    let codeLinesCont = codeEditorCont.getElementsByClassName('code_editor_lines_container')[0];

    codeLinesCont.insertBefore(codeLineDiv,codeLines[lineNumber]);
    lineNumber = lineNumber + 1;
    dataVariables.setLineNumber(lineNumber);

    // change cursor position
    let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
    
    cursor.style.top = (lineNumber-1)*lineHeight  + "px";
    cursor.style.left = numberLineWidth  + "px";
    charNumber = 0;
    dataVariables.setCharNumber(charNumber);
    focusOnCursor();
  }

}
