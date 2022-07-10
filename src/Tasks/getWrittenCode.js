export default function getWrittenCode(codeEditorCont){

  let allLines = codeEditorCont.getElementsByClassName("line");
  let codeTosend = "";
  for(let i =0; i<allLines.length;i++){
    if(allLines[i].innerText == "\u200B"){
      codeTosend +=  "\n" ;
    } else{
      codeTosend +=  allLines[i].innerText + "\n" ;
    }
  }
  
  return codeTosend;
}