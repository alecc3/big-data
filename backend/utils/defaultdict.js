module.exports = function (createValue) {
  return new Proxy(Object.create(null), {
    get(storage, property) {
      if (!(property in storage)) storage[property] = createValue(property);
      return storage[property];
    },
  });
};
