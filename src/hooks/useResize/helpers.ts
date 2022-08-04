import { ResizeDirection } from '../../constants/ResizeDirection';

import type { ResizeDirectionHandler } from './types';

export const getCoordsBy = {
  mouse(event: MouseEvent) {
    const { clientX, clientY } = event;
    return [clientX, clientY] as const;
  },
  touch(event: TouchEvent) {
    const { clientX, clientY } = event.touches[0];
    return [clientX, clientY] as const;
  },
};

export const resizeDirectionHandlers: Record<ResizeDirection, ResizeDirectionHandler> = {
  [ResizeDirection.BOTTOM]({ clientY, initialHeight, startY }) {
    return {
      currentHeight: initialHeight + clientY - startY,
    };
  },
  [ResizeDirection.BOTTOM_LEFT](options) {
    return Object.assign(
      this[ResizeDirection.BOTTOM](options),
      this[ResizeDirection.LEFT](options)
    );
  },
  [ResizeDirection.BOTTOM_RIGHT](options) {
    return Object.assign(
      this[ResizeDirection.BOTTOM](options),
      this[ResizeDirection.RIGHT](options)
    );
  },
  [ResizeDirection.LEFT]({ clientX, initialX, initialWidth, startX }) {
    return {
      currentX: initialX + clientX - startX,
      currentWidth: initialWidth + startX - clientX,
    };
  },
  [ResizeDirection.RIGHT]({ clientX, initialWidth, startX }) {
    return {
      currentWidth: initialWidth + clientX - startX,
    };
  },
  [ResizeDirection.TOP]({ clientY, initialHeight, initialY, startY }) {
    return {
      currentHeight: initialHeight + startY - clientY,
      currentY: initialY + clientY - startY,
    };
  },
  [ResizeDirection.TOP_LEFT](options) {
    return Object.assign(this[ResizeDirection.TOP](options), this[ResizeDirection.LEFT](options));
  },
  [ResizeDirection.TOP_RIGHT](options) {
    return Object.assign(this[ResizeDirection.TOP](options), this[ResizeDirection.RIGHT](options));
  },
};
