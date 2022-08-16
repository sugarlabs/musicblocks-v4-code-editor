import codeEditorDom from "./Actions/codeEditorDom";
import dataVariables from "./Variables/dataVariables";
import conditionalVariables from "./Variables/conditionalVariables";
import arrayVariables from "./Variables/arrayVariables";
import intervalVariables from "./Variables/intervalVariables";


let codeEditorDomVar = new codeEditorDom();
let codeEditorCont = codeEditorDomVar.getCodeEditor();
let dataVariablesVar = new dataVariables(codeEditorCont);
let conditionalVariablesVar = new conditionalVariables(codeEditorCont);
let arrayVariablesVar = new arrayVariables();
let intervalVariablesVar = new intervalVariables();

export {
  codeEditorDomVar as codeEditorDom,
  dataVariablesVar as dataVariables,
  conditionalVariablesVar as conditionalVariables,
  arrayVariablesVar as arrayVariables,
  intervalVariablesVar as intervalVariables,
  codeEditorCont as codeEditorCont,
};