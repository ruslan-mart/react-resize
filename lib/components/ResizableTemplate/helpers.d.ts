/// <reference types="react" />
import { ResizeDirection } from '../../constants/ResizeDirection';
export declare const getCornerOptions: (disallowHorizontal: boolean, disallowVertical: boolean) => {
    cursor: string;
    direction: ResizeDirection;
    style: import("react").CSSProperties;
} | null;
