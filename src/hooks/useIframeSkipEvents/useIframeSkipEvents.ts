import { useGlobalStyle } from 'use-global-style';

/**
 * A private hook that blocks iframes from intercepting the cursor
 * @param value enable or disable
 */
export const useIframeSkipEvents = (value: boolean) => {
  useGlobalStyle(
    'iframe, frameset, object',
    {
      pointerEvents: 'none',
    },
    {
      enabled: value,
      importantAll: true,
    }
  );
};
