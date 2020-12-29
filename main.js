const itemObjs = [{
    id: '1',
    name: 'Котята',
    price: 100,
    url: 'https://placekitten.com/200/150',
  },{
    id: '2',
    name: 'Светлый кот',
    price: 150,
    url: 'https://placekitten.com/204/153',
  },{
    id: '3',
    name: '3х цветные',
    price: 50,
    url: 'https://placekitten.com/208/156'
  }];
function getCartItems() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function setCartItems(itemObjs) {
  localStorage.setItem('cart', JSON.stringify(itemObjs));
}

function renderCatalog(catalogEl, itemObjs) {
  catalogEl.innerHTML = '';
  for(let itemObj of itemObjs) {
    let itemEl = document.createElement('div');
    itemEl.setAttribute('data-id', itemObj.id);
    itemEl.classList.add ('block-kittens');

    itemEl.innerHTML = `
    <h3>${itemObj.name}</h3>
    <img src="${itemObj.url}" />
    <span class="price">Цена: ${itemObj.price} руб.</span>
    <button data-id="${itemObj.id}">Купить</button>
  `
    itemEl.querySelector('button').addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');
      addToCart(id)
    })
    catalogEl.appendChild(itemEl);
  }
}

function getObjectById(id) {
    let foundObj = itemObjs.find(function(item) {
    return item.id === id
  })
  if(!foundObj) {
    alert('Элемент ' + id + ' не найден!');
  } else {
    return foundObj;
  }
}
function addToCart(id) {
    let itemObj = getObjectById(id);
    let currentObj = cartItems.find(function (item) {
    return item.id === id
  });
  if(currentObj) {
    currentObj.count += 1;
  } else {
    cartItems.push({
      id: itemObj.id,
      name: itemObj.name,
      price: itemObj.price,
      url: itemObj.url,
      count: 1
    });
  }
  updateCard();
}

function removeHandler (event) {
    let id = event.target.getAttribute('data-id');
    cartItems = cartItems.filter(function(item){
    return item.id !== id;
  })
  updateCard();
}

function minusHandler (event) {
    let id = event.target.getAttribute('data-id');
    let currentObj = cartItems.find(function (item) {
    return item.id === id
  });
  currentObj.count -= 1;

  cartItems = cartItems.filter(function(item){
    return item.count > 0;
  })
  updateCard();
}

function plusHandler (event) {
    let id = event.target.getAttribute('data-id');
    addToCart(id);
}
function updateCard() {
  setCartItems(cartItems);
  renderCart();
}
function renderCart() {
    let previousItemButtons = cartItemsEl.querySelectorAll('.cart-item button');
    for(let previousItemButton of previousItemButtons) {
    previousItemButton.removeEventListener('click', removeHandler);
  }
  cartItemsEl.innerHTML = '';
  resultEl.innerText = '';
  let price = 0;
  for(let i=0; i<cartItems.length; i++) {
    let cartItem = cartItems[i];
    price += cartItem.price * cartItem.count;
    let cartItemEl = document.createElement('div');
    cartItemEl.classList.add('cart-item');
    cartItemEl.innerHTML = `
    <p>Товар: ${cartItem.name} Цена: ${cartItem.price} Количество: ${cartItem.count}</p>
    <button class="plus-btn" data-id="${cartItems[i].id}">+</button>
    <button class="minus-btn" data-id="${cartItems[i].id}">-</button>
    <button class="del-btn" data-id="${cartItems[i].id}">Удалить</button>
   `
   cartItemEl.querySelector('.del-btn').addEventListener('click', removeHandler);
   cartItemEl.querySelector('.minus-btn').addEventListener('click', minusHandler);
   cartItemEl.querySelector('.plus-btn').addEventListener('click', plusHandler);
   cartItemsEl.append(cartItemEl)
   resultEl.innerText = `Стоимость  товаров: ${price} руб.`
  }
  if(!cartItems.length) {
    let pEl = document.createElement('p');
    pEl.innerText = `Корзина пуста`;
    cartItemsEl.append(pEl)
  }

}

let cartItemsEl = document.querySelector(".cart-items");
let resultEl = document.querySelector(".cart-result");
let cartItems = getCartItems();
renderCart();


let catalogEl = document.querySelector("#catalog")
renderCatalog(catalogEl, itemObjs);
