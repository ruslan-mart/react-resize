import React, { createElement, forwardRef, useImperativeHandle, useRef } from 'react';

import { useResize } from '../../hooks/useResize';
import { ResizableContext } from '../ResizableContext';

import type { ResizableProps } from './types';

/**
 * It is a container component that will be «resizable».
 * @see https://github.com/ruslan-mart/react-resize#resizable-component
 */
export const Resizable = forwardRef<HTMLElement, ResizableProps>((props, currentRef) => {
  const {
    as = 'div',
    children,
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
    ...otherProps
  } = props;

  const containerRef = useRef<HTMLElement>(null);

  useImperativeHandle(currentRef, () => containerRef.current!);

  const { attachPoint, currentDirection, isResizing } = useResize({
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
  });

  return createElement(
    as,
    {
      ref: containerRef,
      ...otherProps,
    },
    <ResizableContext.Provider value={{ attachPoint, currentDirection, isResizing }}>
      {children}
    </ResizableContext.Provider>
  );
});

Resizable.displayName = 'Resizable';

export type { ResizableProps };
