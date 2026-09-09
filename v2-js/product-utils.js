const normalizeKeyword = value => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[đĐ]/g, 'd')
  .toLowerCase()
  .trim();

export const filterByKeyword = (list, q = '') => {
  const keyword = normalizeKeyword(q);
  return list.filter(product => normalizeKeyword(product.title).includes(keyword));
};

export const sortByPrice = (list, dir = 'asc') => {
  if (dir !== 'asc' && dir !== 'desc') {
    throw new RangeError('dir must be "asc" or "desc"');
  }
  const direction = dir === 'asc' ? 1 : -1;
  return [...list].sort((a, b) => direction * (a.price - b.price));
};
