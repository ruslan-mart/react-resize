"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeHandler = void 0;
var tslib_1 = require("tslib");
var ResizeDirection_1 = require("../../constants/ResizeDirection");
var ResizeOrigin_1 = require("../../constants/ResizeOrigin");
var parseCurrentRect_1 = require("../../helpers/parseCurrentRect");
var constants_1 = require("./constants");
var ResizeHandler = /** @class */ (function () {
    function ResizeHandler(onStateChange) {
        var _this = this;
        this.containerNode = null;
        this.boxSizing = {};
        this.disabled = false;
        this.handlers = {};
        this.direction = ResizeDirection_1.ResizeDirection.RIGHT;
        this.heightIsMinimized = false;
        this.heightIsMaximized = false;
        this.isResizing = false;
        this.origin = ResizeOrigin_1.ResizeOrigin.MOUSE;
        this.widthIsMinimized = false;
        this.widthIsMaximized = false;
        this.end = function () {
            _this.destroy();
            var _a = _this, currentValues = _a.currentValues, direction = _a.direction, handlers = _a.handlers, origin = _a.origin, side = _a.side;
            if (handlers.onResizeEnd) {
                handlers.onResizeEnd(tslib_1.__assign({ direction: direction, origin: origin, side: side }, currentValues));
            }
        };
        this.defineSideMap = function (clientX, clientY) {
            var _a = _this, cacheClientValues = _a.cacheClientValues, direction = _a.direction, side = _a.side;
            var isHorizontalMove = clientX - cacheClientValues.x !== 0;
            var isVerticalMove = clientY - cacheClientValues.y !== 0;
            cacheClientValues.x = clientX;
            cacheClientValues.y = clientY;
            var valueIsDirectionCallback = function (value) { return value === direction; };
            side.bottom = isVerticalMove && constants_1.directionSides.bottom.some(valueIsDirectionCallback);
            side.left = isHorizontalMove && constants_1.directionSides.left.some(valueIsDirectionCallback);
            side.right = isHorizontalMove && constants_1.directionSides.right.some(valueIsDirectionCallback);
            side.top = isVerticalMove && constants_1.directionSides.top.some(valueIsDirectionCallback);
        };
        this.getBoxValues = function () {
            var _a = _this.boxSizing, _b = _a.maxHeight, maxHeight = _b === void 0 ? Infinity : _b, _c = _a.maxWidth, maxWidth = _c === void 0 ? Infinity : _c, _d = _a.minHeight, minHeight = _d === void 0 ? 0 : _d, _e = _a.minWidth, minWidth = _e === void 0 ? 0 : _e;
            return {
                maxHeight: Math.max(0, maxHeight),
                maxWidth: Math.max(0, maxWidth),
                minHeight: Math.max(0, Math.min(minHeight, maxHeight)),
                minWidth: Math.max(0, Math.min(minWidth, maxWidth)),
            };
        };
        this.handleMouseMove = function (event) {
            var clientX = event.clientX, clientY = event.clientY;
            _this.move(clientX, clientY);
        };
        this.handleMouseUp = function () {
            _this.end();
        };
        this.handleTouchMove = function (event) {
            var _a = event.touches[0], clientX = _a.clientX, clientY = _a.clientY;
            _this.move(clientX, clientY);
        };
        this.handleTouchEnd = function () {
            _this.end();
        };
        this.move = function (clientX, clientY) {
            if (_this.disabled || _this.containerNode === null) {
                return _this.end();
            }
            var _a = _this, currentValues = _a.currentValues, direction = _a.direction, handlers = _a.handlers, initialValues = _a.initialValues, origin = _a.origin, side = _a.side;
            _this.defineSideMap(clientX, clientY);
            if (!_this.isResizing) {
                _this.isResizing = true;
                _this.onStateChange(direction);
                if (handlers.onResizeStart) {
                    var handlerValue = handlers.onResizeStart(tslib_1.__assign({ direction: direction, origin: origin, side: side }, initialValues));
                    if (handlerValue === false) {
                        return _this.end();
                    }
                }
            }
            _this[constants_1.directionHandlerKeyAliases[direction]]({ clientX: clientX, clientY: clientY });
            var _b = _this.getBoxValues(), maxHeight = _b.maxHeight, maxWidth = _b.maxWidth, minHeight = _b.minHeight, minWidth = _b.minWidth;
            currentValues.height = Math.max(minHeight, Math.min(maxHeight, currentValues.height));
            currentValues.width = Math.max(minWidth, Math.min(maxWidth, currentValues.width));
            if (side.left) {
                currentValues.x = initialValues.x + initialValues.width - currentValues.width;
            }
            if (side.top) {
                currentValues.y = initialValues.y + initialValues.height - currentValues.height;
            }
            if (handlers.onResize) {
                var handlerValue = handlers.onResize(tslib_1.__assign({ direction: direction, origin: origin, side: side }, currentValues));
                if (handlerValue === false) {
                    return _this.end();
                }
                if (handlerValue !== null && typeof handlerValue === 'object') {
                    var _c = handlerValue.height, height = _c === void 0 ? null : _c, _d = handlerValue.width, width = _d === void 0 ? null : _d;
                    if (height !== null) {
                        currentValues.height = Math.max(minHeight, Math.min(maxHeight, height));
                    }
                    if (width !== null) {
                        currentValues.width = Math.max(minWidth, Math.min(maxWidth, width));
                    }
                }
            }
            var currentHeightIsMaximized = currentValues.height === maxHeight;
            var currentHeightIsMinimized = currentValues.height === minHeight;
            var currentWidthIsMaximized = currentValues.width === maxWidth;
            var currentWidthIsMinimized = currentValues.width === minWidth;
            if (handlers.onResizeMax &&
                ((currentHeightIsMaximized && !_this.heightIsMaximized) ||
                    (currentWidthIsMaximized && !_this.widthIsMaximized))) {
                handlers.onResizeMax(tslib_1.__assign({ axis: {
                        height: currentHeightIsMaximized,
                        width: currentWidthIsMaximized,
                    }, direction: direction, origin: origin, side: side }, currentValues));
            }
            if (handlers.onResizeMin &&
                ((currentHeightIsMinimized && !_this.heightIsMinimized) ||
                    (currentWidthIsMinimized && !_this.widthIsMinimized))) {
                handlers.onResizeMin(tslib_1.__assign({ axis: {
                        height: currentHeightIsMinimized,
                        width: currentWidthIsMinimized,
                    }, direction: direction, origin: origin, side: side }, currentValues));
            }
            if (currentHeightIsMaximized !== _this.heightIsMaximized) {
                _this.heightIsMaximized = currentHeightIsMaximized;
            }
            if (currentWidthIsMaximized !== _this.widthIsMaximized) {
                _this.widthIsMaximized = currentWidthIsMaximized;
            }
            if (currentHeightIsMinimized !== _this.heightIsMinimized) {
                _this.heightIsMinimized = currentHeightIsMinimized;
            }
            if (currentWidthIsMinimized !== _this.widthIsMinimized) {
                _this.widthIsMinimized = currentWidthIsMinimized;
            }
            window.requestAnimationFrame(_this.updateDOM);
        };
        this.updateDOM = function () {
            var _a;
            var _b = _this, containerNode = _b.containerNode, currentValues = _b.currentValues;
            if (containerNode !== null) {
                var position = window.getComputedStyle(containerNode).position;
                (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
                containerNode.style.height = "".concat(currentValues.height, "px");
                containerNode.style.width = "".concat(currentValues.width, "px");
                if (position === 'absolute' || position === 'fixed') {
                    containerNode.style.left = "".concat(currentValues.x, "px");
                    containerNode.style.top = "".concat(currentValues.y, "px");
                }
            }
        };
        this.initialValues = {
            height: 0,
            width: 0,
            x: 0,
            y: 0,
        };
        this.currentValues = tslib_1.__assign({}, this.initialValues);
        this.startValues = {
            x: 0,
            y: 0,
        };
        this.cacheClientValues = tslib_1.__assign({}, this.startValues);
        this.side = {
            bottom: false,
            left: false,
            right: false,
            top: false,
        };
        this.onStateChange = onStateChange;
    }
    ResizeHandler.prototype.destroy = function () {
        this.isResizing = false;
        this.onStateChange(null);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
    };
    ResizeHandler.prototype.startResize = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY, direction = _a.direction, origin = _a.origin;
        if (this.containerNode !== null && !this.disabled) {
            var initialRect = (0, parseCurrentRect_1.parseCurrentRect)(this.containerNode);
            this.direction = direction;
            this.origin = origin;
            this.cacheClientValues.x = clientX;
            this.cacheClientValues.y = clientY;
            this.currentValues = tslib_1.__assign({}, initialRect);
            this.initialValues = tslib_1.__assign({}, initialRect);
            this.startValues.x = clientX;
            this.startValues.y = clientY;
            switch (origin) {
                case ResizeOrigin_1.ResizeOrigin.MOUSE:
                    document.addEventListener('mousemove', this.handleMouseMove);
                    document.addEventListener('mouseup', this.handleMouseUp);
                    break;
                case ResizeOrigin_1.ResizeOrigin.TOUCH:
                    document.addEventListener('touchmove', this.handleTouchMove);
                    document.addEventListener('touchend', this.handleTouchEnd);
                    break;
                default:
                    return;
            }
        }
    };
    ResizeHandler.prototype[constants_1.DirectionHandler.HANDLE_BOTTOM] = function (values) {
        this.currentValues.height = this.initialValues.height + values.clientY - this.startValues.y;
    };
    ResizeHandler.prototype[constants_1.DirectionHandler.HANDLE_BOTTOM_LEFT] = function (values) {
        this[constants_1.DirectionHandler.HANDLE_LEFT](values);
        this[constants_1.DirectionHandler.HANDLE_BOTTOM](values);
    };
    ResizeHandler.prototype[constants_1.DirectionHandler.HANDLE_BOTTOM_RIGHT] = function (values) {
        this[constants_1.DirectionHandler.HANDLE_RIGHT](values);
        this[constants_1.DirectionHandler.HANDLE_BOTTOM](values);
    };
    ResizeHandler.prototype[constants_1.DirectionHandler.HANDLE_LEFT] = function (values) {
        this.currentValues.width = this.initialValues.width + this.startValues.x - values.clientX;
    };
    ResizeHandler.prototype[constants_1.DirectionHandler.HANDLE_RIGHT] = function (values) {
        this.currentValues.width = this.initialValues.width + values.clientX - this.startValues.x;
    };
    ResizeHandler.prototype[constants_1.DirectionHandler.HANDLE_TOP] = function (values) {
        this.currentValues.height = this.initialValues.height + this.startValues.y - values.clientY;
    };
    ResizeHandler.prototype[constants_1.DirectionHandler.HANDLE_TOP_LEFT] = function (values) {
        this[constants_1.DirectionHandler.HANDLE_LEFT](values);
        this[constants_1.DirectionHandler.HANDLE_TOP](values);
    };
    ResizeHandler.prototype[constants_1.DirectionHandler.HANDLE_TOP_RIGHT] = function (values) {
        this[constants_1.DirectionHandler.HANDLE_RIGHT](values);
        this[constants_1.DirectionHandler.HANDLE_TOP](values);
    };
    return ResizeHandler;
}());
exports.ResizeHandler = ResizeHandler;
