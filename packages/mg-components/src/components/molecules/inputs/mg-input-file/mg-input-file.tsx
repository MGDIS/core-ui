import { Component, Event, h, Prop, EventEmitter, State, Element, Method, Watch } from '@stencil/core';
import { allItemsAreString, ClassList, isObject, isValidString, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { localeByte } from '@mgdis/core-ui-helpers/dist/locale';
import { type TooltipPosition, type EventType, classDisabled } from '../mg-input/mg-input.conf';
import { initLocales } from '../../../../locales';

const allItemsAreFile = (items: unknown): items is File[] => {
  return Array.isArray(items) && items.every(item => isObject<File>(item) && typeof item.name === 'string' && typeof item.size === 'number');
};

@Component({
  tag: 'mg-input-file',
  styleUrl: '../../../../../node_modules/@mgdis/styles/dist/components/mg-input-file.css',
  shadow: true,
})
export class MgInputFile {
  /************
   * Internal *
   ************/

  // HTML selector
  private inputElement: HTMLInputElement;
  private fileButtonElement: HTMLMgButtonElement;

  // Locales
  private locale: string;
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;
  private customErrorMessage: { lock: boolean; message?: string } = { lock: false };
  private handlerInProgress: EventType;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputFileElement;

  /**
   * Component value
   */
  @Prop({ mutable: true }) value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  @Watch('value')
  watchValue(newValue: MgInputFile['value']): void {
    if (allItemsAreString(newValue)) {
      this.files = this.value.map((fileName: string) => new File([], fileName));
    } else if (allItemsAreFile(newValue)) {
      this.files = this.value;
    } else if (newValue !== undefined) {
      throw new Error(`<mg-input-file> prop "value" must be an array of strings or File objects. Passed value: ${toString(newValue)}.`);
    } else {
      this.files = [];
    }

    this.valueChange.emit(newValue);
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop = false;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Define multiple files
   * When the multiple Boolean attribute is specified, the file input allows the user to select more than one file.
   * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple).
   */
  @Prop() multiple: boolean = false;
  @Watch('multiple')
  @Watch('value')
  watchMultiple(): void {
    if (this.multiple === false && this.files.length > 1) {
      throw new Error(`<mg-input-file> prop "value" must be a single file when prop "multiple" is set to false.`);
    }
  }

  /**
   * Define file accept format
   * The accept property is an attribute of the file `<input>` type
   * that defines the file types the file input should accept
   * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept).
   */
  @Prop() accept?: string;
  @Watch('accept')
  watchAccept(newValue: MgInputFile['accept']): void {
    if (newValue !== undefined && !isValidString(newValue)) {
      throw new Error(`<mg-input-file> prop "accept" must be a valid string.`);
    }
  }
  /**
   * Define max file size (in octets)
   */
  @Prop() maxSize?: number;

  /**
   * Define input capture attribute
   * The capture attribute is a Boolean attribute that specifies
   * if the device's camera or microphone should be used to capture
   * media directly, instead of choosing an existing file.
   * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#capture).
   */
  @Prop() capture?: 'user' | 'environment' | '';

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;
  @Watch('required')
  @Watch('disabled')
  handleValidityChange(newValue: boolean, _oldValue: boolean, prop: string): void {
    if (this.inputElement !== undefined) {
      this.inputElement[prop] = newValue;
      this.checkValidity();
      if (this.hasDisplayedError) {
        this.setErrorMessage();
        this.hasDisplayedError = false;
      }
    }
  }

  @Watch('disabled')
  watchDisabled(newValue: MgInputFile['disabled']): void {
    if (newValue) {
      this.classCollection.add(classDisabled);
    } else {
      this.classCollection.delete(classDisabled);
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
  @Prop({ mutable: true }) helpText?: string;
  @Watch('helpText')
  @Watch('accept')
  @Watch('maxSize')
  watchHelpText(): void {
    if (!isValidString(this.helpText)) {
      const helpText: string[] = [];
      if (this.maxSize !== undefined) {
        helpText.push(this.messages.input.file.helpText.maxSize.replace('{{maxSize}}', localeByte(this.maxSize, this.locale)));
      }
      if (this.accept !== undefined) {
        helpText.push(this.messages.input.file.helpText.accept.replace('{{accept}}', this.accept));
      }
      this.helpText = helpText.join('. ');
    }
  }

  /**
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-input--file']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Files list
   */
  @State() files: File[] = [];
  @Watch('files')
  watchFiles(newValue: MgInputFile['files'], oldValue: MgInputFile['files']): void {
    if (toString(newValue) !== toString(oldValue)) {
      this.value = newValue.length > 0 ? newValue : undefined;
    }
  }

  /**
   * Emitted event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<HTMLMgInputFileElement['value']>;

  /**
   * Emitted event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<HTMLMgInputFileElement['valid']>;

  /**
   * Set focus on input add file button
   */
  @Method()
  async setFocus(): Promise<void> {
    this.fileButtonElement.focus();
  }

  /**
   * Display input error if it exists.
   */
  @Method()
  displayError(): Promise<void> {
    // Use `Promise` as requested for stencil method
    // Use `requestAnimationFrame` to ensure:
    // - DOM is fully updated before validation
    // - Async operations are completed
    // - No timing issues with Stencil's render cycle
    // - Keep everything in sync both inside and outside the component
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        this.checkValidity();
        this.setErrorMessage();
        this.hasDisplayedError = this.invalid;
        resolve();
      });
    });
  }

  /**
   * Set an error and display a custom error message.
   * This method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.
   * It must be paired with an error message to display for the given context.
   * When used to set validity to `false`, you should use this method again to reset the validity to `true`.
   * @param valid - value indicating the validity
   * @param errorMessage - the error message to display
   * @param errorMessageLock - lock the error message and validity state
   */
  @Method()
  async setError(valid: MgInputFile['valid'], errorMessage?: string, errorMessageLock = false): Promise<void> {
    if (typeof valid !== 'boolean') {
      throw new Error('<mg-input-file> method "setError()" param "valid" must be a boolean.');
    } else if (errorMessage !== undefined && !isValidString(errorMessage)) {
      throw new Error('<mg-input-file> method "setError()" param "errorMessage" must be a string.');
    } else {
      this.customErrorMessage = {
        lock: valid ? false : errorMessageLock,
        message: valid ? undefined : errorMessage,
      };
      this.setValidity(valid);
      this.setErrorMessage(true);
      this.hasDisplayedError = this.invalid;
    }
  }

  /**
   * Reset value, validity and error state
   */
  @Method()
  async reset(): Promise<void> {
    this.files = [];
    // Use `Promise` as requested for stencil method
    // Use `requestAnimationFrame` to ensure:
    // - DOM is fully updated before validation
    // - Async operations are completed
    // - No timing issues with Stencil's render cycle
    // - Keep everything in sync both inside and outside the component
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        // unlock validity check by resetting customErrorMessage
        this.customErrorMessage = { lock: false };
        this.checkValidity();
        this.errorMessage = undefined;
        this.hasDisplayedError = false;
        resolve();
      });
    });
  }

  /**
   * Method to set validity values
   * @param newValue - valid new value
   */
  private setValidity = (newValue: MgInputFile['valid']): void => {
    const oldValue = this.valid;
    if (!this.customErrorMessage.lock || (this.customErrorMessage.message !== undefined && !newValue)) {
      this.valid = newValue;
    }
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    if (this.handlerInProgress === undefined || (this.handlerInProgress === 'blur' && this.valid !== oldValue)) {
      this.inputValid.emit(this.valid);
    }
  };

  /**
   * Handle change event
   */
  private handleInputChange = (event: InputEvent & { target: HTMLInputElement }): void => {
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
    }
    this.files = Array.from(event.target.files);

    // Reset input focus to the button after file selection
    this.fileButtonElement.focus();
  };

  /**
   * Handle input focus event
   */
  private handleInputFocus = (): void => {
    this.fileButtonElement.dataset.focusVisible = '';
  };

  /**
   * Handle input blur event
   */
  private handleInputBlur = (): void => {
    // Display Error
    this.handlerInProgress = 'blur';
    this.displayError().finally(() => {
      // reset guard
      this.handlerInProgress = undefined;
    });
    delete this.fileButtonElement.dataset.focusVisible;
  };

  /**
   * Handle button blur event
   */
  private handleButtonBlur = (): void => {
    this.inputElement.blur();
  };

  /**
   * Handle add file button click
   */
  private handleButtonClick = (): void => {
    this.inputElement.click();
  };

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.setValidity(this.disabled || (!this.isMaxSizeExceeded() && this.inputElement.checkValidity()));
  };

  /**
   * Handle delete file button click
   */
  private handleDeleteFileClick = (): void => {
    this.files = [];

    // Reset input focus to the button after file selection
    this.fileButtonElement.focus();
  };

  /**
   * Set input error message
   * @param fromSetErrorContext - context come from `setError` method
   */
  private setErrorMessage = (fromSetErrorContext = false): void => {
    // Set error message
    this.errorMessage = undefined;
    if (!this.valid) {
      // Does have a new custom error message OR does have a custom error message locked
      if (fromSetErrorContext || (this.customErrorMessage.lock && this.customErrorMessage.message !== undefined)) {
        this.errorMessage = this.customErrorMessage.message;
      }
      // Does not match max size
      else if (this.isMaxSizeExceeded()) {
        this.errorMessage = this.messages.input.file.errors.maxSize.replace('{{maxSize}}', localeByte(this.maxSize, this.locale));
      }
      // required
      else if (this.inputElement.validity.valueMissing) {
        this.errorMessage = this.messages.errors.required;
      }
    }
  };

  /**
   * Check if max size is exceeded
   * @returns boolean - true if max size is exceeded
   */
  private isMaxSizeExceeded = (): boolean => {
    return this.maxSize >= 0 && this.files.some(file => file.size > this.maxSize);
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   * @returns timeout
   */
  componentWillLoad(): ReturnType<typeof setTimeout> {
    // Get locales
    const locales = initLocales(this.element);
    this.locale = locales.locale;
    this.messages = locales.messages;
    // Validate
    this.watchValue(this.value);
    this.watchDisabled(this.disabled);
    this.watchHelpText();
    this.watchAccept(this.accept);
    this.watchMultiple();
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * Render files
   * @returns formated files.
   */
  private renderFiles = (): null | HTMLElement | HTMLElement[] => {
    const fileListId = `${this.identifier}-file-list`;

    const renderFileName = (file: File): HTMLSpanElement[] => [
      <span class="mg-c-input__file-item-name" key={file.name}>
        {file.name}
      </span>,
      file.size > 0 ? (
        <span class="mg-c-input__file-item-size" key={file.size}>
          {localeByte(file.size, this.locale)}
        </span>
      ) : undefined,
    ];

    const renderDeleteButton = (): HTMLMgButtonElement => (
      <mg-button
        variant="flat"
        class="mg-c-input__file-delete-button"
        is-icon
        label={this.messages.input.file.deleteButton}
        type="button"
        disabled={this.disabled}
        aria-controls={[this.identifier, fileListId].join(' ')}
        onClick={this.handleDeleteFileClick}
      >
        <mg-icon icon="cross"></mg-icon>
      </mg-button>
    );

    if (this.files.length === 0) {
      return null;
    } else if (this.files.length === 1) {
      return (
        <div class="mg-c-input__file-item">
          {renderFileName(this.files[0])}
          {renderDeleteButton()}
        </div>
      );
    } else {
      return (
        <div class="mg-c-input__file-list-container">
          <ul role="list" class="mg-c-input__file-list" id={fileListId}>
            {Array.from(this.files).map(file => (
              <li class="mg-c-input__file-item" key={file.name}>
                {renderFileName(file)}
              </li>
            ))}
          </ul>
          {renderDeleteButton()}
        </div>
      );
    }
  };

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <mg-input
        label={this.label}
        identifier={this.identifier}
        class={this.classCollection.join()}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        tooltip={this.tooltip}
        tooltipPosition={this.tooltipPosition}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        <div class="mg-c-input__file-container">
          <input
            name={this.name}
            id={this.identifier}
            class="mg-u-visually-hidden"
            type="file"
            multiple={this.multiple === true}
            capture={this.capture}
            accept={this.accept}
            disabled={this.disabled}
            required={this.files.length === 0 && this.required}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            onChange={this.handleInputChange}
            aria-invalid={(this.invalid === true).toString()}
            ref={(el: HTMLInputElement) => {
              this.inputElement = el;
            }}
          />
          <mg-button
            variant="secondary"
            class="mg-c-input__file-button"
            type="button"
            disabled={this.disabled}
            onClick={this.handleButtonClick}
            onBlur={this.handleButtonBlur}
            tabindex="-1"
            ref={(el: HTMLMgButtonElement) => {
              this.fileButtonElement = el;
            }}
          >
            {this.messages.input.file.browse}
          </mg-button>
          {this.renderFiles()}
        </div>
      </mg-input>
    );
  }
}
