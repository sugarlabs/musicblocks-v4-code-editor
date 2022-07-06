import deselectText from "./deselectText";

export default 
function getMousePosition(codeEditorCont, conditionalVariables, dataVariables, event) {

    let numberLineWidth = dataVariables.getNumberLineWidth();
    let lineNumber = dataVariables.getLineNumber();
    let charNumber = dataVariables.getCharNumber();
    let lineHeight = dataVariables.getLineHeight();

    let canvas = codeEditorCont.getElementsByClassName('code_editor_lines_container')[0];
    // remove selected text if any
    conditionalVariables.setTextSelectionInProgress(false);
    deselectText(codeEditorCont);

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left - numberLineWidth;
    let y = event.clientY - rect.top;

    let charSize = dataVariables.getCharSize();

    lineNumber = parseInt(y/lineHeight) +1;
    charNumber = parseInt(x/charSize);
    dataVariables.setCharNumber(charNumber);
    dataVariables.setLineNumber(lineNumber);

    let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
    let textlines = codeEditorCont.getElementsByClassName('text');
    if(!textlines[lineNumber-1]){
        lineNumber = textlines.length;
        dataVariables.setLineNumber(lineNumber);
    }
    let lineTextLength = textlines[lineNumber-1].innerText.length;
    if(textlines[lineNumber-1].innerText == "\u200B"){
        lineTextLength = 0;
    }
    
    if(charNumber > lineTextLength){
        cursor.style.left = (lineTextLength)*charSize + numberLineWidth  + "px";
        charNumber = lineTextLength;
        dataVariables.setCharNumber(charNumber);
    } else if(charNumber < 0) {
        cursor.style.left = numberLineWidth  + "px";
        charNumber = 0;
        dataVariables.setCharNumber(charNumber);
    } else {
        cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
    }

    cursor.style.top = (lineNumber-1)*lineHeight  + "px";
    let input = codeEditorCont.querySelector('#code-editor-cursor-input');
    input.focus();
}