export function isAlphabetic(char: string) {
  return /[a-zA-Z]/.test(char);
}

export function isNumeric(char: string) {
  return /[0-9]/.test(char);
}

export function isAlphanumeric(char: string) {
  return isAlphabetic(char) || isNumeric(char);
}

export function takeWhile<T>(arr: T[], fn: (char: T) => boolean): T[] {
  const ret: T[] = [];
  while (arr.length > 0 && fn(arr[0])) {
    ret.push(arr.shift() as T);
  }
  return ret;
}
