/* eslint-disable no-console */
import type { MessageData } from './types';
import sanitizeHtml from 'sanitize-html';

/**
 * NotificationCenter class
 */
class NotificationCenter {
  #rootWindow: Window;

  #messagesReceiver: HTMLDivElement = document.createElement('div');

  readonly #appId: string = 'mg-notification-center';

  constructor() {
    // Get Root Window
    this.#rootWindow = this.#getRootWindow(window);
    // If the window is not in an iframe
    if (!this.#isInIframe(window)) {
      // Check if mg-components is loaded
      if (customElements.get('mg-message') === undefined) {
        console.error('mg-components is not loaded.');
      }
      // We listen to events
      this.#addEventListener(this.#rootWindow, ({ data }: { data: MessageData }) => {
        if (data.appId === this.#appId) this.#displayMessage(data);
      });
      // When DOM is ready we add our CSS and the notifications zone
      if (this.#rootWindow.document.readyState === 'complete') this.#render();
      this.#rootWindow.addEventListener('DOMContentLoaded', () => {
        this.#render();
      });
    }
  }

  /**
   * Render notification-center in rootwindow document
   */
  #render = () => {
    // If notification center is not already created
    if (this.#rootWindow.document.getElementById(this.#appId) === null) {
      // Add style
      const css: Text = document.createTextNode(
        `#${this.#appId} {
          position: fixed;
          bottom: 0;
          right: 0;
          padding:  0 1rem 1rem;
          width: 40rem;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          pointer-events: none;
          z-index: 1000;
        }
        #${this.#appId} mg-message {
          pointer-events: auto;
          animation: append-item .4s ease;
        }
        @media (prefers-reduced-motion) {
          #${this.#appId} mg-message {
            animation: none;
          }
        }
        @keyframes append-item {
          0% {
            opacity: 0;
            transform: translateY(50%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }`,
      );
      const style: HTMLStyleElement = document.createElement('style');
      style.appendChild(css);
      this.#rootWindow.document.head.appendChild(style);
      // Add div to receive notifications
      this.#messagesReceiver.innerHTML = '';
      this.#messagesReceiver.id = this.#appId;
      this.#rootWindow.document.body.appendChild(this.#messagesReceiver);
    }
  };

  /**
   * Check if the window is in an iframe
   *
   * @param localWindow - the window that load the script
   * @returns the window is in an iframe
   */
  #isInIframe = (localWindow: Window): boolean => localWindow.self !== localWindow.top;

  /**
   * Add event listener on window
   *
   * @param targetWindow - window that will listen to events
   * @param callback - method to execute when we receive an event
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #addEventListener = (targetWindow: Window, callback: any): void => {
    targetWindow.addEventListener('message', callback);
  };

  /**
   * Post message to root window
   *
   * @param message - message data
   */
  postMessage = (message: MessageData): void => {
    this.#rootWindow.postMessage({ ...message, appId: this.#appId }, document.location.origin);
  };

  /**
   * Get the root window
   *
   * @param localWindow - the window where we want to identify the root
   * @returns the root window
   */
  #getRootWindow = (localWindow: Window): Window => {
    // Check if we have permission to access parent
    try {
      const parentDocument = localWindow.parent.document;
      if (!parentDocument) throw new Error('Cannot access parent document');
    } catch (err) {
      console.error('Different hosts between iframes:', err);
      return localWindow;
    }
    return this.#isInIframe(localWindow) ? this.#getRootWindow(localWindow.parent) : localWindow;
  };

  /**
   * Display message
   *
   * @param message - message data
   */
  #displayMessage = ({ content, variant, delay, context }: MessageData): void => {
    // Remove mg-messages with same context
    if (context)
      this.#messagesReceiver.querySelectorAll(`mg-message[data-mg-message-context='${context}']`).forEach(mgMessage => {
        mgMessage.remove();
      });
    // Init mg-message
    const mgMessage: HTMLElement = document.createElement('mg-message');
    mgMessage.setAttribute('close-button', '');
    // Variant
    if (variant) mgMessage.setAttribute('variant', variant);
    // Delay
    if (delay === undefined && variant === 'success') delay = 5;
    else if (delay !== undefined && delay < 3) delay = undefined;
    if (delay) mgMessage.setAttribute('delay', delay.toString());
    // Context
    if (context) mgMessage.dataset.mgMessageContext = context;
    // Remove message on close
    mgMessage.addEventListener('component-hide', () => {
      mgMessage.remove();
    });
    // Add content
    mgMessage.innerHTML = sanitizeHtml(content);
    // Add mg-message
    this.#messagesReceiver.appendChild(mgMessage);
  };
}

export { NotificationCenter };
