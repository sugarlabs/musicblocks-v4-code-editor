import syntaxColorConfig from './color.config';



export default function runSyntaxHighlighter(eventKey,codeEditorCont,dataVariables){
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let codeLineText = codeLines[dataVariables.getLineNumber()-1].innerText;
  let codeTextArray = codeLineText.split(" ");

  console.log(codeTextArray[21])

}