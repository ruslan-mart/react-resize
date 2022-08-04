import { __assign, __rest } from "tslib";
import React, { createElement, forwardRef, useContext, useEffect, useImperativeHandle, useRef, } from 'react';
import { ResizableContext } from '../ResizableContext';
var ResizePointLocal = function (props) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, context = props.context, currentRef = props.currentRef, direction = props.direction, _b = props.onMouseDown, onMouseDown = _b === void 0 ? null : _b, _c = props.onTouchStart, onTouchStart = _c === void 0 ? null : _c, otherProps = __rest(props, ["as", "children", "context", "currentRef", "direction", "onMouseDown", "onTouchStart"]);
    var attachPointHandlers = context.attachPoint(direction);
    var containerRef = useRef(null);
    var handleMouseDown = function (event) {
        attachPointHandlers.onMouseDown(event);
        if (onMouseDown !== null) {
            onMouseDown(event);
        }
    };
    var handleTouchStart = function (event) {
        attachPointHandlers.onTouchStart(event);
        if (onTouchStart !== null) {
            onTouchStart(event);
        }
    };
    useImperativeHandle(currentRef, function () { return containerRef.current; });
    return createElement(as, __assign({ onMouseDown: handleMouseDown, onTouchStart: handleTouchStart, ref: containerRef }, otherProps), children);
};
/**
 * This component is a trigger for changing the size of `Resizable` container.
 * Use this component only inside `<Resizable>`.
 * @see https://github.com/ruslan-mart/react-resize#resizepoint-component
 * @see https://github.com/ruslan-mart/react-resize#resizepoint-usage
 */
export var ResizePoint = forwardRef(function (props, currentRef) {
    var children = props.children, otherProps = __rest(props, ["children"]);
    var context = useContext(ResizableContext);
    useEffect(function () {
        if (context === null) {
            console.warn('Component "ResizePoint" can only be inside "Resizable"');
        }
    }, [context]);
    return context !== null ? (React.createElement(ResizePointLocal, __assign({ context: context, currentRef: currentRef }, otherProps), children)) : null;
});
ResizePointLocal.displayName = 'ResizePointLocal';
ResizePoint.displayName = 'ResizePoint';
