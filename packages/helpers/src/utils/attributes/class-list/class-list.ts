/**
 * Class to manage component classlist
 */
export class ClassList {
  /**
   * Available classes
   */
  classes: string[];

  constructor(classlist: string[] = []) {
    this.classes = classlist;
  }

  /**
   * Add class
   * @param className - class name to add
   */
  add = (className: string): void => {
    if (!this.has(className)) {
      this.classes.push(className);
    }
  };

  /**
   * Delete class
   * @param className - class name to delete
   */
  delete = (className: string): void => {
    const index = this.classes.indexOf(className);
    if (index > -1) {
      this.classes.splice(index, 1);
    }
  };

  /**
   * Check if class exist in list
   * @param className - class name to check
   * @returns class name is in the list
   */
  has = (className: string): boolean => {
    return this.classes.includes(className);
  };

  /**
   * Join classes seperated by spaces
   * @returns joined values
   */
  join = (): string => {
    return this.classes.join(' ');
  };
}
