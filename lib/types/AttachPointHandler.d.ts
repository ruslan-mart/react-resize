import type { MouseEventHandler, TouchEventHandler } from 'react';
import { ResizeDirection } from '../constants/ResizeDirection';
export interface AttachPointHandler {
    (direction: ResizeDirection): {
        onMouseDown: MouseEventHandler;
        onTouchStart: TouchEventHandler;
    };
}
