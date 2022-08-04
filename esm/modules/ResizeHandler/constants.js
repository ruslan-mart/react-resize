var _a;
import { ResizeDirection } from '../../constants/ResizeDirection';
export var DirectionHandler;
(function (DirectionHandler) {
    DirectionHandler["HANDLE_BOTTOM"] = "handleBottom";
    DirectionHandler["HANDLE_BOTTOM_LEFT"] = "handleBottomLeft";
    DirectionHandler["HANDLE_BOTTOM_RIGHT"] = "handleBottomRight";
    DirectionHandler["HANDLE_LEFT"] = "handleLeft";
    DirectionHandler["HANDLE_RIGHT"] = "handleRight";
    DirectionHandler["HANDLE_TOP"] = "handleTop";
    DirectionHandler["HANDLE_TOP_LEFT"] = "handleTopLeft";
    DirectionHandler["HANDLE_TOP_RIGHT"] = "handleTopRight";
})(DirectionHandler || (DirectionHandler = {}));
export var directionHandlerKeyAliases = (_a = {},
    _a[ResizeDirection.BOTTOM] = DirectionHandler.HANDLE_BOTTOM,
    _a[ResizeDirection.BOTTOM_LEFT] = DirectionHandler.HANDLE_BOTTOM_LEFT,
    _a[ResizeDirection.BOTTOM_RIGHT] = DirectionHandler.HANDLE_BOTTOM_RIGHT,
    _a[ResizeDirection.LEFT] = DirectionHandler.HANDLE_LEFT,
    _a[ResizeDirection.RIGHT] = DirectionHandler.HANDLE_RIGHT,
    _a[ResizeDirection.TOP] = DirectionHandler.HANDLE_TOP,
    _a[ResizeDirection.TOP_LEFT] = DirectionHandler.HANDLE_TOP_LEFT,
    _a[ResizeDirection.TOP_RIGHT] = DirectionHandler.HANDLE_TOP_RIGHT,
    _a);
export var directionSides = {
    bottom: [ResizeDirection.BOTTOM, ResizeDirection.BOTTOM_LEFT, ResizeDirection.BOTTOM_RIGHT],
    left: [ResizeDirection.BOTTOM_LEFT, ResizeDirection.LEFT, ResizeDirection.TOP_LEFT],
    right: [ResizeDirection.BOTTOM_RIGHT, ResizeDirection.RIGHT, ResizeDirection.TOP_RIGHT],
    top: [ResizeDirection.TOP, ResizeDirection.TOP_LEFT, ResizeDirection.TOP_RIGHT],
};
