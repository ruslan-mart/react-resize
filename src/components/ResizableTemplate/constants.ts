import type { CSSProperties } from 'react';

import { ResizeDirection } from '../../constants/ResizeDirection';

export const allSideCursorMap: Record<ResizeDirection, CSSProperties['cursor']> = {
  [ResizeDirection.BOTTOM]: 's-resize',
  [ResizeDirection.BOTTOM_LEFT]: 'sw-resize',
  [ResizeDirection.BOTTOM_RIGHT]: 'se-resize',
  [ResizeDirection.LEFT]: 'w-resize',
  [ResizeDirection.RIGHT]: 'e-resize',
  [ResizeDirection.TOP]: 'n-resize',
  [ResizeDirection.TOP_LEFT]: 'nw-resize',
  [ResizeDirection.TOP_RIGHT]: 'ne-resize',
};

export const allSideStyleMap: Record<ResizeDirection, CSSProperties> = {
  [ResizeDirection.BOTTOM]: {
    bottom: '-0.5em',
    height: '1em',
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  [ResizeDirection.BOTTOM_LEFT]: {
    bottom: '-0.5em',
    height: '1em',
    left: '-0.5em',
    position: 'absolute',
    width: '1em',
    zIndex: 1,
  },
  [ResizeDirection.BOTTOM_RIGHT]: {
    bottom: '-0.5em',
    height: '1em',
    position: 'absolute',
    right: '-0.5em',
    width: '1em',
    zIndex: 1,
  },
  [ResizeDirection.LEFT]: {
    bottom: 0,
    left: '-0.5em',
    position: 'absolute',
    top: 0,
    width: '1em',
    zIndex: 1,
  },
  [ResizeDirection.RIGHT]: {
    bottom: 0,
    position: 'absolute',
    right: '-0.5em',
    top: 0,
    width: '1em',
    zIndex: 1,
  },
  [ResizeDirection.TOP]: {
    height: '1em',
    left: 0,
    position: 'absolute',
    right: 0,
    top: '-0.5em',
    zIndex: 1,
  },
  [ResizeDirection.TOP_LEFT]: {
    height: '1em',
    left: '-0.5em',
    position: 'absolute',
    top: '-0.5em',
    width: '1em',
    zIndex: 1,
  },
  [ResizeDirection.TOP_RIGHT]: {
    height: '1em',
    position: 'absolute',
    right: '-0.5em',
    top: '-0.5em',
    width: '1em',
    zIndex: 1,
  },
};

export const cornerStyle: CSSProperties = {
  backgroundImage: 'radial-gradient(rgb(128,128,128) 30%, transparent 0)',
  backgroundSize: '33% 33%',
  bottom: '0',
  clipPath: 'polygon(0 66%, 33% 66%, 33% 33%, 66% 33%, 66% 0, 100% 0, 100% 100%, 0 100%)',
  cursor: 'se-resize',
  height: '1em',
  mixBlendMode: 'difference',
  maxHeight: '100%',
  maxWidth: '100%',
  position: 'absolute',
  right: '0',
  width: '1em',
  zIndex: '1',
};
