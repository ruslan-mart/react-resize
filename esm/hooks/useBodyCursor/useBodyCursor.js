import { useGlobalStyle } from 'use-global-style';
export var useBodyCursor = function (value) {
    return useGlobalStyle('body', {
        cursor: value !== null ? value : 'auto',
    }, {
        enabled: value !== null,
        importantAll: true,
    });
};
