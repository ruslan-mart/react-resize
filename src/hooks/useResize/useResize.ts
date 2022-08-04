import { MouseEvent, TouchEvent, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { ResizeDirection } from '../../constants/ResizeDirection';
import { ResizeOrigin } from '../../constants/ResizeOrigin';
import { ResizeHandler } from '../../modules/ResizeHandler';
import { AttachPointHandler } from '../../types/AttachPointHandler';
import { useIframeSkipEvents } from '../useIframeSkipEvents';

import type { UseResizeProps, UseResizeResult } from './types';

/**
 * This hook will give you opportunity to use the element's «resizable» without usage of integral components.
 * Use this hook if you want to interact with elements directly and if there is not enough functionality for integral components usage.
 * @param props an object with a list of props (`UseResizeProps`)
 * @see https://github.com/ruslan-mart/react-resize#useresize-hook
 * @see https://github.com/ruslan-mart/react-resize#useresize-hook-base-usage
 */
export const useResize = (props: UseResizeProps): UseResizeResult => {
  const {
    containerRef,
    disabled,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    onResize,
    onResizeEnd,
    onResizeMax,
    onResizeMin,
    onResizeStart,
  } = props;

  const [currentDirection, setCurrentDirection] = useState<ResizeDirection | null>(null);

  const isResizing = currentDirection !== null;

  const resizeHandlerRef = useRef<ResizeHandler>();

  useIframeSkipEvents(isResizing);

  useLayoutEffect(() => {
    const resizeHandler = new ResizeHandler(setCurrentDirection);
    resizeHandlerRef.current = resizeHandler;

    return () => resizeHandler.destroy();
  }, []);

  useLayoutEffect(() => {
    const resizeHandler = resizeHandlerRef.current!;

    resizeHandler.containerNode = containerRef.current;
    resizeHandler.disabled = Boolean(disabled);

    resizeHandler.boxSizing = {
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
    };

    resizeHandler.handlers = {
      onResize,
      onResizeEnd,
      onResizeMax,
      onResizeMin,
      onResizeStart,
    };
  });

  const attachPoint = useMemo(() => {
    const handleMouseDown = (direction: ResizeDirection, event: MouseEvent) => {
      const { button, clientX, clientY } = event;

      if (button === 0) {
        resizeHandlerRef.current!.startResize({
          clientX,
          clientY,
          direction,
          origin: ResizeOrigin.MOUSE,
        });
      }
    };

    const handleTouchStart = (direction: ResizeDirection, event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0];

      resizeHandlerRef.current!.startResize({
        clientX,
        clientY,
        direction,
        origin: ResizeOrigin.TOUCH,
      });
    };

    const mouseDownCacheMap = new Map<ResizeDirection, (event: MouseEvent) => void>();
    const touchStartCacheMap = new Map<ResizeDirection, (event: TouchEvent) => void>();

    const attachPointHandler: AttachPointHandler = (direction: ResizeDirection) => {
      const onMouseDown = mouseDownCacheMap.has(direction)
        ? mouseDownCacheMap.get(direction)!
        : mouseDownCacheMap
            .set(direction, (event) => handleMouseDown(direction, event))
            .get(direction)!;

      const onTouchStart = touchStartCacheMap.has(direction)
        ? touchStartCacheMap.get(direction)!
        : touchStartCacheMap
            .set(direction, (event) => handleTouchStart(direction, event))
            .get(direction)!;

      return { onMouseDown, onTouchStart };
    };

    return attachPointHandler;
  }, []);

  return {
    attachPoint,
    currentDirection,
    isResizing,
  };
};

export type { UseResizeProps, UseResizeResult };
