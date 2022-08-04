import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ResizeOrigin } from '../../constants/ResizeOrigin';
import { ResizeHandler } from '../../modules/ResizeHandler';
import { useIframeSkipEvents } from '../useIframeSkipEvents';
/**
 * This hook will give you opportunity to use the element's «resizable» without usage of integral components.
 * Use this hook if you want to interact with elements directly and if there is not enough functionality for integral components usage.
 * @param props an object with a list of props (`UseResizeProps`)
 * @see https://github.com/ruslan-mart/react-resize#useresize-hook
 * @see https://github.com/ruslan-mart/react-resize#useresize-hook-base-usage
 */
export var useResize = function (props) {
    var containerRef = props.containerRef, disabled = props.disabled, maxHeight = props.maxHeight, maxWidth = props.maxWidth, minHeight = props.minHeight, minWidth = props.minWidth, onResize = props.onResize, onResizeEnd = props.onResizeEnd, onResizeMax = props.onResizeMax, onResizeMin = props.onResizeMin, onResizeStart = props.onResizeStart;
    var _a = useState(null), currentDirection = _a[0], setCurrentDirection = _a[1];
    var isResizing = currentDirection !== null;
    var resizeHandlerRef = useRef();
    useIframeSkipEvents(isResizing);
    useLayoutEffect(function () {
        var resizeHandler = new ResizeHandler(setCurrentDirection);
        resizeHandlerRef.current = resizeHandler;
        return function () { return resizeHandler.destroy(); };
    }, []);
    useLayoutEffect(function () {
        var resizeHandler = resizeHandlerRef.current;
        resizeHandler.containerNode = containerRef.current;
        resizeHandler.disabled = Boolean(disabled);
        resizeHandler.boxSizing = {
            maxHeight: maxHeight,
            maxWidth: maxWidth,
            minHeight: minHeight,
            minWidth: minWidth,
        };
        resizeHandler.handlers = {
            onResize: onResize,
            onResizeEnd: onResizeEnd,
            onResizeMax: onResizeMax,
            onResizeMin: onResizeMin,
            onResizeStart: onResizeStart,
        };
    });
    var attachPoint = useMemo(function () {
        var handleMouseDown = function (direction, event) {
            var button = event.button, clientX = event.clientX, clientY = event.clientY;
            if (button === 0) {
                resizeHandlerRef.current.startResize({
                    clientX: clientX,
                    clientY: clientY,
                    direction: direction,
                    origin: ResizeOrigin.MOUSE,
                });
            }
        };
        var handleTouchStart = function (direction, event) {
            var _a = event.touches[0], clientX = _a.clientX, clientY = _a.clientY;
            resizeHandlerRef.current.startResize({
                clientX: clientX,
                clientY: clientY,
                direction: direction,
                origin: ResizeOrigin.TOUCH,
            });
        };
        var mouseDownCacheMap = new Map();
        var touchStartCacheMap = new Map();
        var attachPointHandler = function (direction) {
            var onMouseDown = mouseDownCacheMap.has(direction)
                ? mouseDownCacheMap.get(direction)
                : mouseDownCacheMap
                    .set(direction, function (event) { return handleMouseDown(direction, event); })
                    .get(direction);
            var onTouchStart = touchStartCacheMap.has(direction)
                ? touchStartCacheMap.get(direction)
                : touchStartCacheMap
                    .set(direction, function (event) { return handleTouchStart(direction, event); })
                    .get(direction);
            return { onMouseDown: onMouseDown, onTouchStart: onTouchStart };
        };
        return attachPointHandler;
    }, []);
    return {
        attachPoint: attachPoint,
        currentDirection: currentDirection,
        isResizing: isResizing,
    };
};
