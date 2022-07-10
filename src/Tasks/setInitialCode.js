import focusOnCursor from "./focusOnCursor";
import removeSelected from "./removeSelected";
import storeCurrentState from "./storeCurrentState";

export default async function setInitialCode(codeText,codeEditorCont,dataVariables,conditionalVariables,arrayVariables){
  
  let drag = conditionalVariables.getDrag();
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let lineEnd = dataVariables.getLineEnd();
  let lineStart = dataVariables.getLineStart();


  textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(false);
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let selectedLines = codeEditorCont.getElementsByClassName("background_selected_text");
  let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  let textToSet = codeText;
  
  // splitting copied text at line break so i can insert it into different lines.
  let textToSetArray = textToSet.split("\n");
  // if array has no elements that means nothing has been copied
  if(!textToSetArray.length){
    return;
  }
  // remove the last empty character element because one \n will be in the end resulting in empty element
  
  // for single line copy adding the text at the position of cursor;
  //console.log(textToSetArray)
  
  if(textToSetArray.length == 1){
    if(textToSetArray[0] == "\n"){
      return;
    }
    let beforeCursorText =codeLines[lineNumber -1].innerText.slice(0,charNumber);
    let afterCursorText = codeLines[lineNumber - 1].innerText.slice(charNumber, codeLines[lineNumber - 1].innerText.length);
    codeLines[lineNumber-1].childNodes[0].innerHTML = "<pre>" + beforeCursorText + textToSetArray[0].replaceAll('\r','') + afterCursorText + "</pre>"
    charNumber = dataVariables.setCharNumber(beforeCursorText.length + textToSetArray[0].length) ;
    cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      
  } else {
    if(textToSetArray[textToSetArray.length] == "\n" || textToSetArray[textToSetArray.length] == ""){
      textToSetArray.pop();
    }
    let beforeCursorText = codeLines[lineNumber -1].innerText.slice(0,charNumber);
    let afterCursorText = codeLines[lineNumber - 1].innerText.slice(charNumber, codeLines[lineNumber - 1].innerText.length);
    // adding first line of copied text along with text before the cursor into first line
    codeLines[lineNumber-1].childNodes[0].innerHTML = "<pre>" + beforeCursorText + textToSetArray[0].replaceAll('\r','') + "</pre>";
    // creating new new lines and adding copied text into the lines until last second line
    let numberLineCont = codeEditorCont.getElementsByClassName('number_line_cont')[0];
    let numberLines = codeEditorCont.getElementsByClassName('number_line');
    let codeLinesCont = codeEditorCont.getElementsByClassName('code_editor_lines_container')[0];
    for(let i = 1; i<textToSetArray.length -1; i++){
        // create a new number in number line
        
        let numberLine = document.createElement('div');
        numberLine.classList.add("number_line");
        let numberLineP = document.createElement('pre');
        // because the number in HTML starts from 0. we just make the next line value to length
        numberLineP.innerText = numberLines.length;
        numberLine.append(numberLineP);
        numberLineCont.appendChild(numberLine);

        // creating new text line
        
        let codeLineDiv = document.createElement('div');
        codeLineDiv.classList.add('line');
        let codeTextDiv = document.createElement('div');
        codeTextDiv.classList.add("text");
        let codeTextP = document.createElement('pre');
        codeTextP.innerText =  textToSetArray[i].replaceAll('\r','');

        codeTextDiv.append(codeTextP);
        codeLineDiv.append(codeTextDiv);

        codeLinesCont.insertBefore(codeLineDiv,codeLines[lineNumber])
        lineNumber = dataVariables.setLineNumber(lineNumber + 1);
    }

    // create a new number in number line
        
    let numberLine = document.createElement('div');
    numberLine.classList.add("number_line");
    let numberLineP = document.createElement('pre');
    // because the number in HTML starts from 0. we just make the next line value to length
    numberLineP.innerText = numberLines.length;
    numberLine.append(numberLineP);
    numberLineCont.appendChild(numberLine);

    // creating new text line
    
    let codeLineDiv = document.createElement('div');
    codeLineDiv.classList.add('line');
    let codeTextDiv = document.createElement('div');
    codeTextDiv.classList.add("text");
    let codeTextP = document.createElement('pre');
    codeTextP.innerText =  textToSetArray[textToSetArray.length - 1].replaceAll('\r','') + afterCursorText;

    codeTextDiv.append(codeTextP);
    codeLineDiv.append(codeTextDiv);


    codeLinesCont.insertBefore(codeLineDiv,codeLines[lineNumber])
    lineNumber = dataVariables.setLineNumber(lineNumber + 1);
    let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];

    charNumber = dataVariables.setCharNumber(textToSetArray[textToSetArray.length - 1].length);
    cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
    cursor.style.top = (lineNumber-1)*lineHeight  + "px";
  }
  focusOnCursor(codeEditorCont,dataVariables);

  
  
  //  creating final line adding last line of copied text along with text that was after the cursor in first line.

}
