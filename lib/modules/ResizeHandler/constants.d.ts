import { ResizeDirection } from '../../constants/ResizeDirection';
export declare enum DirectionHandler {
    HANDLE_BOTTOM = "handleBottom",
    HANDLE_BOTTOM_LEFT = "handleBottomLeft",
    HANDLE_BOTTOM_RIGHT = "handleBottomRight",
    HANDLE_LEFT = "handleLeft",
    HANDLE_RIGHT = "handleRight",
    HANDLE_TOP = "handleTop",
    HANDLE_TOP_LEFT = "handleTopLeft",
    HANDLE_TOP_RIGHT = "handleTopRight"
}
export declare const directionHandlerKeyAliases: {
    bottom: DirectionHandler;
    bottomLeft: DirectionHandler;
    bottomRight: DirectionHandler;
    left: DirectionHandler;
    right: DirectionHandler;
    top: DirectionHandler;
    topLeft: DirectionHandler;
    topRight: DirectionHandler;
};
export declare const directionSides: {
    bottom: ResizeDirection[];
    left: ResizeDirection[];
    right: ResizeDirection[];
    top: ResizeDirection[];
};
