export default async function copySelectedText(codeEditorCont){
  let selectedLines = codeEditorCont.getElementsByClassName("background_selected_text");
  let textToBeCopied = "";
  for(let i =0; i<selectedLines.length;i++){
    if(selectedLines[i].innerText == "\u200B"){
      textToBeCopied +=  "\n" ;
    } else{
      textToBeCopied +=  selectedLines[i].innerText + "\n" ;
    }
  }
  //console.log(textToBeCopied);
  await navigator.clipboard.writeText(textToBeCopied);
}


