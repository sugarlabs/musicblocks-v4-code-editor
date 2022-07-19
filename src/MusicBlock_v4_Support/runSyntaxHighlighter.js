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

let _specificationSnapshot = {};


export default function runSyntaxHighlighter(eventKey,codeEditorCont,dataVariables,conditionalVariables){
  registerElementSpecificationEntries(librarySpecification);
  _specificationSnapshot = Object.fromEntries(
    Object.entries(getSpecificationSnapshot()).map(([elementName, specification]) => [
        elementName,
        { ...specification, args: null },
    ]),
  );
  console.log(getSpecificationSnapshot,_specificationSnapshot);
  console.log('highlighting started')
}