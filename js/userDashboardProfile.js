import { sendUserToServer, getUserFromCookie } from "./serverFunctions.js";

const profileName = [...document.querySelectorAll('.profile-name')];
const nameInput = document.querySelector('#inpName');
const emailInput = document.querySelector('#inpEmail');
const phoneInput = document.querySelector('#inpPhone');
const addressInput = document.querySelector('#inpAddress');

const btnCancel = document.querySelector('#btn-cancel');
const btnSave = document.querySelector('#btn-save');

let USER = getUserFromCookie();



setUpPage();

function setUpPage() {

	setUpUserDetails();
	setUpButtonListeners();
}

function setUpButtonListeners() {
	btnCancel.addEventListener('click', () => setUserFields(USER));
	btnSave.addEventListener('click', () => updateUserDetails());

	// log out button
	const btnModalLogOut = document.querySelector('#btn-logout');
	btnModalLogOut.addEventListener('click', () => window.location.assign('../html/sign-out.php'));
}

function setUpUserDetails() {
	if (USER)
		setUserFields();
}

function setUserFields() {

	const { name, email, address, phone } = USER;

	profileName.forEach(pname => pname.innerText = name);

	nameInput.value = name;
	emailInput.value = email;
	addressInput.value = address;
	phoneInput.value = parseInt(phone);
}


async function updateUserDetails() {
	let user = {
		name: nameInput.value.trim(),
		email: emailInput.value.trim(),
		address: addressInput.value.trim(),
		phone: parseInt(phoneInput.value),
	}

	user = await sendUserToServer(user, 'update')

	if (user?.result) {
		USER = user.result;
	}
	setUserFields();
}


