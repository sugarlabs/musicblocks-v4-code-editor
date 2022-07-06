export default function deselectText(codeEditorCont){
  let SelectedLines  = codeEditorCont.querySelectorAll(".background_selected_text");
  SelectedLines.forEach((line) => {
      line.classList.remove('background_selected_text');
  });
  
}