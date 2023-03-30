import { Program, Statement, CallExpression, NumericLiteral, Literal, Identifier } from './ast/ast.types';
import { tokenize } from './lexer/lexer';
import { parseUntil } from './ast/aster';

interface Method {
  (...args: unknown[]): unknown;
}

interface Scope {
  args: Record<string, number | string>;
  methods: Record<string, Method>;
}
const scope: Scope = {
  args: {
    abc: 'abc-variable'
  },
  methods: {
    say: console.log,
    eval: () => 'evaluated value'
  }
};

const prog: Program = createProgram("say('Hallo Welt', abc, 34234, eval())");
// console.log(JSON.stringify(prog));
callProgram(prog, scope);

function createProgram(code: string): Program {
  const tokens = tokenize(code);
  const prog: Program = {
    type: 'Program',
    body: []
  };
  prog.body = parseUntil(tokens);
  return prog;
}

function callProgram(prog: Program, scope: Scope) {
  const resolved = prog.body.map(node => resolve(node, scope));
}

function resolve(node: Statement, scope: Scope) {
  if (node.type === 'CallExpression') {
    const callExpr = node as CallExpression;
    const resolved: unknown[] = callExpr.arguments.map(arg => resolve(arg, scope));
    const method = scope.methods[callExpr.callee.name];
    if (method === undefined) {
      throw new Error(`Unknown method ${callExpr.callee.name}`);
    }
    return method(...resolved);
  } else if (node.type === 'NumericLiteral') {
    const numericLiteral = node as NumericLiteral;
    return numericLiteral.value;
  } else if (node.type === 'Literal') {
    const numericLiteral = node as Literal;
    return numericLiteral.value;
  } else if (node.type === 'Identifier') {
    const identifier = node as Identifier;
    const arg = scope.args[identifier.name];
    if (arg === undefined) {
      throw new Error(`Unknown identifier ${identifier.name}`);
    }
    return arg;
  }
}
