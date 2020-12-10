import setUpSignInBtnListener from './navbar.js';
import * as orderFunctions from './orderFunctions.js';
import * as server from './serverFunctions.js'

const MED = 1.25;
const LARGE = 1.5;

const menu = document.querySelector('.menu-items');

setUpPage();

async function setUpPage() {
	setUpSignInBtnListener();
	orderFunctions.loadItemsFromStorage();

	const menuItems = await server.getMenuItemsFromServer();
	if (menuItems)
		menuItems.forEach(item => createMenuItem(item));

	setUpOrderButtonListeners();

}

function addMenuItemListeners(item) {
	const itemSize = item.querySelector('.item-size');
	const itemSizes = [...itemSize.querySelectorAll('.size')];
	const btnAdd = item.querySelector('.item-btn-add');

	itemSize.addEventListener('click', (e) => {
		if (e.target.classList.contains('size')) {
			itemSizes.forEach(size => size.classList.remove('active'));
			e.target.classList.add('active');
			changeMenuItemPrice(item, e.target);
		}
	});

	btnAdd.addEventListener('click', () => {
		orderFunctions.addToOrder(item, false);
	});
}

function createMenuItem(pizzaItem) {
	const { _id, name, price, ingredients, imgSrc } = pizzaItem;

	const itemHTML = `
						<div class="menu-item" data-id=${_id}>
							<div class="item-size">
								<div class="size active size-s">
									<p>S</p>
								</div>
								<div class="size size-m">
									<p>M</p>
								</div>
								<div class="size size-l">
									<p>L</p>
								</div>
							</div>
							<img class="item-img" src="${imgSrc}" width="200" height="200" alt="pepperoni pizza" />
							<p class="item-name mx-auto">${name}</p>
							<p class="item-desc mx-auto">
								${ingredients}
							</p>
							<p class="item-price" data-price=${price}>$${price}</p>
							<button class="item-btn-add">Add To Order</button>
						</div>
	`.trim();

	let newItemElement = document.createElement('template');
	newItemElement.innerHTML = itemHTML;
	newItemElement = newItemElement.content.firstChild;

	addMenuItemListeners(newItemElement);
	menu.appendChild(newItemElement);

}

function setUpOrderButtonListeners() {
	const btnCancel = document.querySelector('.btn-cancel');
	const btnOrder = document.querySelector('.btn-order');

	btnCancel.addEventListener('click', () => {
		clearOrderItems();
	});

	btnOrder.addEventListener('click', () => {
		orderFunctions.saveItemsInStorage();
		location.assign('../html/checkout.php');
	});
}


function changeMenuItemPrice(pizza, size) {
	const price = pizza.querySelector('.item-price');
	const dataPrice = parseFloat(price.getAttribute('data-price'));
	const chosenSize = size.querySelector('p').innerText.trim();

	let newPrice;

	if (chosenSize === 'S')
		newPrice = dataPrice;
	if (chosenSize === 'M')
		newPrice = dataPrice * MED;
	if (chosenSize === 'L')
		newPrice = dataPrice * LARGE;

	price.innerText = `$${parseFloat(newPrice).toFixed(2)}`

}


function clearOrderItems() {
	const orderItems = document.querySelectorAll('.order-item');
	orderItems.forEach(item => item.remove());
	orderFunctions.saveItemsInStorage();
	orderFunctions.updateTotalPrice();

}

