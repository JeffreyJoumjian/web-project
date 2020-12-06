
import './navbar.js';
import { getUserFromCookie, getUserOrdersFromServer } from "./serverFunctions.js";

const profileName = [...document.querySelectorAll('.profile-name')];

let USER = getUserFromCookie();


setUpPage();


async function setUpPage() {

	// if cookies were set => user is logged in
	if (USER) {
		//  get user's orders from the database
		const orders = await getUserOrdersFromServer();
		if (orders)
			orders.forEach(order => addItem(order));
	}
	// set his profile name using the cookie
	profileName.forEach(pname => pname.innerText = USER.name);

	// log out button
	const btnModalLogOut = document.querySelector('#btn-logout');
	btnModalLogOut.addEventListener('click', () => window.location.assign('../html/sign-out.php'));

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