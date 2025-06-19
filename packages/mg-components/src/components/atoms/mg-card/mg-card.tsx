import { Component, h, Prop, State, Watch } from '@stencil/core';
import { ClassList } from '@mgdis/core-ui-helpers/dist/utils';

/**
 * @slot - Card content
 */
@Component({
  tag: 'mg-card',
  styleUrl: '../../../../node_modules/@mgdis/styles/dist/components/mg-card.css',
  shadow: true,
})
export class MgCard {
  /**
   * Add box-shadow style
   */
  @Prop() shadow = false;
  @Watch('shadow')
  watchShadow(newValue: boolean): void {
    if (newValue) {
      this.classCollection.add('mg-c-card--shadow');
    } else {
      this.classCollection.delete('mg-c-card--shadow');
    }
  }

  /**
   * Define the border radius size
   */
  @Prop() radius: 'xsmall' | 'small' | 'medium' = 'medium';
  @Watch('radius')
  watchRadius(newValue: 'xsmall' | 'small' | 'medium'): void {
    // Remove all possible radius classes
    this.classCollection.delete('mg-c-card--radius-xsmall');
    this.classCollection.delete('mg-c-card--radius-small');
    // Add new class only if radius is valid and not medium (default)
    if (newValue === 'xsmall' || newValue === 'small') {
      this.classCollection.add(`mg-c-card--radius-${newValue}`);
    }
  }

  /**
   * Component classes
   */
  @State() classCollection: ClassList = new ClassList(['mg-c-card']);

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    this.watchShadow(this.shadow);
    this.watchRadius(this.radius);
  }

  /**
   * Render
   * @returns HTML Element
   */
  render(): HTMLElement {
    return (
      <div class={this.classCollection.join()}>
        <slot></slot>
      </div>
    );
  }
}
