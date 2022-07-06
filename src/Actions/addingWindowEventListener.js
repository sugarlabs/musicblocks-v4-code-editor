import SelectTextByMouse from "../Tasks/selectTextByMouse";

export default function addingWindowEventListener(codeEditorCont,conditionalVariables,intervalVariables,dataVariables){

  
  window.addEventListener("mouseup",(e) =>{
    conditionalVariables.setMouseDown(false);
    intervalVariables.clearCodeEditorAutoScrollX();
    intervalVariables.clearCodeEditorAutoScrollY();
  });

  window.onload = ()=>{
    let input = codeEditorCont.querySelector('#code-editor-cursor-input');
    input.focus();
  };

  window.addEventListener("mousemove",(e) => {
    let charSize = dataVariables.getCharSize();
    let lineEnd = dataVariables.getLineEnd();
    let mouseDown = conditionalVariables.getMouseDown();
    let drag = conditionalVariables.getDrag();
    
    if(mouseDown && drag){
      // //console.log(codeEditorCont.offsetLeft);
      let codeEditorContTop = codeEditorCont.offsetTop;
      let codeEditorContBottom = codeEditorCont.offsetTop + codeEditorCont.clientHeight;
      let codeEditorContLeft = codeEditorCont.offsetLeft;
      let codeEditorContRight = codeEditorCont.offsetLeft + codeEditorCont.clientWidth;
      let codeLines = codeEditorCont.getElementsByClassName("line");
      if(e.clientX > codeEditorContRight){
        intervalVariables.clearCodeEditorAutoScrollX();
        intervalVariables.clearCodeEditorAutoScrollY();
        intervalVariables.setCodeEditorAutoScrollX(setInterval(()=>{
          codeEditorCont.scrollLeft = codeEditorCont.scrollLeft + 10;
          let noOfCharTobeSelected = Math.floor(10/charSize);
          if(lineEnd.char <= codeLines[lineEnd.line -1].innerText.length){
              lineEnd.char = lineEnd.char + noOfCharTobeSelected ;
              dataVariables.setLineEnd(lineEnd);
              SelectTextByMouse(codeEditorCont,dataVariables,conditionalVariables);
          }   
        },10));          
      }
      if(e.clientX < codeEditorContLeft){
        intervalVariables.clearCodeEditorAutoScrollX();
        intervalVariables.clearCodeEditorAutoScrollY();
        intervalVariables.setCodeEditorAutoScrollX(setInterval(()=>{
          codeEditorCont.scrollLeft = codeEditorCont.scrollLeft - 10;
          let noOfCharTobeSelected = Math.floor(10/charSize);
          //console.log(lineEnd.char)
          if(lineEnd.char >= 0){
              lineEnd.char = lineEnd.char - noOfCharTobeSelected;
              dataVariables.setLineEnd(lineEnd);
              SelectTextByMouse(codeEditorCont,dataVariables,conditionalVariables);
          }   
        },10));
      }
      if(e.clientY > codeEditorContBottom){
        intervalVariables.clearCodeEditorAutoScrollX();
        intervalVariables.clearCodeEditorAutoScrollY();
        intervalVariables.setCodeEditorAutoScrollY(setInterval(() => {
          codeEditorCont.scrollTop = codeEditorCont.scrollTop + (18.2);
          if(lineEnd.line <= codeLines.length){
              lineEnd.line = lineEnd.line + 1;
              dataVariables.setLineEnd(lineEnd);
              SelectTextByMouse(codeEditorCont,dataVariables,conditionalVariables);
          }
        },100));
        // //console.log("moving down");
      }
      if(e.clientY < codeEditorContTop){
        intervalVariables.clearCodeEditorAutoScrollX();
        intervalVariables.clearCodeEditorAutoScrollY();
        intervalVariables.setCodeEditorAutoScrollY(setInterval(() => {
          codeEditorCont.scrollTop = codeEditorCont.scrollTop - (18.2);
          if(lineEnd.line > 1){
              lineEnd.line = lineEnd.line - 1;
              dataVariables.setLineEnd(lineEnd);
              SelectTextByMouse(codeEditorCont,dataVariables,conditionalVariables);
          }
        },100));

      }
    }
  });


}