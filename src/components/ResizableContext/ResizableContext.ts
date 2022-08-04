import { createContext } from 'react';

import type { ResizableContextValue } from './types';

export const ResizableContext = createContext<ResizableContextValue | null>(null);

export type { ResizableContextValue };
