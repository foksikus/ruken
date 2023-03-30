import { Program } from './ast/ast.types';
import { tokenize } from './lexer/lexer';
import { parseUntil } from './ast/aster';

const prog: Program = createProgram("say('Hallo Welt', 34234, eval())");

function createProgram(code: string): Program {
  const tokens = tokenize(code);
  const prog: Program = {
    type: 'Program',
    body: []
  };
  prog.body = parseUntil(tokens);
  return prog;
}
console.log(JSON.stringify(prog));
