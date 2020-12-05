import * as orderFunctions from './orderFunctions.js';
import { sendOrderToServer } from './serverFunctions.js';

const form = {
	nameInput: document.querySelector('#inpName'),
	addressInput: document.querySelector('#inpAddress'),
	phoneInput: document.querySelector('#inpPhone'),
}

const alert = document.querySelector('.alert');

setUpPage();

async function setUpPage() {
	// loads items in cart and adds it to the order
	orderFunctions.loadItemsFromStorage();

	setUpButtonListeners();

}

function setUpButtonListeners() {
	const btnOrder = document.querySelector('.btn-order');
	const btnCancel = document.querySelector('.btn-cancel');

	btnOrder.addEventListener('click', (e) => {

		let isEmpty = [
			form.nameInput, form.phoneInput, form.addressInput
		]
			.some(inp => inp.value === '');

		if (!localStorage.getItem('orderItems'))
			window.location.assign('../html/menu.html');

		else if (!isEmpty) {
			e.preventDefault();
			if (submitOrder()) {
				alert.classList.replace('alert-danger', 'alert-success');
				alert.innerText = "Your order has been placed succesfully!";
			}
			else {
				alert.classList.replace('alert-success', 'alert-danger');
				alert.innerText = "We were not able to process your order, please try again!";
			}
			alert.style.opacity = 1;
		}
	});

	btnCancel.addEventListener('click', () => window.location.assign('../html/menu.html'));
}

async function submitOrder() {
	// load again before submitting in case user deletes items while on the checkout
	let savedItems = localStorage.getItem('orderItems');

	if (!savedItems)
		window.location.assign('../html/menu.html');

	if (savedItems) {
		savedItems = JSON.parse(savedItems);

		let items = [];
		let totalPrice = 0;

		savedItems.forEach(item => {
			let newItem = {
				name: item.name,
				price: item.price,
				count: item.count
			}
			items.push(newItem);
			totalPrice += parseFloat(newItem.price);
		});

		// ADD ID if user is signed in
		let newOrder = {
			user_id: 2,
			items: JSON.stringify(items),
			totalPrice,
			name: form.nameInput.value,
			phone: form.phoneInput.value,
			address: form.addressInput.value.trim()
		};

		newOrder = await sendOrderToServer(newOrder, "add");

		if (newOrder?.result) {
			clearOrderItems();
			return true;
		}

	}
}

function clearOrderItems() {

	// remove from localStorage
	localStorage.setItem('orderItems', "");

	// clear form data
	[form.nameInput, form.phoneInput, form.addressInput].forEach(inp => inp.value = "");

	// delete items from order list
	const orderItems = [...document.querySelectorAll('.order-item')];
	orderItems.forEach(item => item.querySelector('.item-delete').click());

}