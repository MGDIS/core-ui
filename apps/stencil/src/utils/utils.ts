export function format(first: string, middle: string, last: string): string {
  return (typeof first === 'string' ? first : '') + (typeof middle === 'string' ? ` ${middle}` : '') + (typeof last === 'string' ? ` ${last}` : '');
}
