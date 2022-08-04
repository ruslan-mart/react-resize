var _a, _b;
import { ResizeDirection } from '../../constants/ResizeDirection';
export var allSideCursorMap = (_a = {},
    _a[ResizeDirection.BOTTOM] = 's-resize',
    _a[ResizeDirection.BOTTOM_LEFT] = 'sw-resize',
    _a[ResizeDirection.BOTTOM_RIGHT] = 'se-resize',
    _a[ResizeDirection.LEFT] = 'w-resize',
    _a[ResizeDirection.RIGHT] = 'e-resize',
    _a[ResizeDirection.TOP] = 'n-resize',
    _a[ResizeDirection.TOP_LEFT] = 'nw-resize',
    _a[ResizeDirection.TOP_RIGHT] = 'ne-resize',
    _a);
export var allSideStyleMap = (_b = {},
    _b[ResizeDirection.BOTTOM] = {
        bottom: '-0.5em',
        height: '1em',
        left: 0,
        position: 'absolute',
        right: 0,
        zIndex: 1,
    },
    _b[ResizeDirection.BOTTOM_LEFT] = {
        bottom: '-0.5em',
        height: '1em',
        left: '-0.5em',
        position: 'absolute',
        width: '1em',
        zIndex: 1,
    },
    _b[ResizeDirection.BOTTOM_RIGHT] = {
        bottom: '-0.5em',
        height: '1em',
        position: 'absolute',
        right: '-0.5em',
        width: '1em',
        zIndex: 1,
    },
    _b[ResizeDirection.LEFT] = {
        bottom: 0,
        left: '-0.5em',
        position: 'absolute',
        top: 0,
        width: '1em',
        zIndex: 1,
    },
    _b[ResizeDirection.RIGHT] = {
        bottom: 0,
        position: 'absolute',
        right: '-0.5em',
        top: 0,
        width: '1em',
        zIndex: 1,
    },
    _b[ResizeDirection.TOP] = {
        height: '1em',
        left: 0,
        position: 'absolute',
        right: 0,
        top: '-0.5em',
        zIndex: 1,
    },
    _b[ResizeDirection.TOP_LEFT] = {
        height: '1em',
        left: '-0.5em',
        position: 'absolute',
        top: '-0.5em',
        width: '1em',
        zIndex: 1,
    },
    _b[ResizeDirection.TOP_RIGHT] = {
        height: '1em',
        position: 'absolute',
        right: '-0.5em',
        top: '-0.5em',
        width: '1em',
        zIndex: 1,
    },
    _b);
export var cornerStyle = {
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