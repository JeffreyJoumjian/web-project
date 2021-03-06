<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="description" content="The Best Authentic Pizza Experience in Lebanon">
	<meta name="author" content="Jeffrey Adrian Joumjian | Maria Kantardjian | Reem Saado">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Menu</title>
	<link rel="icon" href="../img/homepage/pizzalogo.jpg">
	<script src="https://kit.fontawesome.com/0f7d111d1b.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
		integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />
	<link rel="stylesheet" href="../css/menu.css" />
</head>

<body>
<?php include './MenuNavbar.php';?>

	<div class="container-fluid menu-container">
		<div class="row">
			<div class="col-sm-12 col-md-6 col-xl-9  menu-column order-last order-md-first">
				<!-- <div class="row">
					<input class="mx-auto" type="text" name="" id="search" placeholder="find your favorite food" />
				</div>

				<div class="row">
					<ul class="categories mx-auto">
						<li class="category active">Pizzas</li>
						<li class="category">Specialties</li>
						<li class="category">Side Bites</li>
						<li class="category">Drinks</li>
					</ul>
				</div> -->

				<div class="row menu-row">

					<div class="menu-items mx-auto">

					</div>

				</div>
			</div>

			<div class="col-sm-12 col-md-6 col-xl-3 order-col ">
				<h1 class="your-order text-center">Your Order</h1>

				<ul class="order-items">
				</ul>
				<div class="order-total">
					<h2>Total: <span class="order-total-price">$0</span></h2>
				</div>
				<div class="order-btns text-center">
					<button class="btn-cancel">cancel</button>
					<button class="btn-order">Order Now</button>
				</div>
			</div>
		</div>
	</div>

	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
		integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
	</script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
		integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous">
	</script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
		integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous">
	</script>
	<script src="../js/menu.js" type="module"></script>
</body>

</html>
