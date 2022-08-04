"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizePoint = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var ResizableContext_1 = require("../ResizableContext");
var ResizePointLocal = function (props) {
    var _a = props.as, as = _a === void 0 ? 'div' : _a, children = props.children, context = props.context, currentRef = props.currentRef, direction = props.direction, _b = props.onMouseDown, onMouseDown = _b === void 0 ? null : _b, _c = props.onTouchStart, onTouchStart = _c === void 0 ? null : _c, otherProps = tslib_1.__rest(props, ["as", "children", "context", "currentRef", "direction", "onMouseDown", "onTouchStart"]);
    var attachPointHandlers = context.attachPoint(direction);
    var containerRef = (0, react_1.useRef)(null);
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
    (0, react_1.useImperativeHandle)(currentRef, function () { return containerRef.current; });
    return (0, react_1.createElement)(as, tslib_1.__assign({ onMouseDown: handleMouseDown, onTouchStart: handleTouchStart, ref: containerRef }, otherProps), children);
};
/**
 * This component is a trigger for changing the size of `Resizable` container.
 * Use this component only inside `<Resizable>`.
 * @see https://github.com/ruslan-mart/react-resize#resizepoint-component
 * @see https://github.com/ruslan-mart/react-resize#resizepoint-usage
 */
exports.ResizePoint = (0, react_1.forwardRef)(function (props, currentRef) {
    var children = props.children, otherProps = tslib_1.__rest(props, ["children"]);
    var context = (0, react_1.useContext)(ResizableContext_1.ResizableContext);
    (0, react_1.useEffect)(function () {
        if (context === null) {
            console.warn('Component "ResizePoint" can only be inside "Resizable"');
        }
    }, [context]);
    return context !== null ? (react_1.default.createElement(ResizePointLocal, tslib_1.__assign({ context: context, currentRef: currentRef }, otherProps), children)) : null;
});
ResizePointLocal.displayName = 'ResizePointLocal';
exports.ResizePoint.displayName = 'ResizePoint';
