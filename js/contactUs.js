import setUpSignInBtnListener from './navbar.js';
import { getMenuItemsFromServer, getUserFromCookie } from './serverFunctions.js';

const alert = document.querySelector('.alert');

const btnDropdown = document.querySelector('#dropdownMenuButton');
const btnDropdownReview = document.querySelector('#dropdownReviewMenuButton');
const btnSubmit = document.querySelector('#btn-submit');
const dropDownMenu = document.querySelector('.dropdown-menu');
const dropDownReview = document.querySelector('.dropdown-review');

const formInput = {
	nameInput: document.querySelector('#inpName'),
	emailInput: document.querySelector('#inpEmail'),
	phoneInput: document.querySelector('#inpPhone'),
	addressInput: document.querySelector('#inpAddress'),
	messageInput: document.querySelector('#inpMessage'),
	type: btnDropdown,
	reviewContainer: document.querySelector('.review-container'),
	itemNameInput: btnDropdownReview,
	itemRatingInput: document.querySelector('#inpRating'),
	itemRating: document.querySelector('.rating')
}


let USER;

setUpPage();

async function setUpPage() {
	setUpSignInBtnListener();

	let items = await getMenuItemsFromServer();
	if (items)
		items.forEach(item => createDropdownItem(item));

	setUpListeners();

	USER = getUserFromCookie();
	if (USER)
		setUpFormFields();
}


function setUpFormFields() {
	formInput.nameInput.value = USER.name;
	formInput.addressInput.value = USER.address;
	formInput.phoneInput.value = parseInt(USER.phone);
	formInput.emailInput.value = USER.email;
}

function setUpListeners() {

	btnSubmit.addEventListener('click', (e) => {

		let inputs = [formInput.nameInput, formInput.emailInput, formInput.phoneInput, formInput.addressInput, formInput.messageInput]

		let isEmpty = inputs.some(inp => inp.value === '');

		if (!isEmpty) {
			e.preventDefault();
			if (btnDropdownReview.innerText.trim() !== 'Select Item')
				sendReview(inputs);
		}
	})


	// orginal dropdown menu 
	dropDownMenu.addEventListener('click', (e) => {
		if (e.target.classList.contains('dropdown-item')) {
			const { innerText } = e.target;
			btnDropdown.innerText = innerText;

			if (innerText === 'Menu Item Review') {
				btnDropdownReview.innerText = 'Select Item';
				formInput.reviewContainer.style.display = 'block';
			}
			else
				formInput.reviewContainer.style.display = 'none';
		}
	});

	// item select dropdown menu
	dropDownReview.addEventListener('click', (e) => {
		if (e.target.classList.contains('dropdown-item')) {
			btnDropdownReview.innerText = e.target.innerText;
			btnDropdownReview.setAttribute('data-id', e.target.getAttribute('data-id'));
		}
	});

	// range input
	formInput.itemRatingInput.addEventListener('change', () => formInput.itemRating.innerText = formInput.itemRatingInput.value)
}

function sendReview(inputs) {
	let newRating = {
		name: formInput.nameInput.value.trim(),
		email: formInput.emailInput.value.trim(),
		phone: parseInt(formInput.phoneInput.value),
		address: formInput.addressInput.value.trim(),
		menuItem_id: btnDropdownReview.getAttribute('data-id'),
		rating: formInput.itemRatingInput.value,
		message: formInput.messageInput.value.trim()
	}

	const formData = new FormData();

	for (let key in newRating)
		formData.append(key, newRating[key]);


	// do xml request
	const req = new XMLHttpRequest();
	req.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let res;

			try {
				res = JSON.parse(this.response);
				if (res?.result) {
					inputs.forEach(inp => inp.value = '');
					alert.style.display = 'block';
					alert.classList.replace('alert-danger', 'alert-success');
					alert.innerText = "Thank you for your feedback, we'll get back to you soon!"
				}

			} catch (error) {
				alert.style.display = 'block';
				alert.classList.replace('alert-success', 'alert-danger');
				alert.innerText = "Oops something went wrong, please try again!"
			}

		}
	};
	req.open("POST", "../php/ratings/post.php?f=add");
	req.send(formData);

}

function createDropdownItem(item) {
	const { _id, name } = item;

	const itemHtml = `
			<a class="dropdown-item" data-id=${_id}>${name}</a>
		`.trim();

	let newItemElement = document.createElement('template');
	newItemElement.innerHTML = itemHtml;
	newItemElement = newItemElement.content.firstChild;
	dropDownReview.appendChild(newItemElement);
}