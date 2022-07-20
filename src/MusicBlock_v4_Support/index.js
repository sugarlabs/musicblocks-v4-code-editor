import addingInputEventListenersMB from "./addingInputEventListener";
import syntaxColorConfig from "./color.config";
import runSyntaxHighlighter from "./runSyntaxHighlighter";

import {
  ITreeSnapshotInput,
  generateFromSnapshot,
  generateSnapshot,
  resetSyntaxTree,
  getSpecificationSnapshot,
} from '@sugarlabs/musicblocks-v4-lib';

import {
  addInstance,
  getInstance,
  removeInstance,
} from '@sugarlabs/musicblocks-v4-lib/syntax/warehouse/warehouse';

import {
  registerElementSpecificationEntries,
  librarySpecification,
} from '@sugarlabs/musicblocks-v4-lib';

export default class addMusicBlocksSupport{
  constructor(syntaxColorConfigObj){
    this._specificationSnapshot = {};
    this.syntaxColorConfigObj = syntaxColorConfigObj;
    // this registration of specification is just for testing purposes, thsi will be done in musicBlock-v4
    // when running the project. the next 7 lines are to be runned only in development of code Editor.
    registerElementSpecificationEntries(librarySpecification);
    this._specificationSnapshot = Object.fromEntries(
      Object.entries(getSpecificationSnapshot()).map(([elementName, specification]) => [
          elementName,
          { ...specification, args: null },
      ]),
    );
  }

  initializeSupport(codeEditor,dataVariables){
    addingInputEventListenersMB(codeEditor,dataVariables);

  }
}