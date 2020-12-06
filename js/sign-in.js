import { sendUserToServer, signInUser } from "../js/serverFunctions.js";

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const signIn = document.getElementById('sign-in');
const joinUs = document.getElementById('join-us');

const emailIn = document.getElementById('email-input-in');
const passwordIn = document.getElementById('password-input-in');
const fieldsIn = [emailIn, passwordIn];

const phoneUp = document.getElementById('phone-input-up');
const addressUp = document.getElementById('address-input-up');
const emailUp = document.getElementById('email-input-up');
const passwordUp = document.getElementById('password-input-up');
const nameUp = document.getElementById('name-input-up');
const fieldsUp = [phoneUp, addressUp, emailUp, passwordUp, nameUp];

const inErrors = ['error-email-in', 'error-password-in', 'empty', 'exists'];
const upErrors = ['error-phone-up', 'error-address-up', 'error-email-up', 'error-name-up', 'error-password-up',
	'notFull', 'lt5', 'invalid', 'empty', 'lt8'
];

const passwordPopup = document.getElementById('password-modal');
const signPopup = document.getElementById('sign-modal');
const loadingLine = document.getElementById('loading-in');
const loadingText = document.getElementById('loading-text-in');

const site = `${window.location.origin}/web-project/html`;
const userCookie = document.cookie;

// logging in is here
function setUpErrors() {

	function setUpErrorListeners() {

		// check if user has already logged in before because the server sets a cookie
		if (userCookie.includes('webprojectcookie_id')) {
			return location.assign('../html/user-dashboard.html');
		}
		if (userCookie.includes('webprojectcookie2_id')) {
			return location.assign('../html/admin-dashboard.html');
		}

		signIn.addEventListener('click', async (e) => {
			showErrors(true);
			if (isSuccessful('in')) {
				let formData = {
					email: emailIn.querySelector('input').value.trim(),
					password: passwordIn.querySelector('input').value
				}

				let user = await signInUser(formData, "auth");

				// TODO username and password is correct
				if (user?.result) {

					// let redirect = user.result.isAdmin == 1 ? "admin" : "user";

					startSignIn();
					setTimeout(() => {
						window.location.reload();
					}, 3500);
				} else {
					showErrors('in', true);
					emailErrors('invalid', true);
				}
			}
			// error logging in 
			else {
				showErrors(true);
				emailErrors('invalid', true);
			}

		});


		joinUs.addEventListener('click', async () => {
			showErrors(false);
			if (isSuccessful('up')) {
				// get data from form
				let formData = {
					name: nameUp.querySelector('input').value.trim(),
					email: emailUp.querySelector('input').value.trim(),
					password: passwordUp.querySelector('input').value,
					phone: phoneUp.querySelector('input').value,
					address: addressUp.querySelector('input').value,
				}

				// create user
				let user = await sendUserToServer(formData, "add");

				// if created successfully try to auth user
				if (user?.result) {
					let user = { email: formData.email, password: formData.password };
					user = await signInUser(user, "auth");

					// TODO if user is authenticated
					if (user?.result) {
						startSignIn();
						setTimeout(() => {
							window.location.reload();
						}, 3500);

					} else
						alert('an error has occured on our side');
				}
				else {
					showErrors('up', false);
					addressErrors(true);
					emailErrors('exists', false)
				}
			}
			// error logging in 
			else
				showErrors(false);

		});


		signInButton.addEventListener('click', () => {
			hideErrors();
			clearFields();
		});
		signUpButton.addEventListener('click', () => {
			hideErrors();
			clearFields();
		});
		emailUp.querySelector('input').addEventListener('input', () => {
			emailErrors('up', false);
			if (emailUp.querySelector('input').value === '')
				hideEmailErrors();
		});
		passwordUp.querySelector('input').addEventListener('input', () => {
			passwordErrors('up', false);
			if (passwordUp.querySelector('input').value === '')
				hidePasswordErrors();
		});
		phoneUp.querySelector('input').addEventListener('input', () => {
			phoneErrors(false);
			if (phoneUp.querySelector('input').value === '')
				hidePhoneErrors();
		});
		addressUp.querySelector('input').addEventListener('input', () => {
			addressErrors(false);
			if (addressUp.querySelector('input').value === '')
				hideAddressErrors();
		});
		nameUp.querySelector('input').addEventListener('input', () => {
			nameErrors(false);
			if (nameUp.querySelector('input').value === '')
				hideNameErrors();
		});
	}

	function phoneErrors(noSubmit) {
		const phoneUpValue = phoneUp.querySelector('input').value.trim();

		if (!noSubmit) {
			if (phoneUpValue === '')
				return phoneUp.classList.add('error-phone-up', 'empty');
			phoneUp.classList.remove('error-phone-up', 'empty');
		}
		if (phoneUpValue.toString().length < 8 || phoneUpValue.toString().length > 15)
			phoneUp.classList.add('error-phone-up', 'invalid');
		else
			phoneUp.classList.remove('error-phone-up', 'invalid', 'empty');
	}

	function addressErrors(noSubmit) {
		const addressUpValue = addressUp.querySelector('input').value.trim();

		if (addressUpValue === '')
			addressUp.classList.add('error-address-up', 'empty');
		else
			addressUp.classList.remove('error-address-up', 'empty')
	}

	function emailErrors(select, noSubmit) {
		if (select === 'up' || select === 'exists') {
			//empty email
			if (noSubmit) {
				if (emailUp.querySelector('input').value.trim() === '')
					emailUp.classList.add('error-email-up', 'empty');
			}
			else if (!validate(emailUp.querySelector('input').value.trim()))
				emailUp.classList.add('error-email-up', 'invalid');
			//invalid email
			else if (select === 'exists')
				emailUp.classList.add('error-email-up', 'exists')
			else
				emailUp.classList.remove('error-email-up', 'invalid', 'empty', 'exists')
		}
		else {
			//empty email field
			if (noSubmit) {
				if (emailIn.querySelector('input').value.trim() === '' || !validate(emailIn.querySelector('input').value.trim()))
					emailIn.classList.add('error-email-in', 'empty');
			}
			else
				emailIn.classList.remove('error-email-in', 'empty')
		}
	}

	function nameErrors(noSubmit) {
		const nameUpValue = nameUp.querySelector('input').value;
		const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
		//empty name
		if (!noSubmit) {
			if (nameUpValue.trim() === '')
				return nameUp.classList.add('error-name-up', 'empty');
			nameUp.classList.remove('error-name-up', 'empty');
		} else
			nameUp.classList.add('error-name-up', 'empty');
		if (!nameUpValue.trim().match(regex)) {
			hideNameErrors();
			return nameUp.classList.add('error-name-up', 'invalid');
		} else
			nameUp.classList.remove('error-name-up', 'invalid');
		//name too short
		if (nameUpValue.replace(' ', '').length < 5) {
			hideNameErrors();
			return nameUp.classList.add('error-name-up', 'lt5');
		} else
			nameUp.classList.remove('error-name-up', 'lt5');

		//name not really full name
		if (nameUpValue.trim().length >= 5 &&
			nameUpValue.trim().split(' ').length < 2) {
			hideNameErrors();
			return nameUp.classList.add('error-name-up', 'notFull');

		} else
			nameUp.classList.remove('error-name-up', 'notFull');

		// else
		// 	nameUp.classList.remove('error-name-up', 'notFull', 'empty', 'lt5', 'invalid');
	}

	function passwordErrors(select, noSubmit) {
		if (select === 'in') {
			//empty password or wrong password
			if (noSubmit) {
				if (passwordIn.querySelector('input').value.trim() === '' ||
					passwordIn.querySelector('input').value.trim().length < 8 ||
					passwordIn.querySelector('input').value.includes(' '))
					passwordIn.classList.add('error-password-in', 'empty');
				else
					passwordIn.classList.remove('error-password-in', 'empty');
			} else
				passwordIn.classList.add('error-password-in', 'empty');
		} else {
			//empty password
			if (noSubmit) {
				if (passwordUp.querySelector('input').value.trim() === '')
					passwordUp.classList.add('error-password-up', 'empty');
			} else if (passwordUp.querySelector('input').value.trim().length < 8 ||
				passwordUp.querySelector('input').value.includes(' '))
				passwordUp.classList.add('error-password-up', 'lt8')
			else
				passwordUp.classList.remove('error-password-up', 'empty', 'lt8');
		}
	}

	function showErrors(noSubmit) {
		phoneErrors(noSubmit);
		addressErrors(noSubmit);
		emailErrors('in', noSubmit);
		emailErrors('up', noSubmit);
		nameErrors(noSubmit);
		passwordErrors('in', noSubmit);
		passwordErrors('out', noSubmit);
	}

	function hidePhoneErrors() {
		phoneUp.classList.remove('error-phone-up', 'invalid', 'empty');
	}

	function hideAddressErrors() {
		addressUp.classList.remove('error-address-up', 'invalid', 'empty');
	}

	function hideEmailErrors() {
		emailIn.classList.remove('error-email-in', 'invalid', 'empty')
		emailUp.classList.remove('error-email-up', 'invalid', 'empty')
	}

	function hidePasswordErrors() {
		passwordIn.classList.remove('error-password-in', 'invalid', 'empty')
		passwordUp.classList.remove('error-password-up', 'invalid', 'empty')
	}

	function hideNameErrors() {
		nameUp.classList.remove('error-name-up', 'notFull', 'empty', 'lt5', 'invalid');
	}

	function hideErrors() {
		hideEmailErrors();
		hidePasswordErrors();
		hideNameErrors();
		hidePhoneErrors();
		hideAddressErrors();
	}

	setUpErrorListeners();
	// emailIn.querySelector('input').addEventListener('input', () => {
	// 	emailErrors('in', false);
	// 	if (emailIn.querySelector('input').value === '')
	// 		hideEmailErrors();
	// });

	// passwordIn.querySelector('input').addEventListener('input', () => {
	// 	passwordErrors('in', false);
	// 	if (passwordIn.querySelector('input').value === '')
	// 		hidePasswordErrors();
	// });
}


function hideHTMLErrors() {
	// to hide the default html invalid notification
	document.addEventListener('invalid', (function () {
		return function (e) {
			e.preventDefault();
		};
	})(), true);
}

function isSuccessful(select) {
	let isSuccessful = true;

	if (select === 'in')
		fieldsIn.forEach(f => inErrors.forEach(e => {
			if (f.classList.contains(e)) {
				isSuccessful = false;
			}
		}));
	else
		fieldsUp.forEach(f => upErrors.forEach(e => {
			if (f.classList.contains(e)) {
				isSuccessful = false;
			}
		}));
	return isSuccessful;
}

function validate(email) {
	const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return expression.test(String(email).toLowerCase())
}


function setupBackground() {
	signUpButton.addEventListener('click', () => {
		container.classList.add("right-panel-active");
		$(".page-container").fadeOut(350, //Speed
			function () { //On fadeOut complete
				$(this).css('background', 'linear-gradient(rgba(var(--primary-red-darkest), 0.4), rgba(var(--primary-red-darker), 0.4)), url("../img/backgrounds/sign-in-background.jpg") center center no-repeat') //Change BG
					.fadeIn(350); //FadeIn
			});

	});

	signInButton.addEventListener('click', () => {
		container.classList.remove("right-panel-active");
		$(".page-container").fadeOut(350, //Speed
			function () { //On fadeOut complete
				$(this).css('background', 'linear-gradient(rgba(var(--primary-red-darkest), 0.4), rgba(var(--primary-red-darker), 0.4)), url("../img/backgrounds/sign-in-background.jpg") center center no-repeat') //Change BG
					.fadeIn(350); //FadeIn
			});
	});
}


function clearFields() {
	const fields = fieldsIn.concat(fieldsUp);
	fields.forEach(field => field.querySelector('input').value = '')
}

function showPopup(popup) {
	popup.style.setProperty('visibility', 'visible');
	popup.style.setProperty('opacity', '1');
}

function hidePopup(popup) {
	popup.style.setProperty('visibility', 'hidden');
	popup.style.setProperty('opacity', '0');
}

function startSignIn() {
	showPopup(signPopup);
	signPopup.classList.add('slide-in-fwd-center');
	container.style.opacity = 0;
	load();
}


let l = 0;
const loadingStatus = ['fetching user data...', 'setting things up...', 'updating orders...', `welcome back!`]
let s = 0;

function load() {

	setTimeout(() => {

		let t = setInterval(() => {
			loadingLine.style.background = `linear-gradient(90deg, rgba(var(--primary-red)) ${l}%, rgb(214, 214, 214) ${l++}%)`
			if (l === 1) {
				loadingText.style.opacity = 0;
				loadingText.style.opacity = 1;
				loadingText.textContent = loadingStatus[s++];
			}
			if (l % 25 === 0 && l != 100) {
				loadingText.textContent = loadingStatus[s++];
			} else if (l === 101) {
				hidePopup(signPopup);
				loadingLine.style.opacity = 0;
				loadingText.style.opacity = 0;
				console.log(0);
				clearInterval(t);
			}

		}, 20);
	}, 1000);
}

function isLoaded() {
	if (l === 101)
		return true;
	return false;
}

function setUpPasswordPopup() {
	document.getElementById('password-popup-toggler').addEventListener('click', () => {
		showPopup(passwordPopup);
	});
	document.querySelector('.-modal-close').addEventListener('click', () => {
		hidePopup(passwordPopup);
	});
}

function setUpListeners() {

	window.addEventListener('load', () => {
		hideHTMLErrors();
		clearFields();
	});
	Array.from(document.querySelectorAll('form'))
		.forEach(form => form.addEventListener('submit', e => e.preventDefault()));

	setUpErrors();
	setUpPasswordPopup();

}

setupBackground();
setUpListeners();