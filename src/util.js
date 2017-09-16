export const bindFunction = (functions, _this) => functions.forEach(f => (_this[f] = _this[f].bind(_this)));
