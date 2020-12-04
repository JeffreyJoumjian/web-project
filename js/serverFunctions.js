export async function getMenuItemsFromServer() {
	const res = await fetch('../php/pizzas.php');
	const data = await res.json();
	return data;
}

export async function getUsersFromServer() {
	// check if user is admin first

	const res = await fetch('../php/users/get.php?f=all');
	const data = await res.json();
	return data;
}

export async function sendUserToServer(inputs, func) {


	const formData = new FormData();
	for (let key in inputs) {
		formData.append(key, inputs[key]);
	}

	const res = await fetch(`../php/users/post.php?f=${func}`, {
		method: 'POST',
		body: formData
	});

	const data = await res.json();
	return data;
}