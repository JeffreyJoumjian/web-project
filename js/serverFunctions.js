

export async function getUsersFromServer() {
	// ADD check if user is admin first (probably in the php post not here)

	const res = await fetch('../php/users/get.php?f=all');
	const data = await res.json();
	return data;
}


// send user add/edit/delete form data to the server
export async function sendUserToServer(inputs, func) {

	// ADD check if user is admin first (probably in the php post not here)
	const formData = new FormData();
	for (let key in inputs)
		formData.append(key, inputs[key]);

	const res = await fetch(`../php/users/post.php?f=${func}`, {
		method: 'POST',
		body: formData
	});

	const data = await res.json();
	console.log(data);
	return data;
}

export async function signInUser(inputs) {

	const formData = new FormData();
	for (let key in inputs)
		formData.append(key, inputs[key]);

	const res = await fetch(`../php/auth/post.php`, {
		method: 'POST',
		body: formData
	});

	const data = await res.json();
	return data;

}

export async function getMenuItemsFromServer() {
	const res = await fetch('../php/items/get.php?f=all');
	const data = await res.json();
	return data;
}

// send item add/edit/delete form data to the server
export async function sendMenuItemToServer(inputs, func) {
	const formData = new FormData();
	for (let key in inputs)
		formData.append(key, inputs[key]);

	const res = await fetch(`../php/items/post.php?f=${func}`, {
		method: 'POST',
		body: formData
	});

	const data = await res.json();
	return data;
}

export async function getUserOrdersFromServer() {

	const res = await fetch('../php/orders/post.php?f=userOrders', {
		method: 'POST',
	});

	const data = await res.json();
	return data;
}

export async function sendOrderToServer(inputs, func) {

	const formData = new FormData();
	for (let key in inputs)
		formData.append(key, inputs[key]);

	const res = await fetch('../php/orders/post.php?f=add', {
		method: 'POST',
		body: formData
	});

	const data = await res.json();
	return data;
}

export function getCookie(cookieName) {
	const cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		const cookie = unescape(cookies[i].trim());
		const name = cookie.split("=")[0];
		const value = cookie.split("=")[1];

		if (name === cookieName)
			return { name, value };
	}
}

export function getUserFromCookie() {
	return JSON.parse(getCookie("webprojectcookie").value).result;;
}