import { categories, products } from './data.js';
import { filterByKeyword } from './product-utils.js';

const money = new Intl.NumberFormat('vi-VN');
const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};

const createProductCard = product => {
  const card = createElement('article', 'product-card');
  card.dataset.id = product.id;

  const visual = createElement('div', 'product-card__visual');
  const media = createElement('a', 'product-card__media');
  media.href = `./product.html?id=${encodeURIComponent(product.id)}`;
  media.setAttribute('aria-label', `Xem chi tiết ${product.title}`);
  const image = createElement('img', 'product-card__image');
  image.src = product.thumbnail;
  image.alt = product.title;
  image.loading = 'lazy';
  media.append(image);

  const button = createElement('button', 'product-card__button', 'Thêm vào giỏ');
  button.type = 'button';
  button.dataset.id = product.id;
  visual.append(media, button);

  const body = createElement('div', 'product-card__body');
  const category = createElement('p', 'product-card__category', product.category);
  const heading = createElement('h3');
  const link = createElement('a', '', product.title);
  link.href = media.href;
  heading.append(link);
  const rating = createElement('p', 'rating');
  rating.setAttribute('aria-label', `Đánh giá ${product.rating} trên 5`);
  const stars = createElement('span', '', '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating)));
  stars.setAttribute('aria-hidden', 'true');
  rating.append(stars, createElement('span', '', ` ${product.rating}`));
  const price = createElement('p', 'product-card__price', `${money.format(product.price)}đ`);
  body.append(category, heading, rating, price);
  card.append(visual, body);
  return card;
};

const productGrid = document.querySelector('.product-grid');

productGrid.addEventListener('click', event => {
  const button = event.target.closest('.product-card__button');
  if (!button || !productGrid.contains(button)) return;

  const card = button.closest('.product-card');
  const product = products.find(product => String(product.id) === card?.dataset.id);
  if (product) console.log(product);
});

const loadMoreButton = document.querySelector('.load-more');
const searchInput = document.querySelector('#site-search');
const emptyResults = document.querySelector('#empty-results');
const pageSize = 8;
let visibleCount = 0;
let filteredProducts = products;

const showMoreProducts = () => {
  const nextProducts = filteredProducts.slice(visibleCount, visibleCount + pageSize);
  productGrid.append(...nextProducts.map(createProductCard));
  visibleCount += nextProducts.length;
  const remainingCount = filteredProducts.length - visibleCount;
  loadMoreButton.hidden = remainingCount === 0;
  loadMoreButton.replaceChildren(
    'Xem thêm sản phẩm ',
    createElement('span', '', `(${remainingCount})`),
  );
};

loadMoreButton.addEventListener('click', showMoreProducts);

const updateSearchResults = () => {
  filteredProducts = filterByKeyword(products, searchInput.value);
  visibleCount = 0;
  productGrid.replaceChildren();
  document.querySelector('#product-heading strong').textContent = filteredProducts.length;
  emptyResults.hidden = filteredProducts.length > 0;
  showMoreProducts();
};

searchInput.addEventListener('input', updateSearchResults);
document.querySelector('.search-form').addEventListener('submit', event => {
  event.preventDefault();
  updateSearchResults();
});
updateSearchResults();

const categoryCounts = new Map([
  ['Tất cả', products.length],
  ...categories.map(category => [category, 0]),
]);
products.forEach(product => {
  categoryCounts.set(product.category, (categoryCounts.get(product.category) || 0) + 1);
});
document.querySelector('.category-list').replaceChildren(
  ...Array.from(categoryCounts, ([category, count], index) => {
    const item = createElement('li');
    const link = createElement('a', index === 0 ? 'is-active' : '');
    link.href = '#products';
    link.append(createElement('span', '', category), createElement('strong', '', count));
    item.append(link);
    return item;
  }),
);
