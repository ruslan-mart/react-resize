import type { CSSProperties } from 'react';
import { useGlobalStyle } from 'use-global-style';

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
