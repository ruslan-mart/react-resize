import type { ForwardedRef, HTMLAttributes } from 'react';

import { ResizeDirection } from '../../constants/ResizeDirection';
import type { ResizableContextValue } from '../ResizableContext';

export interface ResizePointLocalProps extends ResizePointProps {
  context: ResizableContextValue;
  currentRef: ForwardedRef<HTMLElement>;
}

export interface ResizePointProps extends HTMLAttributes<Element> {
  as?: keyof JSX.IntrinsicElements;
  direction: ResizeDirection;
}
