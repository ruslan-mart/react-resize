import { ResizeDirection } from '../../constants/ResizeDirection';

export enum DirectionHandler {
  HANDLE_BOTTOM = 'handleBottom',
  HANDLE_BOTTOM_LEFT = 'handleBottomLeft',
  HANDLE_BOTTOM_RIGHT = 'handleBottomRight',
  HANDLE_LEFT = 'handleLeft',
  HANDLE_RIGHT = 'handleRight',
  HANDLE_TOP = 'handleTop',
  HANDLE_TOP_LEFT = 'handleTopLeft',
  HANDLE_TOP_RIGHT = 'handleTopRight',
}

export const directionHandlerKeyAliases = {
  [ResizeDirection.BOTTOM]: DirectionHandler.HANDLE_BOTTOM,
  [ResizeDirection.BOTTOM_LEFT]: DirectionHandler.HANDLE_BOTTOM_LEFT,
  [ResizeDirection.BOTTOM_RIGHT]: DirectionHandler.HANDLE_BOTTOM_RIGHT,
  [ResizeDirection.LEFT]: DirectionHandler.HANDLE_LEFT,
  [ResizeDirection.RIGHT]: DirectionHandler.HANDLE_RIGHT,
  [ResizeDirection.TOP]: DirectionHandler.HANDLE_TOP,
  [ResizeDirection.TOP_LEFT]: DirectionHandler.HANDLE_TOP_LEFT,
  [ResizeDirection.TOP_RIGHT]: DirectionHandler.HANDLE_TOP_RIGHT,
};

export const directionSides = {
  bottom: [ResizeDirection.BOTTOM, ResizeDirection.BOTTOM_LEFT, ResizeDirection.BOTTOM_RIGHT],
  left: [ResizeDirection.BOTTOM_LEFT, ResizeDirection.LEFT, ResizeDirection.TOP_LEFT],
  right: [ResizeDirection.BOTTOM_RIGHT, ResizeDirection.RIGHT, ResizeDirection.TOP_RIGHT],
  top: [ResizeDirection.TOP, ResizeDirection.TOP_LEFT, ResizeDirection.TOP_RIGHT],
};
