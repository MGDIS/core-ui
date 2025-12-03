/**
 * DOM type overrides to prevent third-party libraries from polluting global DOM types
 * This file ensures that standard DOM types remain correct even when libraries like Jodit
 * are imported, preventing issues like querySelector('svg') returning HTMLElement instead of SVGSVGElement
 *
 * This file must be included in the TypeScript compilation to take effect.
 * It uses module augmentation to override the querySelector return types.
 */

declare global {
  interface ShadowRoot {
    /**
     * Override querySelector to ensure correct typing for SVG elements
     * This prevents type pollution from third-party libraries like Jodit
     */
    querySelector(selectors: 'svg'): SVGSVGElement | null;
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector<E extends Element = Element>(selectors: string): E | null;
  }

  interface Document {
    /**
     * Override querySelector to ensure correct typing for SVG elements
     */
    querySelector(selectors: 'svg'): SVGSVGElement | null;
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector<E extends Element = Element>(selectors: string): E | null;
  }

  interface Element {
    /**
     * Override querySelector to ensure correct typing for SVG elements
     */
    querySelector(selectors: 'svg'): SVGSVGElement | null;
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector<E extends Element = Element>(selectors: string): E | null;
  }
}

// This export is required for the file to be treated as a module
export {};
