import { Token } from '../lexer/token.interface';
import { Literal, Statement, NumericLiteral, Identifier, CallExpression } from './ast.types';

export function parseUntil(tkens: Token[], predicate: (tks: Token[]) => boolean = c => true): Statement[] {
  const rets: Statement[] = [];
  while (tkens.length > 0 && predicate(tkens)) {
    switch (tkens[0].type) {
      case 'String':
        rets.push(handleString(tkens));
        break;
      case 'Numeric':
        rets.push(handleNumeric(tkens));
        break;
      case 'Identifier': {
        const next = tkens.at(1);
        if (next && next.type == 'OpenBracket') {
          rets.push(handleCallExpression(tkens));
          break;
        }

        rets.push(handleIdentifier(tkens));
        break;
      }
      default:
        tkens.shift();
        break;
    }
  }
  return rets;
}

function handleString(tkens: Token[]) {
  const idk = tkens.shift() as Token;
  return { type: 'Literal', value: idk.value } as Literal;
}

function handleNumeric(tkens: Token[]) {
  const idk = tkens.shift() as Token;
  return { type: 'NumericLiteral', value: Number(idk.value) } as NumericLiteral;
}

function handleIdentifier(tkens: Token[]) {
  const idk = tkens.shift() as Token;
  return { type: 'Identifier', name: idk.value } as Identifier;
}

function handleCallExpression(tkens: Token[]) {
  const idToken = tkens.shift() as Token;
  const id = { type: 'Identifier', name: idToken.value } as Identifier;
  const open = tkens.shift() as Token;
  const args = parseUntil(tkens, ts => ts.at(0)?.type !== 'CloseBracket');
  const close = tkens.shift();
  const callExpr = { type: 'CallExpression', callee: id, arguments: args } as CallExpression;
  return callExpr;
}
