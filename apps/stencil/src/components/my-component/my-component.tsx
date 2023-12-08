import { Component, Prop, State, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * counter
   */
  @State() count = 0;

  /**
   * Get formatted text
   * @returns formated text
   */
  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  /**
   * Add count on click
   */
  private handleClick = () => {
    this.count++;
  };

  render() {
    return (
      <div>
        Hello, World! I'm {this.getText()}
        <mg-button type="button" onClick={this.handleClick} variant="secondary">
          count is {this.count}
        </mg-button>
      </div>
    );
  }
}
