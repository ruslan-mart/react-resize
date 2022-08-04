"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeDirectionHandlers = exports.getCoordsBy = void 0;
var ResizeDirection_1 = require("../../constants/ResizeDirection");
exports.getCoordsBy = {
    mouse: function (event) {
        var clientX = event.clientX, clientY = event.clientY;
        return [clientX, clientY];
    },
    touch: function (event) {
        var _a = event.touches[0], clientX = _a.clientX, clientY = _a.clientY;
        return [clientX, clientY];
    },
};
exports.resizeDirectionHandlers = (_a = {},
    _a[ResizeDirection_1.ResizeDirection.BOTTOM] = function (_a) {
        var clientY = _a.clientY, initialHeight = _a.initialHeight, startY = _a.startY;
        return {
            currentHeight: initialHeight + clientY - startY,
        };
    },
    _a[ResizeDirection_1.ResizeDirection.BOTTOM_LEFT] = function (options) {
        return Object.assign(this[ResizeDirection_1.ResizeDirection.BOTTOM](options), this[ResizeDirection_1.ResizeDirection.LEFT](options));
    },
    _a[ResizeDirection_1.ResizeDirection.BOTTOM_RIGHT] = function (options) {
        return Object.assign(this[ResizeDirection_1.ResizeDirection.BOTTOM](options), this[ResizeDirection_1.ResizeDirection.RIGHT](options));
    },
    _a[ResizeDirection_1.ResizeDirection.LEFT] = function (_a) {
        var clientX = _a.clientX, initialX = _a.initialX, initialWidth = _a.initialWidth, startX = _a.startX;
        return {
            currentX: initialX + clientX - startX,
            currentWidth: initialWidth + startX - clientX,
        };
    },
    _a[ResizeDirection_1.ResizeDirection.RIGHT] = function (_a) {
        var clientX = _a.clientX, initialWidth = _a.initialWidth, startX = _a.startX;
        return {
            currentWidth: initialWidth + clientX - startX,
        };
    },
    _a[ResizeDirection_1.ResizeDirection.TOP] = function (_a) {
        var clientY = _a.clientY, initialHeight = _a.initialHeight, initialY = _a.initialY, startY = _a.startY;
        return {
            currentHeight: initialHeight + startY - clientY,
            currentY: initialY + clientY - startY,
        };
    },
    _a[ResizeDirection_1.ResizeDirection.TOP_LEFT] = function (options) {
        return Object.assign(this[ResizeDirection_1.ResizeDirection.TOP](options), this[ResizeDirection_1.ResizeDirection.LEFT](options));
    },
    _a[ResizeDirection_1.ResizeDirection.TOP_RIGHT] = function (options) {
        return Object.assign(this[ResizeDirection_1.ResizeDirection.TOP](options), this[ResizeDirection_1.ResizeDirection.RIGHT](options));
    },
    _a);
