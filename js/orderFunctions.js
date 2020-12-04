export function addListenersToOrderItem(orderItem) {

	const orderItemAdd = orderItem.querySelector('.item-add');
	const orderItemRemove = orderItem.querySelector('.item-remove');
	const orderItemDelete = orderItem.querySelector('.item-delete');

	orderItemAdd.addEventListener('click', (e) => {
		changeOrderItemPrice(e, 'add');
	});

	orderItemRemove.addEventListener('click', (e) => {
		changeOrderItemPrice(e, 'remove');
	});

	orderItemDelete.addEventListener('click', (e) => {
		deleteFromOrder(e);
	});
}

export function deleteFromOrder(e) {
	const parent = e.target.parentNode.parentNode;
	parent.remove();
	updateTotalPrice();
	saveItemsInStorage();
}

export function changeOrderItemPrice(e, operation) {

	const parent = e.target.parentNode.parentNode;
	const count = parent.querySelector('.item-count');
	const price = parent.querySelector('.item-price');
	const dataPrice = price.getAttribute('data-price');

	let intCount = parseInt(count.innerText);
	let intPrice;

	if (operation === 'add') {
		intCount++;
		intPrice = `$${parseFloat(intCount * dataPrice).toFixed(2)}`;
	}
	if (operation === 'remove') {
		if (intCount === 1)
			return;
		intCount--;
		intPrice = `$${parseFloat(intCount * dataPrice).toFixed(2)}`;
	}
	price.innerText = intPrice;
	count.innerText = `${intCount}`;

	updateTotalPrice();
	saveItemsInStorage();
}

// TODO increment duplicate items instead of adding them seperately
export function addToOrder(pizza, localStorage) {
	const orderItems = document.querySelector('.order-items');

	let name, price, size, imgSrc, count = 1;
	if (localStorage) {
		({ name, price, count, imgSrc } = pizza);
		size = "";
	}
	else {
		name = pizza.querySelector('.item-name').innerText
		price = pizza.querySelector('.item-price').innerText.replace('$', '');
		size = pizza.querySelector('.size.active').innerText;
		imgSrc = pizza.querySelector('.item-img').src;
	}

	const newPizzaElement = document.createElement('li');
	newPizzaElement.classList.add('order-item');

	const newItem = `
				<div class="item-img">
							<img src="${imgSrc}" width="100px" height="100px" alt="">
						</div>

						<div class="item-desc">
							<div class="item-head">
								<p class="item-name">${name} ${size}</p>
								<p class="item-price" data-price="${price}">$${price}</p>
							</div>

							<div class="item-count-btns">
								<div class="item-remove">
									<i class="fas fa-minus item-remove"></i>
								</div>
								<p class="item-count">${count}</p>
								<div class="item-add">
									<i class="fas fa-plus"></i>
								</div>
							</div>
						</div>
						<div class="item-delete-btns">
						<div class="item-delete">
						<i class="fas fa-times"></i>
						</div>
						</div>
	`;

	newPizzaElement.innerHTML = newItem;
	addListenersToOrderItem(newPizzaElement);
	orderItems.appendChild(newPizzaElement);
	saveItemsInStorage();
	updateTotalPrice();

};


export function updateTotalPrice() {
	const orderItems = [...document.querySelectorAll('.order-item')];
	const totalPrice = document.querySelector('.order-total-price');
	const totalPriceDetails = document.querySelector('.order-details-total-price');
	let total = 0;

	orderItems.forEach(item => {
		let price =
			parseFloat(item.querySelector('.item-price').innerText.replace('$', ''));

		total += price;
	});

	totalPrice.innerText = `$${parseFloat(total).toFixed(2)}`;
	totalPriceDetails ? totalPriceDetails.innerText = `$${parseFloat(total).toFixed(2)}` : null;
}


export function saveItemsInStorage() {

	const items = [];

	const orderItems = document.querySelectorAll('.order-item');
	orderItems.forEach(orderItem => {
		const item = {
			name: orderItem.querySelector('.item-name').innerText,
			price: orderItem.querySelector('.item-price').innerText.replace('$', ''),
			count: orderItem.querySelector('.item-count').innerText,
			imgSrc: orderItem.querySelector('.item-img img').src
		}

		items.push(item);
	})
	updateCartNumber(items);
	localStorage.setItem('orderItems', JSON.stringify(items));

}


export function loadItemsFromStorage() {
	let savedItems = localStorage.getItem('orderItems') || undefined;

	if (savedItems) {
		savedItems = JSON.parse(savedItems);
		updateCartNumber(savedItems)

		savedItems.forEach(item => {
			addToOrder(item, true);
		});
	}
}

export function updateCartNumber(items) {
	const orderCount = document.querySelector('.order-count');
	orderCount.innerText = items.length;

}