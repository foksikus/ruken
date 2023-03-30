export type StatementType = 'Program' | 'NumericLiteral' | 'Literal' | 'Identifier' | 'CallExpression';

export interface Statement {
  type: StatementType;
}

export interface Identifier extends Statement {
  type: 'Identifier';
  name: string;
}

export interface Literal extends Statement {
  type: 'Literal';
  value: string;
}

export interface NumericLiteral extends Statement {
  type: 'NumericLiteral';
  value: number;
}

export interface CallExpression extends Statement {
  type: 'CallExpression';
  callee: Identifier;
  arguments: Statement[];
}

export interface Program extends Statement {
  type: 'Program';
  body: Statement[];
}
