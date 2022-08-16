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
    this._specificationSnapshot = {
      'move-forward': {
        label: 'forward',
        type: 'Statement',
        category: 'Graphics',
        prototypeName: 'ElementMoveForward',
        args: [['steps', ['number']]],
      },
      'move-backward': {
        label: 'backward',
        type: 'Statement',
        category: 'Graphics',
        prototypeName: 'ElementMoveBackward',
        args: [['steps', ['number']]],
      },
      'turn-left': {
        label: 'left',
        type: 'Statement',
        category: 'Graphics',
        prototypeName: 'ElementTurnLeft',
        args: [['angle', ['number']]],
      },
      'turn-right': {
        label: 'right',
        type: 'Statement',
        category: 'Graphics',
        prototypeName: 'ElementTurnRight',
        args: [['angle', ['number']]],
      },
      'set-xy': {
        label: 'set xy',
        type: 'Statement',
        category: 'Graphics',
        prototypeName: 'ElementSetXY',
        args: [
          ['x', ['number']],
          ['y', ['number']],
        ],
      },
      'set-heading': {
        label: 'set heading',
        type: 'Statement',
        category: 'Graphics',
        prototypeName: 'ElementSetHeading',
        args: [['angle', ['number']]],
      },
      'draw-arc': {
        label: 'draw arc',
        type: 'Statement',
        category: 'Graphics',
        prototypeName: 'ElementDrawArc',
        args: [
          ['radius', ['number']],
          ['angle', ['number']],
        ],
      },
      'set-color': {
        label: 'set color',
        type: 'Statement',
        category: 'Pen',
        prototypeName: 'ElementSetColor',
        args: [['value', ['number']]],
      },
      'set-thickness': {
        label: 'set thickness',
        type: 'Statement',
        category: 'Pen',
        prototypeName: 'ElementSetThickness',
        args: [['value', ['number']]],
      },
      'pen-up': {
        label: 'pen up',
        type: 'Statement',
        category: 'Pen',
        prototypeName: 'ElementPenUp',
        args: null,
      },
      'pen-down': {
        label: 'pen down',
        type: 'Statement',
        category: 'Pen',
        prototypeName: 'ElementPenDown',
        args: null,
      },
      'set-background': {
        label: 'set background',
        type: 'Statement',
        category: 'Pen',
        prototypeName: 'ElementSetBackground',
        args: [['value', ['number']]],
      },
      'clear': {
        label: 'clear',
        type: 'Statement',
        category: 'Pen',
        prototypeName: 'ElementClear',
        args: null,
      },
      'value-boolean': {
        label: 'true',
        type: 'Data',
        category: 'value',
        prototypeName: 'ElementValueBoolean',
        values: { types: ['boolean'] },
        args: null,
      },
      'value-number': {
        label: '0',
        type: 'Data',
        category: 'value',
        prototypeName: 'ElementValueNumber',
        values: { types: ['number'] },
        args: null,
      },
      'value-string': {
        label: 'string',
        type: 'Data',
        category: 'value',
        prototypeName: 'ElementValueString',
        args: null,
      },
      'box-generic': {
        label: 'Box',
        type: 'Statement',
        category: 'box',
        prototypeName: 'ElementBoxGeneric',
        args: [
          ['name', ['string']],
          ['value', ['boolean', 'number', 'string']],
        ],
      },
      'box-boolean': {
        label: 'Box (boolean)',
        type: 'Statement',
        category: 'box',
        prototypeName: 'ElementBoxBoolean',
        args: [
          ['name', ['string']],
          ['value', ['boolean']],
        ],
      },
      'box-number': {
        label: 'Box (number)',
        type: 'Statement',
        category: 'box',
        prototypeName: 'ElementBoxNumber',
        args: [
          ['name', ['string']],
          ['value', ['number']],
        ],
      },
      'box-string': {
        label: 'Box (string)',
        type: 'Statement',
        category: 'box',
        prototypeName: 'ElementBoxString',
        args: [
          ['name', ['string']],
          ['value', ['string']],
        ],
      },
      'boxidentifier-generic': {
        label: 'Box 1',
        type: 'Data',
        category: 'boxidentifier',
        prototypeName: 'ElementBoxIdentifierGeneric',
        args: null,
      },
      'boxidentifier-boolean': {
        label: 'Box 1',
        type: 'Data',
        category: 'boxidentifier',
        prototypeName: 'ElementBoxIdentifierBoolean',
        args: null,
      },
      'boxidentifier-number': {
        label: 'Box 1',
        type: 'Data',
        category: 'boxidentifier',
        prototypeName: 'ElementBoxIdentifierNumber',
        args: null,
      },
      'boxidentifier-string': {
        label: 'Box 1',
        type: 'Data',
        category: 'boxidentifier',
        prototypeName: 'ElementBoxIdentifierString',
        args: null,
      },
      'operator-math-plus': {
        label: '+',
        type: 'Expression',
        category: 'operator-math',
        prototypeName: 'ElementOperatorMathPlus',
        args: [
          ['operand1', ['number', 'string']],
          ['operand2', ['number', 'string']],
        ],
      },
      'operator-math-minus': {
        label: '-',
        type: 'Expression',
        category: 'operator-math',
        prototypeName: 'ElementOperatorMathMinus',
        args: [
          ['operand1', ['number']],
          ['operand2', ['number']],
        ],
      },
      'operator-math-times': {
        label: '×',
        type: 'Expression',
        category: 'operator-math',
        prototypeName: 'ElementOperatorMathTimes',
        args: [
          ['operand1', ['number']],
          ['operand2', ['number']],
        ],
      },
      'operator-math-divide': {
        label: '÷',
        type: 'Expression',
        category: 'operator-math',
        prototypeName: 'ElementOperatorMathDivide',
        args: [
          ['operand1', ['number']],
          ['operand2', ['number']],
        ],
      },
      'operator-math-modulus': {
        label: '%',
        type: 'Expression',
        category: 'operator-math',
        prototypeName: 'ElementOperatorMathModulus',
        args: [
          ['operand1', ['number']],
          ['operand2', ['number']],
        ],
      },
      'repeat': {
        label: 'repeat',
        type: 'Block',
        category: 'loop',
        prototypeName: 'ElementRepeat',
        args: [['times', ['number']]],
      },
      'if': {
        label: 'if',
        type: 'Block',
        category: 'loop',
        prototypeName: 'ElementIf',
        args: [['condition', ['boolean']]],
      },
      'process': {
        label: 'start',
        type: 'Block',
        category: 'program',
        prototypeName: 'ElementProcess',
        allowAbove: false,
        allowBelow: false,
        args: null,
      },
      'routine': {
        label: 'action',
        type: 'Block',
        category: 'program',
        prototypeName: 'ElementRoutine',
        allowAbove: false,
        allowBelow: false,
        args: [['name', ['string']]],
      },
      'print': {
        label: 'print',
        type: 'Statement',
        category: 'print',
        prototypeName: 'ElementPrint',
        args: [['value', ['boolean', 'number', 'string']]],
      },
    };
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