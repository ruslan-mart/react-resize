"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResize = void 0;
var react_1 = require("react");
var ResizeOrigin_1 = require("../../constants/ResizeOrigin");
var ResizeHandler_1 = require("../../modules/ResizeHandler");
var useIframeSkipEvents_1 = require("../useIframeSkipEvents");
/**
 * This hook will give you opportunity to use the element's «resizable» without usage of integral components.
 * Use this hook if you want to interact with elements directly and if there is not enough functionality for integral components usage.
 * @param props an object with a list of props (`UseResizeProps`)
 * @see https://github.com/ruslan-mart/react-resize#useresize-hook
 * @see https://github.com/ruslan-mart/react-resize#useresize-hook-base-usage
 */
var useResize = function (props) {
    var containerRef = props.containerRef, disabled = props.disabled, maxHeight = props.maxHeight, maxWidth = props.maxWidth, minHeight = props.minHeight, minWidth = props.minWidth, onResize = props.onResize, onResizeEnd = props.onResizeEnd, onResizeMax = props.onResizeMax, onResizeMin = props.onResizeMin, onResizeStart = props.onResizeStart;
    var _a = (0, react_1.useState)(null), currentDirection = _a[0], setCurrentDirection = _a[1];
    var isResizing = currentDirection !== null;
    var resizeHandlerRef = (0, react_1.useRef)();
    (0, useIframeSkipEvents_1.useIframeSkipEvents)(isResizing);
    (0, react_1.useLayoutEffect)(function () {
        var resizeHandler = new ResizeHandler_1.ResizeHandler(setCurrentDirection);
        resizeHandlerRef.current = resizeHandler;
        return function () { return resizeHandler.destroy(); };
    }, []);
    (0, react_1.useLayoutEffect)(function () {
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
    var attachPoint = (0, react_1.useMemo)(function () {
        var handleMouseDown = function (direction, event) {
            var button = event.button, clientX = event.clientX, clientY = event.clientY;
            if (button === 0) {
                resizeHandlerRef.current.startResize({
                    clientX: clientX,
                    clientY: clientY,
                    direction: direction,
                    origin: ResizeOrigin_1.ResizeOrigin.MOUSE,
                });
            }
        };
        var handleTouchStart = function (direction, event) {
            var _a = event.touches[0], clientX = _a.clientX, clientY = _a.clientY;
            resizeHandlerRef.current.startResize({
                clientX: clientX,
                clientY: clientY,
                direction: direction,
                origin: ResizeOrigin_1.ResizeOrigin.TOUCH,
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
exports.useResize = useResize;
