<?php
session_start();

if (!isset($_SESSION["user"]) || $_SESSION["user"]["isAdmin"] == 1) {
    header('Location: sign-in.php');
}
?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="description" content="The Best Authentic Pizza Experience in Lebanon">
  <meta name="author" content="Jeffrey Adrian Joumjian | Maria Kantardjian | Reem Saado">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/admin.css">
  <link rel="stylesheet" href="../css/navbar.css">
  <title>My Orders</title>
  <link rel="icon" href="../img/homepage/pizzalogo.jpg">
</head>


<!-- Navbar -->
<nav class="navbar navbar-expand-md navbar-light">

  <button class="navbar toggler ml-auto mb-2 bg-light" type="button" data-toggle="collapse" data-target="#myNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="myNavbar">
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top">
          <a href="./home.php"
            class="navbar-brand text-white display-block mx-auto text-center py-3 mb-4 bottom-border">Our
            Pizzeria </a>
          <div class="bottom-border pb-3">
            <img src="../img/dashboard/cust5.jpeg" width="50" height="50" class="rounded-circle mr-3"
              alt="user profile picture">
            <a href="#" class="text-white"> <span class="profile-name"></span></a>
          </div>
          <ul class="navbar-nav flex-column mt-4">
            <li class="nav-item">
              <a href="./user-dashboard.php" class="nav-link text-white p-3 mb-2 sidebar-link"><i
                  class="fas fa-user text-light fa-lg mr-3"></i>My Profile</a>
            </li>

            <li class="nav-item">
              <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link current"><i
                  class="fas fa-shopping-cart text-light fa-lg mr-3"></i>My Orders</a>
            </li>

            <li class="nav-item">
              <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link" data-toggle="modal"
                data-target="#sign-out"><i class="fas fa-sign-out-alt text-danger fa-lg mr-3"></i>Sign Out</a>
            </li>
          </ul>
        </div>
        <!-- End of Sidebar -->

        <!-- Modal -->
        <div class="modal fade" id="sign-out">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Want to leave?</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                Press Logout to leave
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal">Stay Here</button>
                <button id="btn-logout" type="button" class="btn btn-danger" data-dismiss="modal">Log Out</button>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Modal -->

        <?php include './MenuNavbar.php';?>
        <!-- Top Nav -->
        <!-- <div class="col-xl-10 col-lg-9 col-md-8 ml-auto bg-dark fixed-top py-2 top-navbar">
          <div class="row align-items-center">
            <div class="col-md-4">
              <h4 class="text-light text-uppercase mb-0">User Dashboard</h4>
            </div>
          </div>
        </div>
      </div> -->
      <!-- End of Top Nav -->
    </div>
  </div>
  </div>
</nav>
<!-- End of Navbar -->

<!--Beginning of My Orders-->


<div class="col-xl-10 col-lg-9 col-md-8 ml-auto mt-5">
  <h3 class="text-muted text-center mb-3">My Orders</h3>
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col" colspan="1">ID</th>
        <th scope="col" colspan="1">Date</th>
        <th scope="col" colspan="2">Items</th>
        <th scope="col" colspan="1">Total</th>
        <th scope="col" colspan="1">Status</th>
      </tr>
    </thead>
    <tbody id="users">

    </tbody>
</div>
</table>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
  integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
</script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
  integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
</script>
<script src="https://kit.fontawesome.com/e6491a4ae6.js" crossorigin="anonymous"></script>
<script src="../js/userDashboardOrders.js" type="module"></script>
</body>

</html>
