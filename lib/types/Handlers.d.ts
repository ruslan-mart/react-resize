import { ResizeDirection } from '../constants/ResizeDirection';
import { ResizeOrigin } from '../constants/ResizeOrigin';
import type { ResizeSideMap } from './ResizeSideMap';
export declare type ResizeEndEventHandler = ResizeBaseEventHandler<ResizeEventOptions, void>;
export declare type ResizeEventHandler = ResizeBaseEventHandler<ResizeEventOptions, ResizeEventHandlerValues | false | void>;
export declare type ResizeMaxEventHandler = ResizeBaseEventHandler<ResizeEventOptionsWithAxis, void>;
export declare type ResizeMinEventHandler = ResizeBaseEventHandler<ResizeEventOptionsWithAxis, void>;
export declare type ResizeStartEventHandler = ResizeBaseEventHandler<ResizeEventOptions, false | void>;
export interface ResizeBaseEventHandler<Options, ReturnType> {
    (options: Options): ReturnType;
}
/**
 * An object of the state that is initialized in result of completion of `onResizeStart`, `onResize` and `onResizeEnd` events.
 * @see https://github.com/ruslan-mart/react-resize#resizeeventoptions-object
 */
export interface ResizeEventOptions {
    /**
     * A value of direction in which the event is called out.
     */
    direction: ResizeDirection;
    /**
     * A value of element's current height at the moment of event's call.
     */
    height: number;
    /**
     * An origin of called event (`"mouse"` or `"touch"`).
     */
    origin: ResizeOrigin;
    /**
     * An object that contains a map of sides that were used for changing size of the element at the moment when the element is triggered.
     */
    side: ResizeSideMap;
    /**
     * A value of element's current width at the moment of event's call.
     */
    width: number;
    /**
     * A value of element's current position on the x-axis at the moment of event's call.
     */
    x: number;
    /**
     * A value of element's current position on the y-axis at the moment of event's call.
     */
    y: number;
}
/**
 * An object of the state that is initialized in result of completion of `onResizeMin` и `onResizeMax` events.
 * @see https://github.com/ruslan-mart/react-resize#resizeeventoptions-object
 */
export interface ResizeEventOptionsWithAxis extends ResizeEventOptions {
    /**
     * An object of two props (`width` and `height`)
     */
    axis: {
        height: boolean;
        width: boolean;
    };
}
export interface ResizeEventHandlerValues {
    height?: number;
    width?: number;
}
export interface ResizeStateChangeEventHandler {
    (direction: ResizeDirection | null): void;
}
export interface HandlersProps {
    /**
     * Optional function that is an event handler and is called out in every change of element's size.
     * @see https://github.com/ruslan-mart/react-resize#onresize
     * @see https://github.com/ruslan-mart/react-resize#onresize-usage
     */
    onResize?: ResizeEventHandler;
    /**
     * Optional function that is an event handler and is called out after completion of element's «resizable».
     * @see https://github.com/ruslan-mart/react-resize#onresizeend
     * @see https://github.com/ruslan-mart/react-resize#onresizestart-and-onresizeend-usage
     */
    onResizeEnd?: ResizeEndEventHandler;
    /**
     * Optional function that is an event handler and is called out when the size of the element (width or height) is maximum.
     * @see https://github.com/ruslan-mart/react-resize#onresizemax
     * @see https://github.com/ruslan-mart/react-resize#onresizemin-and-onresizemax-usage
     */
    onResizeMax?: ResizeMaxEventHandler;
    /**
     * Optional function that is an event handler and is called out when the size of the element (width or height) is minimum.
     * @see https://github.com/ruslan-mart/react-resize#onresizemin
     * @see https://github.com/ruslan-mart/react-resize#onresizemin-and-onresizemax-usage
     */
    onResizeMin?: ResizeMinEventHandler;
    /**
     * Optional function that is an event handler and is called out before the start of «resizable».
     * @see https://github.com/ruslan-mart/react-resize#onresizestart
     * @see https://github.com/ruslan-mart/react-resize#onresizestart-and-onresizeend-usage
     */
    onResizeStart?: ResizeStartEventHandler;
}
