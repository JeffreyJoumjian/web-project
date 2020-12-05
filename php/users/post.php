<?php
require_once "../database.php";

$function = $_GET["f"];

function isValidEmail($email)
{
    $regex = "/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|\"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?\")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i";
    return preg_match($regex, $email);
}

// TODO CHECK IF USER IS ADMIN
if (isset($function)) {

    // CHANGE get from cookie and session and not id
    // get users based on id stored in cookie
    if ($function === "user") {
        if (isset($_POST["_id"])) {
            $_id = $_POST["_id"];

            $sql = "SELECT _id, name,email,phone,address FROM USERS WHERE _id=:_id";

            $stmt = $db->prepare($sql);
            $stmt->execute(array(
                ':_id' => (int) $_id,
            ));

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                echo json_encode($result);
            }

        }

    } else if ($function === "add") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        $phone = $_POST['phone'];
        $isAdmin = $_POST['isAdmin'];

        if (isset($name) && isset($email) && isValidEmail($email) && isset($address) && isset($phone) && isset($isAdmin)) {

            $sql = "INSERT INTO USERS (name, email, address, phone, isAdmin)
					VALUES (:name, :email, :address, :phone, :isAdmin)";

            $stmt = $db->prepare($sql);
            $result = $stmt->execute(array(
                ':isAdmin' => ($isAdmin ? 1 : 0),
                ':name' => $name,
                ':email' => $email,
                ':phone' => (int) $phone,
                ':address' => $address,
            ));

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
    } else if ($function === "update") {

        if (isset($_POST["_id"]) && isset($_POST['name']) &&
            isset($_POST['email']) && isValidEmail($_POST['email']) &&
            isset($_POST['address']) && isset($_POST['phone'])) {

            $_id = $_POST["_id"];
            $name = $_POST['name'];
            $email = $_POST['email'];
            $address = $_POST['address'];
            $phone = $_POST['phone'];

            $isAdmin = "";
            $isAdminChanged = "";

            $queryArray = array(
                ':_id' => (int) $_id,
                ':name' => $name,
                ':email' => $email,
                ':phone' => (int) $phone,
                ':address' => $address,
            );

            if (isset($_POST['isAdmin'])) {
                $isAdmin = $_POST['isAdmin'];
                $isAdminChanged = "isAdmin=:isAdmin, ";
                $queryArray[":isAdmin"] = ($isAdmin ? 1 : 0);
            }

            $sql = "UPDATE USERS SET " . $isAdminChanged . "`name`=:name , email=:email , phone=:phone , address=:address WHERE _id=:_id";

            $stmt = $db->prepare($sql);
            $result = $stmt->execute($queryArray);

            if ($result) {
                $result = array("result" => array(
                    '_id' => (int) $_id,
                    'name' => $name,
                    'email' => $email,
                    'phone' => (int) $phone,
                    'address' => $address,
                ));

                if ($isAdmin) {
                    $result["result"]["isAdmin"] = ($isAdmin ? 1 : 0);
                }
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
