"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("./lexer/lexer");
const aster_1 = require("./ast/aster");
const input = "say('Hallo Welt', 34234, eval())";
const tokens = (0, lexer_1.tokenize)(input);
console.log('tokens', tokens);
const prog = {
    type: 'Program',
    body: []
};
prog.body = (0, aster_1.parseUntil)(tokens, c => true);
console.log(JSON.stringify(prog));
