export default function selectAllText(codeEditorCont,dataVariables,conditionalVariables){

  let drag = conditionalVariables.getDrag();
  let lineEnd = dataVariables.getLineEnd();
  let lineStart = dataVariables.getLineStart();

  let codeLines = codeEditorCont.getElementsByClassName("line");
  for(let i=0;i<codeLines.length;i++){
      let textCont = codeLines[i].childNodes[0].childNodes[0];
      textCont.classList.add("background_selected_text");
  }
  
  lineStart = dataVariables.setLineStart({
      line:1,
      char:0,
  });
  lineEnd = dataVariables.setLineEnd({
      line:codeLines.length,
      char:codeLines[codeLines.length - 1].innerText.length
  });
  drag = conditionalVariables.setDrag(true);
}