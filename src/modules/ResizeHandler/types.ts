import { ResizeDirection } from '../../constants/ResizeDirection';
import { ResizeOrigin } from '../../constants/ResizeOrigin';

export interface BoxSizing {
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
}

export interface Coords {
  x: number;
  y: number;
}

export interface DirectionHandlerValues {
  clientX: number;
  clientY: number;
}

export interface Rect extends Coords {
  height: number;
  width: number;
}

export interface StartResizeOptions {
  clientX: number;
  clientY: number;
  direction: ResizeDirection;
  origin: ResizeOrigin;
}
