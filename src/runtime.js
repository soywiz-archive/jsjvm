var Convert = (function () {
    function Convert() {
    }
    Convert.CastI = function (value) {
        return value | 0;
    };
    Convert.ConvertIC = function (value) {
        return (value & 0xFFFF) >>> 0;
    };
    Convert.ConvertIS = function (value) {
        return (value & 0xFFFF) | 0;
    };
    return Convert;
})();
exports.Convert = Convert;

global['Convert'] = Convert;
//# sourceMappingURL=runtime.js.map
