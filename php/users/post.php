<?php
require_once "../database.php";
require_once "../cookie.php";

session_start();

$function = $_GET["f"];

function isValidEmail($email)
{
    $regex = "/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|\"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?\")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i";
    return preg_match($regex, $email);
}

if (isset($function)) {
    if ($function === "add") {
        if (isset($_POST['name']) &&
            isset($_POST['email']) && isValidEmail($_POST['email']) &&
            isset($_POST['address']) && isset($_POST['phone'])) {

            try {
                $name = $_POST['name'];
                $email = $_POST['email'];
                $address = $_POST['address'];
                $phone = $_POST['phone'];

                $isAdmin = isset($_POST["isAdmin"]) ? (int) $_POST["isAdmin"] : 0;

                $password = "";
                $hasPasswordCol = "";
                $hasPasswordField = "";

                $queryArray = array(
                    ':isAdmin' => $isAdmin,
                    ':name' => $name,
                    ':email' => $email,
                    ':phone' => (int) $phone,
                    ':address' => $address,
                );

                if (isset($_POST["password"])) {
                    $password = $_POST["password"];
                    $hasPasswordCol = ",password";
                    $hasPasswordField = ",:password";
                    $queryArray[":password"] = $password;
                }

                $sql = "INSERT INTO USERS (name, email, address, phone, isAdmin" . $hasPasswordCol . ")
					VALUES (:name, :email, :address, :phone, :isAdmin" . $hasPasswordField . ")";

                $stmt = $db->prepare($sql);
                $result = $stmt->execute($queryArray);

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
            } catch (Throwable $e) {
                echo json_encode(array("error" => $e));
            }

        }
    } else if ($function === "update") {

        if ((isset($_POST["_id"]) || isset($_SESSION["user"]["_id"])) && isset($_POST['name']) &&
            isset($_POST['email']) && isValidEmail($_POST['email']) &&
            isset($_POST['address']) && isset($_POST['phone'])) {

            $_id = isset($_POST["_id"]) ? $_POST["_id"] : $_SESSION["user"]["_id"];
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
                $profileUpdate = !isset($_POST["_id"]);

                if ($profileUpdate) {
                    $result["result"]["isAdmin"] = $_SESSION["user"]["isAdmin"];
                    setSessionCookies($result["result"]);
                    $cookie = setCustomCookie($result["result"]);
                    echo $cookie;
                } else {
                    echo json_encode($result);
                }

            }

        }
    } else if ($function === "delete") {
        $_id = isset($_POST["_id"]) ? $_POST["_id"] : $_SESSION["user"]["_id"];

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
                        "_id" => (int) $_id,
                    ),
                );
                echo json_encode($result);
            }

        }
    }
}
