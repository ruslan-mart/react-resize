"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corner = exports.AllSide = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var ResizableContext_1 = require("../ResizableContext");
var ResizePoint_1 = require("../ResizePoint");
var ResizeDirection_1 = require("../../constants/ResizeDirection");
var useBodyCursor_1 = require("../../hooks/useBodyCursor");
var constants_1 = require("./constants");
var helpers_1 = require("./helpers");
/**
 * This component is a template that creates a set of trigger points for the change of the element's size at all sides (including corners).
 * Use this component only inside `<Resizable>`.
 * @see https://github.com/ruslan-mart/react-resize#resizetemplateallside-component
 * @see https://github.com/ruslan-mart/react-resize#resizetemplateallside-usage
 */
exports.AllSide = (0, react_1.forwardRef)(function (props, currentRef) {
    var _a;
    var _b = props.as, as = _b === void 0 ? 'div' : _b, _c = props.disallowBottom, disallowBottom = _c === void 0 ? false : _c, _d = props.disallowLeft, disallowLeft = _d === void 0 ? false : _d, _e = props.disallowRight, disallowRight = _e === void 0 ? false : _e, _f = props.disallowTop, disallowTop = _f === void 0 ? false : _f, otherProps = tslib_1.__rest(props, ["as", "disallowBottom", "disallowLeft", "disallowRight", "disallowTop"]);
    var containerRef = (0, react_1.useRef)(null);
    var context = (0, react_1.useContext)(ResizableContext_1.ResizableContext);
    var currentDirection = (_a = context === null || context === void 0 ? void 0 : context.currentDirection) !== null && _a !== void 0 ? _a : null;
    var sideMap = [
        [ResizeDirection_1.ResizeDirection.BOTTOM, !disallowBottom],
        [ResizeDirection_1.ResizeDirection.LEFT, !disallowLeft],
        [ResizeDirection_1.ResizeDirection.RIGHT, !disallowRight],
        [ResizeDirection_1.ResizeDirection.TOP, !disallowTop],
        [ResizeDirection_1.ResizeDirection.BOTTOM_LEFT, !disallowBottom && !disallowLeft],
        [ResizeDirection_1.ResizeDirection.BOTTOM_RIGHT, !disallowBottom && !disallowRight],
        [ResizeDirection_1.ResizeDirection.TOP_LEFT, !disallowTop && !disallowLeft],
        [ResizeDirection_1.ResizeDirection.TOP_RIGHT, !disallowTop && !disallowRight],
    ];
    (0, useBodyCursor_1.useBodyCursor)(currentDirection && constants_1.allSideCursorMap[currentDirection]);
    (0, react_1.useImperativeHandle)(currentRef, function () { return containerRef.current; });
    return (0, react_1.createElement)(as, tslib_1.__assign({ ref: containerRef }, otherProps), sideMap.map(function (_a) {
        var direction = _a[0], visible = _a[1];
        return (visible && (react_1.default.createElement(ResizePoint_1.ResizePoint, { as: "span", direction: direction, key: direction, style: tslib_1.__assign({ cursor: currentDirection === null ? constants_1.allSideCursorMap[direction] : '' }, constants_1.allSideStyleMap[direction]) })));
    }));
});
/**
 * This component is a template that creates a trigger point for the change of the element's size.
 * An element «corner» will be used as interactive element in the bottom-right corner of the parent element.
 * @see https://github.com/ruslan-mart/react-resize#resizetemplatecorner-component
 * @see https://github.com/ruslan-mart/react-resize#resizetemplatecorner-usage
 */
exports.Corner = (0, react_1.forwardRef)(function (props, currentRef) {
    var as = props.as, _a = props.disallowHorizontal, disallowHorizontal = _a === void 0 ? false : _a, _b = props.disallowVertical, disallowVertical = _b === void 0 ? false : _b, style = props.style, otherProps = tslib_1.__rest(props, ["as", "disallowHorizontal", "disallowVertical", "style"]);
    var containerRef = (0, react_1.useRef)(null);
    var context = (0, react_1.useContext)(ResizableContext_1.ResizableContext);
    var isResizing = Boolean(context === null || context === void 0 ? void 0 : context.isResizing);
    var options = (0, helpers_1.getCornerOptions)(disallowHorizontal, disallowVertical);
    (0, useBodyCursor_1.useBodyCursor)(isResizing && options !== null ? options.cursor : null);
    (0, react_1.useImperativeHandle)(currentRef, function () { return containerRef.current; });
    return options !== null ? (react_1.default.createElement(ResizePoint_1.ResizePoint, tslib_1.__assign({ as: as, direction: options.direction, ref: containerRef, style: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, options.style), style), { cursor: options.cursor }) }, otherProps))) : null;
});
exports.AllSide.displayName = 'AllSide';
exports.Corner.displayName = 'Corner';
