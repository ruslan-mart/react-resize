import type { RefObject } from 'react';
import { ResizeDirection } from '../../constants/ResizeDirection';
import type { AttachPointHandler } from '../../types/AttachPointHandler';
import type { BoxSizeProps } from '../../types/BoxSize';
import type { HandlersProps } from '../../types/Handlers';
export interface ResizeDirectionHandler {
    (options: ResizeDirectionHandlerOptions): ResizeDirectionHandlerValues;
}
export interface ResizeDirectionHandlerOptions {
    clientX: number;
    clientY: number;
    initialHeight: number;
    initialWidth: number;
    initialX: number;
    initialY: number;
    startX: number;
    startY: number;
}
export interface ResizeDirectionHandlerValues {
    currentHeight?: number;
    currentWidth?: number;
    currentX?: number;
    currentY?: number;
}
export interface UseResizeProps extends BoxSizeProps, HandlersProps {
    /**
     * Required prop, which value is a `ref` on container element that will be «resizable».
     * This value must be created with React hook `useRef` with reference on `HTMLElement`.
     */
    containerRef: RefObject<HTMLElement>;
    /**
     * Optional prop needed for enabling/disabling the element to be «resizable».
     * Use this prop if you need to disable the element to be «resizable» for some conditions.
     * @default false
     * @see https://github.com/ruslan-mart/react-resize#disabled-usage
     */
    disabled?: boolean;
}
export interface UseResizeResult {
    /**
     * A function for attaching trigger points to the element
     */
    attachPoint: AttachPointHandler;
    /**
     * A prop which value is the direction of active trigger point.
     * If there is no active points at the moment, the value type can be `Direction` or `null`.
     */
    currentDirection: ResizeDirection | null;
    /**
     * A prop which value is a `boolean` type, that means, is the element in the process of changing its size right now.
     */
    isResizing: boolean;
}
