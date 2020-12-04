<?php

require_once "database.php";

$pizzas = $db->query("SELECT * FROM `MENU_ITEMS`")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($pizzas);
