<?php

require_once "../database.php";

$users = "";

// get all users
if (isset($_GET["f"])) {

    $function = $_GET["f"];

    if ($function === "all") {
        $users = $db->query("SELECT * FROM `USERS`")->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
    }
}
