/**
 * 
 */
export class OverflowBehavior {
  // variables
  private _resizeObserver: ResizeObserver;
  private _availableWidth: number;

  constructor(
    private parentElement: HTMLElement,
    private itemMoreElement:  HTMLElement,
    private itemMoreContainerElement: HTMLElement
  ) {
    if(!this.parentElement || !this.itemMoreElement || !this.itemMoreContainerElement) {
      throw new Error('OverflowBehavior - all construtor params are required')
    }

    const items = Array.from(this.parentElement.children) as HTMLElement[]

    this._resizeObserver = new ResizeObserver(entries => {
      this._availableWidth = entries.map(entry => entry.contentRect.width).sort((a, b) => a - b).shift();
      // reset items
      items.forEach(item => this.toggleItem(item, false));
      
      let accWidth = 0;

      items.forEach((item, index) => {
        accWidth += item.offsetWidth;
        if(index) this.toggleItem(item, this.isOverflowElement(accWidth, item))
      });
    });
    this._resizeObserver.observe(this.parentElement);
  }

  /**********
   * Public *
   **********/

  /**
   * Disconnect ResizeObserver
   */
  public disconnect = (): void => {
    this._resizeObserver.disconnect();
  };

  /************
   * Internal *
   ************/

  /**
   * Utility method to know if element is HTMLMgItemMoreElement
   * @param element - element to match with 'MORE' element
   * @returns truthy if element is the 'MORE' element
   */
  private isMoreElement = (element: HTMLElement): element is HTMLMgItemMoreElement => element === this.itemMoreElement;

  /**
   * Utility method to know if item overflow partialy or totaly in the container
   * @param cumulateWidth - previous sibling elements cumulate width + item width
   * @param item - item HTML element
   * @returns truthy if element is overflow
   */
  private isOverflowElement = (cumulateWidth: number, item: HTMLElement): boolean => {
    const displayMgItemMore = this.itemMoreContainerElement.children.length > 0
    if (!this.isMoreElement(item)) {
      if (item.nextElementSibling.nodeName !== 'MG-ITEM-MORE' && !displayMgItemMore) return cumulateWidth + this.itemMoreElement.offsetWidth > this._availableWidth;
      else return cumulateWidth > this._availableWidth;
    }
    else return !displayMgItemMore;
  };

  /**
   * Toogle item from isHidden condition
   * @param item - item to update
   * @param isHidden - item is hidden
   */
  private toggleItem = (item: HTMLElement, isHidden: boolean):void => {
    if (this.isMoreElement(item) && isHidden) item.setAttribute('hidden', '');
    else if(this.isMoreElement(item) && !isHidden) item.removeAttribute('hidden');
    else if (!this.isMoreElement(item) && isHidden) this.itemMoreContainerElement.appendChild(item)
    else if(!this.isMoreElement(item) && item.parentElement !== this.parentElement) this.parentElement.insertBefore(item, this.itemMoreElement)
  }
}
