import * as orderFunctions from './orderFunctions.js';

const PRICE = 6.99;
const MED = 1.25;
const LARGE = 1.5;

const pizzas = [...document.querySelectorAll('.menu-item')];
const orderItems = document.querySelector('.order-items');

setUpPage();

function setUpPage() {

	orderFunctions.loadItemsFromStorage();

	setUpSizeListeners();
	setUpAddListeners();
	setUpOrderButtonListeners();
}

function setUpSizeListeners() {
	pizzas.forEach(pizza => {
		const itemSize = pizza.querySelector('.item-size');
		const itemSizes = [...itemSize.querySelectorAll('.size')];

		itemSize.addEventListener('click', (e) => {
			if (e.target.classList.contains('size')) {
				itemSizes.forEach(size => size.classList.remove('active'));
				e.target.classList.add('active');
				changeMenuItemPrice(pizza, e.target);
			}
		});
	});
}

function setUpAddListeners() {
	pizzas.forEach(pizza => {
		const btnAdd = pizza.querySelector('.item-btn-add');

		btnAdd.addEventListener('click', () => {
			addToOrder(pizza, false);
		});
	})
}

function setUpOrderButtonListeners() {
	const btnCancel = document.querySelector('.btn-cancel');
	const btnOrder = document.querySelector('.btn-order');

	btnCancel.addEventListener('click', () => {
		clearOrderItems();
	});

	btnOrder.addEventListener('click', () => {
		orderFunctions.saveItemsInStorage();
		location.assign('../html/checkout.html');
	});
}


function changeMenuItemPrice(pizza, size) {
	const price = pizza.querySelector('.item-price');
	const chosenSize = size.querySelector('p').innerText.trim();

	let newPrice;

	if (chosenSize === 'S')
		newPrice = PRICE;
	if (chosenSize === 'M')
		newPrice = PRICE * MED;
	if (chosenSize === 'L')
		newPrice = PRICE * LARGE;

	price.innerText = `$${parseFloat(newPrice).toFixed(2)}`

}


function clearOrderItems() {
	const orderItems = document.querySelectorAll('.order-item');

	orderItems.forEach(item => item.remove());
	saveItemsInStorage();
	updateTotalPrice();

}