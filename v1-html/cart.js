const items = document.querySelector('.cart-items');
const money = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
function updateSummary() {
  let subtotal = 0;
  items.querySelectorAll('.cart-item').forEach(item => {
    subtotal += Number(item.dataset.price) * Number(item.querySelector('input').value);
  });
  const shipping = subtotal === 0 || subtotal >= 999000 ? 0 : 30000;
  document.querySelector('#subtotal').textContent = money(subtotal);
  document.querySelector('#shipping').textContent = money(shipping);
  document.querySelector('#total').textContent = money(subtotal + shipping);
  document.querySelector('#empty-cart').hidden = subtotal > 0;
  document.querySelector('#checkout').disabled = subtotal === 0;
  document.querySelector('#checkout-message').textContent = '';
}
items.addEventListener('input', event => {
  if (!event.target.matches('input')) return;
  if (event.target.validity.valid) updateSummary();
});
items.addEventListener('change', event => {
  if (!event.target.matches('input')) return;
  event.target.value = Math.min(99, Math.max(1, Math.floor(Number(event.target.value) || 1)));
  updateSummary();
});
items.addEventListener('click', event => {
  const button = event.target.closest('.remove-item');
  if (!button) return;
  const row = button.closest('.cart-item');
  const next = row.nextElementSibling || row.previousElementSibling;
  row.remove();
  updateSummary();
  (next?.querySelector('.remove-item') || document.querySelector('#empty-cart a')).focus();
});
document.querySelector('#checkout').addEventListener('click', () => {
  document.querySelector('#checkout-message').textContent = 'Đây là bản demo giỏ hàng tĩnh, chưa kết nối thanh toán.';
});
