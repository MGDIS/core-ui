import { Component, h, Prop, State, Watch } from '@stencil/core';
import { ClassList, toString } from '@mgdis/core-ui-helpers/dist/utils';
import { radiusSizes, RadiusSizeType } from './mg-card.conf';

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
  watchShadow(newValue: MgCard['shadow']): void {
    if (newValue) {
      this.classCollection.add('mg-c-card--shadow');
    } else {
      this.classCollection.delete('mg-c-card--shadow');
    }
  }

  /**
   * Define the border radius size
   */
  @Prop({ mutable: true }) radiusSize: RadiusSizeType = 'medium';
  @Watch('radiusSize')
  watchRadiusSize(newValue: MgCard['radiusSize'], oldValue?: MgCard['radiusSize']): void {
    if (!radiusSizes.includes(newValue)) {
      if ((newValue as string) === '') {
        // Reactive frameworks (e.g. Vue) may pass "" instead of undefined when the prop is reset.
        this.radiusSize = radiusSizes[0];
        return;
      }
      throw new Error(`<mg-card> prop "radiusSize" must be one of: ${radiusSizes.join(', ')}. Passed value: ${toString(newValue)}.`);
    } else {
      if (oldValue !== undefined) {
        this.classCollection.delete(`mg-c-card--radius-${oldValue}`);
      }
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
    this.watchRadiusSize(this.radiusSize);
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
