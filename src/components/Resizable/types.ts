import type { HTMLAttributes } from 'react';

import type { BoxSizeProps } from '../../types/BoxSize';
import type { HandlersProps } from '../../types/Handlers';

export interface ResizableProps extends BoxSizeProps, HandlersProps, HTMLAttributes<HTMLElement> {
  /**
   * Optional prop that sets an element type (`div`, `span`, `img`, etc.).
   * @default "div"
   */
  as?: keyof JSX.IntrinsicElements;

  /**
   * Optional prop needed for enabling/disabling the element to be «resizable».
   * Use this prop if you need to disable the element to be «resizable» for some conditions.
   * @default false
   * @see https://github.com/ruslan-mart/react-resize#disabled-usage
   */
  disabled?: boolean;
}
