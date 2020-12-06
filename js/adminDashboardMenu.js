import { getMenuItemsFromServer, getUserFromCookie, sendMenuItemToServer } from "./serverFunctions.js";

const editModal = document.querySelector('#editItemModal');
const deleteModal = document.querySelector('#deleteItemModal');
const addModal = document.querySelector('#addItemModal');

const btnShowEditModal = document.querySelector('#btnEditModal');
const btnShowDeleteModal = document.querySelector('#btnDeleteModal');
const btnShowAddModal = document.querySelector('#btnAddModal');

const editModalItems = {
	nameInput: editModal.querySelector('#inpName'),
	priceInput: editModal.querySelector('#inpPrice'),
	ingredientsInput: editModal.querySelector('#inpIngredients'),
	imgInput: editModal.querySelector('#inpImg'),
	btnModalSave: editModal.querySelector('#btn-save'),
	btnModalClose: editModal.querySelector('#btnClose')
}

const deleteModalItems = {
	btnModalDelete: deleteModal.querySelector('#btn-delete'),
	btnModalClose: deleteModal.querySelector('#btnClose')
}

const addModalItems = {
	nameInput: addModal.querySelector('#inpName'),
	priceInput: addModal.querySelector('#inpPrice'),
	ingredientsInput: addModal.querySelector('#inpIngredients'),
	imgInput: addModal.querySelector('#inpImg'),
	btnModalAdd: addModal.querySelector('#btn-add'),
	btnModalClose: addModal.querySelector('#btnClose')
}
let USER = getUserFromCookie();

let selectedItem;
const menuItems = document.querySelector('.menu-items');

setUpPage();

async function setUpPage() {
	const menuItems = await getMenuItemsFromServer();

	if (menuItems)
		menuItems.forEach(item => { createMenuItem(item); });

	setUpModalButtonListeners();

	document.querySelector('.profile-name').innerText = USER.name;
}

function setUpModalButtonListeners() {
	// log out button
	const btnModalLogOut = document.querySelector('#btn-logout');
	btnModalLogOut.addEventListener('click', () => window.location.assign('../html/sign-out.php'));

	// for add item button
	const btnAdd = document.querySelector('#btnAdd');
	btnAdd.addEventListener('click', () => btnShowAddModal.click())



	// for the save button in the edit modal
	editModalItems.btnModalSave.addEventListener('click', (e) => {

		let isEmpty = [editModalItems.nameInput, editModalItems.priceInput, editModalItems.ingredientsInput, editModalItems.imgInput]
			.some(inp => inp.value === '');

		if (!isEmpty) {
			e.preventDefault();
			if (saveItem(selectedItem))
				editModalItems.btnModalClose.click();
		}
	});

	// for the delete button in the delete modal
	deleteModalItems.btnModalDelete.addEventListener('click', (e) => {
		e.preventDefault();
		if (deleteItem(selectedItem))
			deleteModalItems.btnModalClose.click();

	});

	// for the add button in the add modal
	addModalItems.btnModalAdd.addEventListener('click', (e) => {
		let isEmpty = [addModalItems.nameInput, addModalItems.priceInput, addModalItems.ingredientsInput, addModalItems.imgInput]
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

	const itemImg = item.getAttribute('data-img');
	const itemName = item.querySelector('#name').innerText;
	const itemPrice = parseFloat(item.querySelector('#price').innerText.replace('$', ''));
	const itemIngredients = item.querySelector('#ingredients').innerText.trim();

	editModalItems.nameInput.value = itemName;
	editModalItems.priceInput.value = itemPrice >= 0 ? itemPrice.toFixed(2) : 0;
	editModalItems.ingredientsInput.value = itemIngredients;
	editModalItems.imgInput.value = itemImg;
}

async function deleteItem(selectedItem) {

	let itemToBeDeleted = {
		"_id": selectedItem.getAttribute('data-id')
	}

	itemToBeDeleted = await sendMenuItemToServer(itemToBeDeleted, 'delete');
	if (itemToBeDeleted?.result) {
		selectedItem.remove();
		return true;
	}
}

async function saveItem(selectedItem) {

	const itemId = selectedItem.getAttribute('data-id');
	const itemName = selectedItem.querySelector('#name');
	const itemPrice = selectedItem.querySelector('#price');
	const itemIngredients = selectedItem.querySelector('#ingredients');

	let updatedItem = {
		_id: parseInt(itemId),
		imgSrc: editModalItems.imgInput.value.trim(),
		name: editModalItems.nameInput.value.trim(),
		price: parseFloat(editModalItems.priceInput.value),
		ingredients: editModalItems.ingredientsInput.value.trim()
	}

	updatedItem = await sendMenuItemToServer(updatedItem, 'update');
	console.log(updatedItem);
	if (updatedItem?.result) {

		const { imgSrc, name, price, ingredients } = updatedItem.result;

		selectedItem.setAttribute('data-img', imgSrc);
		itemName.innerText = name;
		itemPrice.innerText = `$${parseFloat(price).toFixed(2)}`;
		itemIngredients.innerText = ingredients;

		return true;
	}
}

async function addItem() {

	let newItem = {
		name: addModalItems.nameInput.value.trim(),
		price: parseFloat(addModalItems.priceInput.value).toFixed(2),
		ingredients: addModalItems.ingredientsInput.value.trim(),
		imgSrc: addModalItems.imgInput.value.trim()
	}

	newItem = await sendMenuItemToServer(newItem, 'add');

	if (newItem?.result) {
		// clear inputs
		[addModalItems.nameInput, addModalItems.priceInput, addModalItems.ingredientsInput, addModalItems.imgInput].forEach(input => input.value = '');

		createMenuItem(newItem.result);
		return true;
	}
}

function createMenuItem(item) {
	const { _id, name, price, ingredients, imgSrc } = item;

	const newItemHTML = `
							<div class="col-xl-3 col-sm-6 p-2 menu-item" data-id=${_id} data-img=${imgSrc}>
	              <div class="card card-common">
                <div class="card-body">
                  <div class="d-flex justify-content-center">
                    <div class="text-secondary text-center">
                      <h5 id="name" class="text-center">${name}</h5>
                      <h4 id="price">$${price}</h4>
                      <h6 id="ingredients">${ingredients}</h6>
                    </div>
                  </div>
                </div>
                <div class="card-footer text-secondary">
                  <div class="text-center">
                    <button type="button" id="btnEdit" class="btn btn-success">Edit</button>
                    <button type="button" id="btnDelete" class="btn btn-danger">Delete</button>
                  </div>
                </div>
							</div>
							</div>
	`.trim();

	let newItemElement = document.createElement('template');
	newItemElement.innerHTML = newItemHTML;
	newItemElement = newItemElement.content.firstChild;
	addItemEventListeners(newItemElement);
	menuItems.appendChild(newItemElement);
}