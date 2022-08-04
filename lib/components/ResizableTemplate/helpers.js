"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCornerOptions = void 0;
var ResizeDirection_1 = require("../../constants/ResizeDirection");
var constants_1 = require("./constants");
var getCornerOptions = function (disallowHorizontal, disallowVertical) {
    if (!disallowHorizontal && !disallowVertical) {
        return {
            cursor: 'se-resize',
            direction: ResizeDirection_1.ResizeDirection.BOTTOM_RIGHT,
            style: constants_1.cornerStyle,
        };
    }
    if (!disallowHorizontal) {
        return {
            cursor: 'e-resize',
            direction: ResizeDirection_1.ResizeDirection.RIGHT,
            style: constants_1.cornerStyle,
        };
    }
    if (!disallowVertical) {
        return {
            cursor: 's-resize',
            direction: ResizeDirection_1.ResizeDirection.BOTTOM,
            style: constants_1.cornerStyle,
        };
    }
    return null;
};
exports.getCornerOptions = getCornerOptions;
