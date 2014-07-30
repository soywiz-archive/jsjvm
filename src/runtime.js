var JavaRuntime = (function () {
    function JavaRuntime() {
    }
    JavaRuntime.CastI = function (value) {
        return value | 0;
    };
    JavaRuntime.ConvertIC = function (value) {
        return (value & 0xFFFF) >>> 0;
    };
    JavaRuntime.ConvertIS = function (value) {
        return (value & 0xFFFF) | 0;
    };
    JavaRuntime.arraylength = function (value) {
        return value.length;
    };
    return JavaRuntime;
})();
exports.JavaRuntime = JavaRuntime;

global['JavaRuntime'] = JavaRuntime;
//# sourceMappingURL=runtime.js.map
