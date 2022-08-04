import { ResizeDirection } from '../../constants/ResizeDirection';
import type { ResizeDirectionHandler } from './types';
export declare const getCoordsBy: {
    mouse(event: MouseEvent): readonly [number, number];
    touch(event: TouchEvent): readonly [number, number];
};
export declare const resizeDirectionHandlers: Record<ResizeDirection, ResizeDirectionHandler>;
