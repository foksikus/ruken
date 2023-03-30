"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUntil = void 0;
function parseUntil(tkens, predicate) {
    const rets = [];
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
exports.parseUntil = parseUntil;
function handleString(tkens) {
    const idk = tkens.shift();
    return { type: 'Literal', value: idk.value };
}
function handleNumeric(tkens) {
    const idk = tkens.shift();
    return { type: 'NumericLiteral', value: Number(idk.value) };
}
function handleIdentifier(tkens) {
    const idk = tkens.shift();
    return { type: 'Identifier', name: idk.value };
}
function handleCallExpression(tkens) {
    const idToken = tkens.shift();
    const id = { type: 'Identifier', name: idToken.value };
    const open = tkens.shift();
    const args = parseUntil(tkens, ts => { var _a; return ((_a = ts.at(0)) === null || _a === void 0 ? void 0 : _a.type) !== 'CloseBracket'; });
    const close = tkens.shift();
    const callExpr = { type: 'CallExpression', callee: id, arguments: args };
    return callExpr;
}
