<?php

require_once "../database.php";

$orders = "";

// get all users
if (isset($_GET["f"])) {

    $function = $_GET["f"];

    if ($function === "userOrders") {
        if (isset($_SESSION["_id"])) {
            $_id = $_SESSION["_id"];

            $sql = "SELECT * FROM ORDERS WHERE _id=:_id";

            $stmt = $db->prepare($sql);
            $result = $stmt->execute(array(
                ':_id' => $_id,
            ));

            if ($result) {
                echo json_encode($result);
            }

        }
    }
}
