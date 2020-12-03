let ID = 2;

const editModal = document.querySelector('#editItemModal');
const deleteModal = document.querySelector('#deleteItemModal');
const addModal = document.querySelector('#addItemModal');

const btnShowEditModal = document.querySelector('#btnEditModal');
const btnShowDeleteModal = document.querySelector('#btnDeleteModal');
const btnShowAddModal = document.querySelector('#btnAddModal');

const editModalItems = {
	nameInput: editModal.querySelector('#inpName'),
	emailInput: editModal.querySelector('#inpEmail'),
	addressInput: editModal.querySelector('#inpAddress'),
	phoneInput: editModal.querySelector('#inpPhone'),
	btnModalSave: editModal.querySelector('#btn-save'),
	btnModalClose: editModal.querySelector('#btnClose')
}

const deleteModalItems = {
	btnModalDelete: deleteModal.querySelector('#btn-delete'),
	btnModalClose: deleteModal.querySelector('#btnClose')
}

const addModalItems = {
	nameInput: addModal.querySelector('#inpName'),
	emailInput: addModal.querySelector('#inpEmail'),
	addressInput: addModal.querySelector('#inpAddress'),
	phoneInput: addModal.querySelector('#inpPhone'),
	btnModalAdd: addModal.querySelector('#btn-add'),
	btnModalClose: addModal.querySelector('#btnClose')
}

let selectedItem;

setUpListeners();

function setUpListeners() {
	const menuItems = [...document.querySelectorAll('.user')];
	menuItems.forEach(item => {
		addItemEventListeners(item);
	});

	setUpModalListeners();

	const btnAdd = document.querySelector('#btnAdd');
	btnAdd.addEventListener('click', () => {
		// clear inputs
		[
			addModalItems.nameInput,
			addModalItems.emailInput,
			addModalItems.addressInput,
			addModalItems.phoneInput
		].forEach(inp => inp.value = "");
		btnShowAddModal.click();
	})

}

function setUpModalListeners() {
	editModalItems.btnModalSave.addEventListener('click', (e) => {

		let isEmpty = [
			editModalItems.nameInput,
			editModalItems.emailInput,
			editModalItems.addressInput,
			editModalItems.phoneInput,
		]
			.some(inp => inp.value === '');

		if (!isEmpty) {
			e.preventDefault();
			saveItem(selectedItem);
			editModalItems.btnModalClose.click();
		}
	});

	deleteModalItems.btnModalDelete.addEventListener('click', (e) => {
		e.preventDefault();
		deleteItem(selectedItem);
		deleteModalItems.btnModalClose.click();

	});

	addModalItems.btnModalAdd.addEventListener('click', (e) => {
		let isEmpty = [
			addModalItems.nameInput,
			addModalItems.emailInput,
			addModalItems.addressInput,
			addModalItems.phoneInput,
		]
			.some(inp => inp.value === '');

		if (!isEmpty) {
			e.preventDefault();
			addItem();
			addModalItems.btnModalClose.click();
		}
	});
}

function addItemEventListeners(item) {
	const editBtn = item.querySelector('#btnEdit');
	const deleteBtn = item.querySelector('#btnDelete');

	editBtn.addEventListener('click', () => {
		selectedItem = item;
		updateModalFields(item);
		btnShowEditModal.click();
	});

	deleteBtn.addEventListener('click', () => {
		selectedItem = item;
		btnShowDeleteModal.click();
	});
}

function updateModalFields(item) {


	const userName = item.querySelector('#name').innerText;
	const userEmail = item.querySelector('#email').innerText;
	const userAddress = item.querySelector('#address').innerText;
	const userPhone = item.querySelector('#phone').innerText;

	editModalItems.nameInput.value = userName;
	editModalItems.emailInput.value = userEmail;
	editModalItems.addressInput.value = userAddress;
	editModalItems.phoneInput.value = parseInt(userPhone);

}

function deleteItem(selectedItem) {
	// TODO remove from database as well
	selectedItem.remove();
}

// TODO update item in database
function saveItem(selectedItem) {
	const userName = selectedItem.querySelector('#name');
	const userEmail = selectedItem.querySelector('#email');
	const userAddress = selectedItem.querySelector('#address');
	const userPhone = selectedItem.querySelector('#phone');

	userName.innerText = editModalItems.nameInput.value.trim();
	userEmail.innerText = editModalItems.emailInput.value.trim();
	userAddress.innerText = editModalItems.addressInput.value.trim();
	userPhone.innerText = parseInt(editModalItems.phoneInput.value.trim()) > 0 ? editModalItems.phoneInput.value.trim() : 71000000;

}

function addItem() {
	const users = document.querySelector('tbody');

	const name = addModalItems.nameInput.value.trim();
	const email = addModalItems.emailInput.value.trim();
	const address = addModalItems.addressInput.value.trim();
	const phone = parseInt(addModalItems.phoneInput.value.trim()) > 0 ? addModalItems.phoneInput.value.trim() : 71000000;

	const newItemHTML = `
        <tr id="row" class="user">
          <th id="num" scope="row">${ID++}</th>
          <td id="name" colspan="1">${name}</td>
          <td id="email" colspan="1">${email}</td>
          <td id="address" colspan="2">${address}</td>
          <td id="phone" colspan="1">${phone}</td>
          <td id="options" colspan="1">
            <button type="button" id="btnEdit" class="btn btn-success btn-sm">Edit</button>
            <button type="button" id="btnDelete" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
	`.trim();

	let newItemElement = document.createElement('template');
	newItemElement.innerHTML = newItemHTML;
	newItemElement = newItemElement.content.firstChild;
	addItemEventListeners(newItemElement);
	users.appendChild(newItemElement);
}