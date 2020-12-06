<?php
require_once "../database.php";

session_start();

// TODO CHECK IF USER IS ADMIN
if (isset($_GET["f"])) {
    $function = $_GET["f"];

    if ($function === "userOrders") {
        if (isset($_SESSION["user"])) {

            $user_id = $_SESSION["user"]["_id"];

            $sql = "SELECT * FROM ORDERS WHERE `user_id`=:user_id";

            $stmt = $db->prepare($sql);
            $stmt->execute(array(
                ":user_id" => (int) $user_id,
            ));
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($result) {
                echo json_encode($result);
            }

        }
    }

    if ($function === "add") {
        if (isset($_POST["items"]) && isset($_POST["totalPrice"]) && isset($_POST["name"]) && isset($_POST["address"]) && isset($_POST["phone"])) {

            $user_id = "";
            $hasUserId = "";
            $hasUserIdCol = "";

            $items = $_POST["items"];
            $totalPrice = $_POST["totalPrice"];
            $name = $_POST["name"];
            $address = $_POST["address"];
            $phone = $_POST["phone"];

            $status = "pending";
            $date = date("F j, h:i A");

            $queryArray = array(
                ":items" => $items,
                ":totalPrice" => (float) $totalPrice,
                ":status" => $status,
                ":date" => $date,
                ":name" => $name,
                ":address" => $address,
                ":phone" => (int) $phone,
            );

            if (isset($_POST["user_id"])) {
                $user_id = $_POST["user_id"];
                $hasUserId = ":user_id,";
                $hasUserIdCol = "`user_id`,";
                $queryArray[":user_id"] = (int) $user_id;
            }

            $sql = "INSERT INTO `ORDERS` (" . $hasUserIdCol . "`items`, `totalPrice`, `status`,`date`, `name`, `address`,`phone`)
                    VALUES (" . $hasUserId . " :items, :totalPrice, :status, :date, :name, :address, :phone)";

            $stmt = $db->prepare($sql);
            $result = $stmt->execute($queryArray);

            if ($result) {
                $result = array(
                    "result" => array(
                        "_id" => $db->lastInsertId(),
                        "user_id" => $user_id,
                        "items" => $items,
                        "totalPrice" => (float) $totalPrice,
                        "status" => $status,
                        "date" => $date,
                        "name" => $name,
                        "address" => $address,
                        "phone" => $phone,
                    ),
                );

                echo json_encode($result);
            }
        }
        // ADD update and delete functions
    }
}
