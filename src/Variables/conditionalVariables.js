/**
 * @description - We need some variables that are global to the whole project. To avoid creating
 * a global scope variable this class implements getter and setter functions for variable that 
 * hold conditional data either true or false. 
 * @exports conditionalVariables
 */
 export default class conditionalVariables {
   constructor(codeEditorCont) {
    /**
     * @type {HTMLDivElement} - code editor DOM
     */
     this.codeEditorCont = codeEditorCont;
     /**
      * A variable to know whether or not the mouse is being dragged.
      * use getDrag() to get the value of variable and setDrag() to set the value of variable.
      * @type {boolean}
      */
     this.drag = false;
     /**
      * A variable to know whether or not text is selected in the editor.
      * use getTextSelectionInProgress() to get the value of variable and setTextSelectionInProgress() to set the value of variable.
      * @type {boolean}
      */
     this.textSelectionInProgress = false;
     /**
      * A variable to know whether or not mouse Button is clicked inside the code editor.
      * use getMouseDown() to get the value of variable and setMouseDown() to set the value of variable.
      * @type {boolean}
      */
     this.mouseDown = false;
     /**
      * A varaible to know whether or not suggestion box is visible or hidden inside the code editor.
      * uset getSuggestionBoxDisplay() to get the value of variable and setSuggestionBoxDisplay() to set the value of variables.
      * @type {boolean}
      */
     this.suggestionBoxDislay = false;
   }
   /**
    *
    * @returns {Boolean} - returns drag variable which is true if some text is selected.
    */
   getDrag() {
     return this.drag;
   }
   /**
    *
    * @param {Boolean} Drag - boolean value indicating whether or not some text is selected.
    * @returns {Boolean} - returns drag variable which is true if some text is selected.
    */
   setDrag(Drag) {
     this.drag = Drag;
     return this.drag;
   }

   /**
    *
    * @returns {Boolean} - if true indicates that text selection is in progress.
    */
   getTextSelectionInProgress() {
     return this.textSelectionInProgress;
   }
   /**
    *
    * @param {Boolean} TextSelectionInProgress - boolean value indicating whether or not text selection is in progress.
    * @returns {Boolean} - if true indicates that text selection is in progress.
    */
   setTextSelectionInProgress(TextSelectionInProgress) {
     this.textSelectionInProgress = TextSelectionInProgress;
     return this.textSelectionInProgress;
   }

   /**
    *
    * @returns {Boolean} - if true indicates that mouse click is active.
    */
   getMouseDown() {
     return this.mouseDown;
   }
   /**
    *
    * @param {Boolean} MouseDown - boolean value indicating whether or not mouse click is active.
    * @returns {Boolean} - if true indicates that mouse click is active.
    */
   setMouseDown(MouseDown) {
     this.mouseDown = MouseDown;
     return this.mouseDown;
   }

   /**
    * 
    * @returns {Boolean} - if true indicates that the suggestion Box is visible to user.
    */
   getSuggestionBoxDisplay(){
    return this.suggestionBoxDislay
   }
   /**
    * 
    * @param {Boolean} SuggestionBoxDislay - boolean value indicating whether or not suggestionBox should be visible
    * @returns {Boolean} - - if true indicates that the suggestion Box is visible to user.
    */
   setSuggestionBoxDisplay(SuggestionBoxDislay){
    this.suggestionBoxDislay = SuggestionBoxDislay;
    const codeSuggestionCont = this.codeEditorCont.getElementsByClassName('code_editor_code_suggestion_cont')[0];
    SuggestionBoxDislay ? codeSuggestionCont.style.display = "flex" : codeSuggestionCont.style.display = "none"
    return this.suggestionBoxDislay;
   }
 }