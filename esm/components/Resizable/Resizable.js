import { __assign, __rest } from "tslib";
import React, { createElement, forwardRef, useImperativeHandle, useRef } from 'react';
import { useResize } from '../../hooks/useResize';
import { ResizableContext } from '../ResizableContext';
/**
 * It is a container component that will be «resizable».
 * @see https://github.com/ruslan-mart/react-resize#resizable-component
 */
export var Resizable = forwardRef(function (props, currentRef) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, disabled = props.disabled, maxHeight = props.maxHeight, maxWidth = props.maxWidth, minHeight = props.minHeight, minWidth = props.minWidth, onResize = props.onResize, onResizeEnd = props.onResizeEnd, onResizeMax = props.onResizeMax, onResizeMin = props.onResizeMin, onResizeStart = props.onResizeStart, otherProps = __rest(props, ["as", "children", "disabled", "maxHeight", "maxWidth", "minHeight", "minWidth", "onResize", "onResizeEnd", "onResizeMax", "onResizeMin", "onResizeStart"]);
    var containerRef = useRef(null);
    useImperativeHandle(currentRef, function () { return containerRef.current; });
    var _b = useResize({
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
    return createElement(as, __assign({ ref: containerRef }, otherProps), React.createElement(ResizableContext.Provider, { value: { attachPoint: attachPoint, currentDirection: currentDirection, isResizing: isResizing } }, children));
});
Resizable.displayName = 'Resizable';
