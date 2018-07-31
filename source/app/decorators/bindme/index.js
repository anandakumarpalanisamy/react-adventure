/**
 * React Adventure
 * @author Marcos Gonçalves <contact@themgoncalves.com>
 * @version 2.2.0
 */

export default (target, key, descriptor) => {
  if (!target[key] && {}.toString.call(target[key]) !== '[object Function]') {
    throw new Error('@bindme decorator can only be applied to functions', target);
  }

  let fn = descriptor.value;
  let definingProperty = false;

  return {
    configurable: true,

    get() {
      if (definingProperty || this === target.prototype || Object.prototype.hasOwnProperty.call(this, key) || typeof fn !== 'function') {
        return fn;
      }

      const boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return boundFn;
        },
        set(value) {
          fn = value;
          delete this[key];
        },
      });
      definingProperty = false;
      return boundFn;
    },
    set(value) {
      fn = value;
    },
  };
};
