"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIframeSkipEvents = void 0;
var use_global_style_1 = require("use-global-style");
/**
 * Private hook that blocks iframes from intercepting the cursor
 * @param value enable or disable
 */
var useIframeSkipEvents = function (value) {
    (0, use_global_style_1.useGlobalStyle)('iframe, frameset, object', {
        pointerEvents: 'none',
    }, {
        enabled: value,
        importantAll: true,
    });
};
exports.useIframeSkipEvents = useIframeSkipEvents;
