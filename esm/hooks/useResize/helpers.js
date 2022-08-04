var _a;
import { ResizeDirection } from '../../constants/ResizeDirection';
export var getCoordsBy = {
    mouse: function (event) {
        var clientX = event.clientX, clientY = event.clientY;
        return [clientX, clientY];
    },
    touch: function (event) {
        var _a = event.touches[0], clientX = _a.clientX, clientY = _a.clientY;
        return [clientX, clientY];
    },
};
export var resizeDirectionHandlers = (_a = {},
    _a[ResizeDirection.BOTTOM] = function (_a) {
        var clientY = _a.clientY, initialHeight = _a.initialHeight, startY = _a.startY;
        return {
            currentHeight: initialHeight + clientY - startY,
        };
    },
    _a[ResizeDirection.BOTTOM_LEFT] = function (options) {
        return Object.assign(this[ResizeDirection.BOTTOM](options), this[ResizeDirection.LEFT](options));
    },
    _a[ResizeDirection.BOTTOM_RIGHT] = function (options) {
        return Object.assign(this[ResizeDirection.BOTTOM](options), this[ResizeDirection.RIGHT](options));
    },
    _a[ResizeDirection.LEFT] = function (_a) {
        var clientX = _a.clientX, initialX = _a.initialX, initialWidth = _a.initialWidth, startX = _a.startX;
        return {
            currentX: initialX + clientX - startX,
            currentWidth: initialWidth + startX - clientX,
        };
    },
    _a[ResizeDirection.RIGHT] = function (_a) {
        var clientX = _a.clientX, initialWidth = _a.initialWidth, startX = _a.startX;
        return {
            currentWidth: initialWidth + clientX - startX,
        };
    },
    _a[ResizeDirection.TOP] = function (_a) {
        var clientY = _a.clientY, initialHeight = _a.initialHeight, initialY = _a.initialY, startY = _a.startY;
        return {
            currentHeight: initialHeight + startY - clientY,
            currentY: initialY + clientY - startY,
        };
    },
    _a[ResizeDirection.TOP_LEFT] = function (options) {
        return Object.assign(this[ResizeDirection.TOP](options), this[ResizeDirection.LEFT](options));
    },
    _a[ResizeDirection.TOP_RIGHT] = function (options) {
        return Object.assign(this[ResizeDirection.TOP](options), this[ResizeDirection.RIGHT](options));
    },
    _a);
