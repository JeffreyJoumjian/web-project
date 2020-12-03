const editModal = document.querySelector('#editMenuItemModal');
const deleteModal = document.querySelector('#deleteMenuItemModal');
const addModal = document.querySelector('#addMenuItemModal');

const btnShowEditModal = document.querySelector('#btnEditModal');
const btnShowDeleteModal = document.querySelector('#btnDeleteModal');
const btnShowAddModal = document.querySelector('#btnAddModal');

const editModalItems = {
	pizzaNameInput: editModal.querySelector('#inpName'),
	pizzaPriceInput: editModal.querySelector('#inpPrice'),
	pizzaIngredientsInput: editModal.querySelector('#inpIngredients'),
	btnModalSave: editModal.querySelector('#btn-save'),
	btnModalClose: editModal.querySelector('#btnClose')
}

const deleteModalItems = {
	btnModalDelete: deleteModal.querySelector('#btn-delete'),
	btnModalClose: deleteModal.querySelector('#btnClose')
}

const addModalItems = {
	pizzaNameInput: addModal.querySelector('#inpName'),
	pizzaPriceInput: addModal.querySelector('#inpPrice'),
	pizzaIngredientsInput: addModal.querySelector('#inpIngredients'),
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
		[addModalItems.pizzaNameInput, addModalItems.pizzaPriceInput, addModalItems.pizzaIngredientsInput].forEach(input => input.value = '');
		btnShowAddModal.click();
	})

}

function setUpModalListeners() {
	editModalItems.btnModalSave.addEventListener('click', (e) => {

		let isEmpty = [editModalItems.pizzaNameInput, editModalItems.pizzaPriceInput, editModalItems.pizzaIngredientsInput]
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
		let isEmpty = [addModalItems.pizzaNameInput, addModalItems.pizzaPriceInput, addModalItems.pizzaIngredientsInput]
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

	console.log(itemPrice);
	editModalItems.pizzaNameInput.value = itemName;
	editModalItems.pizzaPriceInput.value = itemPrice >= 0 ? itemPrice.toFixed(2) : 0;
	editModalItems.pizzaIngredientsInput.value = itemIngredients;
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


	itemName.innerText = editModalItems.pizzaNameInput.value.trim();
	itemPrice.innerText = `$${parseFloat(editModalItems.pizzaPriceInput.value).toFixed(2)}`;
	itemIngredients.innerText = editModalItems.pizzaIngredientsInput.value;
}

function addItem() {
	const menuItems = document.querySelector('.menu-items');

	const name = addModalItems.pizzaNameInput.value.trim();
	const price = parseFloat(addModalItems.pizzaPriceInput.value).toFixed(2);
	const ingredients = addModalItems.pizzaIngredientsInput.value.trim();

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

	menuItems.appendChild(newItemElement);
}