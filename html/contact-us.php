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

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Ubuntu:wght@300&display=swap"
    rel="stylesheet">
  <!-- Font Awesome -->
  <script src="https://kit.fontawesome.com/0f7d111d1b.js" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="../css/home.css">

</header>

<body>
  <section id="title">

    <!-- Nav Bar -->
    <div class="container-fluid">
      <?php include './DefaultNavbar.php';?>

  </section>

  <section id="contact">
    <div class="all">
      <h2> Contact us</h2>
      <p class="inquiries">Any inquiries? Leave us a message and we will get back to you as soon as <br> possible.</p>


      <aside>
        <div class="mapouter">
          <div class="gmap_canvas"><iframe width="300" height="300" id="gmap_canvas"
              src="https://maps.google.com/maps?q=beirut%20lebanon&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
              scrolling="no" marginheight="0" marginwidth="0"></iframe></div>
        </div>
        <div class="cnt"><i class="fas fa-phone"></i></div>
        <div class="cnt">
          <p class="info">+961 01000000</p>
        </div>
        <br>
        <div class="cnt2"><i class="fas fa-envelope"></i></div>
        <div class="cnt2">
          <p class="info">info@pizzeria.com</p>
        </div>

      </aside>

      <form class="">
        <input class="input" type="text" placeholder="Name" name="Name" value="name" required>
        <input class="input" type="text" placeholder="Email" name="Email" value="email" required>
        <br>

        <input class="input" type="text" placeholder="phone" name="Telephone Number" value="phone" required>


        <input class="input" type="text" placeholder="City" name="City" value="city" required>
        <br>


        <button class="general btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          General Inquiry
        </button>
        <br>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item">Corporate Membership</a>
          <a class="dropdown-item">Customer Service Responsibility</a>
          <a class="dropdown-item">Comments/Feedback</a>
          <a class="dropdown-item">Technical Issue</a>
        </div>
        <textarea class="message d-block" name="message" value="message" placeholder="Messages"></textarea>

        <button type="button" class="submit btn btn-dark">Submit</button>

      </form>
    </div>
  </section>

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
</body>

</html>
