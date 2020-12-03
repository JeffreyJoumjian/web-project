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
	btnModalAdd: addModal.querySelector('#btn-add'),
	btnModalClose: addModal.querySelector('#btnClose')
}

let selectedItem;

setUpListeners();

function setUpListeners() {
	const menuItems = [...document.querySelectorAll('.menu-item')];
	menuItems.forEach(item => {
		addItemEventListeners(item);
	});

	setUpModalListeners();

	const btnAdd = document.querySelector('#btnAdd');
	btnAdd.addEventListener('click', () => {
		// clear inputs
		[addModalItems.nameInput, addModalItems.priceInput, addModalItems.ingredientsInput].forEach(input => input.value = '');
		btnShowAddModal.click();
	})

}

function setUpModalListeners() {
	editModalItems.btnModalSave.addEventListener('click', (e) => {

		let isEmpty = [editModalItems.nameInput, editModalItems.priceInput, editModalItems.ingredientsInput]
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
		let isEmpty = [addModalItems.nameInput, addModalItems.priceInput, addModalItems.ingredientsInput]
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


	const itemName = item.querySelector('#name').innerText;
	const itemPrice = parseFloat(item.querySelector('#price').innerText.replace('$', ''));
	const itemIngredients = item.querySelector('#ingredients').innerText.trim();

	editModalItems.nameInput.value = itemName;
	editModalItems.priceInput.value = itemPrice >= 0 ? itemPrice.toFixed(2) : 0;
	editModalItems.ingredientsInput.value = itemIngredients;
}

function deleteItem(selectedItem) {
	// TODO remove from database as well
	selectedItem.remove();
}

// TODO update item in database
function saveItem(selectedItem) {
	const itemName = selectedItem.querySelector('#name');
	const itemPrice = selectedItem.querySelector('#price');
	const itemIngredients = selectedItem.querySelector('#ingredients');


	itemName.innerText = editModalItems.nameInput.value.trim();
	itemPrice.innerText = `$${parseFloat(editModalItems.priceInput.value).toFixed(2)}`;
	itemIngredients.innerText = editModalItems.ingredientsInput.value;
}

function addItem() {
	const menuItems = document.querySelector('.menu-items');

	const name = addModalItems.nameInput.value.trim();
	const price = parseFloat(addModalItems.priceInput.value).toFixed(2);
	const ingredients = addModalItems.ingredientsInput.value.trim();

	const newItemHTML = `
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
	`;

	const newItemElement = document.createElement('div');
	newItemElement.classList.add("col-xl-3", "col-sm-6", "p-2", "menu-item");
	newItemElement.innerHTML = newItemHTML;
	addItemEventListeners(newItemElement);
	menuItems.appendChild(newItemElement);
}