"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
const utils_1 = require("../utils/utils");
function tokenize(input) {
    const chars = input.split('');
    const tokens = [];
    while (chars.length > 0) {
        const char = chars.shift();
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
                const idk = (0, utils_1.takeWhile)(chars, c => c !== "'");
                tokens.push({ type: 'String', value: idk.join('') });
                chars.shift();
                break;
            }
            default:
                if ((0, utils_1.isAlphabetic)(char)) {
                    const idk = (0, utils_1.takeWhile)(chars, utils_1.isAlphanumeric);
                    tokens.push({ type: 'Identifier', value: [char, ...idk].join('') });
                }
                else if ((0, utils_1.isNumeric)(char)) {
                    const idk = (0, utils_1.takeWhile)(chars, utils_1.isNumeric);
                    tokens.push({ type: 'Numeric', value: [char, ...idk].join('') });
                }
                break;
        }
    }
    return tokens;
}
exports.tokenize = tokenize;
