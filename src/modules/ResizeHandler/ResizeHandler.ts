import { ResizeDirection } from '../../constants/ResizeDirection';
import { ResizeOrigin } from '../../constants/ResizeOrigin';
import { parseCurrentRect } from '../../helpers/parseCurrentRect';
import type { HandlersProps, ResizeStateChangeEventHandler } from '../../types/Handlers';
import type { ResizeSideMap } from '../../types/ResizeSideMap';

import { DirectionHandler, directionHandlerKeyAliases, directionSides } from './constants';
import type { BoxSizing, Coords, DirectionHandlerValues, Rect, StartResizeOptions } from './types';

export class ResizeHandler {
  public containerNode: HTMLElement | null = null;
  public boxSizing: BoxSizing = {};
  public disabled = false;
  public handlers: HandlersProps = {};

  private cacheClientValues: Coords;
  private currentValues: Rect;
  private direction = ResizeDirection.RIGHT;
  private heightIsMinimized = false;
  private heightIsMaximized = false;
  private initialValues: Rect;
  private isResizing = false;
  private origin = ResizeOrigin.MOUSE;
  private widthIsMinimized = false;
  private widthIsMaximized = false;

  private readonly onStateChange: ResizeStateChangeEventHandler;
  private readonly startValues: Coords;
  private readonly side: ResizeSideMap;

  constructor(onStateChange: ResizeStateChangeEventHandler) {
    this.initialValues = {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    };

    this.currentValues = { ...this.initialValues };

    this.startValues = {
      x: 0,
      y: 0,
    };

    this.cacheClientValues = { ...this.startValues };

    this.side = {
      bottom: false,
      left: false,
      right: false,
      top: false,
    };

    this.onStateChange = onStateChange;
  }

  public destroy() {
    this.isResizing = false;
    this.onStateChange(null);

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  public startResize({ clientX, clientY, direction, origin }: StartResizeOptions) {
    if (this.containerNode !== null && !this.disabled) {
      const initialRect = parseCurrentRect(this.containerNode);

      this.direction = direction;
      this.origin = origin;

      this.cacheClientValues.x = clientX;
      this.cacheClientValues.y = clientY;
      this.currentValues = { ...initialRect };
      this.initialValues = { ...initialRect };
      this.startValues.x = clientX;
      this.startValues.y = clientY;

      switch (origin) {
        case ResizeOrigin.MOUSE:
          document.addEventListener('mousemove', this.handleMouseMove);
          document.addEventListener('mouseup', this.handleMouseUp);
          break;
        case ResizeOrigin.TOUCH:
          document.addEventListener('touchmove', this.handleTouchMove);
          document.addEventListener('touchend', this.handleTouchEnd);
          break;
        default:
          return;
      }
    }
  }

  private end = () => {
    this.destroy();

    const { currentValues, direction, handlers, origin, side } = this;

    if (handlers.onResizeEnd) {
      handlers.onResizeEnd({
        direction,
        origin,
        side,
        ...currentValues,
      });
    }
  };

  private defineSideMap = (clientX: number, clientY: number) => {
    const { cacheClientValues, direction, side } = this;

    const isHorizontalMove = clientX - cacheClientValues.x !== 0;
    const isVerticalMove = clientY - cacheClientValues.y !== 0;

    cacheClientValues.x = clientX;
    cacheClientValues.y = clientY;

    const valueIsDirectionCallback = (value: ResizeDirection) => value === direction;

    side.bottom = isVerticalMove && directionSides.bottom.some(valueIsDirectionCallback);
    side.left = isHorizontalMove && directionSides.left.some(valueIsDirectionCallback);
    side.right = isHorizontalMove && directionSides.right.some(valueIsDirectionCallback);
    side.top = isVerticalMove && directionSides.top.some(valueIsDirectionCallback);
  };

  private getBoxValues = () => {
    let { maxHeight = Infinity, maxWidth = Infinity, minHeight = 0, minWidth = 0 } = this.boxSizing;

    return {
      maxHeight: Math.max(0, maxHeight),
      maxWidth: Math.max(0, maxWidth),
      minHeight: Math.max(0, Math.min(minHeight, maxHeight)),
      minWidth: Math.max(0, Math.min(minWidth, maxWidth)),
    };
  };

  private handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    this.move(clientX, clientY);
  };

  private handleMouseUp = () => {
    this.end();
  };

  private handleTouchMove = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    this.move(clientX, clientY);
  };

  private handleTouchEnd = () => {
    this.end();
  };

  private move = (clientX: number, clientY: number) => {
    if (this.disabled || this.containerNode === null) {
      return this.end();
    }

    const { currentValues, direction, handlers, initialValues, origin, side } = this;

    this.defineSideMap(clientX, clientY);

    if (!this.isResizing) {
      this.isResizing = true;
      this.onStateChange(direction);

      if (handlers.onResizeStart) {
        const handlerValue = handlers.onResizeStart({
          direction,
          origin,
          side,
          ...initialValues,
        });

        if (handlerValue === false) {
          return this.end();
        }
      }
    }

    this[directionHandlerKeyAliases[direction]]({ clientX, clientY });

    const { maxHeight, maxWidth, minHeight, minWidth } = this.getBoxValues();

    currentValues.height = Math.max(minHeight, Math.min(maxHeight, currentValues.height));
    currentValues.width = Math.max(minWidth, Math.min(maxWidth, currentValues.width));

    if (side.left) {
      currentValues.x = initialValues.x + initialValues.width - currentValues.width;
    }

    if (side.top) {
      currentValues.y = initialValues.y + initialValues.height - currentValues.height;
    }

    if (handlers.onResize) {
      const handlerValue = handlers.onResize({
        direction,
        origin,
        side,
        ...currentValues,
      });

      if (handlerValue === false) {
        return this.end();
      }

      if (handlerValue !== null && typeof handlerValue === 'object') {
        const { height = null, width = null } = handlerValue;

        if (height !== null) {
          currentValues.height = Math.max(minHeight, Math.min(maxHeight, height));
        }

        if (width !== null) {
          currentValues.width = Math.max(minWidth, Math.min(maxWidth, width));
        }
      }
    }

    const currentHeightIsMaximized = currentValues.height === maxHeight;
    const currentHeightIsMinimized = currentValues.height === minHeight;
    const currentWidthIsMaximized = currentValues.width === maxWidth;
    const currentWidthIsMinimized = currentValues.width === minWidth;

    if (
      handlers.onResizeMax &&
      ((currentHeightIsMaximized && !this.heightIsMaximized) ||
        (currentWidthIsMaximized && !this.widthIsMaximized))
    ) {
      handlers.onResizeMax({
        axis: {
          height: currentHeightIsMaximized,
          width: currentWidthIsMaximized,
        },
        direction,
        origin,
        side,
        ...currentValues,
      });
    }

    if (
      handlers.onResizeMin &&
      ((currentHeightIsMinimized && !this.heightIsMinimized) ||
        (currentWidthIsMinimized && !this.widthIsMinimized))
    ) {
      handlers.onResizeMin({
        axis: {
          height: currentHeightIsMinimized,
          width: currentWidthIsMinimized,
        },
        direction,
        origin,
        side,
        ...currentValues,
      });
    }

    if (currentHeightIsMaximized !== this.heightIsMaximized) {
      this.heightIsMaximized = currentHeightIsMaximized;
    }

    if (currentWidthIsMaximized !== this.widthIsMaximized) {
      this.widthIsMaximized = currentWidthIsMaximized;
    }

    if (currentHeightIsMinimized !== this.heightIsMinimized) {
      this.heightIsMinimized = currentHeightIsMinimized;
    }

    if (currentWidthIsMinimized !== this.widthIsMinimized) {
      this.widthIsMinimized = currentWidthIsMinimized;
    }

    window.requestAnimationFrame(this.updateDOM);
  };

  private updateDOM = () => {
    const { containerNode, currentValues } = this;

    if (containerNode !== null) {
      const { position } = window.getComputedStyle(containerNode);

      window.getSelection()?.removeAllRanges();

      containerNode.style.height = `${currentValues.height}px`;
      containerNode.style.width = `${currentValues.width}px`;

      if (position === 'absolute' || position === 'fixed') {
        containerNode.style.left = `${currentValues.x}px`;
        containerNode.style.top = `${currentValues.y}px`;
      }
    }
  };

  private [DirectionHandler.HANDLE_BOTTOM](values: DirectionHandlerValues) {
    this.currentValues.height = this.initialValues.height + values.clientY - this.startValues.y;
  }

  private [DirectionHandler.HANDLE_BOTTOM_LEFT](values: DirectionHandlerValues) {
    this[DirectionHandler.HANDLE_LEFT](values);
    this[DirectionHandler.HANDLE_BOTTOM](values);
  }

  private [DirectionHandler.HANDLE_BOTTOM_RIGHT](values: DirectionHandlerValues) {
    this[DirectionHandler.HANDLE_RIGHT](values);
    this[DirectionHandler.HANDLE_BOTTOM](values);
  }

  private [DirectionHandler.HANDLE_LEFT](values: DirectionHandlerValues) {
    this.currentValues.width = this.initialValues.width + this.startValues.x - values.clientX;
  }

  private [DirectionHandler.HANDLE_RIGHT](values: DirectionHandlerValues) {
    this.currentValues.width = this.initialValues.width + values.clientX - this.startValues.x;
  }

  private [DirectionHandler.HANDLE_TOP](values: DirectionHandlerValues) {
    this.currentValues.height = this.initialValues.height + this.startValues.y - values.clientY;
  }

  private [DirectionHandler.HANDLE_TOP_LEFT](values: DirectionHandlerValues) {
    this[DirectionHandler.HANDLE_LEFT](values);
    this[DirectionHandler.HANDLE_TOP](values);
  }

  private [DirectionHandler.HANDLE_TOP_RIGHT](values: DirectionHandlerValues) {
    this[DirectionHandler.HANDLE_RIGHT](values);
    this[DirectionHandler.HANDLE_TOP](values);
  }
}
