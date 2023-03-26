export type TokenType = 'String' | 'Numeric' | 'OpenBracket' | 'CloseBracket' | 'StringClosure' | 'CommaSeperator' | 'StringLiteral' | 'Identifier';

export interface Token {
  type: TokenType;
  value: string;
}
