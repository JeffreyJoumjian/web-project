<?php
session_start();

if (isset($_SESSION["user"])) {

    if ($_SESSION["user"]["isAdmin"] == 1) {
        header('Location: admin-dashboard.php');
    } else {
        header('Location: user-dashboard.php');
    }
}

?>

<!doctype html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta charset="UTF-8">
	<meta name="description" content="The Best Authentic Pizza Experience in Lebanon">
	<meta name="author" content="Jeffrey Adrian Joumjian | Maria Kantardjian | Reem Saado">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
		integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
	<link rel="stylesheet" href="../css/sign-in.css">

	<title>Sign In</title>
	<link rel="icon" href="../img/homepage/pizzalogo.jpg">
</head>

<body>
	<div class="page-container"></div>
	<div class="arrow-back">
		<a href="./home.php">
			<i class="fas fa-arrow-left fa-2x text-white"></i>
		</a>
	</div>
	<div class="logo">
		<a href="/">
			<!-- <img src="images/Logo-white.png" class="logo-img"> -->
		</a>
	</div>
	<div class="container" id="container">
		<div class="form-container sign-up-container">
			<form action="#">
				<h1>Order With Us</h1>
				<span class="mb-2">We have the best pizzas!
				</span>

				<div class="label-group" id="name-input-up">
					<input type="text" placeholder="" required />
					<label for="name">Full name</label>
					<i class="fas fa-exclamation-circle text-danger"></i>
				</div>

				<div class="label-group" id="email-input-up">
					<input type="text" placeholder="" required />
					<label for="email">Email</label>
					<i class="fas fa-exclamation-circle text-danger"></i>
				</div>
				<div class="label-group" id="password-input-up">
					<input type="password" placeholder="" required />
					<label for="password">Password</label>
					<i class="fas fa-exclamation-circle text-danger"></i>
				</div>

				<div class="label-group" id="phone-input-up">
					<input type="number" placeholder="" required onkeydown="javascript:
						return event.keyCode === 8 || event.keyCode === 46 ? true :
						!isNaN(Number(event.key))" />
					<label for="phone">Phone</label>
					<i class="fas fa-exclamation-circle text-danger"></i>
				</div>
				<div class="label-group" id="address-input-up">
					<input type="text" placeholder="" required />
					<label for="Address">Address</label>
					<i class="fas fa-exclamation-circle text-danger"></i>
				</div>
				<!-- <div class="label-group" id="date-input-up">
					<input type="date" placeholder="" required />
					<label for="date">Date of birth</label>
					<i class="fas fa-exclamation-circle text-danger"></i>
				</div> -->
				<button class="mt-4" id="join-us">Order Now</button>
			</form>
		</div>
		<div class="form-container sign-in-container">
			<form action="#">
				<h1>Sign in</h1>
				<span class="mb-2">already a pizza connoisseur?</span>
				<div class="label-group" id="email-input-in">
					<input type="text" placeholder="" required />
					<label for="email">Email</label>
					<i class="fas fa-exclamation-circle text-danger"></i>
				</div>
				<div class="label-group" id="password-input-in">
					<input type="password" placeholder="" required />
					<label for="password">Password</label>
					<i class="fas fa-exclamation-circle text-danger"></i>
				</div>
				<a href="#" id="password-popup-toggler">Forgot your password?</a>
				<!-- Button trigger modal -->
				<!-- Modal -->
				<button id="sign-in">Sign In</button>
			</form>
		</div>
		<div class="overlay-container">
			<div class="overlay">
				<div class="overlay-panel overlay-left">
					<h1>Welcome Back!</h1>
					<p>Already have an account? Sign in right where you left off.</p>
					<button class="ghost" id="signIn">Sign In</button>
				</div>
				<div class="overlay-panel overlay-right">
					<h1>Become A Pizza Connoisseur</h1>
					<p>Create an account and order your favorite pizzas.</p>
					<button class="ghost" id="signUp">Sign Up</button>
				</div>
			</div>
		</div>
	</div>
	<div class="-modal" id="password-modal">
		<div class="-modal-content">
			<a href="#" class="-modal-close">&times;</a>
			<h2 class="-modal-heading">Forgot Your Password? No problem</h2>
			<p class="-modal-paragraph">
				please provide your email and our team will contact you shortly
			</p>
			<div class="input-group mt-4 contact-group mx-auto">
				<input type="email" id="" placeholder="what's your email?" class="email form-control">
				<div class="input-group-append">
					<button class="btn send"><i class="fas fa-paper-plane "></i></button>
				</div>
			</div>
		</div>
	</div>
	<div class="-modal" id="sign-modal">
		<div class="-modal-content">
			<a href="#" class="-modal-close" style="opacity: 0; pointer-events:none">&times;</a>
			<h2 class="-modal-heading">Signing in</h2>
			<p class="-modal-paragraph">
				This will only take a moment
			</p>
			<div class="loading-line" id="loading-in">
			</div>
			<p class="loading-line-label" id="loading-text-in"></p>
		</div>
	</div>


	<script src="https://code.jquery.com/jquery-3.5.1.min.js"
		integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous" />
	</script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
		integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous">
	</script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
		integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous">
	</script>
	<script src="../js/sign-in.js" type="module"></script>
</body>

</html>
