<nav class="navbar navbar-expand-lg">
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
				<?php $text = !isset($_SESSION["user"]) ? "Sign in" : "Account";?>

					<li class="nav-item">
					<button type="button" class="btn btn-light btn-lg" id="btn-sign-in"><?=$text?></button>
            </li>
          </ul>
        </div>
      </nav>
