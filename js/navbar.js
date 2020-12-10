
export default function setUpSignInBtnListener() {
	const btnSignIn = document.querySelector('#btn-sign-in');
	btnSignIn.addEventListener('click', () => {
		console.log('sign');
		window.location.assign('../html/sign-in.php')
	}
	);
}