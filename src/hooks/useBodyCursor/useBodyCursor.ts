import type { CSSProperties } from 'react';
import { useGlobalStyle } from 'use-global-style';

/**
 * A private hook that sets the cursor on the whole body
 * @param value enable or disable
 */
export const useBodyCursor = (value: CSSProperties['cursor'] | null) => {
  return useGlobalStyle(
    'body',
    {
      cursor: value !== null ? value : 'auto',
    },
    {
      enabled: value !== null,
      importantAll: true,
    }
  );
};
