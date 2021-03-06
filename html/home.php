<?php
session_start();
?>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="description" content="The Best Authentic Pizza Experience in Lebanon">
  <meta name="author" content="Jeffrey Adrian Joumjian | Maria Kantardjian | Reem Saado">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pizzeria</title>
  <link rel="icon" href="../img/homepage/pizzalogo.jpg">

  <!-- CSS Sheets -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />

  <link rel="stylesheet" href="../css/home.css">
  <!-- Font Awesome -->
  <script src="https://kit.fontawesome.com/0f7d111d1b.js" crossorigin="anonymous"></script>


</head>

<body>
  <section id="title">

    <!-- Nav Bar -->
    <div class="container-fluid">
      <?php include './DefaultNavbar.php';?>
      <!-- <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="">Pizzeria</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <div class="burger-line"></div>
          <div class="burger-line"></div>
          <div class="burger-line"></div>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="./home.php">Home</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="./our-story.php">Our Story</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./menu.php">Menu</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./contact-us.php">Contact</a>
            </li>
            <li class="nav-item">
              <a href="./sign-in.php">
                <button type="button" class="btn btn-light btn-lg" id="btn-sign-in">Sign in</button>
              </a>
            </li>
          </ul>
        </div>
      </nav> -->
      <!-- Title -->
      <div class="row">
        <div class="col-lg-6">
          <h1 class="pizzaTitle">Real Italian Pizza with Real Ingredients</h1>

        </div>
        <!-- <div class="col-lg-6">
          <img class="title-img" src="" alt="">
        </div> -->
      </div>
    </div>
  </section>
  <!-- Features -->

  <section id="features">
    <h2>Welcome to our Pizzeria</h2>
    <div class="row">
      <div class="feature-box col-lg-4">
        <i class="icon fas fa-check-circle fa-4x"></i>
        <h3>Top Italian Flavours</h3>

      </div>
      <div class="feature-box col-lg-4 ">

        <i class="icon fas fa-motorcycle fa-4x"></i>
        <h3>Home Delivery</h3>

      </div>
      <div class="feature-box col-lg-4">
        <i class="icon fas fa-heart fa-4x"></i>

        <h3> Enjoy with your friends</h3>
      </div>


    </div>
  </section>
  <!-- Favorites -->

  <section id="Favorites">
    <h2>Favorites</h2>
    <div class="row feature-boxes"></div>

  </section>
  <!--Menu-->
  <section id="Menu">

    <h2>Menu</h2>

    <div class="row offers">

      <a id="order" href="./menu.php"><button type="button" class="order btn btn-dark btn-lg mt-3">Order
          now</button></a>
    </div>
  </section>
  <section id="testimonials">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <h2>One of the best pizza places i have ever visited. I highly recommend this place!</h2>
          <img class="testimonial-image" src="../img/homepage/man-image.jpg" alt="dog-profile">
          <em>Beirut, Lebanon</em>
        </div>
        <div class="carousel-item">
          <h2 class="testimonial-text">Best pizza place in town! The pizzeria sauce is incredible.</h2>
          <img class="testimonial-image" src="../img/homepage/lady-img.jpg" alt="lady-profile">
          <em>Jeita, Lebanon</em>
        </div>

      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>





  </section>
  <!-- Footer -->

  <footer id="footer">
    <p>&copy; 2020 PIZZERIA PIZZA the pizza professionals. All rights reserved</p>

    <a class="footer-icons" href=""><i class="ico fab fa-twitter"></i></a>
    <a class="footer-icons" href=""><i class="ico fab fa-facebook-square"></i></a>
    <a class="footer-icons" href=""><i class="ico fas fa-envelope-square"></i></a>
  </footer>


  <!-- Bootstrap Scripts -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
  </script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
  </script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
  </script>
  <script src="../js/home.js" type="module"></script>
</body>

</html>
