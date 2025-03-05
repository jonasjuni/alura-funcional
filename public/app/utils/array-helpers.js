if (!Array.prototype.$flatMap) {
    Array.prototype.$flatMap = function (cb) {
        return this.map(cb).reduce((pre, cur) => pre.concat(cur), []);
    }
}