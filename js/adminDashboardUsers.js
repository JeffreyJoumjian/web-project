import { getUserFromCookie, getUsersFromServer, sendUserToServer } from './serverFunctions.js';

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
	adminInputYes: editModal.querySelector('#inpAdminYes'),
	adminInputNo: editModal.querySelector('#inpAdminNo'),
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
	adminInputYes: addModal.querySelector('#inpAdminYes'),
	adminInputNo: addModal.querySelector('#inpAdminNo'),
	btnModalAdd: addModal.querySelector('#btn-add'),
	btnModalClose: addModal.querySelector('#btnClose')
}

let selectedItem;
let USER = getUserFromCookie();
const userItems = document.querySelector('tbody#users');

setUpPage();

async function setUpPage() {

	const users = await getUsersFromServer();

	if (users)
		users.forEach(user => createUserItem(user));

	setUpModalButtonListeners();

	document.querySelector('.profile-name').innerText = USER.name;
}

function setUpModalButtonListeners() {

	// log out button
	const btnModalLogOut = document.querySelector('#btn-logout');
	btnModalLogOut.addEventListener('click', () => window.location.assign('../php/sign-out.php'));


	const btnAdd = document.querySelector('#btnAdd');
	btnAdd.addEventListener('click', () => btnShowAddModal.click());


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
			if (saveItem(selectedItem))
				editModalItems.btnModalClose.click();
		}
	});

	deleteModalItems.btnModalDelete.addEventListener('click', (e) => {
		e.preventDefault();
		if (deleteItem(selectedItem))
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
			if (addItem())
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
	const userAdmin = item.querySelector('#admin').innerText;

	editModalItems.nameInput.value = userName;
	editModalItems.emailInput.value = userEmail;
	editModalItems.addressInput.value = userAddress;
	editModalItems.phoneInput.value = parseInt(userPhone);
	editModalItems.adminInputYes.checked = userAdmin === "Yes";
	editModalItems.adminInputNo.checked = !editModalItems.adminInputYes.checked;

}

async function deleteItem(selectedItem) {

	let userToBeDeleted = {
		_id: parseInt(selectedItem.querySelector('#_id').innerText.trim()),
	}

	userToBeDeleted = await sendUserToServer(userToBeDeleted, 'delete');

	if (userToBeDeleted?.result) {
		selectedItem.remove();
		return true;
	}
}

async function saveItem(selectedItem) {
	const userId = selectedItem.querySelector('#_id');
	const userName = selectedItem.querySelector('#name');
	const userEmail = selectedItem.querySelector('#email');
	const userAddress = selectedItem.querySelector('#address');
	const userPhone = selectedItem.querySelector('#phone');
	const userAdmin = selectedItem.querySelector('#admin');

	let updatedUser = {
		_id: userId.innerText.trim(),
		name: editModalItems.nameInput.value.trim(),
		email: editModalItems.emailInput.value.trim(),
		address: editModalItems.addressInput.value.trim(),
		phone: parseInt(editModalItems.phoneInput.value.trim()) > 0 ? editModalItems.phoneInput.value.trim() : 71000000,
		isAdmin: editModalItems.adminInputYes.checked ? 1 : 0
	}

	updatedUser = await sendUserToServer(updatedUser, "update");

	if (updatedUser?.result) {
		const { name, email, address, phone, isAdmin } = updatedUser.result;
		userName.innerText = name;
		userEmail.innerText = email;
		userAddress.innerText = address;
		userPhone.innerText = phone;
		userAdmin.innerText = isAdmin ? "Yes" : "No";

		return true;
	}
}

async function addItem() {

	let newUser = {
		name: addModalItems.nameInput.value.trim(),
		email: addModalItems.emailInput.value.trim(),
		address: addModalItems.addressInput.value.trim(),
		phone: parseInt(addModalItems.phoneInput.value.trim()) > 0 ? addModalItems.phoneInput.value.trim() : 71000000,
		isAdmin: addModalItems.adminInputYes.checked ? 1 : 0
	}

	newUser = await sendUserToServer(newUser, 'add');
	if (newUser?.result) {
		// clear inputs
		[addModalItems.nameInput, addModalItems.emailInput, addModalItems.addressInput, addModalItems.phoneInput].forEach(inp => inp.value = "");

		createUserItem(newUser.result);
		return true;
	}
}

function createUserItem(user) {
	const { _id, name, email, address, phone, isAdmin } = user;

	const newItemHTML = `
        <tr id="row" class="user">
          <th id="_id" scope="row">${_id}</th>
          <td id="name" colspan="1">${name}</td>
          <td id="email" colspan="1">${email}</td>
          <td id="address" colspan="2">${address}</td>
          <td id="phone" colspan="1">${phone}</td>
          <td id="admin" colspan="1">${isAdmin == true ? "Yes" : "No"}</td>
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
	userItems.appendChild(newItemElement);

}
