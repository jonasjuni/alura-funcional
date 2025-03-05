export const partialize = (fn, ...args) => fn.bind(null, ...args);

export const compose = (...fns) => value => fns.reduceRight((prev, curr) => curr(prev), value);

export const pipe = (...fns) => value => fns.reduce((prev, curr) => curr(prev), value); 