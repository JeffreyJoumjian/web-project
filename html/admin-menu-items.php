<?php
session_start();

if (!isset($_SESSION["user"]) || !($_SESSION["user"]["isAdmin"] == 1)) {
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
  <link rel="icon" href="../img/homepage/pizzalogo.jpg">
  <title>Admin Dashboard</title>
</head>

<body>



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
              <img src="../img/dashboard/admin.jpeg" width="50" height="50" class="rounded-circle mr-3"
                alt="admin profile image">
                <a href="#" class="text-white"><span class="profile-name"></span></a>
            </div>
            <ul class="navbar-nav flex-column mt-4">
              <li class="nav-item">
                <a href="./admin-dashboard.php" class="nav-link text-white p-3 mb-2 sidebar-link"><i
                    class="fas fa-users text-light fa-lg mr-3"></i>Users</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link text-white p-3 mb-2 sidebar-link current"><i
                    class="fas fa-table text-light fa-lg mr-3"></i>Menu Items</a>
              </li>

            </ul>
          </div>
          <!-- End of Sidebar -->

          <!-- Top Nav -->
          <div class="col-xl-10 col-lg-9 col-md-8 ml-auto bg-dark fixed-top py-2 top-navbar">
            <div class="row align-items-center">
              <div class="col-md-4">
                <h4 class="text-light text-uppercase mb-0">Dashboard</h4>
              </div>

              <div class="col-md-5"></div>
              <div class="col-md-3">
                <ul class="navbar-nav">
                  <li class="nav-item ml-md-auto">
                    <a href="#" class="nav-link" data-toggle="modal" data-target="#sign-out"><i
                        class="fas fa-sign-out-alt text-danger fa-lg"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- End of Top Nav -->
        </div>
      </div>
    </div>
  </nav>
  <!-- End of Navbar -->


  <!-- Sign Out Modal -->
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




  <!-- Cards -->
  <section>
    <div class="container-fluid" id="menu-items">
      <div class="row">
        <div class="col-xl-10 col-md-8 col-lg-9 ml-auto">
          <div class="row pt-md-5 mt-md-3 mb-5 menu-items">
            <div id="addItem" class="col-xl-3 col-sm-6 p-2">
              <div class="card card-common">
                <div class="card-body d-flex justify-content-center align-items-center">
                  <div class="">
                    <div id="addParent" class=" text-secondary text-center">
                      <i id="plus" class="fas fa-plus fa-3x text-warning mx-auto my-auto"></i>
                    </div>
                  </div>
                </div>
                <div class="card-footer text-secondary">
                  <div id="parentbtn" class="text-center AddDiv">
                    <button type="button" id="btnAdd" class="btn btn-success">Add Item</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End of Cards -->

  <!-- Button trigger edit modal -->
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editItemModal" id="btnEditModal">
  </button>

  <!-- Edit Modal -->
  <div class="modal fade" id="editItemModal" tabindex="-1" role="dialog" aria-labelledby="editItemModal"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Edit Item</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="" id="editForm">
            <p>
              <label for="name">Name: </label>
              <input id="inpName" name="name" type="text" required>
            </p>
            <p>
              <label for="price">Price: </label>
              <input id="inpPrice" name="price" type="number" required>
            </p>
            <p>
              <label for="ingredients">Ingredients: </label>
              <textarea name="ingredients" id="inpIngredients" cols="30" rows="4" required></textarea>
            </p>
            <p>
              <label for="image">Image Link: </label>
              <input id="inpImg" name="imgSrc" type="text" required>
            </p>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnClose">Close</button>
              <button type="submit" class="btn btn-success" id="btn-save">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Button trigger add modal -->
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addItemModal" id="btnAddModal">
  </button>

  <!-- add Modal -->
  <div class="modal fade" id="addItemModal" tabindex="-1" role="dialog" aria-labelledby="addItemModal"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Add Item</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="" id="addForm">
            <p>
              <label for="name">Name: </label>
              <input id="inpName" name="name" type="text" required>
            </p>
            <p>
              <label for="price">Price: </label>
              <input id="inpPrice" name="price" type="number" required>
            </p>
            <p>
              <label for="ingredients">Ingredients: </label>
              <textarea name="ingredients" id="inpIngredients" cols="30" rows="4" required></textarea>
            </p>
            <p>
              <label for="image">Image Link: </label>
              <input id="inpImg" name="imgSrc" type="text" required>
            </p>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnClose">Close</button>
              <button type="submit" class="btn btn-success" id="btn-add">Add Item</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Button trigger delete modal -->
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteItemModal"
    id="btnDeleteModal"></button>

  <!-- Delete Modal -->
  <div class="modal fade" id="deleteItemModal" tabindex="-1" role="dialog" aria-labelledby="deleteItemModal"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Delete Item?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6>Are you sure you want to delete <span class="item-name"></span>?</h6>
          <form id="deleteForm">
            <input id="itemName" type="text" hidden name="itemName">
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnClose">Close</button>
              <button type="submit" class="btn btn-danger" id="btn-delete">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>




  <!-- Footer -->
  <!-- <footer>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
          <div class="row border-top pt-3">
            <div class="col-lg-6 text-center">
              <p>&copy; 2020 Copyright. Pizzeria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer> -->
  <!-- End of Footer -->


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
  <script src="../js/adminDashboardMenu.js" type="module"></script>
</body>

</html>
