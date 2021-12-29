const isNotEmpty = (item: Record<string|number, unknown> | []): boolean => {
  const array = Array.isArray(item) ? item : Object.keys(item).map((key) => item[key]);
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] && (array[i] instanceof Object || Array.isArray(array[i]))) {
      if (!isNotEmpty(array[i] as Record<string|number, unknown> | [])) {
        return false;
      }
    } else if (
      array[i] === null
      || array[i] === undefined
      || array[i] === ''
    ) {
      return false;
    }
  }
  return true;
};

export default isNotEmpty;
