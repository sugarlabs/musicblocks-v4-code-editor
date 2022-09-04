import generateCodeEditor from "./Actions";
import addMusicBlocksSupport from "./MusicBlock_v4_Support";
import syntaxColorConfig from "./MusicBlock_v4_Support/color.config";

/**
 * A main class that get exported by default in production. 
 * It takes code Editor container and _specificationSnapshot as a parameters in constructor
 * and has different methods to be used in production.
 * @exports codeEditor
 */
export default class codeEditor {
  /**
   * assigns some initial variables 
   * @param {HTMLDivElement} codeEditorCont - container div Element inside which code Editor will be injected.
   */
  constructor(codeEditorCont) {
    /**
     * @type {HTMLDDivContainer}
     */
    this.codeEditorCont = codeEditorCont;
    // Specification snapshot of syntax elements of musicBlock-v4.
    this._specificationSnapshot = {};
    // this.codeEditor = new codeEditorDom();
    // this.dataVariables = new dataVariables();
    // this.conditionalVariables = new conditionalVariables();
    // this.arrayVariables = new arrayVariables();
    // this.intervalVariables = new intervalVariables();
    /**
     * @type {Object}
     */
    this.codeEditorNodeObject = new generateCodeEditor();
    /**
     * @type {Object}
     */
    this.syntaxColorConfigObj = new syntaxColorConfig();
    /**
     * @type {Object}
     */
    this.musicBlocksv4Support = null;
  }

  /**
   * after initialising the container in constructor, this function can be
   * called to actually inject the code Editor in HTML DOM.
   * @return {undefined}
   */
  createCodeEditorDom() {
    const codeEditorNode = this.codeEditorNodeObject.generateCodeEditorDOM();
    this.codeEditorCont.appendChild(codeEditorNode);
    this.codeEditorNodeObject.setupInitialDomData();
  }

  /**
   * This functions adds the text passed in param into the code Editor.
   * @param {String} codeText - a string of code to be placed inside code editor.
   *
   */
  setCode(codeText) {
    this.codeEditorNodeObject.setCode(codeText);
    if(this.musicBlocksv4Support){
      this.musicBlocksv4Support.runSyntaxHighlighterOnAllLinesAPI();
    }
  }

  /**
   *
   * @returns {String} - returns the text inside the code Editor.
   */
  getCode() {
    return this.codeEditorNodeObject.getCode();
  }

  /**
   * This functions updates the configuration colours for syntax highlighting.
   * @param {Object} newColorConfig - a JSON object containing the config data for syntax highlightning
   * @returns {Object} - returns the updated config object along with other default values.
   */
  setSyntaxColorConfig(newColorConfig) {
    return this.syntaxColorConfigObj.setConfig(newColorConfig);
  }

  /**
   * This function resets the whole configuration colors for syntax highlighting with newColorConfig param.
   * @param {Object} newColorConfig - a JSON object containing the config data for syntax highlightning
   * @returns {Object} - returns the updated config object.
   */
  resetSyntaxColorConfig(newColorConfig) {
    return this.syntaxColorConfigObj.resetConfig(newColorConfig);
  }

  /**
   * musicblocksv4 support can only be initialised after _specificationsnapshot is passed. This function
   * provides an API to add specification snapshot and initiate support for musicBloclsv4.
   * @param {Object} _specificationSnapshot  - Specification snapshot of syntax elements of musicBlock-v4.
   */
  setSpecificationSnapshot(_specificationSnapshot){
    this._specificationSnapshot = _specificationSnapshot;
    this.inititateAddMusicBlocksSupport();
  }

  /**
   * 
   */
  inititateAddMusicBlocksSupport(){
    this.musicBlocksv4Support = new addMusicBlocksSupport(
      this.syntaxColorConfigObj,
      this._specificationSnapshot,
    );
    
    this.musicBlocksv4Support.initializeSupport();
  }
}