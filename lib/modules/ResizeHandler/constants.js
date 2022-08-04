"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.directionSides = exports.directionHandlerKeyAliases = exports.DirectionHandler = void 0;
var ResizeDirection_1 = require("../../constants/ResizeDirection");
var DirectionHandler;
(function (DirectionHandler) {
    DirectionHandler["HANDLE_BOTTOM"] = "handleBottom";
    DirectionHandler["HANDLE_BOTTOM_LEFT"] = "handleBottomLeft";
    DirectionHandler["HANDLE_BOTTOM_RIGHT"] = "handleBottomRight";
    DirectionHandler["HANDLE_LEFT"] = "handleLeft";
    DirectionHandler["HANDLE_RIGHT"] = "handleRight";
    DirectionHandler["HANDLE_TOP"] = "handleTop";
    DirectionHandler["HANDLE_TOP_LEFT"] = "handleTopLeft";
    DirectionHandler["HANDLE_TOP_RIGHT"] = "handleTopRight";
})(DirectionHandler = exports.DirectionHandler || (exports.DirectionHandler = {}));
exports.directionHandlerKeyAliases = (_a = {},
    _a[ResizeDirection_1.ResizeDirection.BOTTOM] = DirectionHandler.HANDLE_BOTTOM,
    _a[ResizeDirection_1.ResizeDirection.BOTTOM_LEFT] = DirectionHandler.HANDLE_BOTTOM_LEFT,
    _a[ResizeDirection_1.ResizeDirection.BOTTOM_RIGHT] = DirectionHandler.HANDLE_BOTTOM_RIGHT,
    _a[ResizeDirection_1.ResizeDirection.LEFT] = DirectionHandler.HANDLE_LEFT,
    _a[ResizeDirection_1.ResizeDirection.RIGHT] = DirectionHandler.HANDLE_RIGHT,
    _a[ResizeDirection_1.ResizeDirection.TOP] = DirectionHandler.HANDLE_TOP,
    _a[ResizeDirection_1.ResizeDirection.TOP_LEFT] = DirectionHandler.HANDLE_TOP_LEFT,
    _a[ResizeDirection_1.ResizeDirection.TOP_RIGHT] = DirectionHandler.HANDLE_TOP_RIGHT,
    _a);
exports.directionSides = {
    bottom: [ResizeDirection_1.ResizeDirection.BOTTOM, ResizeDirection_1.ResizeDirection.BOTTOM_LEFT, ResizeDirection_1.ResizeDirection.BOTTOM_RIGHT],
    left: [ResizeDirection_1.ResizeDirection.BOTTOM_LEFT, ResizeDirection_1.ResizeDirection.LEFT, ResizeDirection_1.ResizeDirection.TOP_LEFT],
    right: [ResizeDirection_1.ResizeDirection.BOTTOM_RIGHT, ResizeDirection_1.ResizeDirection.RIGHT, ResizeDirection_1.ResizeDirection.TOP_RIGHT],
    top: [ResizeDirection_1.ResizeDirection.TOP, ResizeDirection_1.ResizeDirection.TOP_LEFT, ResizeDirection_1.ResizeDirection.TOP_RIGHT],
};
