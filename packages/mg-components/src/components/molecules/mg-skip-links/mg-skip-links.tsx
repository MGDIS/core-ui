/* eslint-disable jsx-a11y/no-redundant-roles */
import { Component, Element, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import { SkipLink } from './mg-skip-links.conf';
import { initLocales } from '../../../locales';
import { isValidString } from '@mgdis/stencil-helpers';

@Component({
  tag: 'mg-skip-links',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-skip-links.css',
  shadow: true,
})
export class MgSkipLinks {
  /************
   * Internal *
   ************/

  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgSkipLinksElement;

  /**
   * Skip links
   */
  @Prop() links: SkipLink[];
  @Watch('links')
  validateLinks(links: SkipLink[]): void {
    if (links === undefined || links.length === 0 || links.some(link => !isValidString(link.href) || !link.href.startsWith('#') || !isValidString(link.label))) {
      throw new Error(`<mg-skip-links> prop "links": Cannot be empty and each link must contains an href starting with a "#" and a non empty label attributes.`);
    }
  }

  /**
   * Emited event when link is clicked
   */
  @Event({ eventName: 'go-to-anchor' }) goToAnchor: EventEmitter<string>;

  /***********
   * Methods *
   **********/

  /**
   * Handle link click and emit go-to-anchor event
   * @param event - mouse event
   */
  private handleLinkCLick = (event: MouseEvent & { currentTarget: HTMLElement }): void => {
    event.currentTarget.blur();
    this.goToAnchor.emit(event.currentTarget.getAttribute('href'));
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   */
  componentWillLoad(): void {
    this.validateLinks(this.links);
    this.messages = initLocales(this.element).messages;
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <nav class="mg-c-skip-links" role="navigation" aria-label={this.messages.skipLinks.navLabel}>
        <ul class="mg-c-skip-links__list" role="list">
          {this.links.map(link => (
            <li key={link.href}>
              <a class="mg-c-skip-links__link" href={link.href} onClick={this.handleLinkCLick}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
