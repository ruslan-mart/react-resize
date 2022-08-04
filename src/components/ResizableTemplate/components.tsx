import React, { createElement, forwardRef, useContext, useImperativeHandle, useRef } from 'react';

import { ResizableContext } from '../ResizableContext';
import { ResizePoint } from '../ResizePoint';
import { ResizeDirection } from '../../constants/ResizeDirection';
import { useBodyCursor } from '../../hooks/useBodyCursor';

import { allSideCursorMap, allSideStyleMap } from './constants';
import { getCornerOptions } from './helpers';
import type { ResizeTemplateAllSideProps, ResizeTemplateCornerProps } from './types';

/**
 * This component is a template that creates a set of trigger points for the change of the element's size at all sides (including corners).
 * Use this component only inside `<Resizable>`.
 * @see https://github.com/ruslan-mart/react-resize#resizetemplateallside-component
 * @see https://github.com/ruslan-mart/react-resize#resizetemplateallside-usage
 */
export const AllSide = forwardRef<HTMLElement, ResizeTemplateAllSideProps>((props, currentRef) => {
  const {
    as = 'div',
    disallowBottom = false,
    disallowLeft = false,
    disallowRight = false,
    disallowTop = false,
    ...otherProps
  } = props;

  const containerRef = useRef<HTMLElement>(null);

  const context = useContext(ResizableContext);

  const currentDirection = context?.currentDirection ?? null;

  const sideMap: Array<[ResizeDirection, boolean]> = [
    [ResizeDirection.BOTTOM, !disallowBottom],
    [ResizeDirection.LEFT, !disallowLeft],
    [ResizeDirection.RIGHT, !disallowRight],
    [ResizeDirection.TOP, !disallowTop],
    [ResizeDirection.BOTTOM_LEFT, !disallowBottom && !disallowLeft],
    [ResizeDirection.BOTTOM_RIGHT, !disallowBottom && !disallowRight],
    [ResizeDirection.TOP_LEFT, !disallowTop && !disallowLeft],
    [ResizeDirection.TOP_RIGHT, !disallowTop && !disallowRight],
  ];

  useBodyCursor(currentDirection && allSideCursorMap[currentDirection]);

  useImperativeHandle(currentRef, () => containerRef.current!);

  return createElement(
    as,
    {
      ref: containerRef,
      ...otherProps,
    },
    sideMap.map(([direction, visible]) => {
      return (
        visible && (
          <ResizePoint
            as="span"
            direction={direction}
            key={direction}
            style={{
              cursor: currentDirection === null ? allSideCursorMap[direction] : '',
              ...allSideStyleMap[direction],
            }}
          />
        )
      );
    })
  );
});

/**
 * This component is a template that creates a trigger point for the change of the element's size.
 * An element «corner» will be used as interactive element in the bottom-right corner of the parent element.
 * @see https://github.com/ruslan-mart/react-resize#resizetemplatecorner-component
 * @see https://github.com/ruslan-mart/react-resize#resizetemplatecorner-usage
 */
export const Corner = forwardRef<HTMLElement, ResizeTemplateCornerProps>((props, currentRef) => {
  const { as, disallowHorizontal = false, disallowVertical = false, style, ...otherProps } = props;

  const containerRef = useRef<HTMLElement>(null);

  const context = useContext(ResizableContext);

  const isResizing = Boolean(context?.isResizing);

  const options = getCornerOptions(disallowHorizontal, disallowVertical);

  useBodyCursor(isResizing && options !== null ? options.cursor : null);

  useImperativeHandle(currentRef, () => containerRef.current!);

  return options !== null ? (
    <ResizePoint
      as={as}
      direction={options.direction}
      ref={containerRef}
      style={{
        ...options.style,
        ...style,
        cursor: options.cursor,
      }}
      {...otherProps}
    />
  ) : null;
});

AllSide.displayName = 'AllSide';
Corner.displayName = 'Corner';
