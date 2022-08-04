import { __assign, __rest } from "tslib";
import React, { createElement, forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { ResizableContext } from '../ResizableContext';
import { ResizePoint } from '../ResizePoint';
import { ResizeDirection } from '../../constants/ResizeDirection';
import { useBodyCursor } from '../../hooks/useBodyCursor';
import { allSideCursorMap, allSideStyleMap } from './constants';
import { getCornerOptions } from './helpers';
/**
 * This component is a template that creates a set of trigger points for the change of the element's size at all sides (including corners).
 * Use this component only inside `<Resizable>`.
 * @see https://github.com/ruslan-mart/react-resize#resizetemplateallside-component
 * @see https://github.com/ruslan-mart/react-resize#resizetemplateallside-usage
 */
export var AllSide = forwardRef(function (props, currentRef) {
    var _a;
    var _b = props.as, as = _b === void 0 ? 'div' : _b, _c = props.disallowBottom, disallowBottom = _c === void 0 ? false : _c, _d = props.disallowLeft, disallowLeft = _d === void 0 ? false : _d, _e = props.disallowRight, disallowRight = _e === void 0 ? false : _e, _f = props.disallowTop, disallowTop = _f === void 0 ? false : _f, otherProps = __rest(props, ["as", "disallowBottom", "disallowLeft", "disallowRight", "disallowTop"]);
    var containerRef = useRef(null);
    var context = useContext(ResizableContext);
    var currentDirection = (_a = context === null || context === void 0 ? void 0 : context.currentDirection) !== null && _a !== void 0 ? _a : null;
    var sideMap = [
        [ResizeDirection.BOTTOM, !disallowBottom],
        [ResizeDirection.LEFT, !disallowLeft],
        [ResizeDirection.RIGHT, !disallowRight],
        [ResizeDirection.TOP, !disallowTop],
        [ResizeDirection.BOTTOM_LEFT, !disallowBottom && !disallowLeft],
        [ResizeDirection.BOTTOM_RIGHT, !disallowBottom && !disallowRight],
        [ResizeDirection.TOP_LEFT, !disallowTop && !disallowLeft],
        [ResizeDirection.TOP_RIGHT, !disallowTop && !disallowRight],
    ];
    useBodyCursor(currentDirection && allSideCursorMap[currentDirection]);
    useImperativeHandle(currentRef, function () { return containerRef.current; });
    return createElement(as, __assign({ ref: containerRef }, otherProps), sideMap.map(function (_a) {
        var direction = _a[0], visible = _a[1];
        return (visible && (React.createElement(ResizePoint, { as: "span", direction: direction, key: direction, style: __assign({ cursor: currentDirection === null ? allSideCursorMap[direction] : '' }, allSideStyleMap[direction]) })));
    }));
});
/**
 * This component is a template that creates a trigger point for the change of the element's size.
 * An element «corner» will be used as interactive element in the bottom-right corner of the parent element.
 * @see https://github.com/ruslan-mart/react-resize#resizetemplatecorner-component
 * @see https://github.com/ruslan-mart/react-resize#resizetemplatecorner-usage
 */
export var Corner = forwardRef(function (props, currentRef) {
    var as = props.as, _a = props.disallowHorizontal, disallowHorizontal = _a === void 0 ? false : _a, _b = props.disallowVertical, disallowVertical = _b === void 0 ? false : _b, style = props.style, otherProps = __rest(props, ["as", "disallowHorizontal", "disallowVertical", "style"]);
    var containerRef = useRef(null);
    var context = useContext(ResizableContext);
    var isResizing = Boolean(context === null || context === void 0 ? void 0 : context.isResizing);
    var options = getCornerOptions(disallowHorizontal, disallowVertical);
    useBodyCursor(isResizing && options !== null ? options.cursor : null);
    useImperativeHandle(currentRef, function () { return containerRef.current; });
    return options !== null ? (React.createElement(ResizePoint, __assign({ as: as, direction: options.direction, ref: containerRef, style: __assign(__assign(__assign({}, options.style), style), { cursor: options.cursor }) }, otherProps))) : null;
});
AllSide.displayName = 'AllSide';
Corner.displayName = 'Corner';
