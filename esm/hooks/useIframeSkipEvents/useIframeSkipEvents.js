import { useGlobalStyle } from 'use-global-style';
/**
 * Private hook that blocks iframes from intercepting the cursor
 * @param value enable or disable
 */
export var useIframeSkipEvents = function (value) {
    useGlobalStyle('iframe, frameset, object', {
        pointerEvents: 'none',
    }, {
        enabled: value,
        importantAll: true,
    });
};
