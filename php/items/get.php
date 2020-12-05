<?php

require_once "../database.php";

if (isset($_GET["f"])) {
    if ($_GET["f"] === "all") {
        $pizzas = $db->query("SELECT * FROM `MENU_ITEMS`")->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($pizzas);
    }
}
