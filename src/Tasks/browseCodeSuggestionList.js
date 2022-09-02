import { codeEditorCont } from "../store";

export default function browseCodeSuggestionList(key){
  const codeSuggestionSubCont = codeEditorCont.getElementsByClassName('code_editor_code_suggestion_sub_cont')[0];
  const codeSuggestionLines = codeSuggestionSubCont.getElementsByTagName('P');
  console.log(codeSuggestionLines);
  let activeCodeSuggestion = 0;
  for(let i=0;i<codeSuggestionLines.length;i++){
    if(codeSuggestionLines[i].classList.contains('code_editor_code_suggestion_selected')){
      activeCodeSuggestion = i;
    }
  }
  //remove the active code suggestion class name to let the next in line have it.
  codeSuggestionLines[activeCodeSuggestion].classList.remove("code_editor_code_suggestion_selected");
  if(key == 'up'){
    // if the active code suggestion is not the first one in the list.
    if(activeCodeSuggestion){
      codeSuggestionLines[activeCodeSuggestion-1].classList.add("code_editor_code_suggestion_selected");
    }
    else {
      codeSuggestionLines[codeSuggestionLines.length-1].classList.add("code_editor_code_suggestion_selected");
    }
  }
  if(key == 'down'){
    // if the active code suggestion is not the first one in the list.
    if(activeCodeSuggestion < codeSuggestionLines.length-1){
      codeSuggestionLines[activeCodeSuggestion+1].classList.add("code_editor_code_suggestion_selected");
    }
    else {
      codeSuggestionLines[0].classList.add("code_editor_code_suggestion_selected");
    }
  }
}