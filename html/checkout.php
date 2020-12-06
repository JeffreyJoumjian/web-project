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
	<title>Order Checkout</title>
	<script src="https://kit.fontawesome.com/0f7d111d1b.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
		integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />
	<link rel="stylesheet" href="../css/checkout.css">
	<link rel="icon" href="../img/homepage/pizzalogo.jpg">
</head>

<body>
<?php include './MenuNavbar.php';?>

	<div class="container-fluid order-container">

		<div class="row mx-auto">
			<!-- details col -->
			<div class="col-12 col-md-6 details-col mx-auto">
				<div class="details-wrapper">
					<h1 class="your-details text-center">Your Details</h1>

					<form action="/" class="order-form">
						<div class="order-total text-center">
							<h2>Total: <p class="order-details-total-price">$0.00</p>
							</h2>
						</div>
						<div class="label-group">
							<input id="inpName" type="text" name="name" required>
							<label for="name">Name</label>
						</div>

						<div class="label-group">
							<input id="inpPhone" type="number" name="phone" required>
							<label for="phone">Phone</label>
						</div>

						<div class="label-group">
							<input id="inpAddress" type="text" name="address" required>
							<label for="address">Address</label>

						</div>

						<div class="order-btns text-center">
							<button class="btn-cancel">cancel</button>
							<button class="btn-order">Order Now</button>
						</div>

						<div class="alert alert-success alert-dismissible fade show px-5 py-1" role="alert">
							Your order has been placed successfully!
						</div>
					</form>
				</div>
			</div>


			<!-- order col -->
			<div class="col-12 col-md-6 order-col mx-auto">
				<div class="order-wrapper">
					<h1 class="your-order text-center">Your Order</h1>

					<ul class="order-items"></ul>
					<div class="order-total">
						<h2>Total: <span class="order-total-price">$0.00</span></h2>
					</div>

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
	<script src="../js/checkout.js" type="module"></script>
</body>

</html>
