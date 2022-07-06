export default function removeLine(lineNumberToremove,codeEditorCont){
  // removing number from number line
  let numberLines = codeEditorCont.getElementsByClassName('number_line');
  numberLines[numberLines.length-1].parentNode.removeChild(numberLines[numberLines.length-1])

  // removing text line
  let codeLines = codeEditorCont.getElementsByClassName("line");
  codeLines[lineNumberToremove - 1].parentNode.removeChild(codeLines[lineNumberToremove - 1]);
}