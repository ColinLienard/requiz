const isNotEmpty = (item: Record<string|number, unknown> | []): boolean => {
  const array = Array.isArray(item) ? item : Object.keys(item).map((key) => item[key]);
  let result = true;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] && typeof array[i] === 'object') {
      if (isNotEmpty(array[i] as Record<string|number, unknown> | [])) {
        result = false;
        break;
      }
    } else if (
      array[i] !== 'status'
      && (array[i] === null
      || array[i] === undefined
      || array[i] === '')
    ) {
      result = false;
      break;
    }
  }
  return result;
};

export default isNotEmpty;
