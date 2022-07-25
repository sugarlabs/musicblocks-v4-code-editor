export default function deselectText(codeEditorCont){
  let SelectedLines  = codeEditorCont.querySelectorAll(".background_selected_text");
  SelectedLines.forEach((line) => {
    // if(line.tagName == "SPAN"){
    //   let previousChildLoc = 0;
    //   let parentNodeChildren = line.parentNode.childNodes;
    //   for(let j=0;j<parentNodeChildren.length;j++){
    //     console.log(parentNodeChildren,parentNodeChildren[j],parentNodeChildren[j].classList)
    //     if(parentNodeChildren[j].classList && parentNodeChildren[j].classList.contains(".background_selected_text")){
    //       previousChildLoc = j -1;
    //       return;
    //     }
    //   }
    //   let tempLineClone = line.cloneNode(true);
    //   console.log(tempLineClone);
    //   let i=0;
    //   while(tempLineClone.childNodes.length){
    //     line.parentNode.insertBefore(tempLineClone.childNodes[i],line.parentNode.childNodes[previousChildLoc]);
    //     i++;
    //   }
    //   line.parentNode.removeChild(line);
    // } else{
    //   line.classList.remove('background_selected_text');
    // }
    line.classList.remove('background_selected_text');
    
  });
  console.log("deselectText")
}