"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeWhile = exports.isAlphanumeric = exports.isNumeric = exports.isAlphabetic = void 0;
function isAlphabetic(char) {
    return /[a-zA-Z]/.test(char);
}
exports.isAlphabetic = isAlphabetic;
function isNumeric(char) {
    return /[0-9]/.test(char);
}
exports.isNumeric = isNumeric;
function isAlphanumeric(char) {
    return isAlphabetic(char) || isNumeric(char);
}
exports.isAlphanumeric = isAlphanumeric;
function takeWhile(arr, fn) {
    const ret = [];
    while (arr.length > 0 && fn(arr[0])) {
        ret.push(arr.shift());
    }
    return ret;
}
exports.takeWhile = takeWhile;
