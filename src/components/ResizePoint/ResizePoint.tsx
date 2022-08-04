import React, {
  createElement,
  FC,
  forwardRef,
  MouseEventHandler,
  TouchEventHandler,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { ResizableContext } from '../ResizableContext';

import type { ResizePointLocalProps, ResizePointProps } from './types';

const ResizePointLocal: FC<ResizePointLocalProps> = (props) => {
  const {
    as = 'div',
    children,
    context,
    currentRef,
    direction,
    onMouseDown = null,
    onTouchStart = null,
    ...otherProps
  } = props;

  const attachPointHandlers = context.attachPoint(direction);

  const containerRef = useRef<HTMLElement>(null);

  const handleMouseDown: MouseEventHandler = (event) => {
    attachPointHandlers.onMouseDown(event);

    if (onMouseDown !== null) {
      onMouseDown(event);
    }
  };

  const handleTouchStart: TouchEventHandler = (event) => {
    attachPointHandlers.onTouchStart(event);

    if (onTouchStart !== null) {
      onTouchStart(event);
    }
  };

  useImperativeHandle(currentRef, () => containerRef.current!);

  return createElement(
    as,
    {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      ref: containerRef,
      ...otherProps,
    },
    children
  );
};

/**
 * This component is a trigger for changing the size of `Resizable` container.
 * Use this component only inside `<Resizable>`.
 * @see https://github.com/ruslan-mart/react-resize#resizepoint-component
 * @see https://github.com/ruslan-mart/react-resize#resizepoint-usage
 */
export const ResizePoint = forwardRef<HTMLElement, ResizePointProps>((props, currentRef) => {
  const { children, ...otherProps } = props;

  const context = useContext(ResizableContext);

  useEffect(() => {
    if (context === null) {
      console.warn('Component "ResizePoint" can only be inside "Resizable"');
    }
  }, [context]);

  return context !== null ? (
    <ResizePointLocal context={context} currentRef={currentRef} {...otherProps}>
      {children}
    </ResizePointLocal>
  ) : null;
});

ResizePointLocal.displayName = 'ResizePointLocal';
ResizePoint.displayName = 'ResizePoint';

export type { ResizePointProps };
