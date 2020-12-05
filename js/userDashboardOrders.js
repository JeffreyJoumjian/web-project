import { getUserOrdersFromServer, sendUserToServer } from "./serverFunctions.js";

let USER = {
	_id: 2
}


setUpPage();


async function setUpPage() {
	USER = await sendUserToServer(USER, "user");

	if (USER) {
		const orders = await getUserOrdersFromServer({ user_id: USER._id });
		orders.forEach(order => addItem(order));
	}

}



function addItem(item) {
	const orders = document.querySelector('tbody');

	const { _id, date, items, totalPrice, status } = item;

	const itemHTML = `
	<tr>
        <th scope="row" colspan="1">${_id}</th>
        <td colspan="1">${date}</td>
				<td colspan="2">${generateItemsString(items)}		</td>
        <td colspan="1">$${totalPrice}</td>
        <td colspan="1">
          <button type="button" class="btn btn-sm ${status === 'pending' ? 'btn-danger' : 'btn-success'}">${status}</button>
        </td>
			</tr>
	`.trim();

	let newItemElement = document.createElement('template');
	newItemElement.innerHTML = itemHTML;
	newItemElement = newItemElement.content.firstChild;
	orders.appendChild(newItemElement);
}

function generateItemsString(jsonItems) {
	const items = JSON.parse(jsonItems)
	let result = "";
	items.forEach(item => {
		result += `${item.name} x ${item.count} — $${item.price}<br>`;
	})

	return result;
}