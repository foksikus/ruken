import { Program, Statement, CallExpression, NumericLiteral, Literal, Identifier } from '../ast/ast.types';
import { Scope } from './scope.type';
import { tokenize } from '../lexer/lexer';
import { parseUntil } from '../ast/aster';
export default class Resolver {
  constructor(private scope: Scope) {}

  resolve(code: string) {
    const prog: Program = this.createProgram(code);
    // console.log(JSON.stringify(prog));
    this.resolveProgram(prog, this.scope);
  }

  private createProgram(code: string): Program {
    const tokens = tokenize(code);
    const prog: Program = {
      type: 'Program',
      body: []
    };
    prog.body = parseUntil(tokens);
    return prog;
  }

  private resolveProgram(prog: Program, scope: Scope) {
    return prog.body.map(node => this.resolveNode(node, scope));
  }

  private resolveNode(node: Statement, scope: Scope) {
    if (node.type === 'CallExpression') {
      const callExpr = node as CallExpression;
      const resolved: unknown[] = callExpr.arguments.map(arg => this.resolveNode(arg, scope));
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
}
