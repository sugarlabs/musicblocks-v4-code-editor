import addingInputEventListenersMB from "./addingInputEventListener";

import { runSyntaxHighlighterOnAllLines } from "./runSyntaxHighlighter";

import addingCodeEditorEventListenersMB from "./addingCodeEditorEventListeners";

/**
 *  Main class that provides mmethods to integrate musicBlocks v4 language support into 
 *  the code editor.
 * @exports addMusicBlocksSupport
 */

export default class addMusicBlocksSupport {
  /**
   *
   * @param {Object} syntaxColorConfigObj - colour configuration JSON object for syntax highlighting
   * @param {Object} _specificationSnapshot - Syntax specification snapshot form musicBlocks v4 lib
   */
  constructor(syntaxColorConfigObj, _specificationSnapshot) {
    // before making prodcuction make sure to reassign this._specificationSnapshot to param _specificationSnapshot
    /** @type {Object} */
    this._specificationSnapshot = _specificationSnapshot;
    /** @type {Object} */
    this.syntaxColorConfigObj = syntaxColorConfigObj;
  }

  /**
   * @description - adds musicBlock initial support to codeEditor.
   */
  initializeSupport() {
    addingInputEventListenersMB(this._specificationSnapshot, this.syntaxColorConfigObj);
    addingCodeEditorEventListenersMB(this._specificationSnapshot, this.syntaxColorConfigObj);
  }
  /**
   * @description - This methods runs syntax highlighter on all the lines when called..
   */
  runSyntaxHighlighterOnAllLinesAPI() {
    runSyntaxHighlighterOnAllLines(this._specificationSnapshot, this.syntaxColorConfigObj);
  }
}