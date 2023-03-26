import { Token } from './token.interface';
import { isAlphabetic, takeWhile, isNumeric, isAlphanumeric } from '../utils/utils';

export function tokenize(input: string) {
  const chars = input.split('');
  const tokens: Token[] = [];
  while (chars.length > 0) {
    const char = chars.shift() as string;
    switch (char) {
      case '(':
        tokens.push({ type: 'OpenBracket', value: char });
        break;
      case ')':
        tokens.push({ type: 'CloseBracket', value: char });
        break;
      case ',':
        tokens.push({ type: 'CommaSeperator', value: char });
        break;
      case "'": {
        const idk = takeWhile(chars, c => c !== "'");
        tokens.push({ type: 'String', value: idk.join('') });
        chars.shift();
        break;
      }
      default:
        if (isAlphabetic(char)) {
          const idk = takeWhile(chars, isAlphanumeric);
          tokens.push({ type: 'Identifier', value: [char, ...idk].join('') });
        } else if (isNumeric(char)) {
          const idk = takeWhile(chars, isNumeric);
          tokens.push({ type: 'Numeric', value: [char, ...idk].join('') });
        }

        break;
    }
  }
  return tokens;
}
