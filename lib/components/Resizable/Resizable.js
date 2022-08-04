"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resizable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var useResize_1 = require("../../hooks/useResize");
var ResizableContext_1 = require("../ResizableContext");
/**
 * It is a container component that will be «resizable».
 * @see https://github.com/ruslan-mart/react-resize#resizable-component
 */
exports.Resizable = (0, react_1.forwardRef)(function (props, currentRef) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, disabled = props.disabled, maxHeight = props.maxHeight, maxWidth = props.maxWidth, minHeight = props.minHeight, minWidth = props.minWidth, onResize = props.onResize, onResizeEnd = props.onResizeEnd, onResizeMax = props.onResizeMax, onResizeMin = props.onResizeMin, onResizeStart = props.onResizeStart, otherProps = tslib_1.__rest(props, ["as", "children", "disabled", "maxHeight", "maxWidth", "minHeight", "minWidth", "onResize", "onResizeEnd", "onResizeMax", "onResizeMin", "onResizeStart"]);
    var containerRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(currentRef, function () { return containerRef.current; });
    var _b = (0, useResize_1.useResize)({
        containerRef: containerRef,
        disabled: disabled,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        minHeight: minHeight,
        minWidth: minWidth,
        onResize: onResize,
        onResizeEnd: onResizeEnd,
        onResizeMax: onResizeMax,
        onResizeMin: onResizeMin,
        onResizeStart: onResizeStart,
    }), attachPoint = _b.attachPoint, currentDirection = _b.currentDirection, isResizing = _b.isResizing;
    return (0, react_1.createElement)(as, tslib_1.__assign({ ref: containerRef }, otherProps), react_1.default.createElement(ResizableContext_1.ResizableContext.Provider, { value: { attachPoint: attachPoint, currentDirection: currentDirection, isResizing: isResizing } }, children));
});
exports.Resizable.displayName = 'Resizable';
