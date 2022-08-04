"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCurrentRect = void 0;
var parseCurrentRect = function (node) {
    var _a = window.getComputedStyle(node), height = _a.height, left = _a.left, top = _a.top, width = _a.width;
    return {
        height: parseFloat(height),
        width: parseFloat(width),
        x: parseFloat(left),
        y: parseFloat(top),
    };
};
exports.parseCurrentRect = parseCurrentRect;
