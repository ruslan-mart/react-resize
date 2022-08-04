import { ResizeDirection } from '../../constants/ResizeDirection';
import { cornerStyle } from './constants';
export var getCornerOptions = function (disallowHorizontal, disallowVertical) {
    if (!disallowHorizontal && !disallowVertical) {
        return {
            cursor: 'se-resize',
            direction: ResizeDirection.BOTTOM_RIGHT,
            style: cornerStyle,
        };
    }
    if (!disallowHorizontal) {
        return {
            cursor: 'e-resize',
            direction: ResizeDirection.RIGHT,
            style: cornerStyle,
        };
    }
    if (!disallowVertical) {
        return {
            cursor: 's-resize',
            direction: ResizeDirection.BOTTOM,
            style: cornerStyle,
        };
    }
    return null;
};
