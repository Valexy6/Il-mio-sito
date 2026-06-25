(function () {

  var ENDPOINT = 'https://api.cartql.com';
  var CART_KEY = 'vb_cart_id';

  var PRICES = {
    'vaso-voronoi':        2400,
    'lampada-gyroid':      3800,
    'organizer-modulare':  1600,
    'fioriera-geometrica': 2900,
    'layer-lines':         1900,
    '404-not-found':       2500,
    'estrusione':          3000,
    'glitch':              2800
  };

  var cartId = localStorage.getItem(CART_KEY);

  var CART_FRAGMENT = '{ id totalItems items { id name quantity unitTotal { amount formatted } } subTotal { formatted } }';

  function gql(query, variables) {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query, variables: variables || {} })
    }).then(function (r) { return r.json(); }).then(function (d) { return d.data; });
  }

  function createCart() {
    return gql('mutation { cartCreate ' + CART_FRAGMENT + ' }')
      .then(function (d) {
        cartId = d.cartCreate.id;
        localStorage.setItem(CART_KEY, cartId);
        return d.cartCreate;
      });
  }

  function getCart() {
    if (!cartId) return Promise.resolve(null);
    return gql(
      'query GetCart($id: ID!) { cart(id: $id) ' + CART_FRAGMENT + ' }',
      { id: cartId }
    ).then(function (d) { return d ? d.cart : null; });
  }

  function ensureCart() {
    if (cartId) return Promise.resolve(cartId);
    return createCart().then(function () { return cartId; });
  }

  function addToCart(productId, name, price) {
    return ensureCart().then(function (id) {
      return gql(
        'mutation Add($id: ID!, $items: [AddToCartInput!]!) { cartLinesAdd(id: $id, items: $items) ' + CART_FRAGMENT + ' }',
        { id: id, items: [{ id: productId, name: name, price: price, currency: 'EUR', quantity: 1 }] }
      ).then(function (d) { return d.cartLinesAdd; });
    });
  }

  function removeFromCart(itemId) {
    return gql(
      'mutation Remove($id: ID!, $itemIds: [ID!]!) { cartLinesRemove(id: $id, itemIds: $itemIds) ' + CART_FRAGMENT + ' }',
      { id: cartId, itemIds: [itemId] }
    ).then(function (d) { return d.cartLinesRemove; });
  }

  function updateQty(itemId, quantity) {
    if (quantity <= 0) return removeFromCart(itemId);
    return gql(
      'mutation Update($id: ID!, $items: [UpdateCartItemInput!]!) { cartLinesUpdate(id: $id, items: $items) ' + CART_FRAGMENT + ' }',
      { id: cartId, items: [{ id: itemId, quantity: quantity }] }
    ).then(function (d) { return d.cartLinesUpdate; });
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

  function renderCart(cart) {
    var badge      = document.getElementById('cart-badge');
    var itemsEl    = document.getElementById('cart-items');
    var totalEl    = document.getElementById('cart-total');
    var emptyEl    = document.getElementById('cart-empty');
    var checkoutBtn = document.getElementById('cart-checkout');

    var count = cart && cart.totalItems ? cart.totalItems : 0;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';

    if (!cart || !cart.items || cart.items.length === 0) {
      emptyEl.style.display = 'block';
      itemsEl.innerHTML = '';
      totalEl.textContent = '€0';
      checkoutBtn.disabled = true;
      return;
    }

    emptyEl.style.display = 'none';
    checkoutBtn.disabled = false;

    itemsEl.innerHTML = cart.items.map(function (item) {
      return '<div class="cart-item">' +
        '<div class="cart-item__info">' +
          '<p class="cart-item__name">' + item.name + '</p>' +
          '<p class="cart-item__price">' + item.unitTotal.formatted + '</p>' +
        '</div>' +
        '<div class="cart-item__qty">' +
          '<button class="qty-btn" onclick="CartVB.decrease(\'' + item.id + '\',' + item.quantity + ')">−</button>' +
          '<span class="qty-num">' + item.quantity + '</span>' +
          '<button class="qty-btn" onclick="CartVB.increase(\'' + item.id + '\',' + item.quantity + ')">+</button>' +
        '</div>' +
        '<button class="cart-item__remove" onclick="CartVB.remove(\'' + item.id + '\')">×</button>' +
      '</div>';
    }).join('');

    totalEl.textContent = cart.subTotal.formatted;
  }

  function doCheckout(cart) {
    var items = cart.items.map(function (item) {
      return {
        name: item.name,
        unitPrice: PRICES[item.id] || Math.round(item.unitTotal.amount / item.quantity),
        quantity: item.quantity
      };
    });

    var btn = document.getElementById('cart-checkout');
    btn.disabled = true;
    btn.textContent = 'Caricamento…';

    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items })
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

  window.CartVB = {
    add: function (productId, name, price) {
      addToCart(productId, name, price).then(function (cart) {
        renderCart(cart);
        openDrawer();
      });
    },
    remove: function (itemId) {
      removeFromCart(itemId).then(renderCart);
    },
    increase: function (itemId, qty) {
      updateQty(itemId, qty + 1).then(renderCart);
    },
    decrease: function (itemId, qty) {
      updateQty(itemId, qty - 1).then(renderCart);
    },
    checkout: function () {
      getCart().then(function (cart) {
        if (cart && cart.items && cart.items.length > 0) doCheckout(cart);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cart-btn').addEventListener('click', openDrawer);
    document.getElementById('cart-close').addEventListener('click', closeDrawer);
    document.getElementById('cart-overlay').addEventListener('click', closeDrawer);
    document.getElementById('cart-checkout').addEventListener('click', function () { CartVB.checkout(); });
    getCart().then(renderCart);
  });

})();
