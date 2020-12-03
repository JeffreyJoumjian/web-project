
const items = [
	{
		_id: '0491039',
		date: '10/25/2020',
		orderDetails: "Item 1 - $9\n Item 2 - $7",
		totalPrice: 16,
		status: 'pending'
	},
	{
		_id: '22491139',
		date: '9/9/2020',
		orderDetails: "Item 1 - $10",
		totalPrice: 10,
		status: 'delivered'
	},
];

items.forEach(item => addItem(item));

function addItem(item) {
	const orders = document.querySelector('tbody');

	const { _id, date, orderDetails, totalPrice, status } = item;

	const itemHTML = `
	<tr>
        <th scope="row">${_id}</th>
        <td>${new Date(date).toLocaleDateString()}</td>
				<td>
					${orderDetails.split("\n").join('<br>')}
        </td>
        <td>$${totalPrice}</td>
        <td>
          <button type="button" class="btn btn-sm ${status === 'pending' ? 'btn-danger' : 'btn-success'}">${status}</button>
        </td>
			</tr>
	`.trim();

	let newItemElement = document.createElement('template');
	newItemElement.innerHTML = itemHTML;
	newItemElement = newItemElement.content.firstChild;
	orders.appendChild(newItemElement);
}