import cursorBlink from "../Tasks/cursorBlink";
import getWrittenCode from "../Tasks/getWrittenCode";
import setInitialCode from "../Tasks/setInitialCode";
import addingCodeEditorEventListeners from "./addingCodeEditorEventListeners";
import addingInputEventListeners from "./addingInputEventListeners";
import addingWindowEventListener from "./addingWindowEventListener";
import {
  codeEditorDom as codeEditor,
  dataVariables,
  conditionalVariables,
  arrayVariables,
  intervalVariables,
} from '../store';

/**
 * @description - This is the main class that creates a code editor , add all the events listenrs 
 * and exports the complete code editor to be appended into a container.
 * @exports generateCodeEditor
 */
export default class generateCodeEditor{

  constructor(){
    /**
     * @type {HTMLDivContainer}
     */
    this.codeEditor = codeEditor;
    /**
     * @type {Object}
     */
    this.dataVariables = dataVariables;
    /**
     * @type {Object}
     */
    this.conditionalVariables = conditionalVariables;
    /**
     * @type {Object}
     */
    this.arrayVariables = arrayVariables;
    /**
     * @type {Object}
     */
    this.intervalVariables = intervalVariables;
  }

  /**
   * the main function that user can use to generate code editor.
   * @returns {HTMLDivElement} - the code editor with all the functionalities added.
   */
  generateCodeEditorDOM(){
    this.combineAllActions();
    return this.codeEditor.getCodeEditor();
  }

  /**
   * @description - this method combines all the actions from ./actions folder.
   */
  combineAllActions(){
    let codeEditor = this.codeEditor.getCodeEditor();
    addingCodeEditorEventListeners();
    addingInputEventListeners();
    // let testLine = document.getElementsByClassName('code_editor_line_measure')[0].childNodes[1];
    // let charSize = (testLine.clientWidth)/40;
  }
  /**
   * @description - we need some values of Code editor after the codeEditor has been injected into
   * the DOM like height and width of a div or <p>. we might need to run some functions after the DOM
   * is injected. we assign all those kinds of data into variables and run all those functions
   * in this function which will be called after the code Editor is appended into the DOM.
   * 
   */
  setupInitialDomData(){
    // update the character width size once the DOM is appended 
    let codeEditor = this.codeEditor.getCodeEditor();

    let testLine = codeEditor.getElementsByClassName('code_editor_line_measure')[0].childNodes[0];
    this.dataVariables.setCharSize((testLine.clientWidth)/40);
    
    // update line height of the lines in code editor
    let testLine1 = codeEditor.getElementsByClassName('line')[0];
    let testLineDimensions = testLine1.getBoundingClientRect();
    let testLineHeight = testLineDimensions.top - testLineDimensions.bottom;
    this.dataVariables.setLineHeight(Math.abs(testLineHeight));
    // start cursor Blink
    cursorBlink(codeEditor);

    // adding eventListeners on windows
    addingWindowEventListener(
      codeEditor,this.conditionalVariables,this.intervalVariables,this.dataVariables
    );

    // update the height of the codeEditor sub which contains the whole code editor
    // except status bar.
    console.log(codeEditor.clientHeight - 18.2);
    codeEditor.getElementsByClassName('code_editor_sub')[0].style.height =
      codeEditor.clientHeight - 18.2 + 'px';
  }
  /**
   * @description - we need to set some sample code into the code Editor after it has been appended. In this function
   * we will add code to the codeEditor
   */
  setCode(codeText){
    let codeEditor = this.codeEditor.getCodeEditor();
    setInitialCode(
      codeText,codeEditor,this.dataVariables,this.conditionalVariables,this.arrayVariables
    );
  }
  /**
   * @description - we need to export the code written in code edittor whenever it's asked for, so this function gets
   * the complete code and returns it.
   */
   getCode(){
    let codeEditor = this.codeEditor.getCodeEditor();
    return getWrittenCode(codeEditor);
  }
}