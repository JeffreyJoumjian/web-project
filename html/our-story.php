<?php
session_start();
?>
<html>
<header>
  <meta charset="UTF-8">
  <meta name="description" content="The Best Authentic Pizza Experience in Lebanon">
  <meta name="author" content="Jeffrey Adrian Joumjian | Maria Kantardjian | Reem Saado">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pizzeria</title>
  <link rel="icon" href="../img/homepage/pizzalogo.jpg">

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/home.css">



  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Ubuntu:wght@300&display=swap"
    rel="stylesheet">
  <!-- Awesome Fonts -->
  <script src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>
</header>

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
              <a class="nav-link" href="home.php">Home</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="our-story.php">Our Story</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./menu.php">Menu</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./contact-us.php">Contact</a>
            </li>
            <li class="nav-item">
              <button type="button" class="btn btn-light btn-lg" id="btn-sign-in">Sign in</button>
            </li>
          </ul>
        </div>
      </nav> -->
      <h1>Satisfaction With Every Bite!</h1>
  </section>
  <section id="commitment">
    <h2>Our Pizza Commitment</h2>
    <div class="row">
      <div id="co" class="feature-box col-lg-3">
        <!-- <div class="icon-box-icon fa-container"></div> -->
        <img class="imgStory" src="../img/homepage/fresh.png">
        <h3>Fresh</h3>
        <p>Every pizza is made-to-order by our skilled professionals at our open kitchen counter</p>
      </div>
      <div class="box feature-box col-lg-3">
        <img class="imgStory" src="../img/homepage/quality.png">
        <h3>Quality</h3>
        <p>All our toppings are produced according to exact and precise standards</p>
      </div>
      <div class="box feature-box col-lg-3">
        <img class="imgStory" src="../img/homepage/original.png">
        <h3>Original</h3>
        <p>Our original hand-tossed pizza with premium flour makes the best American Pizza</p>

      </div>
      <div class="box feature-box col-lg-3">
        <img class="imgStory" src="../img/homepage/tasty.png">
        <h3>Tasty</h3>
        <p>Our unique oil-free screening process produces a crispy crust with a soft center</p>
      </div>
    </div>
  </section>
  <section id="story">
    <div class="row">
      <div class="feature-box col-lg-6">
        <img src="../img/homepage/pizzaman.png">

      </div>
      <div class="feature-box col-lg-4">
        <h3>It all began in the early 1990s with Mr. Pizzeria,</h2>
          <p>who spent some time working in a pizza restaurant in Beirut City, Lebanon. After spending 5 years in the
            business, Mr. Pizzeria developed his own recipe of dough, and tomato sauce, also known as the “Pizzeria
            Sauce”. Mr. Pizzeria then opened the first outlet in Beirut, Lebanon in 1997, and named the outlet to
            PIZZERIA PIZZA, after the origin of the food.</p>
      </div>
    </div>
  </section>
  <footer id="footer">
    <p>&copy; 2020 PIZZERIA PIZZA the pizza professionals. All rights reserved</p>

    <i class="ico fab fa-twitter"></i>
    <i class="ico fab fa-facebook-square"></i>
    <i class="ico fas fa-envelope-square"></i>
  </footer>
  <script src="../js/ourStory.js" type="module"></script>
</body>

</html>
