<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once "../database.php";

$function = $_GET["f"];

if (isset($function)) {

    if ($function === "add") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        $phone = $_POST['phone'];
        $isAdmin = $_POST['isAdmin'];

        if (isset($name) && isset($email) && isset($address) && isset($phone) && isset($isAdmin)) {
            $sql = "INSERT INTO USERS (name, email, address, phone, isAdmin)
					VALUES (:name, :email, :address, :phone, :isAdmin)";

            $stmt = $db->prepare($sql);
            $result = $stmt->execute(
                array(
                    ':isAdmin' => ($isAdmin ? 1 : 0),
                    ':name' => $name,
                    ':email' => $email,
                    ':phone' => (int) $phone,
                    ':address' => $address,
                )
            );

            if ($result) {
                $result = array(
                    "result" => array(
                        "_id" => $db->lastInsertId(),
                        "name" => $name,
                        "email" => $email,
                        "address" => $address,
                        "phone" => $phone,
                        "isAdmin" => $isAdmin,
                    ),
                );

                echo json_encode($result);
            }

        }
    } else if ($function === "delete") {
        $_id = $_POST["_id"];

        if (isset($_id)) {
            $sql = "DELETE FROM USERS WHERE _id = :_id";
            $stmt = $db->prepare($sql);
            $result = $stmt->execute(
                array(
                    ":_id" => (int) $_id,
                )
            );

            if ($result) {
                $result = array(
                    "result" => array(
                        "_id" => $_id,
                    ),
                );
                echo json_encode($result);
            }

        }
    }
}
