(function () {

  var CART_KEY = 'vb_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }

  function save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  function getItem(items, productId) {
    return items.find(function (i) { return i.id === productId; });
  }

  function openDrawer() {
    document.getElementById('cart-drawer').classList.add('is-open');
    document.getElementById('cart-overlay').classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    document.getElementById('cart-drawer').classList.remove('is-open');
    document.getElementById('cart-overlay').classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function fmt(cents) {
    return '€' + (cents / 100).toFixed(2).replace('.', ',');
  }

  function render() {
    var items      = load();
    var badge      = document.getElementById('cart-badge');
    var itemsEl    = document.getElementById('cart-items');
    var totalEl    = document.getElementById('cart-total');
    var emptyEl    = document.getElementById('cart-empty');
    var checkoutBtn = document.getElementById('cart-checkout');

    var count = items.reduce(function (s, i) { return s + i.quantity; }, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';

    if (items.length === 0) {
      emptyEl.style.display = 'block';
      itemsEl.innerHTML = '';
      totalEl.textContent = '€0';
      checkoutBtn.disabled = true;
      return;
    }

    emptyEl.style.display = 'none';
    checkoutBtn.disabled = false;

    var total = items.reduce(function (s, i) { return s + i.price * i.quantity; }, 0);
    totalEl.textContent = fmt(total);

    itemsEl.innerHTML = items.map(function (item) {
      return '<div class="cart-item">' +
        '<div class="cart-item__info">' +
          '<p class="cart-item__name">' + item.name + '</p>' +
          '<p class="cart-item__price">' + fmt(item.price) + '</p>' +
        '</div>' +
        '<div class="cart-item__qty">' +
          '<button class="qty-btn" onclick="CartVB.decrease(\'' + item.id + '\')">−</button>' +
          '<span class="qty-num">' + item.quantity + '</span>' +
          '<button class="qty-btn" onclick="CartVB.increase(\'' + item.id + '\')">+</button>' +
        '</div>' +
        '<button class="cart-item__remove" onclick="CartVB.remove(\'' + item.id + '\')">×</button>' +
      '</div>';
    }).join('');
  }

  window.CartVB = {
    add: function (productId, name, price) {
      var items = load();
      var existing = getItem(items, productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        items.push({ id: productId, name: name, price: price, quantity: 1 });
      }
      save(items);
      render();
      openDrawer();
    },
    remove: function (productId) {
      save(load().filter(function (i) { return i.id !== productId; }));
      render();
    },
    increase: function (productId) {
      var items = load();
      var item = getItem(items, productId);
      if (item) item.quantity += 1;
      save(items);
      render();
    },
    decrease: function (productId) {
      var items = load();
      var item = getItem(items, productId);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) items = items.filter(function (i) { return i.id !== productId; });
      }
      save(items);
      render();
    },
    checkout: function () {
      var items = load();
      if (!items.length) return;

      var btn = document.getElementById('cart-checkout');
      btn.disabled = true;
      btn.textContent = 'Caricamento…';

      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(function (i) {
          return { name: i.name, unitPrice: i.price, quantity: i.quantity };
        })})
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.url) {
          window.location.href = data.url;
        } else {
          btn.disabled = false;
          btn.textContent = 'Paga ora →';
          alert('Errore nel checkout. Riprova.');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Paga ora →';
        alert('Errore di connessione. Riprova.');
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cart-btn').addEventListener('click', openDrawer);
    document.getElementById('cart-close').addEventListener('click', closeDrawer);
    document.getElementById('cart-overlay').addEventListener('click', closeDrawer);
    document.getElementById('cart-checkout').addEventListener('click', function () { CartVB.checkout(); });
    render();
  });

})();
