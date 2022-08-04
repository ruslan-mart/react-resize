"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBodyCursor = void 0;
var use_global_style_1 = require("use-global-style");
var useBodyCursor = function (value) {
    return (0, use_global_style_1.useGlobalStyle)('body', {
        cursor: value !== null ? value : 'auto',
    }, {
        enabled: value !== null,
        importantAll: true,
    });
};
exports.useBodyCursor = useBodyCursor;
