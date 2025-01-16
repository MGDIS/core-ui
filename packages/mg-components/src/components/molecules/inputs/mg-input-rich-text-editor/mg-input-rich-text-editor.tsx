import { Component, Element, h, Prop, Watch, State, Event, EventEmitter, Method } from '@stencil/core';
import { ClassList, isValidString, toString } from '@mgdis/stencil-helpers';
import { classReadonly, type TooltipPosition, classDisabled } from '../mg-input/mg-input.conf';
import { defaultModules } from './mg-input-rich-text-editor.conf';
import { initLocales } from '../../../../locales';
import Quill from 'quill';

@Component({
  tag: 'mg-input-rich-text-editor',
  styleUrls: ['../../../../../node_modules/quill/dist/quill.snow.css', '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-rich-text-editor.css'],
  shadow: true,
})
export class MgInputRichTextEditor {
  /************
   * Internal *
   ************/

  // Quill
  private quillEditor: Quill;
  private wrapperElement: HTMLDivElement;
  private editorElement: HTMLDivElement;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputRichTextEditorElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

  /**
   * Define the value of the editor
   * Can be either HTML string or plain text
   */
  @Prop({ mutable: true }) value = '';

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop?: boolean;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder?: string;

  /**
   * Define the number of visible text lines for the control
   */
  @Prop() rows = 5;

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if the editor is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  watchReadonly(newValue: MgInputRichTextEditor['readonly']): void {
    if (newValue) this.classCollection.add(classReadonly);
    else this.classCollection.delete(classReadonly);
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('disabled')
  watchDisabled(newValue: MgInputRichTextEditor['disabled']): void {
    if (newValue) {
      this.classCollection.add(classDisabled);
      this.quillEditor?.disable();
    } else {
      this.classCollection.delete(classDisabled);
      this.quillEditor?.enable();
    }
  }

  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  handleValidityChange(newValue: boolean, _oldValue: boolean, prop: string): void {
    if (this.quillEditor !== undefined) {
      if (prop === 'disabled') {
        if (newValue) {
          this.quillEditor.disable();
        } else {
          this.quillEditor.enable();
        }
      }
      this.checkValidity();
      if (this.hasDisplayedError) {
        this.setErrorMessage();
        this.hasDisplayedError = false;
      }
    }
  }

  /**
   * Define input pattern to validate
   * Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.
   */
  @Prop() pattern?: string;

  /**
   * Define input pattern error message
   */
  @Prop() patternErrorMessage?: string;
  @Watch('pattern')
  @Watch('patternErrorMessage')
  validatePattern(newValue: string): void {
    if (newValue !== undefined && !(isValidString(this.pattern) && isValidString(this.patternErrorMessage))) {
      throw new Error(
        `<mg-input-rich-text-editor> props "pattern" and "patternErrorMessage" must be non-empty string and paired. Passed value: "pattern='${toString(this.pattern)}'" and "patternErrorMessage='${toString(this.patternErrorMessage)}'".`,
      );
    }
  }

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip?: string;

  /**
   * Define tooltip position
   */
  @Prop() tooltipPosition: TooltipPosition = 'input';

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText?: string;

  /**
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Quill modules configuration
   */
  @Prop() modules?: Record<string, unknown>;
  private defaultModules = defaultModules;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--rich-text-editor']);

  /**
   * Modules
   */
  @State() private internalModules: Record<string, unknown>;

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<boolean>;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<string>;

  /**
   * Get pattern validity
   * @returns is pattern valid
   */
  private getPatternValidity = (): boolean => {
    if (this.pattern === undefined) return true;

    // Extract the text without HTML tags
    const textContent = this.value.replace(/<[^>]*>/g, '').trim();

    // Apply the pattern only on the text content
    return new RegExp(`^${this.pattern}$`, 'u').test(textContent);
  };

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity(newValue: MgInputRichTextEditor['valid']) {
    const oldValidValue = this.valid;
    this.valid = newValue;
    this.invalid = !this.valid;
    if (this.valid !== oldValidValue) {
      this.inputValid.emit(this.valid);
    }
  }

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    // Check if the field is empty taking into account the value format
    const isEmpty = (() => {
      if (this.value === undefined) return true;
      // For HTML values, remove tags and check if text is empty
      const textContent = this.value.replace(/<[^>]*>/g, '').trim();
      return textContent === '' || textContent === '\n';
    })();

    const isValid = this.readonly || this.disabled || ((!this.required || !isEmpty) && this.getPatternValidity());
    this.setValidity(isValid);
  };

  /**
   * Set input error message
   * @param errorMessage - errorMessage override
   */
  private setErrorMessage = (errorMessage?: string): void => {
    this.errorMessage = undefined;
    if (!this.valid) {
      if (typeof errorMessage === 'string' && errorMessage.length > 0) {
        this.errorMessage = errorMessage;
      } else if (!this.getPatternValidity()) {
        this.errorMessage = this.patternErrorMessage;
      } else if (this.required) {
        // Check if content is empty before displaying the required error message
        const isEmpty = (() => {
          if (this.value === undefined) return true;
          if (typeof this.value === 'string') {
            const textContent = this.value.replace(/<[^>]*>/g, '').trim();
            return textContent === '' || textContent === '\n';
          } else {
            const ops = this.value.ops || [];
            return ops.length === 0 || (ops.length === 1 && ops[0].insert === '\n');
          }
        })();

        if (isEmpty) {
          this.errorMessage = this.messages.errors.required;
        }
      }
    }
  };

  /**
   * Handles the blur event on the editor
   * Checks validity and displays error messages if necessary
   */
  private handleBlur = (): void => {
    if (!this.readonly) {
      this.checkValidity();
      this.setErrorMessage();
      if (!this.valid) {
        this.hasDisplayedError = true;
      }
    }
  };

  /**
   * Get editor content as HTML
   * @returns HTML content of the editor
   */
  @Method()
  async getHTML(): Promise<string> {
    return this.quillEditor.getSemanticHTML();
  }

  /**
   * Get editor content as plain text
   * @returns Plain text content of the editor
   */
  @Method()
  async getText(): Promise<string> {
    return this.quillEditor.getText();
  }

  /**
   * Display input error if it exists.
   */
  @Method()
  async displayError(): Promise<void> {
    this.checkValidity();
    this.setErrorMessage();
    this.hasDisplayedError = this.invalid;
  }

  /**
   * Set an error and display a custom error message.
   * This method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.
   * It must be paired with an error message to display for the given context.
   * When used to set validity to `false`, you should use this method again to reset the validity to `true`.
   * @param valid - value indicating the validity
   * @param errorMessage - the error message to display
   */
  @Method()
  async setError(valid: MgInputRichTextEditor['valid'], errorMessage: string): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-rich-text-editor> method "setError()" param "valid" must be a boolean.');
    } else if (!isValidString(errorMessage)) {
      throw new Error('<mg-input-rich-text-editor> method "setError()" param "errorMessage" must be a string.');
    } else {
      this.setValidity(valid);
      this.setErrorMessage(valid ? undefined : errorMessage);
      this.hasDisplayedError = this.invalid;
    }
  }

  /**
   * Reset value, validity and error state
   */
  @Method()
  async reset(): Promise<void> {
    if (!this.readonly) {
      this.value = '';
      this.quillEditor.setContents([{ insert: '\n' }]);
      this.checkValidity();
      this.errorMessage = undefined;
      this.hasDisplayedError = false;
    }
  }

  /**
   * Fixes for handling text selection in Quill when used within the Shadow DOM.
   * - Fixes focus detection
   * - Adapts native range handling to work with the Shadow DOM
   * - Correctly manages text selection across Shadow DOM boundaries
   * - Sets up selection change events
   */
  private quillSelectionFixes(): void {
    const hasShadowRootSelection = Boolean((document.createElement('div').attachShadow({ mode: 'open' }) as ShadowRoot & { getSelection(): Selection }).getSelection);

    // Each browser engine has a different implementation for retrieving the Range
    const getNativeRange = (rootNode: ShadowRoot | Document) => {
      try {
        if (hasShadowRootSelection) {
          // In Chromium, the shadow root has a getSelection function which returns the range
          return (rootNode as ShadowRoot & { getSelection(): Selection }).getSelection().getRangeAt(0);
        } else {
          const selection = window.getSelection();
          // Webkit range retrieval is done with getComposedRanges (see: https://bugs.webkit.org/show_bug.cgi?id=163921)
          if (typeof (selection as Selection & { getComposedRanges?: (root: Node) => Range[] }).getComposedRanges === 'function') {
            return (selection as Selection & { getComposedRanges: (root: Node) => Range[] }).getComposedRanges(rootNode)[0];
          } else {
            // Gecko implements the range API properly in Native Shadow: https://developer.mozilla.org/en-US/docs/Web/API/Selection/getRangeAt
            return selection.getRangeAt(0);
          }
        }
      } catch {
        return null;
      }
    };

    // Original implementation uses document.active element which does not work in Native Shadow.
    // Replace document.activeElement with shadowRoot.activeElement
    this.quillEditor.selection.hasFocus = () => {
      const rootNode = this.quillEditor.root.getRootNode();
      return (rootNode as ShadowRoot).activeElement === this.quillEditor.root;
    };

    // Original implementation uses document.getSelection which does not work in Native Shadow.
    // Replace document.getSelection with shadow dom equivalent (different for each browser)
    this.quillEditor.selection.getNativeRange = () => {
      const rootNode = this.quillEditor.root.getRootNode();
      const nativeRange = getNativeRange(rootNode as ShadowRoot);
      return nativeRange !== null && nativeRange !== undefined ? this.quillEditor.selection.normalizeNative(nativeRange) : null;
    };

    // Original implementation relies on Selection.addRange to programatically set the range, which does not work in Webkit with Native Shadow. Selection.addRange works fine in Chromium and Gecko.
    this.quillEditor.selection.setNativeRange = function (startNode, startOffset, endNode = startNode, endOffset = startOffset, force = false) {
      if (startNode == null || this.root.parentNode == null || startNode.parentNode == null || endNode.parentNode == null) {
        return;
      }

      const selection = document.getSelection();
      if (selection == null) return;

      if (startNode != null) {
        if (!this.hasFocus()) this.root.focus();

        const native = (this.getNativeRange() || {}).native;
        if (
          native == null ||
          force ||
          startNode !== native.startContainer ||
          startOffset !== native.startOffset ||
          endNode !== native.endContainer ||
          endOffset !== native.endOffset
        ) {
          if (startNode instanceof HTMLElement && startNode.tagName === 'BR') {
            startOffset = [].indexOf.call(startNode.parentNode.childNodes, startNode);
            startNode = startNode.parentNode;
          }
          if (endNode instanceof HTMLElement && endNode.tagName === 'BR') {
            endOffset = [].indexOf.call(endNode.parentNode.childNodes, endNode);
            endNode = endNode.parentNode;
          }

          selection.setBaseAndExtent(startNode, startOffset, endNode, endOffset);
        }
      } else {
        selection.removeAllRanges();
        this.root.blur();
        document.body.focus();
      }
    };

    // Subscribe to selection change separately, because emitter in Quill doesn't catch this event in Shadow DOM
    document.addEventListener('selectionchange', () => {
      this.quillEditor.selection.update();
    });
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   * @returns timeout
   */
  componentWillLoad(): ReturnType<typeof setTimeout> {
    // Get locales
    this.messages = initLocales(this.element).messages;
    this.element.style.setProperty('--mg-c-input-rich-text-editor-rows', this.rows.toString());
    // Watch
    this.watchReadonly(this.readonly);
    this.watchDisabled(this.disabled);

    if (this.modules === undefined || this.modules === null) {
      this.internalModules = this.defaultModules;
    } else {
      this.internalModules = this.modules;
    }

    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  componentDidLoad(): void {
    if (!this.readonly) {
      this.editorElement = document.createElement('div');
      this.wrapperElement.append(this.editorElement);

      this.quillEditor = new Quill(this.editorElement, {
        theme: 'snow',
        modules: this.internalModules,
        readOnly: this.readonly || this.disabled,
        placeholder: this.placeholder,
      });

      if (this.value !== '') {
        const containsHTML = /<[a-z][\s\S]*>/i.test(this.value);
        if (containsHTML) {
          this.quillEditor.clipboard.dangerouslyPasteHTML(this.value);
        } else {
          this.quillEditor.setText(this.value);
        }
      }

      const editorContent = this.element.shadowRoot.querySelector('.ql-editor');
      editorContent?.addEventListener('blur', this.handleBlur);

      // Add an event listener for the text-change event
      this.quillEditor.on('text-change', () => {
        // Get HTML content
        const htmlContent = this.quillEditor.getSemanticHTML();
        this.value = htmlContent;

        // Emit the HTML content for form compatibility
        this.valueChange.emit(htmlContent);

        // Check validity but do not display the error message if the error message is already displayed
        this.checkValidity();
        if (this.hasDisplayedError) {
          this.setErrorMessage();
        }
      });

      this.quillSelectionFixes();

      // Initialize disabled state
      if (this.disabled) {
        this.watchDisabled(true);
      }
    }
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <mg-input
        identifier={this.identifier}
        class={this.classCollection.join()}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.hasDisplayedError ? this.errorMessage : undefined}
      >
        {this.readonly ? (
          <div class="mg-c-input__readonly-value" innerHTML={this.value} />
        ) : (
          <div ref={el => (this.wrapperElement = el)} id={this.identifier} class="mg-c-input__wrapper" />
        )}
      </mg-input>
    );
  }
}
