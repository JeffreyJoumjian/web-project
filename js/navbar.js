
export default function setUpSignInBtnListeer() {
	const btnSignIn = document.querySelector('#btn-sign-in');
	btnSignIn.addEventListener('click', () => window.location.assign('../html/sign-in.php'));
}