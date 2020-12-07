<?php
session_start();

$_SESSION["user"] = "";
setcookie('webprojectcookie', '', time() - 3600, '/');
session_destroy();

header('Location: ../html/sign-in.php');
