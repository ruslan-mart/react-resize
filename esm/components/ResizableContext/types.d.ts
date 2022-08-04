import { ResizeDirection } from '../../constants/ResizeDirection';
import type { AttachPointHandler } from '../../types/AttachPointHandler';
export interface ResizableContextValue {
    attachPoint: AttachPointHandler;
    currentDirection: ResizeDirection | null;
    isResizing: boolean;
}
